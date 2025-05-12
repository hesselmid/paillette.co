<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let { data } = $props();

	const DEFAULT_COLORWAY_IMAGE_URL = 'https://placehold.co/300x200.png?text=Print+Image';

	let formElement: HTMLFormElement | undefined = $state();
	let isDesktop: boolean = $state(false);
	const DESKTOP_BREAKPOINT = '(min-width: 1024px)';

	onMount(() => {
		const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);

		const updateDesktopStatus = (event: MediaQueryListEvent | MediaQueryList) => {
			isDesktop = event.matches;
		};

		updateDesktopStatus(mediaQuery); // Initial check
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
			const params = new URLSearchParams(formData as any); // Cast needed for FormData to URLSearchParams

			// Always reset to page 1 when filters change on desktop via immediate update
			params.set('page', '1');

			// Optional: Clean up URL by removing empty parameters (if any checkbox group becomes unchecked)
			// This is handled implicitly if unchecked boxes are not part of FormData.
			// But if you had other empty inputs, you might want this:
			// for (const [key, value] of Array.from(params.entries())) {
			//   if (value === '') {
			//     params.delete(key);
			//   }
			// }

			goto(`/shop?${params.toString()}`, {
				invalidateAll: true, // Crucial: re-runs the load function
				noScroll: true, // Prevents page from scrolling to the top on filter change
				keepFocus: true, // Helps maintain focus on the element that triggered the change
				replaceState: false // Creates a new history entry for each filter change. Set to true if you prefer not to.
			});
		}
		// On mobile, this function is called, but the actual filtering happens
		// when the "Apply Filters" button is clicked (standard form submission).
	}
</script>

<svelte:head>
	<title>Shop - Paillette.co</title>
</svelte:head>

<h1>Shop</h1>

<aside>
	<h2>Filters</h2>
	<!--
    The form element is used for both mobile submission and for desktop's FormData collection.
    On mobile, the "Apply Filters" button (type="submit") will trigger a GET request.
    On desktop, handleFilterChange uses FormData from this form and navigates with goto().
  -->
	<form bind:this={formElement} method="GET" action="/shop">
		<!--
      This hidden input ensures that when the form is submitted on mobile (or if JS fails),
      the page resets to 1. For desktop, handleFilterChange also explicitly sets page=1.
    -->
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
	{#if data.colorways.length > 0}
		<p>Showing {data.colorways.length} of {data.totalColorways} colorways.</p>
		<div
			style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;"
		>
			{#each data.colorways as colorway (colorway.id)}
				<article>
					<a href={`/shop/${colorway.printId}`}>
						<img
							src={colorway.imageUrl || DEFAULT_COLORWAY_IMAGE_URL}
							alt={`Print: ${colorway.name || 'Unnamed Print'}`}
							style="width: 100%; height: auto; aspect-ratio: 3/2; object-fit: cover;"
						/>
						<p>{colorway.name || 'Unnamed Colorway'}</p>
					</a>
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
