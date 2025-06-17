<svelte:head>
	<title>Cart - Paillette</title>
</svelte:head>

<div class="bg-white pt-9 pb-16">
	<div class="container mx-auto px-4">
		<h1 class="font-cormorant text-black-sheep text-4xl/[44px] font-light">Shopping Bag</h1>

		<hr class="border-black-sheep mt-9 border-t" />

		<div class="flex gap-x-[59px] py-9">
			<div
				class="size-[115px] rounded-[10px] bg-[#d9d9d9] shadow-[5px_5px_20px_rgba(0,0,0,0.05)]"
			></div>

			<div>
				<div class="font-evolventa text-black-sheep text-xl/[27px]">Print name</div>
				<p class="font-evolventa text-black-sheep mt-1.5 text-xs/[16px]">
					You have removed this item from your shopping bag
				</p>
				<button type="button" class="font-evolventa text-black-sheep mt-3 text-xs/[16px]"
					>Undo</button
				>
			</div>
		</div>

		<hr class="border-black-sheep border-t" />

		<button
			type="submit"
			class="font-evolventa bg-enoki border-black-sheep text-black-sheep mt-9 w-full cursor-pointer rounded-full border py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:py-[19px]"
			>Go to checkout</button
		>
	</div>
</div>
