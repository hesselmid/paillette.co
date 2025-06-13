<script lang="ts">
	import { page } from '$app/state';
</script>

<div
	class={[
		'container mx-auto flex flex-col items-center gap-y-9 pb-9',
		'md:flex-row-reverse md:justify-center md:gap-x-[9px] md:py-9'
	]}
>
	<div>
		<div class="md:flex md:items-end md:gap-x-[47px]">
			<h1 class="font-cormorant text-black-sheep text-center text-6xl/[73px] font-light">
				{page.status}
			</h1>

			<p class="font-cormorant text-black-sheep text-center text-3xl/[36px] font-light">
				{page.error?.message}
			</p>
		</div>

		<div class={['mx-auto mt-5 max-w-[213px] space-y-4', 'sm:max-w-[300px]']}>
			<p
				class={['font-cormorant text-black-sheep text-sm/[17px] font-light', 'sm:text-base/[19px]']}
			>
				Oops… this page doesn’t seem to exist. Maybe it shimmered away like a loose paillette.
			</p>
			<p
				class={['font-cormorant text-black-sheep text-sm/[17px] font-light', 'sm:text-base/[19px]']}
			>
				“Even the best designs sometimes need a second draft. Let’s try again.”
			</p>
		</div>

		<div class={['mt-5 flex justify-center', 'md:justify-end']}>
			<a
				href="/"
				class={[
					'font-evolventa border-black-sheep bg-enoki text-black-sheep rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px]',
					'sm:text-lg/6'
				]}>Go home</a
			>
		</div>
	</div>

	<enhanced:img
		src="$lib/assets/404ErrorPage_8.png?w=359;389;718;778"
		alt=""
		sizes="(min-width: 640px) 389px, 358px"
		class={['h-auto w-[359px]', 'sm:w-[389px]']}
		draggable="false"
	/>
</div>
