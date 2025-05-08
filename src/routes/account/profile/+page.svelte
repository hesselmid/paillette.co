<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let formFirstName = $state(form?.data?.firstName ?? data.currentUser.firstName ?? '');
	let formLastName = $state(form?.data?.lastName ?? data.currentUser.lastName ?? '');
	let formCompanyName = $state(form?.data?.companyName ?? data.currentUser.companyName ?? '');

	let submitting = $state(false);

	$effect(() => {
		if (form?.data) {
			formFirstName = form.data.firstName ?? data.currentUser.firstName ?? '';
			formLastName = form.data.lastName ?? data.currentUser.lastName ?? '';
			formCompanyName = form.data.companyName ?? data.currentUser.companyName ?? '';
		} else if (form?.success && form.updatedData) {
			formFirstName = form.updatedData.firstName;
			formLastName = form.updatedData.lastName;
			formCompanyName = form.updatedData.companyName ?? '';
		}
	});
</script>

<svelte:head>
	<title>Edit Profile - Paillette.co</title>
</svelte:head>

<div>
	<h1>Edit Your Profile</h1>

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
			<label for="firstName">First Name:</label>
			<input
				type="text"
				id="firstName"
				name="firstName"
				bind:value={formFirstName}
				required
				disabled={submitting}
			/>
			{#if form?.errors?.firstName}
				<p>{form.errors.firstName[0]}</p>
			{/if}
		</div>

		<div>
			<label for="lastName">Last Name:</label>
			<input
				type="text"
				id="lastName"
				name="lastName"
				bind:value={formLastName}
				required
				disabled={submitting}
			/>
			{#if form?.errors?.lastName}
				<p>{form.errors.lastName[0]}</p>
			{/if}
		</div>

		<div>
			<label for="companyName">Company Name (Optional):</label>
			<input
				type="text"
				id="companyName"
				name="companyName"
				bind:value={formCompanyName}
				disabled={submitting}
			/>
			{#if form?.errors?.companyName}
				<p>{form.errors.companyName[0]}</p>
			{/if}
		</div>

		{#if form?.message && !form.success && !form.errors}
			<p>{form.message}</p>
		{/if}
		{#if form?.success && form.message}
			<p>{form.message}</p>
		{/if}

		<button type="submit" disabled={submitting}>
			{#if submitting}Saving...{:else}Save Changes{/if}
		</button>
	</form>

	<p><a href="/account/dashboard">Back to Dashboard</a></p>
</div>
