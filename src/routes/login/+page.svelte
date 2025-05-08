<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, enhance, errors, message, submitting } = superForm(data.form);
</script>

<svelte:head>
	<title>Login - Paillette.co</title>
</svelte:head>

<div>
	<h1>Login</h1>
	<form method="POST" use:enhance>
		<div>
			<label for="email">Email:</label>
			<input
				type="email"
				id="email"
				name="email"
				bind:value={$form.email}
				required
				disabled={$submitting}
				aria-invalid={$errors.email ? 'true' : undefined}
				placeholder="your@email.com"
			/>
			{#if $errors.email}
				<p>{$errors.email[0]}</p>
			{/if}
		</div>

		{#if $message}
			<p>{$message}</p>
		{/if}

		<button type="submit" disabled={$submitting}>
			{#if $submitting}Sending OTP...{:else}Send OTP{/if}
		</button>
	</form>
</div>
