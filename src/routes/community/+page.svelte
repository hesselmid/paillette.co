<svelte:head>
	<title>Community | Paillette</title>
</svelte:head>

<div class={['bg-white py-16', 'lg:py-20']}>
	<div
		class={[
			'flex flex-col items-center gap-y-9',
			'lg:gap-y-12',
			'xl:flex-row xl:justify-center xl:gap-x-[65px] xl:gap-y-0',
			'2xl:gap-x-[49px]'
		]}
	>
		<h1
			class={[
				'font-apfel-grotezk-brukt text-black-sheep max-w-[358px] text-center text-4xl/[46px]',
				'sm:hidden'
			]}
		>
			Advance your career and be rewarded.
		</h1>
		<enhanced:img
			src="$lib/assets/DC_6new.png?w=358;546;641;866;717;1092;1282;1732"
			alt=""
			sizes="(min-width: 1536px) 866, (min-width: 1024px) 641px, (min-width: 640px) 546px, 358px"
			class={['h-auto w-[358px]', 'sm:w-[546px]', 'lg:w-[641px]', '2xl:w-[866px]']}
			draggable="false"
		/>
		<div
			class={['sm:flex sm:flex-col sm:items-center sm:gap-y-9', 'lg:gap-y-12', 'xl:items-start']}
		>
			<h1
				class={[
					'hidden',
					'sm:font-apfel-grotezk-brukt sm:text-black-sheep sm:block sm:max-w-[452px] sm:text-center sm:text-5xl/[62px]',
					'md:max-w-[535px] md:text-6xl/[77px]',
					'lg:max-w-[830px]',
					'xl:max-w-[488px] xl:text-left'
				]}
			>
				Advance your career and be rewarded.
			</h1>
			<p
				class={[
					'font-evolventa text-black-sheep max-w-[358px] text-center text-lg/[24px]',
					'sm:max-w-[452px] sm:text-2xl/[32px]',
					'md:max-w-[535px]',
					'lg:max-w-[830px]',
					'xl:max-w-[460px] xl:text-left'
				]}
			>
				At Paillette, your hard work and unique vision are valued. As demand for your designs grows,
				so does your level within our platform—along with your compensation. The more you create,
				the more you’ll see your work recognized and rewarded. This is your chance to grow, earn,
				and make a lasting mark in the industry. Let your talent shine and reach new heights with
				each level you achieve!
			</p>
		</div>
	</div>
</div>
