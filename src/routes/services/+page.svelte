<script lang="ts">
	import { onMount } from 'svelte';
	import PailletteIcon from './PailletteIcon.svelte';

	const usps = [
		{
			title: 'Bespoke design services across a wide range of styles',
			description:
				'Tailored Designs with a Personal Touch Paillette’s diverse designer roster means we offer a broad spectrum of styles for custom projects. With talent skilled in both hand-drawn and digital techniques, we can align your custom designs with the most fitting artistic approach. Each custom project is a collaboration; our team ensures your brand’s vision is realized, whether inspired by our in-house collection or created from scratch based on your brief.',
			primary: '#FF5249',
			secondary: '#FFBAB6'
		},
		{
			title: 'A blend of craftsmanship & digital excellence',
			description:
				'Prints Crafted with Passion and Precision Paillette encourages designers to balance traditional handcrafting with digital skills, blending artistry with modern execution. This commitment to both physical and digital techniques ensures that every print is meticulously developed, reflecting both authenticity and innovation.',
			primary: '#D4EBF8',
			secondary: '#EEF7FC'
		},
		{
			title: 'Timeless Design & Seasonless Colorways: Always Relevant, Always Stunning',
			description: `At Paillette, we believe great design transcends seasons. Each print is developed with a full spectrum of striking colorways, allowing your brand to find the perfect match anytime. Because we don’t follow seasonal constraints, our designs remain fresh and adaptable—ready to integrate seamlessly into your creative vision year-round. Whether you're curating a new collection or refining an existing one, Paillette prints maintain their impact beyond fleeting trends.`,
			primary: '#06D001',
			secondary: '#9BEC99'
		},
		{
			title: 'Frequent Updates: A Constant Flow of New Inspiration',
			description:
				'Creativity is an evolving process, and so is our collection. Paillette introduces new exclusive designs on a rolling basis, ensuring that fresh inspiration is always within reach. This means you’ll never be limited to a static archive—there’s always something new to discover. Whether you’re looking for a bold statement piece or a subtle classic, our regularly updated selection ensures your brand has access to cutting-edge, original designs whenever you need them.',
			primary: '#EE66A6',
			secondary: '#F8C2DB'
		},
		{
			title: 'Exclusive rights & authenticity',
			description:
				'Your Story, Your Design<br /><br /> Each Paillette design is uniquely yours—no duplicates. Upon purchase, you receive high-resolution files and exclusive worldwide rights. Additionally, a certificate of authenticity accompanies each design, reinforcing its originality and value for your brand.',
			primary: '#CDC526',
			secondary: '#EBE8A8'
		}
	];

	const menu = [
		{
			title: 'Single Exclusive Print Design',
			description: 'Price: Starts at €800 per design.',
			primary: '#F4F4FF',
			secondary: '#EAEAFF',
			list: [
				'Full exclusive rights to the design, including all colorways.',
				'5 - 8 colorways per design.',
				'Certificate of authenticity for worldwide industrial use for an unlimited time.',
				'Advice on fabric type.'
			],
			extra: {
				icon: 'star',
				text: 'Conditions: Once sold, the design is taken off the platform and no longer available to other clients.'
			}
		},
		{
			title: 'Multi-Print Packages:',
			description:
				'Curated Collection (small batch)<br /> Price: €2000 - €3000 for a small collection of 3 - 5 different but related designs. ',
			primary: '#DFDFFF',
			secondary: '#D5D4FF',
			list: [
				'Full exclusive rights to the design, including all colorways.',
				'3-5 designs with  a minimum of 5 colorways each. ',
				'Certificate of authenticity for worldwide industrial use for an  unlimited time.',
				'Advice on fabric type.'
			],
			extra: {
				icon: 'star',
				text: 'Conditions: Once sold, the design is taken off the platform and no longer available to other clients.'
			}
		},
		{
			title: 'Custom Design Collaboration:',
			description: 'Price: Starts at €1200 per custom design.',
			primary: '#CBC9FF',
			secondary: '#C0BFFF',
			list: [
				'Client collaboration from start to finish, based on a mood-board or brief. ',
				'2 client revisions and up to 15 bespoke colorways.',
				'High-resolution files in repeat, with color seperations.',
				'Certificate of authenticity for worldwide industrial use for an unlimited time.',
				'Advice on fabric type.'
			],
			extra: {
				icon: 'plus',
				text: 'Extra Revisions: Beyond the 2 included revisions, additional fees apply (e.g., €200 per extra revision).'
			}
		},
		{
			title: 'Design Modifications:',
			description: 'Price: Based on complexity, starting at €300 per modification.',
			primary: '#B5B4FF',
			secondary: '#ABA9FF',
			list: [
				'Modifying an exsisting design or alterning color ways.',
				'Additional placement designs (e.g., scarf or T-shirt placements).'
			],
			extra: {
				icon: 'plus',
				text: 'Complex Requests: For highly customized of labor intensive changes, fees will be adjusted accoringly (e.g., €500+ depending on the scope).'
			}
		},
		{
			title: 'Extra Services (Add-Ons:',
			description: 'Price: Starting at €300 per package.',
			primary: '#A19FFF',
			secondary: '#9694FF',
			list: [
				'High-quality behind-the-scenes video’s and photo’s documenting the design process tailored for brands to share on their social media.'
			]
		}
	];

	let open = $state(false);
	let sentinelElement: HTMLDivElement | undefined = $state();
	let animationTimeoutId: ReturnType<typeof setTimeout> | undefined = $state();

	let tellMeMoreOpen = $state(false);

	onMount(() => {
		let observer: IntersectionObserver;

		const observerCallback: IntersectionObserverCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !animationTimeoutId) {
					animationTimeoutId = setTimeout(() => {
						open = true;
						animationTimeoutId = undefined;
					}, 300);

					if (sentinelElement) {
						observer.unobserve(sentinelElement);
					}
				}
			});
		};

		const observerOptions: IntersectionObserverInit = {
			root: null,
			threshold: 0.1
		};

		observer = new IntersectionObserver(observerCallback, observerOptions);

		if (sentinelElement) {
			observer.observe(sentinelElement);
		}

		return () => {
			if (animationTimeoutId) {
				clearTimeout(animationTimeoutId);
			}
			if (observer) {
				observer.disconnect();
			}
		};
	});
</script>

<svelte:head>
	<title>Services - Paillette.co</title>
</svelte:head>

<section class="bg-white">
	<div
		class={[
			'relative container mx-auto h-[783px]',
			'sm:h-[909px]',
			'md:h-[916px]',
			'lg:h-auto lg:py-20'
		]}
	>
		<div class={['space-y-9 pt-16', 'lg:space-y-12 lg:pt-0 lg:pl-10', 'xl:pl-16', '2xl:pl-20']}>
			<h1
				class={[
					'font-apfel-grotezk text-black-sheep mx-auto max-w-[358px] text-center text-3xl/[38px]',
					'sm:max-w-[508px] sm:text-4xl/[46px]',
					'md:max-w-[635px] md:text-5xl/[62px]',
					'lg:mx-0 lg:max-w-[794px] lg:text-left lg:text-6xl/[77px]'
				]}
			>
				Paillette, crafting exclusive prints with global perspectives and boundless creativity
			</h1>
			<p
				class={[
					'font-evolventa text-black-sheep mx-auto max-w-[358px] text-center text-lg/6',
					'sm:max-w-[489px] sm:text-2xl/8',
					'md:max-w-[704px]',
					'lg:mx-0 lg:max-w-[548px] lg:text-left',
					'xl:max-w-[741px]'
				]}
			>
				Discover a Constantly Evolving Collection With Paillette’s global network of designers, we
				bring you a fluid, always-current selection of exclusive prints. Without the constraints of
				traditional seasons, our collections can be updated frequently, letting your brand access
				fresh designs throughout the year. From bold florals and intricate geometrics to striking
				motifs, each print is uniquely crafted, ready for sampling or production.
			</p>
		</div>

		<!-- Light blue -->
		<div
			class={[
				'absolute size-[42px] transition-all duration-1000 ease-in-out',
				'sm:size-[66px]',
				'md:size-[84px]',
				'lg:size-[94px]',
				open ? 'top-[576px] left-[15px]' : 'top-[597px] left-[153px]',
				open ? 'sm:top-[623px] sm:left-[96px]' : 'sm:top-[654px] sm:left-[254px]',
				open ? 'md:top-[565px] md:left-[83px]' : 'md:top-[606px] md:left-[300px]',
				open ? 'lg:top-[359px] lg:left-[594px]' : 'lg:top-[373px] lg:left-[684.02px]',
				open ? 'xl:top-[311px] xl:left-[824px]' : 'xl:top-[325px] xl:left-[918.02px]',
				open ? '2xl:left-[1066px]' : '2xl:left-[1158.02px]'
			]}
		>
			<PailletteIcon
				primaryColor={open ? '#D4EBF8' : '#ee66a6'}
				secondaryColor={open ? '#EEF7FC' : '#f8c2db'}
			/>
		</div>

		<!-- Red -->
		<div
			class={[
				'absolute size-[42px] transition-all duration-1000 ease-in-out',
				'sm:size-[66px]',
				'md:size-[84px]',
				'lg:size-[94px]',
				open ? 'top-[640px] left-[61px]' : 'top-[633.4px] left-[132px]',
				open ? 'sm:top-[735px] sm:left-[152px]' : 'sm:top-[711.2px] sm:left-[221px]',
				open ? 'md:top-[718px] md:left-[32px]' : 'md:top-[678.83px] md:left-[258px]',
				open ? 'lg:top-[617px] lg:left-[614px]' : 'lg:top-[454.51px] lg:left-[637px]',
				open ? 'xl:top-[521px] xl:left-[844px]' : 'xl:top-[406.51px] xl:left-[871px]',
				open ? '2xl:left-[1086px]' : '2xl:left-[1111px]'
			]}
		>
			<PailletteIcon
				primaryColor={open ? '#FF5249' : '#ee66a6'}
				secondaryColor={open ? '#FFBAB6' : '#f8c2db'}
			/>
		</div>

		<!-- Brown -->
		<div
			class={[
				'absolute size-[42px] transition-all duration-1000 ease-in-out',
				'sm:size-[66px]',
				'md:size-[84px]',
				'lg:size-[94px]',
				open ? 'top-[705px] left-[139px]' : 'top-[669.75px] left-[153px]',
				open ? 'sm:top-[807px] sm:left-[230px]' : 'sm:top-[768.32px] sm:left-[254px]',
				open ? 'md:top-[796px] md:left-[148px]' : 'md:top-[751.5px] md:left-[300px]',
				open ? 'lg:top-[241px] lg:left-[704px]' : 'lg:top-[535.89px] lg:left-[684.02px]',
				open ? 'xl:top-[193px] xl:left-[934px]' : 'xl:top-[487.89px] xl:left-[918.02px]',
				open ? '2xl:left-[1176px]' : '2xl:left-[1158.02px]'
			]}
		>
			<PailletteIcon
				primaryColor={open ? '#541212' : '#ee66a6'}
				secondaryColor={open ? '#BBA0A0' : '#f8c2db'}
			/>
		</div>

		<!-- Yellow -->
		<div
			class={[
				'absolute size-[42px] transition-all duration-1000 ease-in-out',
				'sm:size-[66px]',
				'md:size-[84px]',
				'lg:size-[94px]',
				open ? 'top-[633px] left-[174px]' : 'top-[633.4px] left-[174px]',
				open ? 'sm:top-[711px] sm:left-[287px]' : 'sm:top-[711.2px] sm:left-[287px]',
				open ? 'md:top-[679px] md:left-[342px]' : 'md:top-[678.83px] md:left-[342.04px]',
				open ? 'lg:top-[454px] lg:left-[733px]' : 'lg:top-[454.51px] lg:left-[731.04px]',
				open ? 'xl:top-[406px] xl:left-[963px]' : 'xl:top-[406.51px] xl:left-[965.04px]',
				open ? '2xl:left-[1205px]' : '2xl:left-[1205.04px]'
			]}
		>
			<PailletteIcon primaryColor="#CDC526" secondaryColor="#EBE8A8" />
		</div>

		<!-- Green -->
		<div
			class={[
				'absolute size-[42px] transition-all duration-1000 ease-in-out',
				'sm:size-[66px]',
				'md:size-[84px]',
				'lg:size-[94px]',
				open ? 'top-[576px] left-[258px]' : 'top-[597.03px] left-[195px]',
				open ? 'sm:top-[623px] sm:left-[350px]' : 'sm:top-[654.05px] sm:left-[320px]',
				open ? 'md:top-[578px] md:left-[429px]' : 'md:top-[606.06px] md:left-[384.05px]',
				open ? 'lg:top-[48px] lg:left-[861px]' : 'lg:top-[373.07px] lg:left-[778.06px]',
				open ? 'xl:top-[48px] xl:left-[1091px]' : 'xl:top-[325.07px] xl:left-[1012.06px]',
				open ? '2xl:left-[1333px]' : '2xl:left-[1252.06px]'
			]}
		>
			<PailletteIcon
				primaryColor={open ? '#06D001' : '#ee66a6'}
				secondaryColor={open ? '#9BEC99' : '#f8c2db'}
			/>
		</div>

		<!-- Pink -->
		<div
			class={[
				'absolute size-[42px] transition-all duration-1000 ease-in-out',
				'sm:size-[66px]',
				'md:size-[84px]',
				'lg:size-[94px]',
				open ? 'top-[705px] left-[315px]' : 'top-[669.75px] left-[195px]',
				open ? 'sm:top-[794px] sm:left-[407px]' : 'sm:top-[768.32px] sm:left-[320px]',
				open ? 'md:top-[796px] md:left-[517px]' : 'md:top-[751.56px] md:left-[384.05px]',
				open ? 'lg:top-[333px] lg:left-[890px]' : 'lg:top-[535.89px] lg:left-[778.06px]',
				open ? 'xl:top-[285px] xl:left-[1120px]' : 'xl:top-[487.89px] xl:left-[1012.06px]',
				open ? '2xl:left-[1362px]' : '2xl:left-[1252.06px]'
			]}
		>
			<PailletteIcon primaryColor="#ee66a6" secondaryColor="#f8c2db" />
		</div>

		<!-- Dark blue -->
		<div
			class={[
				'absolute size-[42px] transition-all duration-1000 ease-in-out',
				'sm:size-[66px]',
				'md:size-[84px]',
				'lg:size-[94px]',
				open ? 'top-[616px] left-[331px]' : 'top-[633.4px] left-[216px]',
				open ? 'sm:top-[698px] sm:left-[478px]' : 'sm:top-[711.2px] sm:left-[353px]',
				open ? 'md:top-[667px] md:left-[601px]' : 'md:top-[678.83px] md:left-[426.07px]',
				open ? 'lg:top-[561px] lg:left-[846px]' : 'lg:top-[454.51px] lg:left-[825.08px]',
				open ? 'xl:top-[513px] xl:left-[1076px]' : 'xl:top-[406.51px] xl:left-[1059.08px]',
				open ? '2xl:left-[1318px]' : '2xl:left-[1299.08px]'
			]}
		>
			<PailletteIcon
				primaryColor={open ? '#3D3BF3' : '#ee66a6'}
				secondaryColor={open ? '#D5D4FF' : '#f8c2db'}
			/>
		</div>
	</div>
	<div bind:this={sentinelElement} style="height: 1px; width: 100%;" aria-hidden="true"></div>
</section>

<div class={['bg-enoki space-y-16 py-16', 'lg:space-y-20 lg:py-20']}>
	<section>
		<div
			class={[
				'mx-auto max-w-[340px]',
				'sm:max-w-[570px]',
				'md:max-w-[694px]',
				'lg:max-w-[940px]',
				'xl:max-w-[1152px]'
			]}
		>
			<div
				class={[
					'bg-white py-16',
					'lg:py-20',
					tellMeMoreOpen ? 'rounded-t-[10px]' : 'rounded-[10px]'
				]}
			>
				<h2
					class={[
						'font-apfel-grotezk-brukt text-black-sheep text-center text-3xl/[38px]',
						'sm:text-4xl/[46px]',
						'md:text-5xl/[62px]',
						'lg:text-6xl/[77px]'
					]}
				>
					Why choose Paillette?
				</h2>
				<p
					class={[
						'font-evolventa text-black-sheep mx-auto mt-9 max-w-[284px] text-center text-lg/6',
						'sm:max-w-[511px] sm:text-2xl/8',
						'md:max-w-[626px]',
						'lg:mt-12 lg:max-w-[864px]'
					]}
				>
					Each design is sold as a one-of-a-kind piece, including all color variations. Your brand
					receives high-resolution files, full creative rights, and a certificate of authenticity
					for unrestricted global use—ensuring exclusivity and originality with every piece.
				</p>
				<div
					class={[
						'mt-9 ml-[51px] flex flex-col gap-y-5',
						'sm:ml-[166px]',
						'md:-mx-2 md:grid md:grid-cols-5',
						'lg:mt-12 lg:ml-[30px]',
						'xl:mx-[121px]'
					]}
				>
					<div
						class={[
							'flex items-center gap-x-6',
							'md:flex-col-reverse md:justify-between md:gap-x-0 md:gap-y-5'
						]}
					>
						<div class="size-[42px]">
							<PailletteIcon primaryColor="#FF5249" secondaryColor="#FFBAB6" />
						</div>
						<span class={['font-evolventa text-black-sheep text-xl/[27px]', 'md:text-center']}
							>Bespoke<br class="hidden md:block" /> design</span
						>
					</div>
					<div
						class={[
							'flex items-center gap-x-6',
							'md:flex-col-reverse md:justify-between md:gap-x-0 md:gap-y-5'
						]}
					>
						<div class="size-[42px]">
							<PailletteIcon primaryColor="#D4EBF8" secondaryColor="#EEF7FC" />
						</div>
						<span class={['font-evolventa text-black-sheep text-xl/[27px]', 'md:text-center']}
							>Craftmanship</span
						>
					</div>
					<div
						class={[
							'flex items-center gap-x-6',
							'md:flex-col-reverse md:justify-between md:gap-x-0 md:gap-y-5'
						]}
					>
						<div class="size-[42px]">
							<PailletteIcon primaryColor="#06D001" secondaryColor="#9BEC99" />
						</div>
						<span class={['font-evolventa text-black-sheep text-xl/[27px]', 'md:text-center']}
							>Timeless<br class="hidden md:block" /> design</span
						>
					</div>
					<div
						class={[
							'flex items-center gap-x-6',
							'md:flex-col-reverse md:justify-between md:gap-x-0 md:gap-y-5'
						]}
					>
						<div class="size-[42px]">
							<PailletteIcon primaryColor="#EE66A6" secondaryColor="#F8C2DB" />
						</div>
						<span class={['font-evolventa text-black-sheep text-xl/[27px]', 'md:text-center']}
							>Frequent<br class="hidden md:block" /> updates</span
						>
					</div>
					<div
						class={[
							'flex items-center gap-x-6',
							'md:flex-col-reverse md:justify-between md:gap-x-0 md:gap-y-5'
						]}
					>
						<div class="size-[42px]">
							<PailletteIcon primaryColor="#CDC526" secondaryColor="#EBE8A8" />
						</div>
						<span class={['font-evolventa text-black-sheep text-xl/[27px]', 'md:text-center']}
							>Exclusive<br class="hidden md:block" /> rights</span
						>
					</div>
				</div>
				<button
					type="button"
					class={[
						'bg-enoki font-evolventa text-black-sheep mx-auto mt-9 flex h-[72px] w-[268px] cursor-pointer items-center justify-center rounded-full text-2xl/8 lowercase shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
						'sm:w-[432px]',
						'md:w-[526px]',
						'lg:mt-12 lg:w-[864px]'
					]}
					onclick={() => (tellMeMoreOpen = !tellMeMoreOpen)}
					>{tellMeMoreOpen ? 'Tell me less' : 'Tell me more'}</button
				>
			</div>
			<div class={tellMeMoreOpen ? 'block' : 'hidden'}>
				{#each usps as usp (usp.title)}
					<div
						class={['group last:overflow-hidden last:rounded-b-[10px]', 'md:grid md:grid-cols-2']}
					>
						<div
							class={[
								'p-6',
								'sm:p-8',
								'md:p-10 md:group-odd:order-1 md:group-even:order-2',
								'lg:p-12'
							]}
							style="background: {usp.primary};"
						>
							<h3
								class={[
									'font-apfel-grotezk text-black-sheep text-3xl/[38px]',
									'sm:text-4xl/[46px]',
									'lg:text-5xl/[62px]'
								]}
							>
								{usp.title}
							</h3>
						</div>
						<div
							class={[
								'p-6',
								'sm:p-8',
								'md:p-10 md:group-odd:order-2 md:group-even:order-1',
								'lg:p-12'
							]}
							style="background: {usp.secondary};"
						>
							<p
								class={[
									'font-evolventa text-black-sheep text-base/[21px]',
									'sm:text-lg/6',
									'lg:text-xl/[27px]'
								]}
							>
								{@html usp.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<section>
		<h2
			class={[
				'font-apfel-grotezk text-black-sheep text-center text-4xl/[46px]',
				'md:text-5xl/[62px]',
				'lg:text-6xl/[77px]'
			]}
		>
			Design Menu:
		</h2>
		<div
			class={[
				'mt-9 grid justify-center gap-y-5',
				'lg:mx-auto lg:mt-12 lg:max-w-[944px] lg:grid-cols-2 lg:gap-x-6',
				'xl:max-w-[1152px] xl:gap-x-20'
			]}
		>
			{#each menu as item (item.title)}
				<div
					class={[
						'max-w-[340px]',
						'sm:max-w-[570px]',
						'md:max-w-[694px]',
						'lg:max-w-[460px]',
						'xl:max-w-[536px]'
					]}
				>
					<div
						class={['border-perrywinkle space-y-6 rounded-t-[10px] border px-6 pt-6 pb-[34px]']}
						style="background: {item.primary};"
					>
						<h3
							class={[
								'font-cormorant text-black-sheep text-2xl/[29px]',
								'sm:text-3xl/[36px]',
								'md:text-4xl/[44px]',
								'lg:text-3xl/[36px]',
								'xl:text-4xl/[44px]'
							]}
						>
							{item.title}
						</h3>
						<p
							class={[
								'font-evolventa text-black-sheep text-base/[34.8px] tracking-[0.05px]',
								'sm:text-xl/[34.8px]',
								'md:text-2xl/[34.8px]',
								'lg:text-xl/[34.8px]',
								'xl:text-2xl/[34.8px]'
							]}
						>
							{@html item.description}
						</p>
					</div>
					<div
						class={[
							'border-perrywinkle -mt-[10px] space-y-6 rounded-[10px] border py-6 pr-6 pl-[38px]',
							'sm:pl-[31px]',
							'md:pl-[55px]'
						]}
						style="background: {item.secondary};"
					>
						{#each item.list as list (list)}
							<div
								class={[
									'flex gap-x-[10px]',
									'sm:gap-x-[30px]',
									'md:gap-x-[19px]',
									'lg:gap-x-[21px]'
								]}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="text-black-sheep mt-1 size-6 shrink-0"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
									/>
								</svg>
								<span
									class={[
										'font-evolventa text-black-sheep text-base/[34.8px] tracking-[0.05px]',
										'sm:text-xl/[34.8px]',
										'md:text-2xl/[34.8px]',
										'lg:text-xl/[34.8px]',
										'xl:text-2xl/[34.8px]'
									]}
								>
									{list}
								</span>
							</div>
						{/each}
						{#if item.extra}
							<div
								class={[
									'flex gap-x-[10px]',
									'sm:gap-x-[30px]',
									'md:gap-x-[19px]',
									'lg:gap-x-[21px]'
								]}
							>
								{#if item.extra.icon === 'star'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="text-black-sheep mt-1 size-6 shrink-0"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
										/>
									</svg>
								{:else if item.extra.icon === 'plus'}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="text-black-sheep mt-1 size-6 shrink-0"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 4.5v15m7.5-7.5h-15"
										/>
									</svg>
								{/if}

								<span
									class={[
										'font-evolventa text-black-sheep text-base/[34.8px] tracking-[0.05px]',
										'sm:text-xl/[34.8px]',
										'md:text-2xl/[34.8px]',
										'lg:text-xl/[34.8px]',
										'xl:text-2xl/[34.8px]'
									]}
								>
									{item.extra.text}
								</span>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
