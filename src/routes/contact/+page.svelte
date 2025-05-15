<svelte:head>
	<title>Contact - Paillette.co</title>
</svelte:head>

<section class={['bg-white py-16', 'xl:py-20']}>
	<div class="container mx-auto">
		<div class={['flex flex-col items-center', 'lg:flex-row lg:justify-center']}>
			<h1
				class={[
					'font-cormorant text-black-sheep max-w-[358px] text-center text-3xl/[36px] font-light italic',
					'sm:max-w-[606px] sm:text-left sm:text-4xl/[44px]',
					'md:max-w-[704px] md:text-5xl/[58px]',
					'lg:max-w-[570px]',
					'xl:max-w-[692px] xl:text-6xl/[73px]',
					'2xl:max-w-[677px] 2xl:text-7xl/[87px]'
				]}
			>
				“Inspired by what you see?<br /> Let’s start a conversation and explore how our prints can tell
				your brand’s unique story.”
			</h1>
			<enhanced:img
				src="$lib/assets/ContactPage_drawing 1.png?w=358;426;534;629;716;852;1068;1258"
				alt=""
				sizes="(min-width: 1536px) 629px, (min-width: 1280px) 534px, (min-width: 640px) 426px, 358px"
				class={['h-auto w-[358px]', 'sm:w-[426px]', 'xl:w-[534px]', '2xl:w-[629px]']}
			/>
		</div>
	</div>
</section>

<section class={['bg-enoki py-16', 'xl:py-20']}>
	<form
		method="POST"
		class={[
			'mx-auto flex max-w-[356px] flex-col gap-y-5',
			'sm:max-w-[510px]',
			'md:max-w-[612px]',
			'md:max-w-[684px]'
		]}
	>
		<div>
			<label for="name" class="sr-only">Name</label>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="name*"
				class={[
					'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
					'sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			/>
		</div>
		<div>
			<label for="company" class="sr-only">Company</label>
			<input
				type="text"
				name="company"
				id="company"
				placeholder="which company do you represent*"
				class={[
					'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
					'sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			/>
		</div>
		<div>
			<label for="email" class="sr-only">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				placeholder="e-mail address*"
				class={[
					'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
					'sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			/>
		</div>
		<div>
			<label for="message" class="sr-only">Message</label>
			<textarea
				name="message"
				id="message"
				placeholder="message*"
				class={[
					'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep h-[241px] w-full rounded-[40px] px-[38px] py-[20px] text-base/[21px]',
					'sm:h-[369px] sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			></textarea>
		</div>
		<button
			type="submit"
			class={[
				'font-evolventa border-black-sheep text-black-sheep cursor-pointer self-start rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]',
				'sm:text-lg/6'
			]}>Send</button
		>
	</form>
</section>
