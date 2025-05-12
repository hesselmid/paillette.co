<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

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

<h1>Shop</h1>

<aside>
	<h2>Filters</h2>
	<form bind:this={formElement} method="GET" action="/shop">
		<input type="hidden" name="page" value="1" />

		<section>
			<h3>Colors</h3>
			{#if data.filters.allColors.length > 0}
				<ul>
					{#each data.filters.allColors as color (color.id)}
						<li>
							<label>
								<input
									type="checkbox"
									name="colors"
									value={color.id}
									checked={isSelected('colors', color.id)}
									onchange={handleFilterChange}
								/>
								{color.name}
							</label>
						</li>
					{/each}
				</ul>
			{:else}
				<p>No colors available to filter by.</p>
			{/if}
		</section>

		<section>
			<h3>Categories</h3>
			{#if data.filters.allCategories.length > 0}
				<ul>
					{#each data.filters.allCategories as category (category.id)}
						<li>
							<label>
								<input
									type="checkbox"
									name="categories"
									value={category.id}
									checked={isSelected('categories', category.id)}
									onchange={handleFilterChange}
								/>
								{category.name}
							</label>
						</li>
					{/each}
				</ul>
			{:else}
				<p>No categories available to filter by.</p>
			{/if}
		</section>

		<section>
			<h3>Designers</h3>
			{#if data.filters.allDesigners.length > 0}
				<ul>
					{#each data.filters.allDesigners as designer (designer.id)}
						<li>
							<label>
								<input
									type="checkbox"
									name="designers"
									value={designer.id}
									checked={isSelected('designers', designer.id)}
									onchange={handleFilterChange}
								/>
								{designer.name}
							</label>
						</li>
					{/each}
				</ul>
			{:else}
				<p>No designers available to filter by.</p>
			{/if}
		</section>

		{#if !isDesktop}
			<button type="submit">Apply Filters</button>
		{/if}
		<a href="/shop">Clear Filters</a>
	</form>
</aside>

<main>
	{#if form?.message}
		<p style="color: red;">
			{#if form && 'failedPrintId' in form && form.failedPrintId != null}
				Error processing request for print {form.failedPrintId}:
			{:else}
				Notice:
			{/if}
			{form.message}
		</p>
	{/if}

	{#if data.colorways.length > 0}
		<p>Showing {data.colorways.length} of {data.totalColorways} colorways.</p>
		<div
			style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;"
		>
			{#each data.colorways as colorway (colorway.id)}
				<article style="position: relative; border: 1px solid #eee; padding: 1rem;">
					<a href={`/shop/${colorway.printId}`}>
						<img
							src={colorway.imageUrl || DEFAULT_COLORWAY_IMAGE_URL}
							alt={`Print: ${colorway.name || 'Unnamed Print'}`}
							style="width: 100%; height: auto; aspect-ratio: 3/2; object-fit: cover;"
						/>
						<p>{colorway.name || 'Unnamed Colorway'}</p>
					</a>

					<div style="margin-top: 0.5rem;">
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
							>
								<input type="hidden" name="printId" value={colorway.printId} />
								<button type="submit" disabled={wishlistActionInProgressForId === colorway.printId}>
									{#if wishlistActionInProgressForId === colorway.printId}Removing...{:else}❤️
										Remove{/if}
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
							>
								<input type="hidden" name="printId" value={colorway.printId} />
								<button type="submit" disabled={wishlistActionInProgressForId === colorway.printId}>
									{#if wishlistActionInProgressForId === colorway.printId}Adding...{:else}🤍 Add{/if}
								</button>
							</form>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		<nav aria-label="Pagination">
			{#if data.currentPage > 1}
				<a href={getPaginationUrl(data.currentPage - 1)} rel="prev">Previous</a>
			{/if}

			<span>Page {data.currentPage} of {data.totalPages}</span>

			{#if data.currentPage < data.totalPages}
				<a href={getPaginationUrl(data.currentPage + 1)} rel="next">Next</a>
			{/if}
		</nav>
	{:else}
		<p>No colorways found matching your criteria.</p>
	{/if}
</main>
