<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Account - Paillette.co</title>
</svelte:head>

<div class={['bg-white py-16', 'lg:py-[20]']}>
	<div class="container mx-auto">
		<h1 class={['font-apfel-grotezk-brukt text-black-sheep text-center text-5xl/[62px]']}>
			Hi, {data.currentUser.firstName}
		</h1>

		<div
			class={[
				'mt-16 flex flex-col items-center gap-[18px]',
				'lg:mt-20 lg:flex-row lg:flex-wrap lg:justify-center'
			]}
		>
			<a
				href="/shop"
				class={[
					'flex h-[279px] w-[308px] flex-col items-center gap-y-9 rounded-[10px] border border-[#3d3bf3] bg-[#edf6fc] px-[28px] pt-[60px]',
					'sm:h-[337px] sm:w-[372px] sm:gap-y-10 sm:pt-[77px]',
					'md:h-[405px] md:w-[447px] md:pt-[111px]',
					'lg:h-[279px] lg:w-[308px] lg:gap-y-9 lg:pt-[60px]',
					'xl:h-[337px] xl:w-[372px] xl:gap-y-10 xl:pt-[77px]',
					'2xl:h-[405px] 2xl:w-[447px] 2xl:pt-[111px]'
				]}
			>
				<span class={['font-cormorant text-black-sheep text-4xl/[44px] font-light']}
					>The Collection</span
				>
				<hr class="w-full border-t border-[#3d3bf3]" />
				<p
					class={[
						'font-evolventa text-black-sheep text-center text-lg/[24px]',
						'xl:text-xl/[27px]'
					]}
				>
					Browse our curated collection of exclusive, ready-to-use print designs.
				</p>
			</a>
			<a
				href="/wishlist"
				class={[
					'bg-enoki border-dementer-green flex h-[279px] w-[308px] flex-col items-center gap-y-9 rounded-[10px] border px-[28px] pt-[60px]',
					'sm:h-[337px] sm:w-[372px] sm:pt-[77px]',
					'md:h-[405px] md:w-[447px] md:pt-[111px]',
					'lg:h-[279px] lg:w-[308px] lg:pt-[60px]',
					'xl:h-[337px] xl:w-[372px] xl:pt-[77px]',
					'2xl:h-[405px] 2xl:w-[447px] 2xl:pt-[111px]'
				]}
			>
				<span class={['font-cormorant text-black-sheep text-4xl/[44px] font-light']}>Wish List</span
				>
				<hr class="border-dementer-green w-full border-t" />
				<p class={['font-evolventa text-black-sheep text-center text-lg/[24px]']}>
					Add your favorite items to keep track of their availability and purchase later.
				</p>
			</a>
			<a
				href="/account/orders"
				class={[
					'bg-enoki border-dementer-green flex h-[279px] w-[308px] flex-col items-center gap-y-9 rounded-[10px] border px-[28px] pt-[60px]',
					'sm:h-[337px] sm:w-[372px] sm:pt-[77px]',
					'md:h-[405px] md:w-[447px] md:pt-[111px]',
					'lg:h-[279px] lg:w-[308px] lg:pt-[60px]',
					'xl:h-[337px] xl:w-[372px] xl:pt-[77px]',
					'2xl:h-[405px] 2xl:w-[447px] 2xl:pt-[111px]'
				]}
			>
				<span class={['font-cormorant text-black-sheep text-4xl/[44px] font-light']}>My Orders</span
				>
				<hr class="border-dementer-green w-full border-t" />
				<p class={['font-evolventa text-black-sheep text-center text-lg/[24px]']}>
					See what you previously ordered.
				</p>
			</a>
			<a
				href="/account/profile"
				class={[
					'bg-enoki border-dementer-green flex h-[279px] w-[308px] flex-col items-center gap-y-9 rounded-[10px] border px-[28px] pt-[60px]',
					'sm:h-[337px] sm:w-[372px] sm:pt-[77px]',
					'md:h-[405px] md:w-[447px] md:pt-[111px]',
					'lg:h-[279px] lg:w-[308px] lg:pt-[60px]',
					'xl:h-[337px] xl:w-[372px] xl:pt-[77px]',
					'2xl:h-[405px] 2xl:w-[447px] 2xl:pt-[111px]'
				]}
			>
				<span class={['font-cormorant text-black-sheep text-4xl/[44px] font-light']}
					>Account Details</span
				>
				<hr class="border-dementer-green w-full border-t" />
				<p class={['font-evolventa text-black-sheep text-center text-lg/[24px]']}>
					View or change your sign-in information.
				</p>
			</a>
		</div>

		<form method="POST" action="/logout" class={['mt-9 flex justify-center', 'lg:mt-10']}>
			<button
				type="submit"
				class="border-black-sheep font-apfel-grotezk-brukt text-black-sheep border-b pb-1 text-3xl/[38px]"
				>Sign Out</button
			>
		</form>
	</div>
</div>
