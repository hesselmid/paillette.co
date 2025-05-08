<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();

	let submitting = $state(false);
</script>

<svelte:head>
	<title>Login - Paillette.co</title>
</svelte:head>

<div>
	<h1>Login</h1>
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
			<label for="email">Email:</label>
			<input
				type="email"
				id="email"
				name="email"
				value={form?.email ?? ''}
				required
				disabled={submitting}
			/>
		</div>
		{#if form?.error}
			<p>{form.error}</p>
		{/if}
		<button type="submit" disabled={submitting}>
			{#if submitting}Sending OTP...{:else}Send OTP{/if}
		</button>
	</form>
</div>
