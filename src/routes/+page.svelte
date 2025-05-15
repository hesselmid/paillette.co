<svelte:head>
	<title>Paillette.co</title>
</svelte:head>

<section class={['bg-white py-[60px]', 'lg:py-20']}>
	<div class="container mx-auto">
		<div
			class={[
				'flex flex-col items-center gap-y-9',
				'lg:mr-[42px] lg:ml-10 lg:flex-row-reverse lg:justify-between lg:gap-y-0',
				'xl:mr-[68px] xl:ml-[67px]',
				'2xl:mx-20'
			]}
		>
			<enhanced:img
				src="$lib/assets/HomePage_drawing1 1.png?w=358;448;498;616;685;716;896;996;1232;1370"
				alt=""
				sizes="(min-width: 1536px) 685px, (min-width: 1280px) 616px, (min-width: 768px) 498px, (min-width: 640px) 448px, 358px"
				class={[
					'h-auto w-[358px]',
					'sm:w-[448px]',
					'md:w-[498px]',
					'xl:w-[616px]',
					'2xl:w-[685px]'
				]}
			/>
			<h1
				class={[
					'font-cormorant text-black-sheep text-center text-4xl/[44px] font-light',
					'sm:text-5xl/[58px]',
					'md:text-6xl/[73px]',
					'lg:text-left',
					'xl:text-7xl/[87px]',
					'2xl:text-8xl/[116px]'
				]}
			>
				“add a little shine<br /> to your story”
			</h1>
		</div>
	</div>
</section>
