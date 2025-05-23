<script lang="ts">
	import { enhance } from '$app/forms';
	import Carousel from './Carousel.svelte';
	import { page } from '$app/state'; // For accessing URL searchParams

	interface CarouselItem {
		id: number;
		imageUrl: string;
		colorway: number;
	}

	let { data, form } = $props();

	const PLACEHOLDER_MAIN_IMAGE = 'https://placehold.co/648x648/EBEAFF/0F0E0E?text=Print+Image';
	const PLACEHOLDER_THUMBNAIL_IMAGE = 'https://placehold.co/98x98/EBEAFF/0F0E0E?text=Thumb';
	const PLACEHOLDER_CAROUSEL_IMAGE = 'https://placehold.co/382x382/EBEAFF/0F0E0E?text=Colorway';

	let mainImageUrl = $state(PLACEHOLDER_MAIN_IMAGE);
	let activeThumbnailIndex = $state(-1); // Index for the *button* thumbnails, not carousel

	let isInWishlist = $derived(data.isInWishlist);
	let wishlistActionInProgress = $state(false);

	// Effect to initialize and update main image based on URL or data
	$effect(() => {
		const colorwayIdFromUrlString = page.url.searchParams.get('colorway');
		let initialColorwaySet = false;

		if (colorwayIdFromUrlString && !data.print.isSold) {
			const colorwayIdFromUrl = parseInt(colorwayIdFromUrlString, 10);
			const targetColorway = data.colorways.find((cw) => cw.id === colorwayIdFromUrl);
			const targetIndex = data.colorways.findIndex((cw) => cw.id === colorwayIdFromUrl);

			if (targetColorway) {
				mainImageUrl = targetColorway.imageUrl || PLACEHOLDER_MAIN_IMAGE;
				activeThumbnailIndex = targetIndex;
				initialColorwaySet = true;
			}
		}

		if (!initialColorwaySet && !data.print.isSold && data.colorways.length > 0) {
			// Default to first colorway if no valid URL param or if print not sold
			mainImageUrl = data.colorways[0].imageUrl || PLACEHOLDER_MAIN_IMAGE;
			activeThumbnailIndex = 0;
		} else if (data.print.isSold || data.colorways.length === 0) {
			// If sold or no colorways, use placeholder
			mainImageUrl = PLACEHOLDER_MAIN_IMAGE;
			activeThumbnailIndex = -1;
		}
	});

	$effect(() => {
		// Update wishlist status when data changes
		isInWishlist = data.isInWishlist;
	});

	function handleThumbnailClick(imageUrl: string | null, index: number) {
		if (data.print.isSold) return;
		mainImageUrl = imageUrl || PLACEHOLDER_MAIN_IMAGE;
		activeThumbnailIndex = index;
		// Clear the 'colorway' query parameter if a thumbnail is clicked,
		// as thumbnails offer direct control, overriding the carousel's URL-based selection.
		const currentUrl = new URL(page.url);
		if (currentUrl.searchParams.has('colorway')) {
			currentUrl.searchParams.delete('colorway');
			// history.replaceState(null, '', currentUrl.pathname + currentUrl.search);
			// SvelteKit way to update URL without navigation:
			// Not straightforward without `goto` which causes navigation.
			// For simplicity, we'll let the URL param persist, but thumbnail click overrides display.
			// Or, user can use goto with replaceState, but that might trigger effect again.
			// For now, simple state update is fine.
		}
	}

	// Prepare items for the "Colorways" Carousel
	const carouselColorwayItems = $derived(
		data.colorways.map(
			(cw): CarouselItem => ({
				// CarouselItem from original Carousel.svelte
				id: cw.id, // Use colorway ID for item.id
				imageUrl: cw.imageUrl || PLACEHOLDER_CAROUSEL_IMAGE,
				colorway: cw.id // This is used for the href `?colorway={item.colorway}`
			})
		)
	);

	// Dummy data for "Discover the collection" carousel
	// Note: Links will be `?colorway={item.id}` on the *current* product page.
	const discoverCollectionItems: CarouselItem[] = $state([
		{
			id: 101,
			imageUrl: 'https://placehold.co/382x382/FFC0CB/000000?text=Bloom+Fantasy',
			colorway: 101
		},
		{
			id: 102,
			imageUrl: 'https://placehold.co/382x382/ADD8E6/000000?text=Aqua+Dream',
			colorway: 102
		},
		{
			id: 103,
			imageUrl: 'https://placehold.co/382x382/90EE90/000000?text=Forest+Whisper',
			colorway: 103
		},
		{
			id: 104,
			imageUrl: 'https://placehold.co/382x382/FFFFE0/000000?text=Sunset+Glow',
			colorway: 104
		},
		{
			id: 105,
			imageUrl: 'https://placehold.co/382x382/E6E6FA/000000?text=Mystic+Geo',
			colorway: 105
		}
	]);
</script>

<svelte:head>
	<title>{data.print.name} - Shop - Paillette.co</title>
	{#if data.print.description}
		<meta name="description" content={data.print.description.substring(0, 150)} />
	{/if}
</svelte:head>

<div class={['bg-white py-16', 'lg:py-20']}>
	<div class={['container mx-auto space-y-8', 'lg:space-y-12']}>
		<section
			class={[
				'px-4',
				'sm:px-[73px]',
				'md:px-[137px]',
				'lg:flex lg:items-start lg:gap-x-8 lg:px-10',
				'xl:gap-x-[58px] xl:px-16',
				'2xl:gap-x-[87px] 2xl:px-20'
			]}
		>
			<!-- Image Gallery -->
			<div
				class={[
					'lg:flex lg:shrink-0 lg:flex-row-reverse lg:items-start lg:gap-x-[31px]',
					'xl:gap-x-[58px]',
					'2xl:gap-x-[87px]'
				]}
			>
				<img
					src={mainImageUrl}
					alt={`Main view of ${data.print.name}${activeThumbnailIndex !== -1 && data.colorways[activeThumbnailIndex] ? ' - ' + data.colorways[activeThumbnailIndex].name : ''}`}
					class={[
						'aspect-square w-full rounded-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)]',
						'sm:mx-auto sm:w-auto sm:max-w-[494px]',
						'lg:w-[358px]',
						'xl:w-[510px]',
						'2xl:w-[648px]'
					]}
					draggable="false"
					oncontextmenu={(e) => e.preventDefault()}
				/>
				{#if data.colorways.length > 0 && !data.print.isSold}
					<div
						class={[
							'mt-8 flex justify-center gap-x-[10px] overflow-x-auto pb-2 sm:gap-x-[29px]',
							'lg:mt-0 lg:flex-col lg:gap-x-0 lg:gap-y-[29px] lg:overflow-x-visible lg:pb-0'
						]}
					>
						{#each data.colorways as colorway, i (colorway.id)}
							<button
								type="button"
								onclick={() => handleThumbnailClick(colorway.imageUrl, i)}
								aria-label={`View ${colorway.name}`}
								class="shrink-0"
							>
								<img
									src={colorway.imageUrl || PLACEHOLDER_THUMBNAIL_IMAGE}
									alt={colorway.name}
									class={[
										'aspect-square w-[80px] rounded-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)] transition-all sm:w-[98px]',
										i === activeThumbnailIndex
											? 'border-dementer-green border-[6px] p-0.5 sm:border-[10px]'
											: 'border-[6px] border-transparent sm:border-[10px]'
									]}
								/>
							</button>
						{/each}
					</div>
				{:else if data.colorways.length === 0 && !data.print.isSold}
					<div class="mt-8 lg:mt-0 lg:w-[98px] lg:shrink-0">
						<p class="font-evolventa text-sm text-gray-500">No colorways available for preview.</p>
					</div>
				{/if}
			</div>

			<!-- Product Info -->
			<div class={['mt-8', 'lg:mt-0 lg:flex-1']}>
				<h1
					class={[
						'font-apfel-grotezk-brukt text-black-sheep text-3xl/[40px] sm:text-4xl/[52px] md:text-5xl/[62px]',
						'lg:text-6xl/[77px]'
					]}
				>
					{data.print.name}
				</h1>
				<div class="mt-2 flex items-center justify-between">
					<p class="font-evolventa text-black-sheep text-base/6 sm:text-lg/6">
						By {data.print.designer.fullName}
					</p>
					<span class="font-apfel-grotezk text-black-sheep text-xl/[31px] sm:text-2xl/[31px]"
						>{data.print.priceFormatted}</span
					>
				</div>

				{#if form?.message && form.message.includes('wishlist')}
					<p class="text-grapefruit mt-2 text-sm">{form.message}</p>
				{/if}

				<div class="mt-8 space-y-3.5">
					{#if data.print.isSold}
						<button
							type="button"
							disabled
							class="font-evolventa flex w-full cursor-not-allowed justify-center rounded-full border border-gray-300 bg-gray-200 py-[19px] text-base/[21px] text-gray-500 shadow-[0_4px_4px_rgba(0,0,0,0.1)] sm:text-lg/6"
							>Sold Out</button
						>
					{:else}
						<button
							type="button"
							class="font-evolventa text-black-sheep bg-enoki border-black-sheep flex w-full cursor-pointer justify-center rounded-full border py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px] sm:text-lg/6"
							>Add to bag</button
						>

						{#if isInWishlist}
							<form
								method="POST"
								action="?/removeFromWishlist"
								use:enhance={() => {
									wishlistActionInProgress = true;
									return async ({ result }) => {
										console.log(result);
										wishlistActionInProgress = false;
										// data.isInWishlist will be updated by $effect
									};
								}}
							>
								<input type="hidden" name="printId" value={data.print.id} />
								<button
									type="submit"
									disabled={wishlistActionInProgress}
									class="font-evolventa text-black-sheep bg-enoki border-black-sheep flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-full border py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px] sm:text-lg/6"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										class="size-5 sm:size-6"
									>
										<path
											fill-rule="evenodd"
											d="M12 21.75c2.676 0 5.216-.584 7.499-1.632a17.933 17.933 0 0 1-14.998 0c2.283 1.048 4.823 1.632 7.499 1.632Z M12 3.75c-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C1.375 6.483 0 8.498 0 10.75c0 7.22 9 12 9 12s9-4.78 9-12c0-2.252-1.375-4.267-3.375-4.267-1.936 0-3.598 1.126-4.313 2.733Z"
											clip-rule="evenodd"
										/>
									</svg>
									{wishlistActionInProgress ? 'Updating...' : 'Remove from Wishlist'}
								</button>
							</form>
						{:else}
							<form
								method="POST"
								action="?/addToWishlist"
								use:enhance={() => {
									wishlistActionInProgress = true;
									return async ({ result }) => {
										console.log(result);
										wishlistActionInProgress = false;
										// data.isInWishlist will be updated by $effect
									};
								}}
							>
								<input type="hidden" name="printId" value={data.print.id} />
								<button
									type="submit"
									disabled={wishlistActionInProgress}
									class="font-evolventa text-black-sheep bg-enoki border-black-sheep flex w-full cursor-pointer items-center justify-center gap-x-2 rounded-full border py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px] sm:text-lg/6"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="size-5 sm:size-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
										/>
									</svg>
									{wishlistActionInProgress ? 'Updating...' : 'Add to Wishlist'}
								</button>
							</form>
						{/if}
					{/if}
				</div>

				{#if data.print.description}
					<p
						class={[
							'font-evolventa text-black-sheep mt-8 text-justify text-base/[21px]',
							'xl:text-lg/6'
						]}
					>
						{data.print.description}
					</p>
				{/if}

				<h2
					class={[
						'font-apfel-grotezk text-black-sheep mt-8 text-2xl/[31px]',
						'lg:text-[32px]/[41px]',
						'xl:text-4xl/[46px]'
					]}
				>
					What’s in the package:
				</h2>
				<ul
					class="font-evolventa text-black-sheep mt-4 list-inside list-disc space-y-1 text-base/[21px] xl:text-lg/6"
				>
					<li>Full exclusivity rights to the design, including all color ways</li>
					<li>Number of colorways varies per print (check previews/carousel)</li>
					<li>
						High-resolution files of repeat (300dpi RGB files, color separated, in TIFF format).
					</li>
					<li>Certificate of authenticity for worldwide industrial use for an unlimited time.</li>
					<li>Advice on fabric type or medium</li>
				</ul>
			</div>
		</section>

		{#if !data.print.isSold && carouselColorwayItems.length > 0}
			<section>
				<h2
					class={[
						'font-cormorant text-black-sheep text-center text-3xl/[64px] font-light',
						'sm:ml-[73px] sm:text-left',
						'md:ml-[137px]',
						// Align with content area, considering potential thumbnail strip width
						'lg:ml-[calc(var(--thumbnail-strip-width,98px)_+_var(--gap-lg,31px)_+_var(--page-px-lg,40px))]',
						'xl:ml-[calc(var(--thumbnail-strip-width,98px)_+_var(--gap-xl,58px)_+_var(--page-px-xl,64px))]',
						'2xl:ml-[calc(var(--thumbnail-strip-width,98px)_+_var(--gap-2xl,87px)_+_var(--page-px-2xl,80px))]'
					]}
					style="--thumbnail-strip-width: 98px; --gap-lg: 31px; --gap-xl: 58px; --gap-2xl: 87px; --page-px-lg: 40px; --page-px-xl: 64px; --page-px-2xl: 80px;"
				>
					Colorways
				</h2>
				<Carousel items={carouselColorwayItems} />
			</section>
		{/if}
	</div>
</div>

<section class={['bg-enoki pt-8 pb-16', 'lg:pb-20']}>
	<div class="container mx-auto">
		<h2
			class={[
				'font-cormorant text-black-sheep px-4 text-center text-3xl/[64px] font-light',
				'sm:ml-[73px] sm:px-0 sm:text-left',
				'md:ml-[137px]',
				'lg:ml-[calc(var(--thumbnail-strip-width,98px)_+_var(--gap-lg,31px)_+_var(--page-px-lg,40px))]',
				'xl:ml-[calc(var(--thumbnail-strip-width,98px)_+_var(--gap-xl,58px)_+_var(--page-px-xl,64px))]',
				'2xl:ml-[calc(var(--thumbnail-strip-width,98px)_+_var(--gap-2xl,87px)_+_var(--page-px-2xl,80px))]'
			]}
			style="--thumbnail-strip-width: 98px; --gap-lg: 31px; --gap-xl: 58px; --gap-2xl: 87px; --page-px-lg: 40px; --page-px-xl: 64px; --page-px-2xl: 80px;"
		>
			Discover the collection
		</h2>
		<Carousel items={discoverCollectionItems} />
	</div>
</section>
