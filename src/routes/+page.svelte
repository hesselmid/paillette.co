<script lang="ts">
	import Faq from '$lib/components/Faq.svelte';

	const faqs = [
		{
			question: 'Exclusive Designs, Made by Emerging Talent',
			answer:
				'Every print at Paillette is a one-of-a-kind creation, crafted by emerging designers with fresh perspectives. When you buy a design, it’s yours alone—no repeats, no duplicates. Your brand gains a unique story to tell.'
		},
		{
			question: 'A Distinctive Brand Aesthetic',
			answer:
				'From curated collections to seasonal trends, Paillette offers a visually cohesive selection that’s both unique and timeless. Let your brand stand out with designs that capture the spirit of now, shaped by tomorrow’s talent.'
		},
		{
			question: 'Guided by Expertise, Shaped by Passion',
			answer:
				'At Paillette, each young designer is personally mentored by an industry expert, ensuring high-quality designs that balance innovation with market-ready execution. Your brand benefits from the energy of emerging talent, backed by a wealth of experience.'
		},
		{
			question: 'Exclusive Rights and Full Creative Freedom',
			answer:
				'Our designs come with full exclusivity rights, including colorways and high-resolution files in repeat. For custom projects, collaborate with us from the beginning to create something uniquely tailored to your brand’s vision.'
		},
		{
			question: 'Ethical and Impactful Collaboration',
			answer:
				'When you choose Paillette, you’re investing in the next generation of designers. Every purchase supports young creatives, providing them with fair pay, real-world experience, and visibility. Partner with us to make a meaningful impact in the design industry.'
		},
		{
			question: 'Flexible Access to Fresh Talent Ready to Hire when your Ready',
			answer:
				'Through Paillette, brands can collaborate with an evolving talent pool of design students and recent graduates, gaining access to innovative print designs without the constraints of permanent contracts. If you’re impressed by a designer’s work and decide to hire them, it’s a perfect outcome—a young creative finds their path, and your brand benefits from a skilled designer who knows your vision and aesthetic.'
		}
	];
</script>

<svelte:head>
	<title>Paillette.co</title>
</svelte:head>

<section class={['bg-white py-16', 'lg:py-20']}>
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
				fetchpriority="high"
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

<section class={['bg-enoki py-16', 'lg:py-20']}>
	<div class="container mx-auto">
		<div
			class={[
				'flex flex-col items-center gap-y-9',
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

<section class={['bg-white py-16', 'lg:py-20']}>
	<Faq items={faqs} baseColor="#cdc526">
		{#snippet intro()}
			<dt
				class={[
					'font-apfel-grotezk text-black-sheep text-2xl/[31px]',
					'sm:text-3xl/[38px]',
					'md:text-4xl/[46px]',
					'lg:text-6xl/[77px]'
				]}
			>
				Why choose Paillette?
			</dt>
			<dd
				class={[
					'font-evolventa text-black-sheep mt-[46px] text-base/[21px]',
					'sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			>
				Paillette is more than a design platform—it’s a mission to change industry norms by
				championing emerging talent and offering brands exclusive, story-driven designs that
				inspire. With us, brands gain not only distinctive artwork but also the chance to support
				fair, impactful collaborations with the next generation of designers. Together, we create
				meaningful connections that empower creativity, foster innovation, and bring fresh energy
				into every brand’s journey.
			</dd>
		{/snippet}
	</Faq>
</section>

<section class={['bg-enoki py-16', 'lg:py-20']}>
	<div class="container mx-auto">
		<div
			class={[
				'flex flex-col items-center gap-y-9',
				'lg:gap-y-12',
				'xl:flex-row-reverse xl:justify-center xl:gap-x-9 xl:gap-y-0',
				'2xl:gap-x-[192px]'
			]}
		>
			<enhanced:img
				src="$lib/assets/HomePage_5s 1.png?w=358;535;646;806;718;717;1070;1292;1612;1436"
				alt=""
				sizes="(min-width: 1536px) 718px, (min-width: 1280px) 646px, (min-width: 1024px) 806px, (min-width: 768px) 646px, (min-width: 640px) 535px, 358px"
				class={[
					'h-auto w-[358px]',
					'sm:w-[535px]',
					'md:w-[646px]',
					'lg:w-[806px]',
					'xl:w-[646px]',
					'2xl:w-[718px]'
				]}
			/>
			<div class={['flex flex-col items-center gap-y-9', 'lg:gap-y-12']}>
				<p
					class={[
						'font-cormorant text-black-sheep max-w-[358px] text-center text-lg/[64px] font-light',
						'sm:max-w-[455px] sm:text-2xl/[64px]',
						'md:max-w-[568px] md:text-3xl/[64px]',
						'lg:max-w-[682px] lg:text-4xl/[64px]',
						'xl:max-w-[472px] xl:text-left',
						'2xl:max-w-[466px]'
					]}
				>
					"Step into a world of exclusive, curated designs. Get in touch to see how Paillette can
					add a fresh sparkle to your collection."
				</p>
				<a
					href="/contact"
					class={[
						'font-evolventa border-black-sheep text-black-sheep rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px]',
						'sm:text-lg/6',
						'xl:-translate-x-6 xl:self-end',
						'2xl:-translate-x-[17px]'
					]}>Get in touch</a
				>
			</div>
		</div>
	</div>
</section>
