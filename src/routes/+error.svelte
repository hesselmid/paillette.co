<script lang="ts">
	import { page } from '$app/state';

	let errorMessageLine1 = $derived.by(() => {
		const status = page.status;

		if (status === 404) {
			return 'Oops… this page doesn’t seem to exist. Maybe it shimmered away like a loose paillette.';
		}

		if (status === 403) {
			return 'This section is reserved for verified clients or community members.';
		}

		if (status >= 500 && status < 600) {
			return 'We’re stitching things back together. Please try again soon.';
		}

		return 'A seam has come undone. We are working on a fix.';
	});
</script>

<div
	class={[
		'container mx-auto flex flex-col items-center gap-y-9 pb-9',
		'md:flex-row-reverse md:items-start md:justify-center md:gap-x-[9px] md:py-9',
		'lg:gap-x-9 lg:py-12',
		'xl:gap-x-20'
	]}
>
	<div class={['md:-translate-y-[7px]', 'lg:translate-y-[8px]', '2xl:-translate-y-[14px]']}>
		<div class={['md:flex md:items-end md:gap-x-[47px]', 'xl:flex-col xl:items-start']}>
			<h1
				class={[
					'font-cormorant text-black-sheep text-center text-6xl/[73px] font-light',
					'lg:text-7xl/[87px]',
					'xl:ml-[66px]',
					'xl:ml-[70px] 2xl:text-8xl/[116px]'
				]}
			>
				{page.status}
			</h1>

			<p
				class={[
					'font-cormorant text-black-sheep text-center text-3xl/[36px] font-light',
					'lg:text-4xl/[44px]',
					'2xl:text-5xl/[58px]'
				]}
			>
				{page.error?.message}
			</p>
		</div>

		<div
			class={[
				'mx-auto mt-5 max-w-[213px] space-y-4',
				'sm:max-w-[300px]',
				'lg:max-w-[379px]',
				'2xl:max-w-[506px]'
			]}
		>
			<p
				class={[
					'font-cormorant text-black-sheep text-sm/[17px] font-light',
					'sm:text-base/[19px]',
					'lg:text-lg/[22px]'
				]}
			>
				{errorMessageLine1}
			</p>
			<p
				class={[
					'font-cormorant text-black-sheep text-sm/[17px] font-light',
					'sm:text-base/[19px]',
					'lg:text-lg/[22px]'
				]}
			>
				“Even the best designs sometimes need a second draft. Let’s try again.”
			</p>
		</div>

		<div class={['mt-5 flex justify-center', 'md:justify-end', 'xl:justify-start']}>
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
		src="$lib/assets/404ErrorPage_8.png?w=359;389;529;664;718;778;1058;1328"
		alt=""
		sizes="(min-width: 1280px) 664px, (min-width: 1024px) 529px, (min-width: 640px) 389px, 358px"
		class={['h-auto w-[359px]', 'sm:w-[389px]', 'lg:w-[529px]', 'xl:w-[664px]']}
		draggable="false"
	/>
</div>
