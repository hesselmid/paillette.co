<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;

	let submitting = false;
</script>

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
