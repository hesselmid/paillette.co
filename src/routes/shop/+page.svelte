<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	let { data } = $props();

	const DEFAULT_COLORWAY_IMAGE_URL = 'https://placehold.co/300x200.png?text=Print+Image';

	let formElement: HTMLFormElement | undefined = $state();
	let isDesktop: boolean = $state(false);
	const DESKTOP_BREAKPOINT = '(min-width: 1024px)';

	let wishlistedPrintIds = $state(new Set(data.wishlistedPrintIds || []));
	let wishlistActionInProgressForId: number | null = $state(null);

	$effect(() => {
		wishlistedPrintIds = new Set(data.wishlistedPrintIds || []);
	});

	onMount(() => {
		const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);

		const updateDesktopStatus = (event: MediaQueryListEvent | MediaQueryList) => {
			isDesktop = event.matches;
		};

		updateDesktopStatus(mediaQuery);
		mediaQuery.addEventListener('change', updateDesktopStatus);

		return () => {
			mediaQuery.removeEventListener('change', updateDesktopStatus);
		};
	});

	function getPaginationUrl(targetPage: number): string {
		const newSearchParams = new URLSearchParams(page.url.searchParams);
		newSearchParams.set('page', String(targetPage));
		return `/shop?${newSearchParams.toString()}`;
	}

	function isSelected(filterType: 'colors' | 'categories' | 'designers', id: number): boolean {
		if (!data.filters) return false;
		switch (filterType) {
			case 'colors':
				return data.filters.selectedColorIds.includes(id);
			case 'categories':
				return data.filters.selectedCategoryIds.includes(id);
			case 'designers':
				return data.filters.selectedDesignerIds.includes(id);
			default:
				return false;
		}
	}

	function handleFilterChange() {
		if (isDesktop && formElement) {
			const formData = new FormData(formElement);
			const formDataEntries = Array.from(formData.entries()) as [string, string][];
			const params = new URLSearchParams(formDataEntries);

			params.set('page', '1');

			goto(`/shop?${params.toString()}`, {
				invalidateAll: true,
				noScroll: true,
				keepFocus: true,
				replaceState: false
			});
		}
	}

	function handleWishlistUpdate(printId: number, added: boolean) {
		if (added) {
			wishlistedPrintIds.add(printId);
		} else {
			wishlistedPrintIds.delete(printId);
		}
		wishlistedPrintIds = new Set(wishlistedPrintIds);
		wishlistActionInProgressForId = null;
	}
</script>

<svelte:head>
	<title>Shop - Paillette.co</title>
</svelte:head>

<div class={['bg-white py-[60px]', 'lg:py-20']}>
	<div class="container mx-auto">
		<h1
			class={[
				'font-apfel-grotezk-brukt text-black-sheep text-center text-4xl/[46px]',
				'sm:text-5xl/[62px]',
				'lg:text-6xl/[77px]'
			]}
		>
			Available designs:
		</h1>

		<div
			class={[
				'px-4',
				'md:px-[33px]',
				'lg:flex lg:gap-x-[26px] lg:px-10',
				'xl:gap-x-[78px] xl:px-16',
				'2xl:gap-x-[136px] 2xl:px-[70px]'
			]}
		>
			<aside class={['lg:w-[218px]']}>
				<div class="flex gap-x-[18px]">
					<h2 class="font-evolventa text-black-sheep text-lg/[24px]">Filter</h2>
					<p class="font-evolventa text-lg/[24px] text-[#b1b2ae]">{data.colorways.length} items.</p>
				</div>

				<form
					bind:this={formElement}
					method="GET"
					action="/shop"
					class={['hidden', 'lg:mt-8 lg:block']}
				>
					<input type="hidden" name="page" value="1" />

					<section>
						<h3 class="font-evolventa text-black-sheep text-lg/[24px] lowercase">Colors</h3>
						{#if data.filters.allColors.length > 0}
							<ul>
								{#each data.filters.allColors as color (color.id)}
									<li class="flex items-center gap-x-[15px]">
										<input
											id={`color-${color.id}`}
											type="checkbox"
											name="colors"
											value={color.id}
											checked={isSelected('colors', color.id)}
											onchange={handleFilterChange}
											class="border-black-sheep checked:bg-black-sheep size-[15px] rounded-full checked:[background-image:none]"
										/>
										<label
											for={`color-${color.id}`}
											class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
										>
											{color.name.toLowerCase()}
										</label>
									</li>
								{/each}
							</ul>
						{:else}
							<p>No colors available to filter by.</p>
						{/if}
					</section>

					<section>
						<h3 class="font-evolventa text-black-sheep text-lg/[24px] lowercase">Categories</h3>
						{#if data.filters.allCategories.length > 0}
							<ul>
								{#each data.filters.allCategories as category (category.id)}
									<li class="flex items-center gap-x-[15px]">
										<input
											id={`category-${category.id}`}
											type="checkbox"
											name="categories"
											value={category.id}
											checked={isSelected('categories', category.id)}
											onchange={handleFilterChange}
											class="border-black-sheep checked:bg-black-sheep size-[15px] rounded-full checked:[background-image:none]"
										/>
										<label
											for={`category-${category.id}`}
											class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
										>
											{category.name.toLowerCase()}
										</label>
									</li>
								{/each}
							</ul>
						{:else}
							<p>No categories available to filter by.</p>
						{/if}
					</section>

					<section>
						<h3 class="font-evolventa text-black-sheep text-lg/[24px] lowercase">Designers</h3>
						{#if data.filters.allDesigners.length > 0}
							<ul>
								{#each data.filters.allDesigners as designer (designer.id)}
									<li class="flex items-center gap-x-[15px]">
										<input
											id={`designer-${designer.id}`}
											type="checkbox"
											name="designers"
											value={designer.id}
											checked={isSelected('designers', designer.id)}
											onchange={handleFilterChange}
											class="border-black-sheep checked:bg-black-sheep size-[15px] rounded-full checked:[background-image:none]"
										/>
										<label
											for={`designer-${designer.id}`}
											class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
										>
											{designer.name.toLowerCase()}
										</label>
									</li>
								{/each}
							</ul>
						{:else}
							<p>No designers available to filter by.</p>
						{/if}
					</section>

					{#if !isDesktop}
						<a href="/shop">Clear all</a>

						<button type="submit">Apply Filters</button>
					{/if}
				</form>
			</aside>

			<ul
				class={[
					'mt-9 grid grid-cols-2 gap-x-[22px] gap-y-4',
					'sm:grid-cols-3 sm:gap-y-4',
					'md:grid-cols-4 md:gap-[10px]',
					'lg:flex-1 lg:grid-cols-3 lg:gap-5'
				]}
			>
				{#each data.colorways as colorway (colorway.id)}
					<li>
						<article class="relative" oncontextmenu={(e) => e.preventDefault()}>
							<a href={`/shop/${colorway.printId}`} aria-label={colorway.name}>
								<img
									src={colorway.imageUrl || DEFAULT_COLORWAY_IMAGE_URL}
									alt={colorway.name}
									class="aspect-square w-full rounded-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)]"
									draggable="false"
								/>
								<div class="absolute right-[10px] bottom-[10px]">
									{#if wishlistedPrintIds.has(colorway.printId)}
										<form
											method="POST"
											action="?/removeFromWishlist"
											use:enhance={() => {
												wishlistActionInProgressForId = colorway.printId;
												return async ({ result }) => {
													const currentActionId = wishlistActionInProgressForId;
													wishlistActionInProgressForId = null;

													if (result.type === 'success') {
														if (currentActionId === colorway.printId) {
															handleWishlistUpdate(colorway.printId, false);
														}
													} else if (result.type === 'failure') {
														console.error('Failed to remove from wishlist:', result.data?.message);
														alert(result.data?.message || 'Failed to remove');
													}
												};
											}}
											class="flex"
										>
											<input type="hidden" name="printId" value={colorway.printId} />
											<button
												type="submit"
												disabled={wishlistActionInProgressForId === colorway.printId}
												class="cursor-pointer"
												onclick={(e) => e.stopPropagation()}
												aria-label="Remove from wishlist"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="currentColor"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-6"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
													/>
												</svg>
											</button>
										</form>
									{:else}
										<form
											method="POST"
											action="?/addToWishlist"
											use:enhance={() => {
												wishlistActionInProgressForId = colorway.printId;
												return async ({ result }) => {
													const currentActionId = wishlistActionInProgressForId;
													wishlistActionInProgressForId = null;

													if (result.type === 'success') {
														if (currentActionId === colorway.printId) {
															handleWishlistUpdate(colorway.printId, true);
														}
													} else if (result.type === 'failure') {
														console.error('Failed to add to wishlist:', result.data?.message);
														alert(result.data?.message || 'Failed to add');
													}
												};
											}}
											class="flex"
										>
											<input type="hidden" name="printId" value={colorway.printId} />
											<button
												type="submit"
												disabled={wishlistActionInProgressForId === colorway.printId}
												class="cursor-pointer"
												onclick={(e) => e.stopPropagation()}
												aria-label="Add to wishlist"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="size-6"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
													/>
												</svg>
											</button>
										</form>
									{/if}
								</div>
							</a>
						</article>
					</li>
				{/each}
			</ul>
		</div>

		<nav aria-label="Pagination" class="mt-9">
			{#if data.currentPage > 1}
				<a href={getPaginationUrl(data.currentPage - 1)} rel="prev">Previous</a>
			{/if}

			{#if data.currentPage < data.totalPages}
				<a href={getPaginationUrl(data.currentPage + 1)} rel="next">Next</a>
			{/if}
		</nav>
	</div>
</div>
