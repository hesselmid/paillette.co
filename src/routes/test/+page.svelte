<script lang="ts">
	let filtersOpen = $state(false);
</script>

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
			<div class={['flex items-center gap-x-[18px]', 'lg:hidden']}>
				<button
					type="button"
					onclick={() => (filtersOpen = true)}
					class="font-evolventa bg-enoki text-black-sheep border-black-sheep flex size-16 cursor-pointer items-center justify-center rounded-full border text-lg/[24px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] disabled:cursor-not-allowed"
					><span class="-rotate-90">&lt;</span></button
				>
				<span class="font-evolventa text-black-sheep text-lg/[24px]">Filter</span>
				<span class="font-evolventa text-lg/[24px] text-[#b1b2ae]">6 items</span>
			</div>

			<aside
				class={[
					'fixed inset-0 z-10 bg-white pt-5',
					'lg:static lg:pt-0',
					filtersOpen ? 'block' : 'hidden lg:block'
				]}
			>
				<div
					class={[
						'mx-auto max-w-[358px]',
						'sm:w-[608px] sm:max-w-none',
						'md:w-[704px]',
						'lg:mx-0 lg:w-[218px]'
					]}
				>
					<div class={['flex justify-between', 'lg:hidden']}>
						<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase">Filter</span>
						<button
							type="button"
							aria-label="Close"
							onclick={() => (filtersOpen = false)}
							class="text-black-sheep"
							><svg
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
									d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
						</button>
					</div>

					<div class={['hidden', 'lg:flex lg:gap-x-[18px]']}>
						<h2 class="font-evolventa text-black-sheep text-lg/[24px]">Filter</h2>
						<span class="font-evolventa text-lg/[24px] text-[#b1b2ae]">6 items</span>
					</div>

					<form class="divide-black-sheep border-black-sheep mt-8 divide-y border-t">
						<fieldset class="pl-[18px]">
							<legend class="flex h-14 w-full items-center justify-between">
								<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
									>Category</span
								>
								<span class="font-apfel-grotezk-brukt text-black-sheep -rotate-90 text-3xl/[38px]"
									>&lt;</span
								>
							</legend>
							<div class="space-y-4 pt-1 pb-8">
								{#each { length: 3 }}
									<label class="flex items-center gap-x-[15px]">
										<input
											type="checkbox"
											class="border-black-sheep checked:bg-black-sheep size-[15px] rounded-full checked:[background-image:none]"
										/>
										<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
											>Category 1</span
										>
									</label>
								{/each}
							</div>
						</fieldset>

						<fieldset class="pl-[18px]">
							<legend class="flex h-14 w-full items-center justify-between">
								<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase">Color</span>
								<span class="font-apfel-grotezk-brukt text-black-sheep -rotate-90 text-3xl/[38px]"
									>&lt;</span
								>
							</legend>
							<div class="space-y-4 pt-1 pb-8">
								{#each { length: 3 }}
									<label class="flex items-center gap-x-[15px]">
										<input
											type="checkbox"
											class="border-black-sheep checked:bg-black-sheep size-[15px] rounded-full checked:[background-image:none]"
										/>
										<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
											>Color 1</span
										>
									</label>
								{/each}
							</div>
						</fieldset>

						<fieldset class="pl-[18px]">
							<legend class="flex h-14 w-full items-center justify-between">
								<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
									>Designer</span
								>
								<span class="font-apfel-grotezk-brukt text-black-sheep -rotate-90 text-3xl/[38px]"
									>&lt;</span
								>
							</legend>
							<div class="space-y-4 pt-1 pb-8">
								{#each { length: 3 }}
									<label class="flex items-center gap-x-[15px]">
										<input
											type="checkbox"
											class="border-black-sheep checked:bg-black-sheep size-[15px] rounded-full checked:[background-image:none]"
										/>
										<span class="font-evolventa text-black-sheep text-lg/[24px] lowercase"
											>Designer 1</span
										>
									</label>
								{/each}
							</div>
						</fieldset>

						<div class={['mt-8 flex justify-between', 'lg:hidden']}>
							<button
								type="reset"
								class="font-evolventa border-black-sheep text-black-sheep flex h-16 w-[171px] cursor-pointer items-center justify-center rounded-full border text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]"
								>Clear all</button
							>
							<button
								type="submit"
								class="font-evolventa border-black-sheep text-black-sheep flex h-16 w-[171px] cursor-pointer items-center justify-center rounded-full border text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]"
								>Apply</button
							>
						</div>
					</form>
				</div>
			</aside>

			<section class={['mt-9', 'lg:mt-0 lg:flex-1']}>
				<div class="mt-14 mb-8 flex flex-wrap gap-5">
					{#each { length: 8 }}
						<button
							class="font-evolventa border-black-sheep text-black-sheep flex cursor-pointer rounded-full border px-[37px] py-[19px] text-lg/6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px]"
							>cat 1<svg
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
									d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
						</button>
					{/each}
				</div>

				<ul
					class={['grid grid-cols-2 gap-4', 'sm:grid-cols-3', 'md:grid-cols-4', 'lg:grid-cols-3']}
				>
					{#each { length: 12 }}
						<li>
							<article class="relative">
								<a href="/">
									<img
										src="https://images.unsplash.com/photo-1747629382443-4176ca83b5de?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
										alt=""
										class="aspect-square rounded-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)]"
									/>
								</a>
								<button
									aria-label="Wishlist"
									class="absolute right-[10px] bottom-[10px] cursor-pointer"
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
							</article>
						</li>
					{/each}
				</ul>
			</section>
		</div>

		<nav
			class={[
				'mt-9 flex justify-center gap-x-16',
				'lg:mt-12 lg:gap-x-20',
				'xl:mt-20',
				'2xl:mt-[135px]'
			]}
		>
			<button
				class="font-evolventa bg-enoki text-black-sheep border-black-sheep flex size-16 cursor-pointer items-center justify-center rounded-full border text-lg/[24px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] disabled:cursor-not-allowed"
				>&lt;</button
			>
			<button
				class="font-evolventa bg-enoki text-black-sheep border-black-sheep flex size-16 cursor-pointer items-center justify-center rounded-full border text-lg/[24px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] disabled:cursor-not-allowed"
				>&gt;</button
			>
		</nav>
	</div>
</div>
