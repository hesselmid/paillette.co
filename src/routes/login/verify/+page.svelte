<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let submitting = $state(false);
</script>

<div>
	<h1>Verification</h1>
	<p>If you have an account, we have sent a code to {data.email}. Enter it below.</p>
	<form
		method="POST"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		<div>
			<label for="otp">OTP:</label>
			<input
				type="text"
				id="otp"
				name="otp"
				pattern="\d*"
				title="Enter 6-digit OTP"
				autocomplete="one-time-code"
				required
				disabled={submitting}
			/>
		</div>
		{#if form?.error}
			<p>{form.error}</p>
		{/if}
		<button type="submit" disabled={submitting}>
			{#if submitting}Verifying...{:else}Verify{/if}
		</button>
	</form>
	<p><a href="/login">Request a new OTP?</a></p>
</div>
