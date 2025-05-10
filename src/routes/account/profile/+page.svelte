<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	let { data } = $props();

	const {
		form: personalInfoF,
		enhance: personalInfoEnhance,
		errors: personalInfoE,
		message: personalInfoM,
		submitting: personalInfoS,
		constraints: personalInfoC
	} = superForm(data.personalInfoForm, {
		id: 'personalInfoForm',
		resetForm: false,
		invalidateAll: false
	});

	const {
		form: companyNameF,
		enhance: companyNameEnhance,
		errors: companyNameE,
		message: companyNameM,
		submitting: companyNameS,
		constraints: companyNameC
	} = superForm(data.companyNameForm, {
		id: 'companyNameForm',
		resetForm: false,
		invalidateAll: false
	});

	const {
		form: billingAddressF,
		enhance: billingAddressEnhance,
		errors: billingAddressE,
		message: billingAddressM,
		submitting: billingAddressS,
		constraints: billingAddressC
	} = superForm(data.billingAddressForm, {
		id: 'billingAddressForm',
		resetForm: false,
		invalidateAll: false
	});
</script>

<svelte:head>
	<title>Edit Profile - Paillette.co</title>
</svelte:head>

<div>
	<h1>Edit Your Profile</h1>

	<section>
		<h2>Personal Information</h2>
		<form method="POST" action="?/updatePersonalInfo" use:personalInfoEnhance>
			<div>
				<label for="firstName">First Name</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					bind:value={$personalInfoF.firstName}
					disabled={$personalInfoS}
					aria-invalid={$personalInfoE.firstName ? 'true' : undefined}
					required={$personalInfoC.firstName?.required}
				/>
				{#if $personalInfoE.firstName}
					<p>{$personalInfoE.firstName[0]}</p>
				{/if}
			</div>
			<div>
				<label for="lastName">Last Name</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					bind:value={$personalInfoF.lastName}
					disabled={$personalInfoS}
					aria-invalid={$personalInfoE.lastName ? 'true' : undefined}
					required={$personalInfoC.lastName?.required}
				/>
				{#if $personalInfoE.lastName}
					<p>{$personalInfoE.lastName[0]}</p>
				{/if}
			</div>
			{#if $personalInfoM}
				<p>{$personalInfoM}</p>
			{/if}
			<button type="submit" disabled={$personalInfoS}>
				{#if $personalInfoS}Saving...{:else}Save Personal Info{/if}
			</button>
		</form>
	</section>
	<hr />

	<section>
		<h2>Company Information</h2>
		<form method="POST" action="?/updateCompanyName" use:companyNameEnhance>
			<div>
				<label for="companyNamePF">Company Name</label>
				<input
					type="text"
					id="companyNamePF"
					name="companyName"
					bind:value={$companyNameF.companyName}
					disabled={$companyNameS}
					aria-invalid={$companyNameE.companyName ? 'true' : undefined}
					required={$companyNameC.companyName?.required}
				/>
				{#if $companyNameE.companyName}
					<p>{$companyNameE.companyName[0]}</p>
				{/if}
			</div>
			{#if $companyNameM}
				<p>{$companyNameM}</p>
			{/if}
			<button type="submit" disabled={$companyNameS}>
				{#if $companyNameS}Saving...{:else}Save Company Name{/if}
			</button>
		</form>
	</section>
	<hr />

	<section>
		<h2>Billing Address</h2>
		<p>If you’d like to add a postal address to every invoice, enter it here.</p>

		<form method="POST" action="?/updateBillingAddress" use:billingAddressEnhance>
			<div>
				<label for="streetAndNumberBA">Street and Number</label>
				<input
					type="text"
					id="streetAndNumberBA"
					name="streetAndNumber"
					bind:value={$billingAddressF.streetAndNumber}
					disabled={$billingAddressS}
					aria-invalid={$billingAddressE.streetAndNumber ? 'true' : undefined}
					required={$billingAddressC.streetAndNumber?.required}
				/>
				{#if $billingAddressE.streetAndNumber}
					<p>{$billingAddressE.streetAndNumber[0]}</p>
				{/if}
			</div>

			<div>
				<label for="streetAdditionalBA">Additional Address Line (e.g., Apt, Suite)</label>
				<input
					type="text"
					id="streetAdditionalBA"
					name="streetAdditional"
					bind:value={$billingAddressF.streetAdditional}
					disabled={$billingAddressS}
					aria-invalid={$billingAddressE.streetAdditional ? 'true' : undefined}
				/>
				{#if $billingAddressE.streetAdditional}
					<p>{$billingAddressE.streetAdditional[0]}</p>
				{/if}
			</div>

			<div>
				<label for="postalCodeBA">Postal Code</label>
				<input
					type="text"
					id="postalCodeBA"
					name="postalCode"
					bind:value={$billingAddressF.postalCode}
					disabled={$billingAddressS}
					aria-invalid={$billingAddressE.postalCode ? 'true' : undefined}
					required={$billingAddressC.postalCode?.required}
				/>
				{#if $billingAddressE.postalCode}
					<p>{$billingAddressE.postalCode[0]}</p>
				{/if}
			</div>
			<div>
				<label for="cityBA">City</label>
				<input
					type="text"
					id="cityBA"
					name="city"
					bind:value={$billingAddressF.city}
					disabled={$billingAddressS}
					aria-invalid={$billingAddressE.city ? 'true' : undefined}
					required={$billingAddressC.city?.required}
				/>
				{#if $billingAddressE.city}
					<p>{$billingAddressE.city[0]}</p>
				{/if}
			</div>
			<div>
				<label for="regionBA">Region/State/Province (Optional)</label>
				<input
					type="text"
					id="regionBA"
					name="region"
					bind:value={$billingAddressF.region}
					disabled={$billingAddressS}
					aria-invalid={$billingAddressE.region ? 'true' : undefined}
				/>
				{#if $billingAddressE.region}
					<p>{$billingAddressE.region[0]}</p>
				{/if}
			</div>
			<div>
				<label for="countryBA">Country</label>
				<select
					id="countryBA"
					name="country"
					bind:value={$billingAddressF.country}
					disabled={$billingAddressS}
					aria-invalid={$billingAddressE.country ? 'true' : undefined}
					required={$billingAddressC.country?.required}
				>
					<option
						value=""
						selected={$billingAddressF.country === '' || $billingAddressF.country === null}
						>Select a country</option
					>
					{#each data.countries as c (c.code)}
						<option value={c.code}>{c.name}</option>
					{/each}
				</select>
				{#if $billingAddressE.country}
					<p>{$billingAddressE.country[0]}</p>
				{/if}
			</div>
			{#if $billingAddressM}
				<p>{$billingAddressM}</p>
			{/if}
			<button type="submit" disabled={$billingAddressS}>
				{#if $billingAddressS}Saving...{:else}Save Billing Address{/if}
			</button>
		</form>
	</section>

	<p><a href="/account/dashboard">Back to Dashboard</a></p>
</div>
