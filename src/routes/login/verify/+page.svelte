<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
	export let data: PageData;

	let submitting = false;
</script>

<div>
	<h1>Verify OTP</h1>
	<p>An OTP has been sent to {data.email}. Please enter it below.</p>
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
				pattern="\d{6}"
				title="Enter 6-digit OTP"
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
