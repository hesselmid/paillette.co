<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import Superdebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	let { data } = $props();

	const { form, errors, enhance, message, submitting, constraints } = superForm(data.form, {
		dataType: 'json'
	});

	function addColorway() {
		const newColorway = {
			name: '',
			imageUrl: '',
			colorIds: []
		};
		$form.colorways = [...$form.colorways, newColorway];
	}

	function removeColorway(index: number) {
		$form.colorways = $form.colorways.filter((_, i) => i !== index);
	}

	if ($form.colorways.length === 0) {
		addColorway();
	}
</script>

<Superdebug data={$form} />

<svelte:head>
	<title>Add New Print - Admin - Paillette.co</title>
</svelte:head>

<div>
	<h1>Add New Print</h1>

	{#if $message}
		<p>
			{$message}
		</p>
	{/if}

	<form method="POST" use:enhance>
		<fieldset>
			<legend>Print Details</legend>
			<div>
				<label for="printName">Print Name*</label>
				<input
					type="text"
					id="printName"
					name="printName"
					bind:value={$form.printName}
					aria-invalid={$errors.printName ? 'true' : undefined}
					required={$constraints.printName?.required}
				/>
				{#if $errors.printName}<p>{$errors.printName[0]}</p>{/if}
			</div>

			<div>
				<label for="description">Description</label>
				<textarea
					id="description"
					name="description"
					bind:value={$form.description}
					aria-invalid={$errors.description ? 'true' : undefined}
				></textarea>
				{#if $errors.description}<p>{$errors.description[0]}</p>{/if}
			</div>

			<div>
				<label for="priceCents">Price (e.g., 19.99)*</label>
				<input
					type="text"
					id="priceCents"
					name="priceCents"
					bind:value={$form.priceCents}
					aria-invalid={$errors.priceCents ? 'true' : undefined}
					placeholder="e.g., 19.99"
					required={$constraints.priceCents?.required}
				/>
				{#if $errors.priceCents}<p>{$errors.priceCents[0]}</p>{/if}
			</div>

			<div>
				<label for="designerId">Designer*</label>
				<select
					id="designerId"
					name="designerId"
					bind:value={$form.designerId}
					aria-invalid={$errors.designerId ? 'true' : undefined}
					required={$constraints.designerId?.required}
				>
					<option
						value={0}
						disabled
						selected={$form.designerId === 0 ||
							$form.designerId === null ||
							$form.designerId === undefined}
					>
						Select a designer
					</option>
					{#each data.designers as designer (designer.id)}
						<option value={designer.id}>{designer.name}</option>
					{/each}
				</select>
				{#if $errors.designerId}<p>{$errors.designerId[0]}</p>{/if}
			</div>

			<div>
				<label for="categoryIds">Categories* (select multiple)</label>
				<select
					id="categoryIds"
					name="categoryIds"
					multiple
					bind:value={$form.categoryIds}
					aria-invalid={$errors.categoryIds?._errors || $errors.categoryIds?.[0]
						? 'true'
						: undefined}
					required={$constraints.categoryIds?.required}
				>
					{#each data.allCategories as category (category.id)}
						<option value={category.id}>{category.name}</option>
					{/each}
				</select>
				{#if $errors.categoryIds}
					<p>
						{$errors.categoryIds?._errors ? $errors.categoryIds._errors[0] : $errors.categoryIds[0]}
					</p>
				{/if}
			</div>
		</fieldset>

		<fieldset>
			<legend>Colorways*</legend>
			{#if $errors.colorways?._errors}<p>{$errors.colorways._errors[0]}</p>{/if}

			<!-- eslint-disable @typescript-eslint/no-unused-vars -->
			{#each $form.colorways as _, i (i)}
				<div>
					<h4>Colorway {i + 1}</h4>
					<div>
						<label for={`colorways-${i}-name`}>Colorway Name*</label>
						<input
							type="text"
							id={`colorways-${i}-name`}
							name={`colorways[${i}].name`}
							bind:value={$form.colorways[i].name}
							aria-invalid={$errors.colorways?.[i]?.name ? 'true' : undefined}
							required={$constraints.colorways?.name?.required}
						/>
						{#if $errors.colorways?.[i]?.name}<p>{$errors.colorways?.[i]?.name?.[0]}</p>{/if}
					</div>
					<div>
						<label for={`colorways-${i}-imageUrl`}>Image URL</label>
						<input
							type="url"
							id={`colorways-${i}-imageUrl`}
							name={`colorways[${i}].imageUrl`}
							bind:value={$form.colorways[i].imageUrl}
							aria-invalid={$errors.colorways?.[i]?.imageUrl ? 'true' : undefined}
						/>
						{#if $errors.colorways?.[i]?.imageUrl}<p>
								{$errors.colorways?.[i]?.imageUrl?._errors?.[0]}
							</p>{/if}
					</div>
					<div>
						<label for={`colorways-${i}-colorIds`}>Colors* (select multiple)</label>
						<select
							id={`colorways-${i}-colorIds`}
							name={`colorways[${i}].colorIds`}
							multiple
							bind:value={$form.colorways[i].colorIds}
							aria-invalid={$errors.colorways?.[i]?.colorIds?._errors ||
							$errors.colorways?.[i]?.colorIds?.[0]
								? 'true'
								: undefined}
							required={$constraints.colorways?.colorIds?.required}
						>
							{#each data.allColors as color (color.id)}
								<option value={color.id}>{color.name}</option>
							{/each}
						</select>
						{#if $errors.colorways?.[i]?.colorIds}
							<p>
								{$errors.colorways?.[i]?.colorIds?._errors
									? $errors.colorways[i].colorIds._errors[0]
									: $errors.colorways?.[i]?.colorIds?.[0]}
							</p>
						{/if}
					</div>
					<button
						type="button"
						onclick={() => removeColorway(i)}
						disabled={$form.colorways.length <= 1}
					>
						Remove Colorway
					</button>
					<hr />
				</div>
			{/each}
			<button type="button" onclick={addColorway}>Add Colorway</button>
		</fieldset>

		<button type="submit" disabled={$submitting}>
			{#if $submitting}Submitting...{:else}Create Print{/if}
		</button>
	</form>
</div>
