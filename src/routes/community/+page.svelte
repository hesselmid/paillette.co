<script lang="ts">
	import levels from './levels.json';
	import Paillette from './Paillette.svelte';
</script>

<svelte:head>
	<title>Community | Paillette</title>
	<meta
		name="description"
		content="Advance your print design career in Paillette’s Community. Level up, earn more, and access guides, mentorship and exclusive events for emerging designers."
	/>
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

<div class={['bg-enoki pt-9 pb-16', 'lg:pt-12 lg:pb-20']}>
	<h2
		class={[
			'font-apfel-grotezk-brukt text-black-sheep text-center text-5xl/[62px] font-light',
			'sm:text-6xl/[77px]'
		]}
	>
		Levels:
	</h2>
	<div class={['mt-16 flex flex-col items-center gap-y-16', 'lg:mt-20 lg:gap-y-20']}>
		{#each levels as level (level.paillette.title)}
			<div
				style="background-color:{level.background}"
				class={[
					'ml-4 w-[358px] rounded-[1200px] pb-[253px]',
					'sm:w-[472px]',
					'md:w-[524px]',
					'lg:w-[564px] lg:pb-[302px]',
					'xl:flex xl:h-[564px] xl:w-[1152px] xl:items-center xl:gap-x-6 xl:pb-0'
				]}
			>
				<Paillette {...level.paillette} />
				<ul class={['mx-8 mt-8', 'xl:mx-0 xl:mt-0 xl:w-[409px]']}>
					{#each level.list as item (item)}
						<li
							class={[
								'text-black-sheep font-evolventa flex items-start text-base/[35px] tracking-[0.0464171px]',
								'lg:text-lg/[35px]'
							]}
						>
							<span class={['flex w-6 shrink-0 justify-center', 'lg:w-[27px]']}>•</span>
							{item}
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>

<div class={['bg-white py-16', 'lg:py-20']}>
	<div
		class={[
			'flex flex-col items-center gap-y-9',
			'lg:gap-y-12',
			'xl:flex-row xl:justify-center xl:gap-x-[69px] xl:gap-y-0',
			'2xl:gap-x-[161px]'
		]}
	>
		<div class={['flex flex-col items-center gap-y-9', 'lg:py-12']}>
			<h2
				class={[
					'font-cormorant text-black-sheep max-w-[262px] text-center text-5xl/[58px] font-light',
					'sm:max-w-[476px] sm:text-6xl/[73px]',
					'md:max-w-[572px] md:text-7xl/[87px]',
					'lg:max-w-[677px]',
					'xl:max-w-[591px]'
				]}
			>
				“Your creative Journey begins here”
			</h2>
			<p
				class={[
					'font-evolventa text-black-sheep max-w-[358px] text-center text-lg/[24px]',
					'sm:max-w-[476px] sm:text-2xl/[32px]',
					'md:max-w-[572px]',
					'lg:max-w-[782px]',
					'xl:max-w-[591px]'
				]}
			>
				As a designer selected to join Paillette, you’ll have access to our comprehensive design
				guides to set you up for success from day one. With our Quick Start-Up Guide, you’ll get all
				the essential information to kick off your journey smoothly. The Print Guide provides
				everything you need for creating and delivering high-quality, market-ready designs, while
				the Social Media Guide offers tips on showcasing your work to build your brand online. Each
				guide is crafted to support you every step of the way, making your experience with Paillette
				as seamless as it is rewarding.
			</p>
		</div>
		<enhanced:img
			src="$lib/assets/DC_new7 1.png?w=358;492;566;716;984;1132"
			alt=""
			sizes="(min-width: 1536px) 566px, (min-width: 640px) 492px, 358px"
			class={['h-auto w-[358px]', 'sm:w-[492px]', '2xl:w-[566px]']}
			draggable="false"
		/>
	</div>
</div>

<section class={['bg-white py-16', 'lg:py-20']}>
	<div
		class={[
			'flex flex-col items-center gap-y-16',
			'lg:gap-y-20',
			'xl:flex-row xl:justify-center xl:gap-x-[141px] xl:gap-y-0',
			'2xl:-mr-[7px] 2xl:gap-x-[193px]'
		]}
	>
		<div class={['flex flex-col items-center gap-y-9', 'lg:gap-y-12']}>
			<h2
				class={[
					'text-black-sheep font-apfel-grotezk max-w-[390px] text-center text-5xl/[62px]',
					'sm:max-w-[395px] sm:text-6xl/[77px]'
				]}
			>
				Exciting Events Coming Soon!
			</h2>
			<p
				class={[
					'text-black-sheep font-evolventa max-w-[358px] text-center text-lg/[24px]',
					'sm:max-x-[452px] sm:text-2xl/[32px]',
					'md:max-w-[535px]'
				]}
			>
				At Paillette, we’re not just a platform—we’re building a vibrant community. Stay tuned for
				upcoming events designed to connect, inspire, and empower our talented designers. From
				workshops and industry panels to creative meet-ups, there’s so much in store. Sign up for
				updates and be the first to know when the next event is announced. Let’s create, connect,
				and grow together!
			</p>
		</div>
		<div class={['space-y-9', 'lg:space-y-12']}>
			<h3
				class={[
					'font-apfel-grotezk-brukt text-black-sheep max-w-[358px] text-center text-5xl/[62px]',
					'sm:max-w-none sm:text-6xl/[77px]'
				]}
			>
				Get our newsletter.
			</h3>
			<form class={['mx-auto flex max-w-[358px] flex-col gap-y-5', 'sm:max-w-[456px]']}>
				<div>
					<label for="fname" class="sr-only">First Name</label>
					<input
						type="text"
						name="fname"
						id="fname"
						placeholder="first name*"
						class={[
							'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full border-0 px-[38px] py-[20px] text-2xl/[32px]'
						]}
					/>
				</div>
				<div>
					<label for="email" class="sr-only">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="email address*"
						class={[
							'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full border-0 px-[38px] py-[20px] text-2xl/[32px]'
						]}
					/>
				</div>
				<button
					type="submit"
					class={[
						'font-evolventa border-black-sheep text-black-sheep cursor-pointer self-end rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]',
						'sm:text-lg/6'
					]}>Send</button
				>
			</form>
		</div>
	</div>
</section>

<section class={['bg-enoki py-16', 'lg:py-20']}>
	<div
		class={[
			'flex flex-col items-center gap-y-9',
			'md:gap-y-12',
			'xl:flex-row-reverse xl:items-start xl:justify-center xl:gap-x-[129px] xl:gap-y-0',
			'2xl:ml-[43px] 2xl:gap-x-[267px]'
		]}
	>
		<div class={['flex flex-col items-center gap-y-9', 'lg:gap-y-12', 'xl:mt-[6px]', '2xl:mt-0']}>
			<h2
				class={[
					'font-cormorant text-black-sheep max-w-[358px] text-center text-5xl/[58px] font-light',
					'sm:max-w-[514px] sm:text-6xl/[73px]',
					'md:max-w-[603px] md:text-7xl/[87px]',
					'lg:max-w-[813px]',
					'xl:max-w-[603px]'
				]}
			>
				“Threads & Thoughts: The latest industry insights”
			</h2>
			<p
				class={[
					'font-evolventa text-black-sheep max-w-[358px] text-center text-lg/[24px]',
					'sm:max-w-[514px] sm:text-2xl/[32px]',
					'md:max-w-[603px]',
					'lg:max-w-[535px]'
				]}
			>
				Stay in the know with Threads & Thoughts, our curated collection of must-read articles and
				updates shaping the fashion and design industries. Whether it’s groundbreaking news,
				cultural shifts, or emerging trends, this is where we share the stories that impact our
				community.
			</p>
		</div>
		<div
			class={[
				'flex flex-col items-center gap-y-9',
				'sm:gap-y-0',
				'md:-translate-x-[26px]',
				'lg:-translate-x-0'
			]}
		>
			<enhanced:img
				src="$lib/assets/DC_8new 1.png?w=358;420;716;840"
				alt=""
				sizes="(min-width: 640px) 420px, 358px"
				class={['h-auto w-[358px]', 'sm:w-[420px]']}
				draggable="false"
			/>
			<a
				href="https://pailletteco.substack.com"
				class={[
					'font-evolventa border-black-sheep text-black-sheep rounded-full border px-[37px] py-[19px] text-center text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px]',
					'sm:translate-x-[53px] sm:-translate-y-[88px] sm:self-end sm:text-lg/6',
					'lg:translate-x-[95px]'
				]}>Read our<br /> latest articles</a
			>
		</div>
	</div>
</section>
