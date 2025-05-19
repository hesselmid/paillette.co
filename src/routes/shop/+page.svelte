<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	// Added invalidateAll back
	import { goto, invalidateAll } from '$app/navigation';
	import { enhance } from '$app/forms';

	type FilterItem = { id: number; name: string };
	type SelectedFilterItem = {
		type: 'colors' | 'categories' | 'designers';
		id: number;
		name: string;
	};

	interface Props {
		data: {
			colorways: Array<{
				id: number;
				name: string;
				imageUrl: string | null;
				printId: number;
			}>;
			currentPage: number;
			totalPages: number;
			totalColorways: number;
			wishlistedPrintIds: number[];
			filters: {
				allColors: FilterItem[];
				allCategories: FilterItem[];
				allDesigners: FilterItem[];
				selectedColorIds: number[];
				selectedCategoryIds: number[];
				selectedDesignerIds: number[];
			};
		};
		form?: {
			message?: string;
			failedPrintId?: number | string | null;
			success?: boolean;
			added?: boolean;
			removed?: boolean;
			printId?: number;
		};
	}

	let { data, form }: Props = $props();

	const DEFAULT_COLORWAY_IMAGE_URL = 'https://placehold.co/300x200.png?text=Print+Image';

	let formElement: HTMLFormElement | undefined = $state();
	let isDesktop: boolean = $state(false);
	const DESKTOP_BREAKPOINT = '(min-width: 1024px)';

	let filtersOpen = $state(false);
	let filterSectionOpen = $state<{ colors: boolean; categories: boolean; designers: boolean }>({
		colors: true,
		categories: true,
		designers: true
	});

	let wishlistedPrintIds = $derived(new Set(data.wishlistedPrintIds || []));
	let wishlistActionInProgressForId: number | null = $state(null);

	onMount(() => {
		const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);
		const updateDesktopStatus = (event: MediaQueryListEvent | MediaQueryList) => {
			isDesktop = event.matches;
			if (isDesktop && filtersOpen) {
				filtersOpen = false;
			}
		};
		updateDesktopStatus(mediaQuery);
		mediaQuery.addEventListener('change', updateDesktopStatus);
		return () => mediaQuery.removeEventListener('change', updateDesktopStatus);
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
			const params = new URLSearchParams(Array.from(formData.entries()) as [string, string][]);
			params.set('page', '1');
			goto(`/shop?${params.toString()}`, {
				invalidateAll: true,
				noScroll: true,
				keepFocus: true,
				replaceState: false
			});
		}
	}

	function getRemoveFilterUrl(
		filterType: 'colors' | 'categories' | 'designers',
		idToRemove: number
	): string {
		const currentParams = new URLSearchParams(page.url.searchParams);
		const values = currentParams
			.getAll(filterType)
			.filter((val) => parseInt(val, 10) !== idToRemove);

		currentParams.delete(filterType);
		values.forEach((val) => currentParams.append(filterType, val));
		currentParams.set('page', '1');

		return `/shop?${currentParams.toString()}`;
	}

	const selectedFilterItems = $derived(
		(() => {
			const items: SelectedFilterItem[] = [];
			if (data.filters) {
				for (const id of data.filters.selectedColorIds) {
					const item = data.filters.allColors.find((c) => c.id === id);
					if (item) items.push({ type: 'colors', id: item.id, name: item.name });
				}
				for (const id of data.filters.selectedCategoryIds) {
					const item = data.filters.allCategories.find((c) => c.id === id);
					if (item) items.push({ type: 'categories', id: item.id, name: item.name });
				}
				for (const id of data.filters.selectedDesignerIds) {
					const item = data.filters.allDesigners.find((d) => d.id === id);
					if (item) items.push({ type: 'designers', id: item.id, name: item.name });
				}
			}
			return items;
		})()
	);

	function handleWishlistUpdate(printId: number, added: boolean) {
		const newSet = new Set(wishlistedPrintIds);
		if (added) {
			newSet.add(printId);
		} else {
			newSet.delete(printId);
		}
		wishlistedPrintIds = newSet;
		wishlistActionInProgressForId = null;
	}

	$effect(() => {
		if (form?.failedPrintId && form.failedPrintId === wishlistActionInProgressForId) {
			wishlistActionInProgressForId = null;
		}
	});
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
				'mt-12 px-4',
				'md:px-8',
				'lg:flex lg:gap-x-[26px] lg:px-10',
				'xl:gap-x-[78px] xl:px-16',
				'2xl:gap-x-[136px] 2xl:px-[70px]'
			]}
		>
			<!-- Mobile Filter Trigger -->
			<div class={['flex items-center gap-x-[18px]', 'lg:hidden']}>
				<button
					type="button"
					onclick={() => (filtersOpen = true)}
					class="font-evolventa bg-enoki text-black-sheep border-black-sheep flex size-16 cursor-pointer items-center justify-center rounded-full border text-lg/[24px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] disabled:cursor-not-allowed"
					aria-label="Open filters"
					aria-controls="filter-sidebar"
					aria-expanded={filtersOpen}
				>
					<span class="-rotate-90">&lt;</span>
				</button>
				<span class="font-evolventa text-black-sheep text-lg/[24px]">Filter</span>
				<span class="font-evolventa text-lg/[24px] text-[#b1b2ae]">{data.totalColorways} items</span
				>
			</div>

			<!-- Filter Sidebar -->
			<aside
				id="filter-sidebar"
				class={[
					'fixed inset-0 z-10 overflow-y-auto bg-white pt-5 transition-transform duration-300 ease-in-out',
					'lg:static lg:block lg:w-[218px] lg:transform-none lg:overflow-y-visible lg:pt-0',
					filtersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
				]}
			>
				<div
					class={[
						'mx-auto max-w-[358px]',
						'sm:w-[calc(100%-4rem)] sm:max-w-none',
						'md:w-[calc(100%-4rem)]',
						'lg:mx-0 lg:w-full'
					]}
				>
					<div class={['flex justify-between px-4 sm:px-0', 'lg:hidden']}>
						<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase">Filter</span>
						<button
							type="button"
							aria-label="Close filters"
							onclick={() => (filtersOpen = false)}
							class="text-black-sheep"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="size-6"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
						</button>
					</div>

					<div class={['hidden px-4 sm:px-0', 'lg:flex lg:gap-x-[18px]']}>
						<h2 class="font-evolventa text-black-sheep text-lg/[24px]">Filter</h2>
						<span class="font-evolventa text-lg/[24px] text-[#b1b2ae]"
							>{data.totalColorways} items</span
						>
					</div>

					<form
						bind:this={formElement}
						method="GET"
						action="/shop"
						class="divide-black-sheep border-black-sheep mt-8 divide-y border-t px-4 sm:px-0"
					>
						<input type="hidden" name="page" value="1" />

						<fieldset class="lg:pl-[18px]">
							<legend class="w-full">
								<button
									type="button"
									onclick={() => (filterSectionOpen.colors = !filterSectionOpen.colors)}
									aria-expanded={filterSectionOpen.colors}
									aria-controls="filter-colors-content"
									class="flex h-14 w-full cursor-pointer items-center justify-between"
								>
									<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
										>Colors</span
									>
									<span
										class={[
											'font-apfel-grotezk-brukt text-black-sheep text-3xl/[38px] transition-transform',
											filterSectionOpen.colors ? 'rotate-90' : '-rotate-90'
										]}
										aria-hidden="true">&lt;</span
									>
								</button>
							</legend>
							{#if filterSectionOpen.colors}
								<div id="filter-colors-content" class="space-y-2 pt-1 pb-8">
									{#if data.filters.allColors.length > 0}
										{#each data.filters.allColors as color (color.id)}
											<label class="flex cursor-pointer items-center gap-x-[15px]">
												<input
													id={`color-${color.id}`}
													type="checkbox"
													name="colors"
													value={color.id}
													checked={isSelected('colors', color.id)}
													onchange={handleFilterChange}
													class="border-black-sheep checked:bg-black-sheep focus:ring-black-sheep size-[15px] appearance-none rounded-full checked:[background-image:none] focus:ring-2 focus:ring-offset-0"
												/>
												<span
													class="font-evolventa text-black-sheep text-base/[21px] lowercase select-none"
												>
													{color.name.toLowerCase()}
												</span>
											</label>
										{/each}
									{:else}
										<p class="font-evolventa text-sm text-gray-500">No colors available.</p>
									{/if}
								</div>
							{/if}
						</fieldset>

						<fieldset class="lg:pl-[18px]">
							<legend class="w-full">
								<button
									type="button"
									onclick={() => (filterSectionOpen.categories = !filterSectionOpen.categories)}
									aria-expanded={filterSectionOpen.categories}
									aria-controls="filter-categories-content"
									class="flex h-14 w-full cursor-pointer items-center justify-between"
								>
									<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
										>Categories</span
									>
									<span
										class={[
											'font-apfel-grotezk-brukt text-black-sheep text-3xl/[38px] transition-transform',
											filterSectionOpen.categories ? 'rotate-90' : '-rotate-90'
										]}
										aria-hidden="true">&lt;</span
									>
								</button>
							</legend>
							{#if filterSectionOpen.categories}
								<div id="filter-categories-content" class="space-y-2 pt-1 pb-8">
									{#if data.filters.allCategories.length > 0}
										{#each data.filters.allCategories as category (category.id)}
											<label class="flex cursor-pointer items-center gap-x-[15px]">
												<input
													id={`category-${category.id}`}
													type="checkbox"
													name="categories"
													value={category.id}
													checked={isSelected('categories', category.id)}
													onchange={handleFilterChange}
													class="border-black-sheep checked:bg-black-sheep focus:ring-black-sheep size-[15px] appearance-none rounded-full checked:[background-image:none] focus:ring-2 focus:ring-offset-0"
												/>
												<span
													class="font-evolventa text-black-sheep text-base/[21px] lowercase select-none"
												>
													{category.name.toLowerCase()}
												</span>
											</label>
										{/each}
									{:else}
										<p class="font-evolventa text-sm text-gray-500">No categories available.</p>
									{/if}
								</div>
							{/if}
						</fieldset>

						<fieldset class="lg:pl-[18px]">
							<legend class="w-full">
								<button
									type="button"
									onclick={() => (filterSectionOpen.designers = !filterSectionOpen.designers)}
									aria-expanded={filterSectionOpen.designers}
									aria-controls="filter-designers-content"
									class="flex h-14 w-full cursor-pointer items-center justify-between"
								>
									<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
										>Designers</span
									>
									<span
										class={[
											'font-apfel-grotezk-brukt text-black-sheep text-3xl/[38px] transition-transform',
											filterSectionOpen.designers ? 'rotate-90' : '-rotate-90'
										]}
										aria-hidden="true">&lt;</span
									>
								</button>
							</legend>
							{#if filterSectionOpen.designers}
								<div id="filter-designers-content" class="space-y-2 pt-1 pb-8">
									{#if data.filters.allDesigners.length > 0}
										{#each data.filters.allDesigners as designer (designer.id)}
											<label class="flex cursor-pointer items-center gap-x-[15px]">
												<input
													id={`designer-${designer.id}`}
													type="checkbox"
													name="designers"
													value={designer.id}
													checked={isSelected('designers', designer.id)}
													onchange={handleFilterChange}
													class="border-black-sheep checked:bg-black-sheep focus:ring-black-sheep size-[15px] appearance-none rounded-full checked:[background-image:none] focus:ring-2 focus:ring-offset-0"
												/>
												<span
													class="font-evolventa text-black-sheep text-base/[21px] lowercase select-none"
												>
													{designer.name.toLowerCase()}
												</span>
											</label>
										{/each}
									{:else}
										<p class="font-evolventa text-sm text-gray-500">No designers available.</p>
									{/if}
								</div>
							{/if}
						</fieldset>

						<div class={['mt-8 flex justify-between gap-x-4 pt-4', 'lg:hidden']}>
							<a
								href="/shop"
								class="font-evolventa border-black-sheep text-black-sheep flex h-12 flex-1 cursor-pointer items-center justify-center rounded-full border text-sm/[18px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[3px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec]"
								>Clear all</a
							>
							<button
								type="submit"
								class="font-evolventa border-black-sheep text-black-sheep flex h-12 flex-1 cursor-pointer items-center justify-center rounded-full border bg-gray-100 text-sm/[18px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[3px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec]"
								onclick={() => (filtersOpen = false)}>Apply</button
							>
						</div>
					</form>
				</div>
			</aside>

			<section class={['mt-9', 'lg:mt-0 lg:flex-1']}>
				{#if selectedFilterItems.length > 0}
					<div class="mb-8 flex flex-wrap gap-3">
						{#each selectedFilterItems as item (item.type + item.id)}
							<a
								href={getRemoveFilterUrl(item.type, item.id)}
								class="font-evolventa border-black-sheep text-black-sheep hover:border-grapefruit hover:text-grapefruit flex items-center gap-x-1.5 rounded-full border px-4 py-2 text-sm/none shadow-[0_2px_2px_rgba(0,0,0,0.15)]"
								aria-label={`Remove filter: ${item.name}`}
								title={`Remove filter: ${item.name}`}
								onclick={(e) => {
									e.preventDefault();
									goto(getRemoveFilterUrl(item.type, item.id), {
										invalidateAll: true,
										noScroll: true,
										keepFocus: true
									});
								}}
							>
								{item.name}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="size-4"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
								</svg>
							</a>
						{/each}
					</div>
				{/if}

				{#if data.colorways.length > 0}
					<ul
						class={['grid grid-cols-2 gap-4', 'sm:grid-cols-3', 'md:grid-cols-4', 'lg:grid-cols-3']}
					>
						{#each data.colorways as colorway (colorway.id)}
							<li>
								<article class="group relative" oncontextmenu={(e) => e.preventDefault()}>
									<a
										href={`/shop/${colorway.printId}`}
										aria-label={`View details for ${colorway.name}`}
									>
										<img
											src={colorway.imageUrl || DEFAULT_COLORWAY_IMAGE_URL}
											alt={`Image of ${colorway.name}`}
											class="aspect-square w-full rounded-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)] transition-shadow group-hover:shadow-lg"
											draggable="false"
											loading="lazy"
											width="300"
											height="300"
										/>
									</a>
									<div class="absolute right-[10px] bottom-[10px]">
										{#if wishlistedPrintIds.has(colorway.printId)}
											<form
												method="POST"
												action="?/removeFromWishlist"
												use:enhance={() => {
													wishlistActionInProgressForId = colorway.printId;
													return async ({ result, update }) => {
														await update({ reset: false });
														if (result.type === 'success') {
															handleWishlistUpdate(colorway.printId, false);
															await invalidateAll(); // Re-fetch data after successful action
														} else if (result.type === 'failure') {
															console.error(
																'Failed to remove from wishlist:',
																form?.message || 'Error details not provided by server.'
															);
														}
														if (wishlistActionInProgressForId === colorway.printId) {
															wishlistActionInProgressForId = null;
														}
													};
												}}
												class="flex"
											>
												<input type="hidden" name="printId" value={colorway.printId} />
												<button
													type="submit"
													disabled={wishlistActionInProgressForId === colorway.printId}
													class="text-black-sheep cursor-pointer"
													onclick={(e) => e.stopPropagation()}
													aria-label="Remove from wishlist"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="currentColor"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														class="pointer-events-none size-6"
														aria-hidden="true"
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
													return async ({ result, update }) => {
														await update({ reset: false });
														if (result.type === 'success') {
															handleWishlistUpdate(colorway.printId, true);
															await invalidateAll(); // Re-fetch data after successful action
														} else if (result.type === 'failure') {
															console.error(
																'Failed to add to wishlist:',
																form?.message || 'Error details not provided by server.'
															);
														}
														if (wishlistActionInProgressForId === colorway.printId) {
															wishlistActionInProgressForId = null;
														}
													};
												}}
												class="flex"
											>
												<input type="hidden" name="printId" value={colorway.printId} />
												<button
													type="submit"
													disabled={wishlistActionInProgressForId === colorway.printId}
													class="text-black-sheep cursor-pointer"
													onclick={(e) => e.stopPropagation()}
													aria-label="Add to wishlist"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														class="pointer-events-none size-6"
														aria-hidden="true"
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
								</article>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="font-evolventa py-10 text-center text-lg text-gray-600">
						No designs match your current filters. Try adjusting your selection or
						<a href="/shop" class="text-black-sheep hover:underline">clear all filters</a>.
					</p>
				{/if}
			</section>
		</div>

		{#if data.totalPages > 1}
			<nav
				aria-label="Pagination"
				class={[
					'mt-9 flex justify-center gap-x-8 sm:gap-x-16',
					'lg:mt-12 lg:gap-x-20',
					'xl:mt-20',
					'2xl:mt-[135px]'
				]}
			>
				{#if data.currentPage > 1}
					<a
						href={getPaginationUrl(data.currentPage - 1)}
						rel="prev"
						class="font-evolventa bg-enoki text-black-sheep border-black-sheep flex size-14 cursor-pointer items-center justify-center rounded-full border text-lg/[24px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[4px] disabled:cursor-not-allowed disabled:opacity-50 sm:size-16"
						>&lt;</a
					>
				{:else}
					<button
						disabled
						class="font-evolventa bg-enoki text-black-sheep border-black-sheep flex size-14 cursor-not-allowed items-center justify-center rounded-full border text-lg/[24px] opacity-50 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:size-16"
						>&lt;</button
					>
				{/if}

				<span class="font-evolventa text-black-sheep self-center text-lg/[24px]">
					Page {data.currentPage} of {data.totalPages}
				</span>

				{#if data.currentPage < data.totalPages}
					<a
						href={getPaginationUrl(data.currentPage + 1)}
						rel="next"
						class="font-evolventa bg-enoki text-black-sheep border-black-sheep flex size-14 cursor-pointer items-center justify-center rounded-full border text-lg/[24px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[4px] disabled:cursor-not-allowed disabled:opacity-50 sm:size-16"
						>&gt;</a
					>
				{:else}
					<button
						disabled
						class="font-evolventa bg-enoki text-black-sheep border-black-sheep flex size-14 cursor-not-allowed items-center justify-center rounded-full border text-lg/[24px] opacity-50 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:size-16"
						>&gt;</button
					>
				{/if}
			</nav>
		{/if}
	</div>
</div>
