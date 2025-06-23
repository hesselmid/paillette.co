<svelte:head>
	<title>About - Paillette.co</title>
</svelte:head>

<div class={['bg-white py-16', 'lg:py-20']}>
	<div
		class={[
			'flex flex-col items-center gap-y-9',
			'lg:gap-y-12',
			'xl:flex-row xl:justify-center xl:gap-x-8 xl:gap-y-0',
			'2xl:gap-x-[184px]'
		]}
	>
		<h1
			class={[
				'font-apfel-grotezk-brukt text-black-sheep max-w-[358px] text-center text-3xl/[38px]',
				'sm:max-w-[608px] sm:text-4xl/[46px]',
				'md:max-w-[702px] md:text-5xl/[62px]',
				'lg:max-w-[902px] lg:text-6xl/[77px]',
				'xl:max-w-[630px] xl:text-left'
			]}
		>
			“Paillette bridging emerging talent with forward thinking brands”
		</h1>
		<enhanced:img
			src="$lib/assets/AboutUs_10.png?w=358;448;654;806;490;562;716;896;1308;1612;980;1124"
			alt=""
			sizes="(min-width: 1536px) 562px, (min-width: 1280px) 490px, (min-width: 1024px) 806pxpx, (min-width: 768px) 654px, (min-width: 640px) 448px, 358px"
			class={[
				'h-auto w-[358px]',
				'sm:w-[448px]',
				'md:w-[654px]',
				'lg:w-[806px]',
				'xl:w-[490px]',
				'2xl:w-[562]'
			]}
			draggable="false"
		/>
	</div>
</div>
