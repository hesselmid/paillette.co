<!-- src/routes/shop/[printId]/+page.svelte -->
<script lang="ts">
	let { data } = $props();

	const DEFAULT_COLORWAY_IMAGE_URL = 'https://placehold.co/600x400.png?text=Print+Image';

	// Use the first colorway image as the main image, or default if none exist
	let mainImageUrl = $derived(data.colorways?.[0]?.imageUrl ?? DEFAULT_COLORWAY_IMAGE_URL);
</script>

<svelte:head>
	<title>{data.print.name} - Shop - Paillette.co</title>
	{#if data.print.description}
		<meta name="description" content={data.print.description.substring(0, 150)} />
	{/if}
</svelte:head>

<article>
	<a href="/shop">← Back to Shop</a>

	<h1>{data.print.name}</h1>
	<p>Designed by: {data.print.designer.fullName}</p>

	<div>
		<!-- Main Image Area -->
		<img
			src={mainImageUrl}
			alt="Main view of {data.print.name}"
			style="max-width: 600px; width: 100%; height: auto; aspect-ratio: 3/2; object-fit: cover; border: 1px solid #ccc;"
		/>
	</div>

	<div>
		<!-- Colorway Selector/Thumbnails -->
		<h2>Colorways</h2>
		{#if data.colorways.length > 0}
			<div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 1rem;">
				{#each data.colorways as colorway (colorway.id)}
					<button
						onclick={() => (mainImageUrl = colorway.imageUrl ?? DEFAULT_COLORWAY_IMAGE_URL)}
						style="border: none; padding: 0; background: none; cursor: pointer;"
						title="View {colorway.name}"
					>
						<img
							src={colorway.imageUrl ?? DEFAULT_COLORWAY_IMAGE_URL.replace('600x400', '100x67')}
							alt={colorway.name}
							style="width: 100px; height: auto; aspect-ratio: 3/2; object-fit: cover; border: {mainImageUrl ===
							(colorway.imageUrl ?? DEFAULT_COLORWAY_IMAGE_URL)
								? '2px solid blue'
								: '1px solid #ccc'};"
						/>
						<p style="font-size: 0.8em; text-align: center; margin-top: 4px;">{colorway.name}</p>
					</button>
				{/each}
			</div>
		{:else}
			<p>No specific colorways listed for this print.</p>
		{/if}
	</div>

	<div>
		<!-- Price and Description -->
		<h2>Details</h2>
		<p><strong>Price:</strong> {data.print.priceFormatted}</p>
		{#if data.print.description}
			<p><strong>Description:</strong></p>
			<div>{data.print.description}</div>
			<!-- Use {@html data.print.description} ONLY if the description contains trusted HTML -->
		{:else}
			<p>No description available.</p>
		{/if}
		{#if data.print.isSold}
			<p style="color: red; font-weight: bold;">This print has been sold.</p>
		{:else}
			<!-- Add to Cart Button Placeholder -->
			<button style="margin-top: 1rem;">Add to Cart</button>
			<!-- Implement cart logic later -->
		{/if}
	</div>

	<!-- Potential future sections: Categories, Colors used, etc. -->
</article>
