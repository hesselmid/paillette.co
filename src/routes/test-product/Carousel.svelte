<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';

	interface CarouselItem {
		id: number;
		imageUrl: string;
		colorway: number;
	}

	interface Props {
		items: CarouselItem[];
	}

	let { items }: Props = $props();
	let currentIndex = $state(0);

	const is2XL = new MediaQuery('(min-width: 1536px)');
	const isXL = new MediaQuery('(min-width: 1280px)');
	const isLG = new MediaQuery('(min-width: 1024px)');
	const isMD = new MediaQuery('(min-width: 768px)');
	const isSM = new MediaQuery('(min-width: 640px)');

	interface BreakpointConfig {
		itemsToDisplay: number;
		itemPixelWidth: number;
		gapPixelWidth: number;
	}

	let currentValues: BreakpointConfig = $derived.by(() => {
		if (is2XL.current) {
			return { itemsToDisplay: 3, itemPixelWidth: 382, gapPixelWidth: 22 };
		} else if (isXL.current) {
			return { itemsToDisplay: 3, itemPixelWidth: 308, gapPixelWidth: 20 };
		} else if (isLG.current) {
			return { itemsToDisplay: 3, itemPixelWidth: 246, gapPixelWidth: 20 };
		} else if (isMD.current) {
			return { itemsToDisplay: 2, itemPixelWidth: 246, gapPixelWidth: 20 };
		} else if (isSM.current) {
			return { itemsToDisplay: 3, itemPixelWidth: 146, gapPixelWidth: 10 };
		} else {
			return { itemsToDisplay: 1, itemPixelWidth: 146, gapPixelWidth: 0 };
		}
	});

	let translateXValue = $derived(
		currentIndex *
			(currentValues.itemPixelWidth +
				(currentValues.gapPixelWidth > 0 ? currentValues.gapPixelWidth : 0))
	);

	$effect(() => {
		const maxPossibleIndex = Math.max(0, items.length - currentValues.itemsToDisplay);

		if (items.length <= currentValues.itemsToDisplay) {
			currentIndex = 0;
		} else if (currentIndex > maxPossibleIndex) {
			currentIndex = maxPossibleIndex;
		}
	});

	function goToPrevious() {
		if (currentIndex > 0) {
			currentIndex--;
		} else {
			if (items.length > currentValues.itemsToDisplay) {
				currentIndex = Math.max(0, items.length - currentValues.itemsToDisplay);
			}
		}
	}

	function goToNext() {
		const maxIndex = Math.max(0, items.length - currentValues.itemsToDisplay);
		if (currentIndex < maxIndex) {
			currentIndex++;
		} else {
			if (items.length > currentValues.itemsToDisplay) {
				currentIndex = 0;
			}
		}
	}

	let canNavigate = $derived(items.length > currentValues.itemsToDisplay);
</script>

<div
	class={[
		'mt-5 flex items-center justify-between px-4',
		'md:px-8',
		'lg:px-10',
		'xl:px-16',
		'2xl:px-20'
	]}
>
	<button
		class="font-evolventa text-black-sheep bg-enoki border-black-sheep flex size-16 shrink-0 cursor-pointer items-center justify-center rounded-full border text-lg/[24px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] disabled:cursor-not-allowed"
		onclick={goToPrevious}
		disabled={!canNavigate}
		aria-label="Previous items"
	>
		&lt;
	</button>

	<div
		class={[
			'w-[146px] min-w-0 overflow-hidden',
			'sm:w-[458px]',
			'md:w-[512px]',
			'lg:w-[778px]',
			'xl:w-[964px]',
			'2xl:w-[1190px]'
		]}
	>
		<div
			class={[
				'flex gap-x-0 transition-transform duration-300 ease-in-out',
				'sm:gap-x-[10px]',
				'md:gap-x-[20px]',
				'2xl:gap-x-[22px]'
			]}
			style:transform="translateX(-{translateXValue}px)"
		>
			{#each items as item (item.id)}
				<div
					class={[
						'shadow-[5px_5px_20px_rgba(0, 0, 0, 0.05)] w-[146px] shrink-0',
						'sm:w-[146px]',
						'md:w-[246px]',
						'lg:w-[246px]',
						'xl:w-[308px]',
						'2xl:w-[382px]'
					]}
				>
					<a
						href="?colorway={item.colorway}"
						class="block aspect-square overflow-hidden rounded-[10px]"
					>
						<img
							src={item.imageUrl}
							alt="Colorway {item.colorway}"
							class="size-full object-cover"
						/>
					</a>
				</div>
			{/each}
		</div>
	</div>

	<button
		class="font-evolventa text-black-sheep bg-enoki border-black-sheep flex size-16 shrink-0 cursor-pointer items-center justify-center rounded-full border text-lg/[24px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] disabled:cursor-not-allowed"
		onclick={goToNext}
		disabled={!canNavigate}
		aria-label="Next items"
	>
		&gt;
	</button>
</div>
