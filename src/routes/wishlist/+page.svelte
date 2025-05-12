<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	let { data, form } = $props();

	const DEFAULT_WISHLIST_IMAGE_URL = 'https://placehold.co/200x133.png?text=Print+Image';
	let actionInProgressForId: number | null = $state(null);
</script>

<svelte:head>
	<title>My Wishlist - Paillette.co</title>
</svelte:head>

<h1>My Wishlist</h1>

{#if form?.message}
	<p style="color: red;">{form.message}</p>
{/if}

{#if data.wishlistItems && data.wishlistItems.length > 0}
	<div
		style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem;"
	>
		{#each data.wishlistItems as item (item.printId)}
			<article style="border: 1px solid #eee; padding: 1rem; opacity: {item.isSold ? 0.6 : 1};">
				<a href={`/shop/${item.printId}`}>
					<img
						src={item.imageUrl ?? DEFAULT_WISHLIST_IMAGE_URL}
						alt={`Preview of ${item.printName}`}
						style="width: 100%; height: auto; aspect-ratio: 3/2; object-fit: cover; margin-bottom: 0.5rem;"
					/>
					<h2>{item.printName}</h2>
				</a>
				<p>Designer: {item.designerFullName}</p>
				<p>Price: {item.priceFormatted}</p>
				{#if item.isSold}
					<p style="color: red; font-weight: bold;">(Sold)</p>
				{/if}

				<form
					method="POST"
					action="?/remove"
					use:enhance={() => {
						actionInProgressForId = item.printId;
						return async ({ result }) => {
							if (result.type === 'success') {
								await invalidateAll();
							} else if (result.type === 'failure') {
								console.error('Failed to remove:', result.data?.message);
								alert(result.data?.message || 'Could not remove item.');
							}
							actionInProgressForId = null;
						};
					}}
				>
					<input type="hidden" name="printId" value={item.printId} />
					<button type="submit" disabled={actionInProgressForId === item.printId}>
						{#if actionInProgressForId === item.printId}
							Removing...
						{:else}
							Remove from Wishlist
						{/if}
					</button>
				</form>
			</article>
		{/each}
	</div>
{:else}
	<p>Your wishlist is currently empty.</p>
	<p><a href="/shop">Browse the shop</a> to find prints you love!</p>
{/if}
