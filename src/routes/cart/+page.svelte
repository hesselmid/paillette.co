<svelte:head>
	<title>Cart - Paillette</title>
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
			<h1 class="font-cormorant text-black-sheep text-4xl/[44px] font-light">Shopping Bag</h1>

			<hr class={['border-black-sheep mt-9 border-t', 'lg:mt-12']} />

			<div class={['flex items-center gap-x-[59px] py-9', 'lg:pt-[45px] lg:pb-[46px]']}>
				<div
					class="size-[115px] shrink-0 rounded-[10px] bg-[#d9d9d9] shadow-[5px_5px_20px_rgba(0,0,0,0.05)]"
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
		</div>

		<div class={['lg:w-[299px]', 'xl:w-[442px]']}>
			<h2 class="font-cormorant text-black-sheep text-4xl/[44px] font-light">Order summary</h2>

			<button
				type="submit"
				class={[
					'font-evolventa bg-enoki border-black-sheep text-black-sheep mt-9 w-full cursor-pointer rounded-full border py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:py-[19px]',
					'sm:text-2xl/[32px]',
					'md:mt-[46px]',
					'lg:mt-12'
				]}>Go to checkout</button
			>
		</div>
	</div>
</div>
