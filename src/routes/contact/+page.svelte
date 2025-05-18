<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, enhance, errors, message, submitting } = superForm(data.form);
</script>

<svelte:head>
	<title>Contact - Paillette.co</title>
</svelte:head>

<section class={['bg-white py-16', 'xl:py-20']}>
	<div class="container mx-auto">
		<div
			class={[
				'flex flex-col items-center gap-y-9',
				'md:gap-y-0',
				'lg:flex-row lg:justify-center lg:gap-x-[59px]',
				'xl:gap-x-[45px]',
				'2xl:gap-x-[70px]'
			]}
		>
			<h1
				class={[
					'font-cormorant text-black-sheep max-w-[358px] text-center text-3xl/[36px] font-light italic',
					'sm:max-w-[608px] sm:text-left sm:text-4xl/[44px]',
					'md:max-w-[704px] md:text-5xl/[58px]',
					'lg:max-w-[459px]',
					'xl:max-w-[573px] xl:text-6xl/[73px]',
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
				class={[
					'h-auto w-[358px]',
					'sm:w-[426px]',
					'md:translate-x-[139px] md:-translate-y-3.5',
					'lg:translate-x-0 lg:translate-y-0',
					'xl:w-[534px]',
					'2xl:w-[629px]'
				]}
			/>
		</div>
	</div>
</section>

<section class={['bg-enoki py-16', 'xl:py-20']}>
	<form
		method="POST"
		use:enhance
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
				bind:value={$form.name}
				placeholder="name*"
				aria-invalid={$errors.name ? 'true' : undefined}
				class={[
					'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
					'sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			/>
			{#if $errors.name}
				<ul aria-live="polite" class="mt-2.5 -mb-2.5 space-y-2.5">
					{#each $errors.name as error (error)}
						<li class="font-cormorant text-grapefruit text-xs/[18px] tracking-[1px] italic">
							{error}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<div>
			<label for="company" class="sr-only">Company</label>
			<input
				type="text"
				name="company"
				id="company"
				bind:value={$form.company}
				placeholder="which company do you represent*"
				aria-invalid={$errors.company ? 'true' : undefined}
				class={[
					'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
					'sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			/>
			{#if $errors.company}
				<ul aria-live="polite" class="mt-2.5 -mb-2.5 space-y-2.5">
					{#each $errors.company as error (error)}
						<li class="font-cormorant text-grapefruit text-xs/[18px] tracking-[1px] italic">
							{error}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<div>
			<label for="email" class="sr-only">Email</label>
			<input
				type="email"
				name="email"
				id="email"
				bind:value={$form.email}
				placeholder="e-mail address*"
				aria-invalid={$errors.email ? 'true' : undefined}
				class={[
					'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
					'sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			/>
			{#if $errors.email}
				<ul aria-live="polite" class="mt-2.5 -mb-2.5 space-y-2.5">
					{#each $errors.email as error (error)}
						<li class="font-cormorant text-grapefruit text-xs/[18px] tracking-[1px] italic">
							{error}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<div>
			<label for="message" class="sr-only">Message</label>
			<textarea
				name="message"
				id="message"
				bind:value={$form.message}
				placeholder="message*"
				aria-invalid={$errors.message ? 'true' : undefined}
				class={[
					'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep h-[241px] w-full rounded-[40px] px-[38px] py-[20px] text-base/[21px]',
					'sm:h-[369px] sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			></textarea>
			{#if $errors.message}
				<ul aria-live="polite" class="mt-2.5 -mb-2.5 space-y-2.5">
					{#each $errors.message as error (error)}
						<li class="font-cormorant text-grapefruit text-xs/[18px] tracking-[1px] italic">
							{error}
						</li>
					{/each}
				</ul>
			{/if}
		</div>

		{#if $message}
			<p>{$message}</p>
		{/if}

		<button
			type="submit"
			disabled={$submitting}
			class={[
				'font-evolventa border-black-sheep text-black-sheep cursor-pointer self-start rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]',
				'sm:text-lg/6'
			]}>Send</button
		>
	</form>
</section>
