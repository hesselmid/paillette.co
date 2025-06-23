<script lang="ts">
	let { name = 'Lola', order = '123', image, work } = $props();
</script>

<div
	class={[
		'mt-9 flex flex-col items-center gap-5',
		'sm:mt-16',
		'md:flex-row md:flex-wrap md:justify-center',
		'lg:mt-20 lg:gap-[22px]',
		'xl:gap-[21px]'
	]}
>
	<div
		class={[
			'size-[358px]',
			'sm:size-[608px]',
			'md:size-[342px]',
			'lg:size-[300px]',
			'xl:size-[370px]',
			order === '123' ? 'lg:order-1' : order === '312' ? 'lg:order-2' : 'lg:order-3'
		]}
	>
		<enhanced:img
			src={image}
			alt={name}
			class="h-[281px] w-full object-cover object-center sm:h-[470px] md:h-[262px] lg:h-[220px] xl:h-[280px]"
			draggable="false"
		/>
		<div
			class={[
				'font-evolventa text-black-sheep rounded-b-[10px] bg-(--primary) px-4 pt-8 pb-4 text-2xl/[32px]',
				'sm:pt-[96px]',
				'md:pt-8',
				'xl:pt-[42px]'
			]}
		>
			{name}
		</div>
	</div>

	<div
		class={[
			'font-evolventa text-black-sheep size-[358px] space-y-[21px] overflow-y-scroll rounded-[10px] bg-(--secondary) p-4 text-base/[21px] [&::-webkit-scrollbar]:w-6 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-(--primary) [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:border [&::-webkit-scrollbar-track]:border-(--primary) [&::-webkit-scrollbar-track]:bg-(--secondary)',
			'sm:size-[608px]',
			'md:order-3 md:h-[370px] md:w-[704px] md:space-y-[24px] md:text-lg/[24px]',
			'lg:order-2 lg:size-[300px]',
			'xl:size-[370px]',
			order === '123' ? 'lg:order-2' : order === '312' ? 'lg:order-3' : 'lg:order-1'
		]}
	>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu dolor eu magna maximus
			malesuada eu nec quam. Proin sed mollis sapien. Nunc venenatis leo vitae semper luctus. Nulla
			at odio id ligula viverra gravida et nec eros. Vestibulum sodales dui lacus, nec suscipit
			nulla venenatis sed. Etiam vulputate sapien vitae auctor tristique. Ut pulvinar mattis mi,
			eget interdum leo eleifend sit amet.
		</p>
		<p>
			Vestibulum dui nulla, porta egestas placerat sit amet, accumsan et metus. Pellentesque aliquet
			mollis consectetur. Pellentesque eget odio faucibus, faucibus turpis a, ultricies massa.
			Phasellus sed fringilla elit. Pellentesque venenatis lectus id urna euismod dictum. Aenean nec
			facilisis libero. In hac habitasse platea dictumst. Nam et lacus sed massa ultrices dignissim
			eget in dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
			inceptos himenaeos. Mauris eget dui eu metus sagittis rhoncus. Nam blandit eleifend purus, sit
			amet tincidunt dolor porta id. Nam tempus, magna ac vehicula iaculis, mi arcu tincidunt est,
			sed rhoncus nunc risus sed justo. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur
			adipiscing elit. Aliquam bibendum urna vitae consectetur tristique.
		</p>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu dolor eu magna maximus
			malesuada eu nec quam. Proin sed mollis sapien. Nunc venenatis leo vitae semper luctus. Nulla
			at odio id ligula viverra gravida et nec eros. Vestibulum sodales dui lacus, nec suscipit
			nulla venenatis sed. Etiam vulputate sapien vitae auctor tristique. Ut pulvinar mattis mi,
			eget interdum leo eleifend sit amet.
		</p>
		<p>
			Vestibulum dui nulla, porta egestas placerat sit amet, accumsan et metus. Pellentesque aliquet
			mollis consectetur. Pellentesque eget odio faucibus, faucibus turpis a, ultricies massa.
			Phasellus sed fringilla elit. Pellentesque venenatis lectus id urna euismod dictum. Aenean nec
			facilisis libero. In hac habitasse platea dictumst. Nam et lacus sed massa ultrices dignissim
			eget in dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
			inceptos himenaeos. Mauris eget dui eu metus sagittis rhoncus. Nam blandit eleifend purus, sit
			amet tincidunt dolor porta id. Nam tempus, magna ac vehicula iaculis, mi arcu tincidunt est,
			sed rhoncus nunc risus sed justo. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur
			adipiscing elit. Aliquam bibendum urna vitae consectetur tristique.
		</p>
	</div>

	<div
		class={[
			'relative size-[358px] rounded-[10px] shadow-[5px_5px_20px_rgba(0,0,0,0.05)]',
			'sm:size-[608px]',
			'md:order-2 md:size-[342px]',
			'lg:order-1 lg:size-[300px]',
			'xl:size-[370px]',
			order === '123' ? 'lg:order-3' : order === '312' ? 'lg:order-1' : 'lg:order-2'
		]}
	>
		<enhanced:img
			src={work}
			alt="{name}'s work"
			class="h-full w-full rounded-[10px] object-cover object-center"
			draggable="false"
		/>
	</div>
</div>
