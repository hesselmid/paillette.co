<script lang="ts">
	import type { Snippet } from 'svelte';
	import chroma from 'chroma-js';

	interface FAQItem {
		question: string;
		answer: string;
	}

	type Props = {
		items: FAQItem[];
		baseColor?: string;
		intro?: Snippet;
		initialOpenIndex?: number | null;
	};

	let { items, baseColor = '#cdc526', intro, initialOpenIndex = null }: Props = $props();
	let faqIndex = $state<number | null>(initialOpenIndex);

	function toggleFaq(index: number) {
		faqIndex = faqIndex === index ? null : index;
	}

	const totalVisibleItems = $derived(items.length + (intro ? 1 : 0));

	function getColor(i: number, total: number): string {
		const safeTotal = Math.max(1, total - 1);
		if (safeTotal === 0) return chroma.mix(baseColor, 'white', 0, 'lab').hex();

		const ratio = (i / safeTotal) * 0.9;
		return chroma.mix(baseColor, 'white', ratio, 'lab').hex();
	}
</script>

<dl
	class={[
		'mx-auto max-w-[358px] overflow-hidden rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]',
		'sm:max-w-[535px]',
		'md:max-w-[646px]',
		'lg:max-w-[806px]',
		'xl:max-w-[956px]',
		'2xl:max-w-[1142px]'
	]}
>
	{#if intro}
		<div
			class={['p-[50px]', 'md:px-[94px] md:py-14']}
			style="background-color: {getColor(0, totalVisibleItems)}"
		>
			{@render intro()}
		</div>
	{/if}

	{#each items as faq, i (faq.question)}
		<div
			class={['relative p-[50px]', 'md:px-[94px] md:py-14']}
			style="background-color: {getColor(i + (intro ? 1 : 0), totalVisibleItems)}"
		>
			<dt
				class={[
					'font-cormorant text-black-sheep text-lg/[22px]',
					'sm:text-2xl/[29px]',
					'md:text-3xl/[36px]',
					'lg:text-4xl/[44px]'
				]}
			>
				{faq.question}
			</dt>
			<dd
				id={`faq-item-${i}`}
				aria-hidden={i !== faqIndex}
				class={[
					'font-evolventa text-black-sheep overflow-hidden text-base/[21px] transition-[height,margin] duration-300 ease-in-out [interpolate-size:allow-keywords]',
					'sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]',
					i === faqIndex ? 'mt-[46px] h-auto' : 'h-0'
				]}
			>
				{faq.answer}
			</dd>
			<button
				type="button"
				aria-controls={`faq-item-${i}`}
				aria-expanded={i === faqIndex}
				class="absolute inset-0 cursor-pointer"
				onclick={() => toggleFaq(i)}
				aria-label={`Toggle answer for ${faq.question}`}
			></button>
		</div>
	{/each}
</dl>
