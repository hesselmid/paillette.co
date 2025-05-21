<script lang="ts">
	import { onMount } from 'svelte';
	import PailletteIcon from './PailletteIcon.svelte';

	let open = $state(false);
	let sentinelElement: HTMLDivElement | undefined = $state();
	let animationTimeoutId: ReturnType<typeof setTimeout> | undefined = $state();

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

<section class={['bg-enoki py-16', 'lg:py-20']}>
	<div
		class={[
			'mx-auto max-w-[340px]',
			'sm:max-w-[570px]',
			'md:max-w-[694px]',
			'lg:max-w-[940px]',
			'xl:max-w-[1152px]'
		]}
	>
		<div class={['rounded-t-[10px] bg-white py-16', 'lg:py-20']}>
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
				receives high-resolution files, full creative rights, and a certificate of authenticity for
				unrestricted global use—ensuring exclusivity and originality with every piece.
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
					'bg-enoki font-evolventa text-black-sheep mx-auto mt-9 flex h-[72px] w-[268px] items-center justify-center rounded-full text-2xl/8 lowercase shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
					'sm:w-[432px]',
					'md:w-[526px]',
					'lg:mt-12 lg:w-[864px]'
				]}>Tell me more</button
			>
		</div>
	</div>
</section>
