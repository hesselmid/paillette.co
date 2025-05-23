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
	<div class={['container mx-auto space-y-8', 'lg:space-y-0']}>
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
						'aspect-square w-[358px] rounded-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)]',
						'sm:w-[494px]',
						'xl:w-[510px]',
						'2xl:w-[648px]'
					]}
					draggable="false"
					oncontextmenu={(e) => e.preventDefault()}
				/>
				<div
					class={[
						'mt-8 flex justify-center gap-x-[29px]',
						'lg:mt-0 lg:flex-col lg:gap-x-0 lg:gap-y-[29px]'
					]}
				>
					<button type="button">
						<img
							src="/LolavanPraag_PailletteParade_LPM03_26:04:25.png"
							alt=""
							class="border-dementer-green aspect-square w-[98px] rounded-[10px] border-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)]"
						/>
					</button>
					<button type="button">
						<img
							src="/LolavanPraag_PailletteParade_LPM03_26:04:25.png"
							alt=""
							class="aspect-square w-[98px] rounded-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)]"
						/>
					</button>
				</div>
			</div>

			<div class={['mt-8', 'lg:mt-0']}>
				<h1
					class={[
						'font-apfel-grotezk-brukt text-black-sheep text-5xl/[62px]',
						'lg:text-6xl/[77px]'
					]}
				>
					{data.print.name}
				</h1>
				<div class="flex items-center justify-between">
					<p class="font-evolventa text-black-sheep text-lg/6">
						By {data.print.designer.fullName}
					</p>
					<span class="font-apfel-grotezk text-black-sheep text-2xl/[31px]"
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
							class={[
								'font-evolventa text-black-sheep border-black-sheep flex w-full cursor-not-allowed justify-center rounded-full border bg-[#ececec] py-[19px] text-base/[21px] lowercase shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px]',
								'sm:text-lg/6'
							]}>Sold Out</button
						>
					{:else}
						<button
							type="button"
							class={[
								'font-evolventa text-black-sheep bg-enoki border-black-sheep flex w-full cursor-pointer justify-center rounded-full border py-[19px] text-base/[21px] lowercase shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px]',
								'sm:text-lg/6'
							]}>Add to bag</button
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
									class={[
										'font-evolventa text-black-sheep bg-enoki border-black-sheep flex w-full cursor-pointer justify-center rounded-full border py-[19px] text-base/[21px] lowercase shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px]',
										'sm:text-lg/6'
									]}
								>
									{wishlistActionInProgress ? 'Updating...' : 'Remove from wishlist'}
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
									class={[
										'font-evolventa text-black-sheep bg-enoki border-black-sheep flex w-full cursor-pointer justify-center rounded-full border py-[19px] text-base/[21px] lowercase shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px]',
										'sm:text-lg/6'
									]}
								>
									{wishlistActionInProgress ? 'Updating...' : 'Add to wishlist'}
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
				<ul class="mt-8 list-inside list-disc">
					<li class="font-evolventa text-black-sheep text-base/[21px]">
						Full exclusivety rights to the design, including all color ways
					</li>
					<li class="font-evolventa text-black-sheep text-base/[21px]">
						5-8 colorways of the design
					</li>
					<li class="font-evolventa text-black-sheep text-base/[21px]">
						High-resolution files of repeat (300dpi RGB files, color seperated, in TIFF format).
					</li>
					<li class="font-evolventa text-black-sheep text-base/[21px]">
						Certificate of authenticity for worldwide industrial use for an unlimited time.
					</li>
					<li class="font-evolventa text-black-sheep text-base/[21px]">
						Advice on fabric type or medium
					</li>
				</ul>
			</div>
		</section>

		<section>
			<h2
				class={[
					'font-cormorant text-black-sheep text-center text-3xl/[64px] font-light',
					'sm:ml-[73px] sm:text-left',
					'md:ml-[137px]',
					'lg:ml-[123px]',
					'xl:ml-[158px]',
					'2xl:ml-[173px]'
				]}
			>
				Colorways
			</h2>
			<Carousel items={carouselColorwayItems} />
		</section>
	</div>
</div>

<section class={['bg-enoki pt-8 pb-16', 'lg:pb-20']}>
	<div class="container mx-auto">
		<h2
			class={[
				'font-cormorant text-black-sheep px-4 text-center text-3xl/[64px] font-light',
				'sm:ml-[73px] sm:text-left',
				'md:ml-[137px]',
				'lg:ml-[123px]',
				'xl:ml-[158px]',
				'2xl:ml-[173px]'
			]}
		>
			Discover the collection
		</h2>
		<Carousel items={discoverCollectionItems} />
	</div>
</section>
