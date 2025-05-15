<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, enhance, errors, message, submitting } = superForm(data.form);
</script>

<svelte:head>
	<title>Verify - Paillette.co</title>
</svelte:head>

<div class={['bg-white py-16', 'lg:py-20']}>
	<h1
		class={[
			'font-apfel-grotezk-brukt text-black-sheep text-center text-3xl/[38px]',
			'sm:text-4xl/[46px]',
			'md:text-5xl/[62px]',
			'lg:text-6xl/[77px]'
		]}
	>
		Verification
	</h1>
	{#if data.email}
		<p>
			If you have an account, we have sent a code to <strong>{data.email}</strong>. Enter it below.
		</p>
	{:else}
		<p>Loading email information or session expired. <a href="/login">Try logging in again.</a></p>
	{/if}

	<form
		method="POST"
		class={['mx-auto mt-16 flex max-w-[324px] flex-col gap-y-5', 'sm:max-w-[490px]', 'lg:mt-20']}
		use:enhance
	>
		<div>
			<label for="otp" class="sr-only">OTP:</label>
			<input
				type="text"
				id="otp"
				name="otp"
				bind:value={$form.otp}
				placeholder="012345"
				pattern="\d*"
				minlength="6"
				maxlength="6"
				title="Enter 6-digit OTP"
				autocomplete="one-time-code"
				required
				disabled={$submitting || !data.email}
				aria-invalid={$errors.otp ? 'true' : undefined}
				class={[
					'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
					'sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			/>
			{#if $errors.otp}
				<p>{$errors.otp[0]}</p>
			{/if}
		</div>

		{#if $message}
			<p>{$message}</p>
		{/if}

		<button
			type="submit"
			disabled={$submitting || !data.email}
			class={[
				'font-evolventa border-black-sheep text-black-sheep cursor-pointer rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]',
				'sm:text-lg/6'
			]}
		>
			{#if $submitting}Verifying...{:else}Verify{/if}
		</button>
	</form>
	{#if data.email}
		<p><a href="/login">Request a new OTP?</a></p>
	{/if}
</div>
