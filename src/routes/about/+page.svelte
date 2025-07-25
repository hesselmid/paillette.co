<script>
	import Profile from './Profile.svelte';

	import lola from './profiles/lola.jpg?enhanced';
	import larissa from './profiles/larissa.jpg?enhanced';
	import linde from './profiles/linde.jpg?enhanced';
	import filipa from './profiles/filipa.jpg?enhanced';
	import margarida from './profiles/margarida.jpg?enhanced';
	import enya from './profiles/enya.jpg?enhanced';
	import lucy from './profiles/lucy.jpg?enhanced';
	import wendy from './profiles/wendy.jpg?enhanced';
	import amina from './profiles/amina.jpg?enhanced';

	import workLola from './work/lola.jpg?enhanced';
	import workLarissa from './work/larissa.jpg?enhanced';
	import workLinde from './work/linde.jpg?enhanced';
	import workFilipa from './work/filipa.jpg?enhanced';
	import workMargarida from './work/margarida.jpg?enhanced';
	import workEnya from './work/enya.jpg?enhanced';
	import workLucy from './work/lucy.jpg?enhanced';
	import workWendy from './work/wendy.jpg?enhanced';
	import workAmina from './work/amina.jpg?enhanced';
</script>

<svelte:head>
	<title>About Us | Paillette</title>
	<meta
		name="description"
		content="Discover how Paillette unites forward-thinking brands with emerging textile talent. Meet our founder and community shaping the future of print design."
	/>
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
			“Paillette: bridging emerging talent with forward thinking brands”
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
				talent. After years running my own design studio as a textile developer and Head of Design
				at a textile company for both high-street and high-end brands, I founded Paillette to
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
		individuals shaping Paillette — and the future of print design.
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
	<Profile
		name="Lola"
		order="123"
		image={lola}
		work={workLola}
		--primary="#ff5249"
		--secondary="#ffbab6"
	/>
</section>

<div class={['bg-white py-16', 'lg:py-20']}>
	<div
		class={[
			'flex flex-col items-center gap-y-9',
			'lg:flex-row lg:justify-center lg:gap-x-[54px] lg:gap-y-0',
			'xl:gap-x-[106px]',
			'2xl:gap-x-[246px]'
		]}
	>
		<enhanced:img
			src="$lib/assets/AboutUs_11new.png?w=358;431;482;716;862;964"
			alt=""
			sizes="(min-width: 1280px) 482px, (min-width: 640px) 431px, 358px"
			class={['h-auto w-[358px]', 'sm:w-[431px]', 'xl:w-[482px]']}
			draggable="false"
		/>
		<div class={['flex flex-col items-center gap-y-9', 'lg:gap-y-12']}>
			<p
				class={[
					'font-cormorant text-black-sheep text-center text-lg/[64px] font-light',
					'sm:text-2xl/[64px]',
					'md:text-3xl/[64px]',
					'lg:text-4xl/[64px]'
				]}
			>
				“Curated with care, designed<br class="hidden lg:inline" /> to shine -<br
					class="lg:hidden"
				/>
				bring your vision to<br class="hidden lg:inline" /> life with Paillette.”
			</p>
			<a
				href="/contact"
				class={[
					'font-evolventa border-black-sheep text-black-sheep bg-enoki rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px]',
					'sm:text-lg/6'
				]}>Get in touch</a
			>
		</div>
	</div>
</div>

<section class={['bg-enoki pt-9 pb-16', 'lg:pt-12 lg:pb-20']}>
	<h2
		class={[
			'font-apfel-grotezk-brukt text-black-sheep text-center text-3xl/[38px]',
			'sm:text-4xl/[46px]',
			'md:text-5xl/[62px]',
			'lg:text-6xl/[77px]',
			'xl:text-7xl/[92px]'
		]}
	>
		Paillette Ambassadors
	</h2>
	<div
		class={[
			'text-black-sheep font-evolventa mx-auto mt-9 max-w-[358px] space-y-[24px] text-center text-lg/[24px]',
			'sm:max-w-[608px] sm:space-y-[32px] sm:text-2xl/[32px]',
			'lg:mt-12 lg:max-w-[830px]',
			'xl:max-w-[1004px]',
			'2xl:max-w-[1152px]'
		]}
	>
		<p>Our ambassadors are the first people helping shape how the world sees Paillette.</p>
		<p>
			At this early stage, they serve as advocates and representatives of the platform, helping to
			share our vision and build awareness across the creative industry. Their insight, perspective,
			and presence help us connect with the right audiences as we grow.
		</p>
		<p>
			In the future, we see our ambassadors playing a more active role in mentoring new talent —
			drawing from their own professional experience to support the next generation of print
			designers. For now, we’re proud to have them as trusted voices in our journey forward.
		</p>
	</div>
</section>

<div class={['space-y-16 bg-white py-16', 'lg:space-y-20 lg:py-20']}>
	<Profile
		name="Larissa"
		order="312"
		image={larissa}
		work={workLarissa}
		--primary="#d4ebf8"
		--secondary="#efefef"
	/>
	<Profile
		name="Linde"
		order="231"
		image={linde}
		work={workLinde}
		--primary="#06d001"
		--secondary="#9bec99"
	/>
</div>

<section class={['bg-enoki pt-9 pb-16', 'lg:pt-12 lg:pb-20']}>
	<h2
		class={[
			'font-apfel-grotezk-brukt text-black-sheep text-center text-3xl/[38px]',
			'sm:text-4xl/[46px]',
			'md:text-5xl/[62px]',
			'lg:text-6xl/[77px]',
			'xl:text-7xl/[92px]'
		]}
	>
		The Paillette community
	</h2>
	<div
		class={[
			'text-black-sheep font-evolventa mx-auto mt-9 max-w-[358px] space-y-[24px] text-center text-lg/[24px]',
			'sm:max-w-[608px] sm:space-y-[32px] sm:text-2xl/[32px]',
			'lg:mt-12 lg:max-w-[830px]',
			'xl:max-w-[1004px]',
			'2xl:max-w-[1152px]'
		]}
	>
		<p>
			Our community is made up of a handpicked group of designers from around the world — the
			beating heart of Paillette. We carefully select those who bring a fresh, unique signature and
			share the same ethos that defines Paillette.
		</p>
		<p>
			Many talented designers work independently and can sometimes feel isolated. Through Paillette,
			we bring them together — creating a supportive community where they can connect, share
			insights, and grow.
		</p>
		<p>
			By taking care of sales and business opportunities, we free up designers to focus on what they
			do best: creating. Together, we’re building more than a platform — we’re nurturing a vibrant
			ecosystem that helps each member thrive and push the boundaries of print design.
		</p>
		<p>
			As Paillette grows, this community remains at its core — driving new connections, fresh ideas,
			and shaping the future of print design.
		</p>
	</div>
</section>

<div class={['space-y-16 bg-white pt-16', 'lg:space-y-20 lg:pt-20']}>
	<Profile
		name="Filipa"
		order="123"
		image={filipa}
		work={workFilipa}
		--primary="#ee66a6"
		--secondary="#f8c2db"
	/>
	<Profile
		name="Margarida"
		order="312"
		image={margarida}
		work={workMargarida}
		--primary="#cdc526"
		--secondary="#fff4cf"
	/>
	<Profile
		name="Enya"
		order="231"
		image={enya}
		work={workEnya}
		--primary="#ff5249"
		--secondary="#ff5249"
	/>
	<Profile
		name="Lucy"
		order="123"
		image={lucy}
		work={workLucy}
		--primary="#d4ebf8"
		--secondary="#eeefef"
	/>
	<Profile
		name="Wendy"
		order="312"
		image={wendy}
		work={workWendy}
		--primary="#06d001"
		--secondary="#9bec99"
	/>
	<Profile
		name="Amina"
		order="231"
		image={amina}
		work={workAmina}
		--primary="#ee66a6"
		--secondary="#f8c2db"
	/>
</div>

<div class={['bg-white py-16', 'lg:py-20']}>
	<div
		class={[
			'flex flex-col items-center gap-y-9',
			'lg:flex-row lg:justify-center lg:gap-x-[88px] lg:gap-y-0',
			'xl:gap-x-[50px]',
			'2xl:gap-x-[110px]'
		]}
	>
		<enhanced:img
			src="$lib/assets/AboutUs_12.png?w=358;448;656;540;584;716;896;1312;1080;1168"
			alt=""
			sizes="(min-width: 1280px) 584px,(min-width: 1024px) 540px,(min-width: 768px) 656px, (min-width: 640px) 448, 358px"
			class={['h-auto w-[358px]', 'sm:w-[448px]', 'md:w-[656px]', 'lg:w-[540px]', 'xl:w-[584px]']}
			draggable="false"
		/>
		<div class={['flex flex-col items-center gap-y-9', 'lg:gap-y-12']}>
			<p
				class={[
					'font-cormorant text-black-sheep text-center text-lg/[64px] font-light',
					'sm:max-w-[356px] sm:text-2xl/[64px]',
					'md:max-w-none md:text-3xl/[64px]',
					'lg:text-4xl/[64px]'
				]}
			>
				“Every print tells<br class="hidden lg:inline xl:hidden" /> a story.<br
					class="sm:hidden md:inline lg:hidden xl:inline"
				/>
				Make yours<br class="hidden lg:inline xl:hidden" /> sparkle with Paillette.”
			</p>
			<a
				href="/contact"
				class={[
					'font-evolventa border-black-sheep text-black-sheep bg-enoki rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px]',
					'sm:text-lg/6'
				]}>Get in touch</a
			>
		</div>
	</div>
</div>
