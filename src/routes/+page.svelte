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

<section class={['bg-enoki py-[60px]', 'lg:py-20']}>
	<div class="container mx-auto">
		<div
			class={[
				'flex flex-col items-center gap-y-9',
				'sm:gap-y-[60px]',
				'md:gap-y-9',
				'lg:flex-row lg:justify-center lg:gap-x-14 lg:gap-y-0',
				'xl:gap-x-[136px]',
				'2xl:gap-x-[126px]'
			]}
		>
			<enhanced:img
				src="$lib/assets/HomePage_4s.png?w=358;431;478;608;716;862;956;1216"
				alt=""
				sizes="(min-width: 1280px) 608px, (min-width: 768px) 478px, (min-width: 640px) 431px, 358px"
				class={['h-auto w-[358px]', 'sm:w-[431px]', 'md:w-[478px]', 'xl:w-[608px]']}
			/>
			<div
				class={[
					'flex max-w-[358px] flex-col items-center',
					'sm:max-w-[535px]',
					'md:max-w-[646px]',
					'lg:max-w-[408px]'
				]}
			>
				<h2
					class={[
						'font-apfel-grotezk-brukt text-black-sheep text-center text-3xl/[38px]',
						'sm:text-4xl/[46px]',
						'md:text-5xl/[62px]',
						'lg:text-left lg:text-6xl/[77px]',
						'xl:text-7xl/[92px]'
					]}
				>
					Welcome to Paillette.
				</h2>
				<p
					class={[
						'font-evolventa text-black-sheep mt-9 text-center text-lg/[24px]',
						'sm:text-2xl/[32px]',
						'lg:mt-12 lg:text-left'
					]}
				>
					Paillette is a design platform that connects emerging fashion talent with forward-thinking
					brands. For designers, it's a place to create, earn, and grow through real-world
					experience and mentorship. For brands, it's a unique source of exclusive, high-quality
					prints crafted by fresh voices in design, offering both originality and meaningful impact.
					Together, we're creating a new way for young talent to thrive in the fashion
					industry—while providing brands with one-of-a-kind designs that tell their story.
				</p>
				<a
					href="/services"
					class={[
						'font-evolventa border-black-sheep text-black-sheep mt-9 rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px]',
						'sm:text-lg/6',
						'lg:self-end',
						'xl:mt-12'
					]}>Services</a
				>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-[60px]"></section>
