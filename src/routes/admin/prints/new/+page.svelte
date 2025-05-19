<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

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

<svelte:head>
	<title>Add New Print - Admin - Paillette.co</title>
</svelte:head>

<section class={['bg-white py-16', 'xl:py-20']}>
	<div class="container mx-auto">
		<h1
			class={[
				'font-apfel-grotezk-brukt text-black-sheep text-center text-3xl/[38px]',
				'sm:text-4xl/[46px]',
				'md:text-5xl/[62px]',
				'lg:text-6xl/[77px]'
			]}
		>
			Add New Print
		</h1>

		{#if $message}
			<p>
				{$message}
			</p>
		{/if}

		<form
			method="POST"
			use:enhance
			class={[
				'mx-auto mt-9 flex max-w-[356px] flex-col gap-y-5',
				'sm:max-w-[510px]',
				'md:max-w-[612px]',
				'md:max-w-[684px]'
			]}
		>
			<fieldset class="flex flex-col gap-y-5">
				<legend class="font-bold">Print Details</legend>
				<div>
					<label for="printName" class="sr-only">Print Name*</label>
					<input
						type="text"
						id="printName"
						name="printName"
						bind:value={$form.printName}
						placeholder="Print Name"
						aria-invalid={$errors.printName ? 'true' : undefined}
						required={$constraints.printName?.required}
						class={[
							'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
							'sm:text-lg/[24px]',
							'md:text-xl/[27px]',
							'lg:text-2xl/[32px]'
						]}
					/>
					{#if $errors.printName}<p>{$errors.printName[0]}</p>{/if}
				</div>

				<div>
					<label for="description" class="sr-only">Description</label>
					<textarea
						id="description"
						name="description"
						bind:value={$form.description}
						placeholder="Description"
						aria-invalid={$errors.description ? 'true' : undefined}
						class={[
							'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep h-[241px] w-full rounded-[40px] px-[38px] py-[20px] text-base/[21px]',
							'sm:h-[369px] sm:text-lg/[24px]',
							'md:text-xl/[27px]',
							'lg:text-2xl/[32px]'
						]}
					></textarea>
					{#if $errors.description}<p>{$errors.description[0]}</p>{/if}
				</div>

				<div>
					<label for="priceCents" class="sr-only">Price (e.g., 19.99)*</label>
					<input
						type="text"
						id="priceCents"
						name="priceCents"
						bind:value={$form.priceCents}
						aria-invalid={$errors.priceCents ? 'true' : undefined}
						placeholder="e.g., 19.99"
						required={$constraints.priceCents?.required}
						class={[
							'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
							'sm:text-lg/[24px]',
							'md:text-xl/[27px]',
							'lg:text-2xl/[32px]'
						]}
					/>
					{#if $errors.priceCents}<p>{$errors.priceCents[0]}</p>{/if}
				</div>

				<div>
					<label for="designerId" class="sr-only">Designer*</label>
					<select
						id="designerId"
						name="designerId"
						bind:value={$form.designerId}
						aria-invalid={$errors.designerId ? 'true' : undefined}
						required={$constraints.designerId?.required}
						class={[
							'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full appearance-none rounded-full px-[38px] py-[20px] text-base/[21px]',
							'sm:text-lg/[24px]',
							'md:text-xl/[27px]',
							'lg:text-2xl/[32px]'
						]}
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
					<label for="categoryIds" class="sr-only">Categories* (select multiple)</label>
					<select
						id="categoryIds"
						name="categoryIds"
						multiple
						bind:value={$form.categoryIds}
						aria-invalid={$errors.categoryIds?._errors || $errors.categoryIds?.[0]
							? 'true'
							: undefined}
						required={$constraints.categoryIds?.required}
						class={[
							'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-[40px] px-[38px] py-[20px] text-base/[21px]',
							'sm:text-lg/[24px]',
							'md:text-xl/[27px]',
							'lg:text-2xl/[32px]'
						]}
					>
						{#each data.allCategories as category (category.id)}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
					{#if $errors.categoryIds}
						<p>
							{$errors.categoryIds?._errors
								? $errors.categoryIds._errors[0]
								: $errors.categoryIds[0]}
						</p>
					{/if}
				</div>
			</fieldset>

			<fieldset class="flex flex-col gap-y-5">
				<legend class="font-bold">Colorways*</legend>
				{#if $errors.colorways?._errors}<p>{$errors.colorways._errors[0]}</p>{/if}

				<!-- eslint-disable @typescript-eslint/no-unused-vars -->
				{#each $form.colorways as _, i (i)}
					<div class="flex flex-col gap-y-5">
						<h4 class="font-bold">Colorway {i + 1}</h4>
						<div>
							<label for={`colorways-${i}-name`} class="sr-only">Colorway Name*</label>
							<input
								type="text"
								id={`colorways-${i}-name`}
								name={`colorways[${i}].name`}
								bind:value={$form.colorways[i].name}
								placeholder="Colorway Name"
								aria-invalid={$errors.colorways?.[i]?.name ? 'true' : undefined}
								required={$constraints.colorways?.name?.required}
								class={[
									'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
									'sm:text-lg/[24px]',
									'md:text-xl/[27px]',
									'lg:text-2xl/[32px]'
								]}
							/>
							{#if $errors.colorways?.[i]?.name}<p>{$errors.colorways?.[i]?.name?.[0]}</p>{/if}
						</div>
						<div>
							<label for={`colorways-${i}-imageUrl`} class="sr-only">Image URL</label>
							<input
								type="url"
								id={`colorways-${i}-imageUrl`}
								name={`colorways[${i}].imageUrl`}
								bind:value={$form.colorways[i].imageUrl}
								placeholder="Image URL"
								aria-invalid={$errors.colorways?.[i]?.imageUrl ? 'true' : undefined}
								class={[
									'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
									'sm:text-lg/[24px]',
									'md:text-xl/[27px]',
									'lg:text-2xl/[32px]'
								]}
							/>
							{#if $errors.colorways?.[i]?.imageUrl}<p>
									{$errors.colorways?.[i]?.imageUrl?._errors?.[0]}
								</p>{/if}
						</div>
						<div>
							<label for={`colorways-${i}-colorIds`} class="sr-only"
								>Colors* (select multiple)</label
							>
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
								class={[
									'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-[40px] px-[38px] py-[20px] text-base/[21px]',
									'sm:text-lg/[24px]',
									'md:text-xl/[27px]',
									'lg:text-2xl/[32px]'
								]}
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
							class={[
								'font-evolventa border-black-sheep text-black-sheep cursor-pointer self-start rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]',
								'sm:text-lg/6'
							]}
						>
							Remove Colorway
						</button>
						<hr />
					</div>
				{/each}
				<button
					type="button"
					onclick={addColorway}
					class={[
						'font-evolventa border-black-sheep text-black-sheep cursor-pointer self-start rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]',
						'sm:text-lg/6'
					]}>Add Colorway</button
				>
			</fieldset>

			<button
				type="submit"
				disabled={$submitting}
				class={[
					'font-evolventa border-black-sheep text-black-sheep cursor-pointer self-start rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]',
					'sm:text-lg/6'
				]}
			>
				{#if $submitting}Submitting...{:else}Create Print{/if}
			</button>
		</form>
	</div>
</section>
