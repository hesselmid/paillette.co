<script lang="ts">
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data, form } = $props();

	let subtotal = $derived(
		data.cartItems.reduce((total, item) => total + item.printPriceCents, 0) / 100
	);
</script>

<svelte:head>
	<title>Shopping Bag - Paillette</title>
</svelte:head>

<div class={['bg-white pt-9 pb-16', 'lg:pt-12 lg:pb-20']}>
	<div
		class={[
			'container mx-auto flex flex-col gap-y-9 px-4',
			'md:px-20',
			'lg:flex-row lg:gap-x-[78px] lg:gap-y-0 lg:pr-[67px] lg:pl-[66px]',
			'xl:gap-x-[142px] xl:pr-[68px] xl:pl-[70px]',
			'2xl:px-[197px]'
		]}
	>
		<div class={['lg:w-[514px]', 'xl:w-[558px]']}>
			<h1 class="font-cormorant text-black-sheep text-4xl/[44px] font-light">
				Shopping Bag ({data.cartItems.length})
			</h1>

			<hr class={['border-black-sheep mt-9 border-t', 'lg:mt-12']} />

			{#if form?.removedItem}
				<div class="flex items-center gap-x-[59px] py-9" transition:slide={{ duration: 300 }}>
					<div
						class="size-[115px] shrink-0 rounded-[10px] bg-[#d9d9d9] shadow-[5px_5px_20px_rgba(0,0,0,0.05)]"
					></div>

					<div>
						<div class="font-evolventa text-black-sheep text-xl/[27px]">
							{form.removedItem.printName}
						</div>
						<p class="font-evolventa text-black-sheep mt-1.5 text-xs/[16px]">
							You have removed this item from your shopping bag
						</p>
						<form method="POST" action="?/undoRemove" use:enhance>
							<input type="hidden" name="printId" value={form.removedItem.printId} />
							<button
								type="submit"
								class={[
									'font-evolventa text-black-sheep mt-3 text-xs/[16px] underline',
									'sm:mt-1.5'
								]}>Undo</button
							>
						</form>
					</div>
				</div>
				<hr class="border-black-sheep border-t" />
			{/if}

			{#if data.cartItems.length > 0}
				<div class={['mt-9 flex flex-col gap-y-9', 'lg:mt-12 lg:gap-y-12']}>
					{#each data.cartItems as item (item.printId)}
						<div class="flex items-center gap-x-[63px]" transition:slide|local>
							<a
								href={`/shop/${item.printId}`}
								class="block size-[151px] shrink-0 rounded-[10px] bg-[#d9d9d9] shadow-[5px_5px_20px_rgba(0,0,0,0.05)] sm:size-[200px]"
							>
								{#if item.colorwayImageUrl}
									<img
										src={item.colorwayImageUrl}
										alt={item.printName}
										class="size-full rounded-[10px] object-cover"
									/>
								{/if}
							</a>

							<div>
								<div class="font-evolventa text-black-sheep text-xl/[27px]">
									{item.printName}
								</div>
								<p class="font-evolventa text-black-sheep text-lg/[24px]">
									{item.priceFormatted}
								</p>
								<div class="mt-1.5 flex gap-x-4">
									<form method="POST" action="?/remove" use:enhance>
										<input type="hidden" name="printId" value={item.printId} />
										<button
											type="submit"
											class="font-evolventa text-black-sheep text-xs/[16px] underline"
											>Remove from bag</button
										>
									</form>
									<a
										href={`/wishlist?add=${item.printId}`}
										class="font-evolventa text-black-sheep text-xs/[16px] underline"
										>Add to wishlist</a
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else if !form?.removedItem}
				<p class="font-evolventa text-black-sheep mt-8 text-center">Your shopping bag is empty.</p>
				<a href="/shop" class="font-evolventa text-black-sheep mt-4 block text-center underline"
					>Continue Shopping</a
				>
			{/if}
		</div>

		{#if data.cartItems.length > 0}
			<div class={['lg:w-[299px]', 'xl:w-[442px]']}>
				<h2 class="font-cormorant text-black-sheep text-4xl/[44px] font-light">Order summary</h2>

				<div class={['mt-9 flex items-center justify-between', 'lg:mt-12']}>
					<div class="font-evolventa text-black-sheep text-xl/[27px]">Number of items</div>
					<div class="font-evolventa text-black-sheep text-xl/[27px]">
						{data.cartItems.length}
					</div>
				</div>

				<hr class="border-black-sheep my-[28px] border-t" />

				<div class="flex items-center justify-between">
					<div class="font-evolventa text-black-sheep text-xl/[27px]">Item subtotal</div>
					<div class="font-evolventa text-black-sheep text-xl/[27px]">
						{new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(
							subtotal
						)}
					</div>
				</div>

				<a
					href="/checkout"
					class={[
						'font-evolventa bg-enoki border-black-sheep text-black-sheep mt-9 block w-full cursor-pointer rounded-full border py-[19px] text-center text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:py-[19px]',
						'sm:text-2xl/[32px]',
						'md:mt-[46px]',
						'lg:mt-12'
					]}>Go to checkout</a
				>
			</div>
		{/if}
	</div>
</div>
