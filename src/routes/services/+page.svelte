<script lang="ts">
	import PailletteIcon from './PailletteIcon.svelte';

	let open = $state(true);
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
				'absolute size-[42px]',
				'sm:size-[66px]',
				'md:size-[84px]',
				open ? 'top-[576px] left-[15px]' : 'top-[597px] left-[153px]',
				open ? 'sm:top-[623px] sm:left-[96px]' : 'sm:top-[654px] sm:left-[254px]',
				open ? 'md:top-[565px] md:left-[83px]' : 'md:top-[606px] md:left-[300px]',
				open ? 'lg:top-[] lg:left-[]' : 'lg:top-[] lg:left-[]',
				open ? 'xl:top-[] xl:left-[]' : 'xl:top-[] xl:left-[]',
				open ? '2xl:top-[] 2xl:left-[]' : '2xl:top-[] 2xl:left-[]'
			]}
		>
			<PailletteIcon primaryColor="#D4EBF8" secondaryColor="#EEF7FC" />
		</div>

		<!-- Red -->
		<div
			class={[
				'absolute size-[42px]',
				'sm:size-[66px]',
				'md:size-[84px]',
				open ? 'top-[640px] left-[61px]' : 'top-[633.4px] left-[132px]',
				open ? 'sm:top-[735px] sm:left-[152px]' : 'sm:top-[711.2px] sm:left-[221px]',
				open ? 'md:top-[718px] md:left-[32px]' : 'md:top-[678.83px] md:left-[258px]',
				open ? 'lg:top-[] lg:left-[]' : 'lg:top-[] lg:left-[]',
				open ? 'xl:top-[] xl:left-[]' : 'xl:top-[] xl:left-[]',
				open ? '2xl:top-[] 2xl:left-[]' : '2xl:top-[] 2xl:left-[]'
			]}
		>
			<PailletteIcon primaryColor="#ff5249" secondaryColor="#ffbab6" />
		</div>

		<!-- Brown -->
		<div
			class={[
				'absolute size-[42px]',
				'sm:size-[66px]',
				'md:size-[84px]',
				open ? 'top-[705px] left-[139px]' : 'top-[669.75px] left-[153px]',
				open ? 'sm:top-[807px] sm:left-[230px]' : 'sm:top-[768.32px] sm:left-[254px]',
				open ? 'md:top-[796px] md:left-[148px]' : 'md:top-[751.5px] md:left-[300px]',
				open ? 'lg:top-[] lg:left-[]' : 'lg:top-[] lg:left-[]',
				open ? 'xl:top-[] xl:left-[]' : 'xl:top-[] xl:left-[]',
				open ? '2xl:top-[] 2xl:left-[]' : '2xl:top-[] 2xl:left-[]'
			]}
		>
			<PailletteIcon primaryColor="#541212" secondaryColor="#BBA0A0" />
		</div>

		<!-- Yellow -->
		<div
			class={[
				'absolute size-[42px]',
				'sm:size-[66px]',
				'md:size-[84px]',
				open ? 'top-[633px] left-[174px]' : 'top-[633.4px] left-[174px]',
				open ? 'sm:top-[711px] sm:left-[287px]' : 'sm:top-[711.2px] sm:left-[287px]',
				open ? 'md:top-[679px] md:left-[342px]' : 'md:top-[678.83px] md:left-[342.04px]',
				open ? 'lg:top-[] lg:left-[]' : 'lg:top-[] lg:left-[]',
				open ? 'xl:top-[] xl:left-[]' : 'xl:top-[] xl:left-[]',
				open ? '2xl:top-[] 2xl:left-[]' : '2xl:top-[] 2xl:left-[]'
			]}
		>
			<PailletteIcon primaryColor="#CDC526" secondaryColor="#EBE8A8" />
		</div>

		<!-- Green -->
		<div
			class={[
				'absolute size-[42px]',
				'sm:size-[66px]',
				'md:size-[84px]',
				open ? 'top-[576px] left-[258px]' : 'top-[597.03px] left-[195px]',
				open ? 'sm:top-[623px] sm:left-[350px]' : 'sm:top-[654.05px] sm:left-[320px]',
				open ? 'md:top-[578px] md:left-[429px]' : 'md:top-[606.06px] md:left-[384.05px]',
				open ? 'lg:top-[] lg:left-[]' : 'lg:top-[] lg:left-[]',
				open ? 'xl:top-[] xl:left-[]' : 'xl:top-[] xl:left-[]',
				open ? '2xl:top-[] 2xl:left-[]' : '2xl:top-[] 2xl:left-[]'
			]}
		>
			<PailletteIcon primaryColor="#06D001" secondaryColor="#9BEC99" />
		</div>

		<!-- Pink -->
		<div
			class={[
				'absolute size-[42px]',
				'sm:size-[66px]',
				'md:size-[84px]',
				open ? 'top-[705px] left-[315px]' : 'top-[669.75px] left-[195px]',
				open ? 'sm:top-[794px] sm:left-[407px]' : 'sm:top-[768.32px] sm:left-[320px]',
				open ? 'md:top-[796px] md:left-[517px]' : 'md:top-[751.56px] md:left-[384.05px]',
				open ? 'lg:top-[] lg:left-[]' : 'lg:top-[] lg:left-[]',
				open ? 'xl:top-[] xl:left-[]' : 'xl:top-[] xl:left-[]',
				open ? '2xl:top-[] 2xl:left-[]' : '2xl:top-[] 2xl:left-[]'
			]}
		>
			<PailletteIcon primaryColor="#EE66A6" secondaryColor="#F8C2DB" />
		</div>

		<!-- Dark blue -->
		<div
			class={[
				'absolute size-[42px]',
				'sm:size-[66px]',
				'md:size-[84px]',
				open ? 'top-[616px] left-[331px]' : 'top-[633.4px] left-[216px]',
				open ? 'sm:top-[698px] sm:left-[478px]' : 'sm:top-[711.2px] sm:left-[353px]',
				open ? 'md:top-[667px] md:left-[601px]' : 'md:top-[678.83px] md:left-[426.07px]',
				open ? 'lg:top-[] lg:left-[]' : 'lg:top-[] lg:left-[]',
				open ? 'xl:top-[] xl:left-[]' : 'xl:top-[] xl:left-[]',
				open ? '2xl:top-[] 2xl:left-[]' : '2xl:top-[] 2xl:left-[]'
			]}
		>
			<PailletteIcon primaryColor="#3D3BF3" secondaryColor="#D5D4FF" />
		</div>
	</div>
</section>

<section class="bg-enoki py-16"></section>
