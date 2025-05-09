<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const { form, enhance, errors, message, submitting, constraints } = superForm(data.form, {
		resetForm: false
	});
</script>

<svelte:head>
	<title>Edit Profile - Paillette.co</title>
</svelte:head>

<div>
	<h1>Edit Your Profile</h1>

	<form method="POST" use:enhance>
		<div>
			<label for="firstName">First Name</label>
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
				{#each $errors.firstName as errorMsg (errorMsg)}
					<p>{errorMsg}</p>
				{/each}
			{/if}
		</div>

		<div>
			<label for="lastName">Last Name</label>
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
				{#each $errors.lastName as errorMsg (errorMsg)}
					<p>{errorMsg}</p>
				{/each}
			{/if}
		</div>

		<div>
			<label for="companyName">Company Name</label>
			<input
				type="text"
				id="companyName"
				name="companyName"
				bind:value={$form.companyName}
				disabled={$submitting}
				aria-invalid={$errors.companyName ? 'true' : undefined}
			/>
			{#if $errors.companyName}
				{#each $errors.companyName as errorMsg (errorMsg)}
					<p>{errorMsg}</p>
				{/each}
			{/if}
		</div>

		<fieldset>
			<legend>Billing Address</legend>
			<p>If you’d like to add a postal address to every invoice, enter it here.</p>

			<div>
				<label for="streetAndNumber">Street and Number</label>
				<input
					type="text"
					id="streetAndNumber"
					name="streetAndNumber"
					bind:value={$form.streetAndNumber}
					disabled={$submitting}
					aria-invalid={$errors.streetAndNumber ? 'true' : undefined}
				/>
				{#if $errors.streetAndNumber}
					{#each $errors.streetAndNumber as errorMsg (errorMsg)}
						<p>{errorMsg}</p>
					{/each}
				{/if}
			</div>

			<div>
				<label for="streetAdditional">Additional Address Line (e.g., Apt, Suite)</label>
				<input
					type="text"
					id="streetAdditional"
					name="streetAdditional"
					bind:value={$form.streetAdditional}
					disabled={$submitting}
					aria-invalid={$errors.streetAdditional ? 'true' : undefined}
				/>
				{#if $errors.streetAdditional}
					{#each $errors.streetAdditional as errorMsg (errorMsg)}
						<p>{errorMsg}</p>
					{/each}
				{/if}
			</div>

			<div>
				<label for="postalCode">Postal Code</label>
				<input
					type="text"
					id="postalCode"
					name="postalCode"
					bind:value={$form.postalCode}
					disabled={$submitting}
					aria-invalid={$errors.postalCode ? 'true' : undefined}
				/>
				{#if $errors.postalCode}
					{#each $errors.postalCode as errorMsg (errorMsg)}
						<p>{errorMsg}</p>
					{/each}
				{/if}
			</div>

			<div>
				<label for="city">City</label>
				<input
					type="text"
					id="city"
					name="city"
					bind:value={$form.city}
					disabled={$submitting}
					aria-invalid={$errors.city ? 'true' : undefined}
				/>
				{#if $errors.city}
					{#each $errors.city as errorMsg (errorMsg)}
						<p>{errorMsg}</p>
					{/each}
				{/if}
			</div>

			<div>
				<label for="region">Region/State/Province (Optional)</label>
				<input
					type="text"
					id="region"
					name="region"
					bind:value={$form.region}
					disabled={$submitting}
					aria-invalid={$errors.region ? 'true' : undefined}
				/>
				{#if $errors.region}
					{#each $errors.region as errorMsg (errorMsg)}
						<p>{errorMsg}</p>
					{/each}
				{/if}
			</div>

			<div>
				<label for="country">Country (2-letter ISO code, e.g., US, GB)</label>
				<input
					type="text"
					id="country"
					name="country"
					bind:value={$form.country}
					minlength="2"
					maxlength="2"
					title="Enter a 2-letter ISO country code"
					disabled={$submitting}
					aria-invalid={$errors.country ? 'true' : undefined}
					style="text-transform: uppercase;"
				/>
				{#if $errors.country}
					{#each $errors.country as errorMsg (errorMsg)}
						<p>{errorMsg}</p>
					{/each}
				{/if}
			</div>
		</fieldset>

		{#if $message}
			<p>{$message}</p>
		{/if}

		<button type="submit" disabled={$submitting}>
			{#if $submitting}Saving...{:else}Save{/if}
		</button>
	</form>

	<p><a href="/account/dashboard">Back to Dashboard</a></p>
</div>
