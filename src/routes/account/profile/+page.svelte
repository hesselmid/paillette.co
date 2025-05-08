<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, enhance, errors, message, submitting, constraints } = superForm(data.form);
</script>

<svelte:head>
	<title>Edit Profile - Paillette.co</title>
</svelte:head>

<div>
	<h1>Edit Your Profile</h1>
	{#if data.userEmail}
		<p>Editing profile for: {data.userEmail}</p>
	{/if}

	<form method="POST" use:enhance>
		<div>
			<label for="firstName">First Name:</label>
			<input
				type="text"
				id="firstName"
				name="firstName"
				bind:value={$form.firstName}
				disabled={$submitting}
				aria-invalid={$errors.firstName ? 'true' : undefined}
				required={$constraints.firstName?.required}
			/>
			{#if $errors.firstName}
				<p>{$errors.firstName[0]}</p>
			{/if}
		</div>

		<div>
			<label for="lastName">Last Name:</label>
			<input
				type="text"
				id="lastName"
				name="lastName"
				bind:value={$form.lastName}
				disabled={$submitting}
				aria-invalid={$errors.lastName ? 'true' : undefined}
				required={$constraints.lastName?.required}
			/>
			{#if $errors.lastName}
				<p>{$errors.lastName[0]}</p>
			{/if}
		</div>

		<div>
			<label for="companyName">Company Name (Optional):</label>
			<input
				type="text"
				id="companyName"
				name="companyName"
				bind:value={$form.companyName}
				disabled={$submitting}
				aria-invalid={$errors.companyName ? 'true' : undefined}
			/>
			{#if $errors.companyName}
				<p>{$errors.companyName[0]}</p>
			{/if}
		</div>

		{#if $message}
			<p>{$message}</p>
		{/if}

		<button type="submit" disabled={$submitting}>
			{#if $submitting}Saving...{:else}Save Changes{/if}
		</button>
	</form>

	<p><a href="/account/dashboard">Back to Dashboard</a></p>
</div>
