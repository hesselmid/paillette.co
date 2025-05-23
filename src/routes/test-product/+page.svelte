<script lang="ts">
	import Carousel from './Carousel.svelte';

	const carouselItems = [
		{ id: 1, imageUrl: '/LolavanPraag_PailletteParade_LPM03_26:04:25.png', colorway: 1 },
		{ id: 2, imageUrl: '/LolavanPraag_PailletteParade_LPM03_26:04:25.png', colorway: 2 },
		{ id: 3, imageUrl: '/LolavanPraag_PailletteParade_LPM03_26:04:25.png', colorway: 3 },
		{ id: 4, imageUrl: '/LolavanPraag_PailletteParade_LPM03_26:04:25.png', colorway: 4 },
		{ id: 5, imageUrl: '/LolavanPraag_PailletteParade_LPM03_26:04:25.png', colorway: 5 },
		{ id: 6, imageUrl: '/LolavanPraag_PailletteParade_LPM03_26:04:25.png', colorway: 6 },
		{ id: 7, imageUrl: '/LolavanPraag_PailletteParade_LPM03_26:04:25.png', colorway: 7 },
		{ id: 8, imageUrl: '/LolavanPraag_PailletteParade_LPM03_26:04:25.png', colorway: 8 }
	];
</script>

<div class={['bg-white py-16', 'lg:py-20']}>
	<div class={['container mx-auto space-y-8', 'lg:space-y-0']}>
		<section
			class={[
				'px-4',
				'sm:px-[73px]',
				'md:px-[137px]',
				'lg:flex lg:items-start lg:gap-x-8 lg:px-10',
				'xl:gap-x-[58px] xl:px-16',
				'2xl:gap-x-[87px] 2xl:px-20'
			]}
		>
			<div
				class={[
					'lg:flex lg:shrink-0 lg:flex-row-reverse lg:items-center lg:gap-x-[31px]',
					'xl:gap-x-[58px]',
					'2xl:gap-x-[87px]'
				]}
			>
				<img
					src="/LolavanPraag_PailletteParade_LPM03_26:04:25.png"
					alt=""
					class={[
						'aspect-square w-[358px] rounded-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)]',
						'sm:w-[494px]',
						'xl:w-[510px]',
						'2xl:w-[648px]'
					]}
				/>
				<div
					class={[
						'mt-8 flex justify-center gap-x-[29px]',
						'lg:mt-0 lg:flex-col lg:gap-x-0 lg:gap-y-[29px]'
					]}
				>
					<button type="button">
						<img
							src="/LolavanPraag_PailletteParade_LPM03_26:04:25.png"
							alt=""
							class="border-dementer-green aspect-square w-[98px] rounded-[10px] border-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)]"
						/>
					</button>
					<button type="button">
						<img
							src="/LolavanPraag_PailletteParade_LPM03_26:04:25.png"
							alt=""
							class="aspect-square w-[98px] rounded-[10px] object-cover shadow-[5px_5px_20px_rgba(0,0,0,0.05)]"
						/>
					</button>
				</div>
			</div>
			<div class={['mt-8', 'lg:mt-0']}>
				<h1
					class={[
						'font-apfel-grotezk-brukt text-black-sheep text-5xl/[62px]',
						'lg:text-6xl/[77px]'
					]}
				>
					Name Print
				</h1>
				<div class="flex items-center justify-between">
					<p class="font-evolventa text-black-sheep text-lg/6">By name designer</p>
					<span class="font-apfel-grotezk text-black-sheep text-2xl/[31px]">€ 800</span>
				</div>
				<div class="mt-8 space-y-3.5">
					<button
						type="button"
						class={[
							'font-evolventa text-black-sheep bg-enoki border-black-sheep flex w-full cursor-pointer justify-center rounded-full border py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px]',
							'sm:text-lg/6'
						]}>Add to bag</button
					>
					<button
						type="button"
						class={[
							'font-evolventa text-black-sheep bg-enoki border-black-sheep flex w-full cursor-pointer justify-center rounded-full border py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:py-[15px]',
							'sm:text-lg/6'
						]}>Add to wishlist</button
					>
				</div>
				<p
					class={[
						'font-evolventa text-black-sheep mt-8 text-justify text-base/[21px]',
						'xl:text-lg/6'
					]}
				>
					Description of the print. Materials used. Inspiration. Description of the print. Materials
					used. Inspiration. Description of the print. Materials used. Inspiration.Description of
					the print. Description of the print.
				</p>
				<h2
					class={[
						'font-apfel-grotezk text-black-sheep mt-8 text-2xl/[31px]',
						'lg:text-[32px]/[41px]',
						'xl:text-4xl/[46px]'
					]}
				>
					What’s in the package:
				</h2>
				<ul class="mt-8 list-inside list-disc">
					<li class="font-evolventa text-black-sheep text-base/[21px]">
						Full exclusivety rights to the design, including all color ways
					</li>
					<li class="font-evolventa text-black-sheep text-base/[21px]">
						5-8 colorways of the design
					</li>
					<li class="font-evolventa text-black-sheep text-base/[21px]">
						High-resolution files of repeat (300dpi RGB files, color seperated, in TIFF format).
					</li>
					<li class="font-evolventa text-black-sheep text-base/[21px]">
						Certificate of authenticity for worldwide industrial use for an unlimited time.
					</li>
					<li class="font-evolventa text-black-sheep text-base/[21px]">
						Advice on fabric type or medium
					</li>
				</ul>
			</div>
		</section>
		<section>
			<h2
				class={[
					'font-cormorant text-black-sheep text-center text-3xl/[64px] font-light',
					'sm:ml-[73px] sm:text-left',
					'md:ml-[137px]',
					'lg:ml-[123px]',
					'xl:ml-[158px]',
					'2xl:ml-[173px]'
				]}
			>
				Colorways
			</h2>

			<Carousel items={carouselItems} />
		</section>
	</div>
</div>

<section class={['bg-enoki pt-8 pb-16', 'lg:pb-20']}>
	<div class="container mx-auto">
		<h2
			class={[
				'font-cormorant text-black-sheep px-4 text-center text-3xl/[64px] font-light',
				'sm:ml-[73px] sm:text-left',
				'md:ml-[137px]',
				'lg:ml-[123px]',
				'xl:ml-[158px]',
				'2xl:ml-[173px]'
			]}
		>
			Discover the collection
		</h2>

		<Carousel items={carouselItems} />
	</div>
</section>
