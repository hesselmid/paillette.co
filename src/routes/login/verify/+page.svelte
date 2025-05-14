<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, enhance, errors, message, submitting } = superForm(data.form);
</script>

<div>
	<h1>Verification</h1>
	{#if data.email}
		<p>
			If you have an account, we have sent a code to <strong>{data.email}</strong>. Enter it below.
		</p>
	{:else}
		<p>Loading email information or session expired. <a href="/login">Try logging in again.</a></p>
	{/if}

	<form method="POST" use:enhance>
		<div>
			<label for="otp">OTP:</label>
			<input
				type="text"
				id="otp"
				name="otp"
				bind:value={$form.otp}
				pattern="\d*"
				minlength="6"
				maxlength="6"
				title="Enter 6-digit OTP"
				autocomplete="one-time-code"
				required
				disabled={$submitting || !data.email}
				aria-invalid={$errors.otp ? 'true' : undefined}
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
