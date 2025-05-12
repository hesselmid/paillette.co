<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	const DEFAULT_COLORWAY_IMAGE_URL = 'https://placehold.co/600x400.png?text=Print+Image';

	let mainImageUrl = $derived(data.colorways?.[0]?.imageUrl ?? DEFAULT_COLORWAY_IMAGE_URL);

	let isInWishlist = $state(data.isInWishlist);
	let wishlistActionInProgress = $state(false);

	$effect(() => {
		isInWishlist = data.isInWishlist;
	});
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
		<img
			src={mainImageUrl}
			alt="Main view of {data.print.name}"
			style="max-width: 600px; width: 100%; height: auto; aspect-ratio: 3/2; object-fit: cover; border: 1px solid #ccc;"
		/>
	</div>

	<div>
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
		<h2>Details</h2>
		<p><strong>Price:</strong> {data.print.priceFormatted}</p>
		{#if data.print.description}
			<p><strong>Description:</strong></p>
			<div>{data.print.description}</div>
		{:else}
			<p>No description available.</p>
		{/if}

		{#if data.print.isSold}
			<p style="color: red; font-weight: bold;">This print has been sold.</p>
		{:else}
			<button style="margin-top: 1rem;">Add to Cart</button>

			<div style="display: inline-block; margin-left: 10px;">
				{#if isInWishlist}
					<form
						method="POST"
						action="?/removeFromWishlist"
						use:enhance={() => {
							wishlistActionInProgress = true;
							return async ({ result }) => {
								wishlistActionInProgress = false;
								if (result.type === 'success' || result.type === 'redirect') {
									isInWishlist = false;
								} else if (result.type === 'failure') {
									console.error('Failed to remove from wishlist:', result.data?.message);
									alert(result.data?.message || 'Failed to remove item.');
								}
							};
						}}
					>
						<button type="submit" disabled={wishlistActionInProgress}>
							{#if wishlistActionInProgress}Removing...{:else}❤️ Remove from Wishlist{/if}
						</button>
					</form>
				{:else}
					<form
						method="POST"
						action="?/addToWishlist"
						use:enhance={() => {
							wishlistActionInProgress = true;
							return async ({ result }) => {
								wishlistActionInProgress = false;
								if (result.type === 'success' || result.type === 'redirect') {
									isInWishlist = true;
								} else if (result.type === 'failure') {
									console.error('Failed to add to wishlist:', result.data?.message);
									alert(result.data?.message || 'Failed to add item.');
								}
							};
						}}
					>
						<button type="submit" disabled={wishlistActionInProgress}>
							{#if wishlistActionInProgress}Adding...{:else}🤍 Add to Wishlist{/if}
						</button>
					</form>
				{/if}
			</div>
			{#if form?.message}
				<p style="color: red; margin-top: 0.5rem;">{form.message}</p>
			{/if}
		{/if}
	</div>
</article>
