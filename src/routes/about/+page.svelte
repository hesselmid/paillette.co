<script>
	import Profile from './Profile.svelte';
</script>

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

<section class={['bg-enoki py-9', 'lg:py-12']}>
	<div class="container mx-auto">
		<h2
			class={[
				'font-cormorant text-black-sheep text-center text-3xl/[36px] font-light',
				'sm:text-4xl/[44px]',
				'md:text-5xl/[58px]',
				'lg:ml-10 lg:text-left lg:text-6xl/[73px]',
				'xl:ml-[138px]',
				'2xl:ml-[266px]'
			]}
		>
			About us:
		</h2>
		<div
			class={[
				'font-cormorant text-black-sheep mx-4 mt-9 h-[456px] space-y-[19px] overflow-y-scroll pr-4 text-base/[19px] [&::-webkit-scrollbar]:w-6 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#541212] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:border [&::-webkit-scrollbar-track]:border-[#541212] [&::-webkit-scrollbar-track]:bg-[#bba0a0]',
				'sm:h-[448px] sm:space-y-[24px] sm:text-xl/[24px]',
				'md:mx-8 md:h-[434px] md:space-y-[29px] md:pr-8 md:text-2xl/[29px]',
				'lg:mx-10 lg:mt-12 lg:h-[383px] lg:pr-10',
				'xl:mr-16 xl:ml-[138px] xl:pr-[50px]',
				'2xl:mr-[192px] 2xl:ml-[266px]'
			]}
		>
			<p>
				In an industry where fresh perspectives and quality craftsmanship can set a brand apart,
				Paillette offers a unique source of exclusive, one-of-a-kind prints created by rising design
				talent. After years running my own design studio as a textile developer and Head of design
				at a textile company for both high street and high-end brands, I founded Paillette to
				address a gap I often saw: access to original, thoughtful design that connects brand
				identity with impactful storytelling. I wanted to create a space that brings together
				ambitious designers and visionary brands, empowering both to elevate their craft.
			</p>
			<p>
				My journey in fashion has taken me from presenting collections at international fashion
				events to collaborating with brands at every level. In my last role, I led the creation of
				large-scale textile collections that blended print, embroidery, and specialty textiles,
				developing hundreds of designs each season for renowned brands. With a background in diverse
				textile techniques, from high-end knits to circular print design, I’ve built a deep
				knowledge of what resonates in the market and how quality, detail, and originality drive a
				brand’s story forward.
			</p>
			<p>
				At Paillette, we’re passionate about offering more than just beautiful textiles. Each design
				represents a fresh voice, a commitment to sustainability, and a collaboration built on
				purpose. For brands, Paillette is a source of prints crafted with the highest attention to
				detail, quality, and originality. By working with emerging designers on our platform, brands
				gain access to exclusive prints that set them apart, creating products that embody
				authenticity and innovation.
			</p>
			<p>
				Through Paillette, I aim to create a new standard in the industry, fostering a connection
				between brands and designers that celebrates responsible production, creative freedom, and
				meaningful impact. We’re building a space where brands can discover unique textiles with
				stories worth sharing, and where designers are supported to bring their craft to life in
				ways that inspire and elevate.
			</p>
			<p>
				Our mission is simple: to connect, create, and inspire a more thoughtful industry. By
				partnering with Paillette, you’re joining a movement toward a fashion future that values
				originality, inclusivity, and enduring quality.
			</p>
		</div>
	</div>
</section>

<div class={['bg-white py-16', 'lg:py-20']}>
	<p
		class={[
			'font-evolventa text-black-sheep mx-auto max-w-[358px] text-center text-lg/[24px]',
			'sm:max-w-[608px] sm:text-2xl/[32px]',
			'lg:max-w-[830px]',
			'xl:max-w-[1004px]',
			'2xl:max-w-[1052px]'
		]}
	>
		At Paillette, we believe meaningful design starts with the people behind it. From our founder to
		our ambassadors and emerging designers, each person brings a unique perspective and shared
		commitment to reimagining how creativity moves through the fashion industry. Meet the
		individuals shaping Paillette — and the future of print.
	</p>
</div>

<section class={['bg-enoki pt-9 pb-16', 'lg:pt-12 lg:pb-20']}>
	<h2
		class={[
			'font-apfel-grotezk-brukt text-black-sheep text-center text-3xl/[38px]',
			'sm:text-4xl/[46px]',
			'md:text-5xl/[62px]',
			'lg:text-6xl/[77px]',
			'2xl:text-7xl/[92px]'
		]}
	>
		The Founder of Paillette
	</h2>
	<Profile />
</section>

<div class={['space-y-16 bg-white py-16', 'lg:space-y-20 lg:py-20']}>
	<Profile order="312" />
	<Profile order="231" />
</div>
