<script lang="ts">
	let billToExpanded = $state(false);
	let selectedPaymentMethod = $state('ideal');
	let acceptTerms = $state(false);
</script>

<svelte:head>
	<title>Checkout - Paillette</title>
</svelte:head>

<h1 class="sr-only">Checkout</h1>

<div
	class={[
		'container mx-auto bg-white px-4 pt-9 pb-16',
		'md:px-20',
		'lg:px-[66px] lg:pt-12 lg:pb-20',
		'xl:px-[69px]',
		'2xl:px-[197px]'
	]}
>
	<section class="pt-9 pb-4">
		<h2 class="font-evolventa text-black-sheep ml-[18px] pb-4 text-2xl/[32px]">Contact details</h2>

		<div class="border-black-sheep border-y pt-4 pb-4">
			<div class="font-evolventa text-black-sheep text-lg/[24px]">Lola van Praag</div>
			<div class="font-evolventa text-black-sheep text-lg/[24px]">lola@paillette.com</div>
			<div class="font-evolventa text-black-sheep text-lg/[24px]">0651930499</div>
		</div>
	</section>

	<section>
		<h2 class="font-evolventa text-black-sheep ml-[18px] text-2xl/[32px]">Bill to</h2>

		{#if !billToExpanded}
			<div class="flex items-start justify-between py-4">
				<div class="space-y-4">
					<div>
						<div class="font-evolventa text-black-sheep text-lg/[24px]">Lola van Praag</div>
						<div class="font-evolventa text-black-sheep text-lg/[24px]">Studio Lola van Praag</div>
						<div class="font-evolventa text-black-sheep text-lg/[24px]">invoices@studiolvp.com</div>
						<div class="font-evolventa text-black-sheep text-lg/[24px]">VAT Number</div>
					</div>
					<div>
						<div class="font-evolventa text-black-sheep text-lg/[24px]">Kruitmolen 80</div>
						<div class="font-evolventa text-black-sheep text-lg/[24px]">Street additional</div>
						<div class="font-evolventa text-black-sheep text-lg/[24px]">
							Muiden, Noord-Holland, 1398HA
						</div>
						<div class="font-evolventa text-black-sheep text-lg/[24px]">Netherlands</div>
					</div>
				</div>
				<button
					aria-label="Edit bill to"
					onclick={() => (billToExpanded = true)}
					class="cursor-pointer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="text-black-sheep size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
						/>
					</svg>
				</button>
			</div>
		{:else}
			<div class="border-black-sheep mt-4 border-t pt-4 pb-10">
				<form>
					<div class="flex flex-col gap-y-4">
						<div class="flex flex-col gap-y-1.5">
							<label
								for="firstName"
								class="font-evolventa text-black-sheep ml-[18px] text-lg/[24px]">First name</label
							>
							<input
								type="text"
								id="firstName"
								name="firstName"
								class="font-evolventa text-black-sheep placeholder:text-black-sheep bg-foundation-white w-full rounded-full border-none px-[38px] py-[20px] text-base/[21px]"
							/>
						</div>
						<div class="flex flex-col gap-y-1.5">
							<label for="lastName" class="font-evolventa text-black-sheep ml-[18px] text-lg/[24px]"
								>Last name</label
							>
							<input
								type="text"
								id="lastName"
								name="lastName"
								class="font-evolventa text-black-sheep placeholder:text-black-sheep bg-foundation-white w-full rounded-full border-none px-[38px] py-[20px] text-base/[21px]"
							/>
						</div>
						<div class="flex flex-col gap-y-1.5">
							<label
								for="companyName"
								class="font-evolventa text-black-sheep ml-[18px] text-lg/[24px]">Company name</label
							>
							<input
								type="text"
								id="companyName"
								name="companyName"
								class="font-evolventa text-black-sheep placeholder:text-black-sheep bg-foundation-white w-full rounded-full border-none px-[38px] py-[20px] text-base/[21px]"
							/>
						</div>
						<div class="flex flex-col gap-y-1.5">
							<label
								for="mailInvoiceTo"
								class="font-evolventa text-black-sheep ml-[18px] text-lg/[24px]"
								>Mail invoice to</label
							>
							<input
								type="email"
								id="mailInvoiceTo"
								name="mailInvoiceTo"
								class="font-evolventa text-black-sheep placeholder:text-black-sheep bg-foundation-white w-full rounded-full border-none px-[38px] py-[20px] text-base/[21px]"
							/>
						</div>
						<div class="flex flex-col gap-y-1.5">
							<label
								for="vatNumber"
								class="font-evolventa text-black-sheep ml-[18px] text-lg/[24px]">VAT number</label
							>
							<input
								type="text"
								id="vatNumber"
								name="vatNumber"
								class="font-evolventa text-black-sheep placeholder:text-black-sheep bg-foundation-white w-full rounded-full border-none px-[38px] py-[20px] text-base/[21px]"
							/>
						</div>
						<div class="flex flex-col gap-y-1.5">
							<label for="country" class="font-evolventa text-black-sheep ml-[18px] text-lg/[24px]"
								>Country</label
							>
							<input
								type="text"
								id="country"
								name="country"
								class="font-evolventa text-black-sheep placeholder:text-black-sheep bg-foundation-white w-full rounded-full border-none px-[38px] py-[20px] text-base/[21px]"
							/>
						</div>
						<div class="flex flex-col gap-y-1.5">
							<label for="address" class="font-evolventa text-black-sheep ml-[18px] text-lg/[24px]"
								>Address</label
							>
							<input
								type="text"
								id="address"
								name="address"
								class="font-evolventa text-black-sheep placeholder:text-black-sheep bg-foundation-white w-full rounded-full border-none px-[38px] py-[20px] text-base/[21px]"
							/>
						</div>
						<div class="flex flex-col gap-y-1.5">
							<label for="city" class="font-evolventa text-black-sheep ml-[18px] text-lg/[24px]"
								>City</label
							>
							<input
								type="text"
								id="city"
								name="city"
								class="font-evolventa text-black-sheep placeholder:text-black-sheep bg-foundation-white w-full rounded-full border-none px-[38px] py-[20px] text-base/[21px]"
							/>
						</div>
						<div class="flex flex-col gap-y-1.5">
							<label for="province" class="font-evolventa text-black-sheep ml-[18px] text-lg/[24px]"
								>Province (optional)</label
							>
							<input
								type="text"
								id="province"
								name="province"
								class="font-evolventa text-black-sheep placeholder:text-black-sheep bg-foundation-white w-full rounded-full border-none px-[38px] py-[20px] text-base/[21px]"
							/>
						</div>
						<div class="flex flex-col gap-y-1.5">
							<label
								for="postalCode"
								class="font-evolventa text-black-sheep ml-[18px] text-lg/[24px]">Postal code</label
							>
							<input
								type="text"
								id="postalCode"
								name="postalCode"
								class="font-evolventa text-black-sheep placeholder:text-black-sheep bg-foundation-white w-full rounded-full border-none px-[38px] py-[20px] text-base/[21px]"
							/>
						</div>
					</div>
					<button
						class={[
							'font-evolventa border-black-sheep bg-enoki text-black-sheep mt-16 w-full rounded-full border py-[19px] text-center text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px]',
							'sm:text-lg/6'
						]}>Update & continue</button
					>
				</form>
				<div class="mt-9 flex justify-center">
					<button
						type="button"
						onclick={() => (billToExpanded = false)}
						class="font-evolventa text-black-sheep border-black-sheep border-b pb-1 text-lg/[24px]"
						>Cancel</button
					>
				</div>
			</div>
		{/if}
	</section>

	<section>
		<div class="border-black-sheep border-b py-4">
			<h2 class="font-evolventa text-black-sheep ml-[18px] text-2xl/[32px]">What's in my bag</h2>
		</div>
		<div class="ml-[17px] flex flex-col gap-y-9 py-9">
			{#each { length: 2 }}
				<div class="flex items-center gap-x-[42px]">
					<div
						class="size-[171px] rounded-[10px] bg-[#d9d9d9] shadow-[5px_5px_20px_rgba(0,0,0,0.05)]"
					></div>
					<div class="font-evolventa text-black-sheep text-xl/[27px]">Print name</div>
				</div>
			{/each}
		</div>

		<div class="flex justify-between px-4 pb-9">
			<div class="font-evolventa text-black-sheep text-lg/[24px]">Number of items</div>
			<div class="font-evolventa text-black-sheep text-lg/[24px]">2</div>
		</div>
		<div class="border-black-sheep flex flex-col gap-y-4 border-t py-4">
			<div class="flex justify-between px-4">
				<div class="font-evolventa text-black-sheep text-lg/[24px]">Item subtotal</div>
				<div class="font-evolventa text-black-sheep text-lg/[24px]">€1600</div>
			</div>
			<div class="flex justify-between px-4">
				<div class="font-evolventa text-black-sheep text-lg/[24px]">VAT</div>
				<div class="font-evolventa text-black-sheep text-lg/[24px]">€230</div>
			</div>
		</div>
		<div class="border-black-sheep border-t pt-4 pb-16">
			<div class="flex justify-between px-4">
				<div class="font-evolventa text-black-sheep text-lg/[24px]">Total</div>
				<div class="font-evolventa text-black-sheep text-lg/[24px]">€1830</div>
			</div>
		</div>
	</section>

	<section>
		<div class="border-black-sheep border-b py-4">
			<h2 class="font-evolventa text-black-sheep ml-[20px] text-2xl/[32px]">Payment</h2>
		</div>

		<p class="font-evolventa text-black-sheep mt-4 text-sm/[19px]">
			All transactions are secure and encrypted.
		</p>

		<div class="bg-enoki mx-[9px] mt-4">
			<label
				class="border-black-sheep flex cursor-pointer items-center gap-x-8 rounded-t-[10px] border p-4"
			>
				<input
					type="radio"
					name="paymentMethod"
					value="ideal"
					bind:group={selectedPaymentMethod}
					class="sr-only"
				/>
				{#if selectedPaymentMethod === 'ideal'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="text-black-sheep size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				{:else}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="text-black-sheep"
					>
						<path
							d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{/if}
				<div class="font-evolventa text-black-sheep text-base/[35px] tracking-[0.05px]">Ideal</div>
			</label>

			<label class="border-black-sheep/20 flex cursor-pointer items-center gap-x-8 border p-4">
				<input
					type="radio"
					name="paymentMethod"
					value="mollie"
					bind:group={selectedPaymentMethod}
					class="sr-only"
				/>
				{#if selectedPaymentMethod === 'mollie'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="text-black-sheep size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				{:else}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="text-black-sheep"
					>
						<path
							d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{/if}
				<div class="font-evolventa text-black-sheep text-base/[35px] tracking-[0.05px]">Mollie</div>
			</label>

			<label class="border-black-sheep/20 flex cursor-pointer items-center gap-x-8 border p-4">
				<input
					type="radio"
					name="paymentMethod"
					value="apple-card"
					bind:group={selectedPaymentMethod}
					class="sr-only"
				/>
				{#if selectedPaymentMethod === 'apple-card'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="text-black-sheep size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				{:else}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="text-black-sheep"
					>
						<path
							d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{/if}
				<div class="font-evolventa text-black-sheep text-base/[35px] tracking-[0.05px]">
					Apple card
				</div>
			</label>

			<label
				class="border-black-sheep/20 flex cursor-pointer items-center gap-x-8 rounded-b-[10px] border p-4"
			>
				<input
					type="radio"
					name="paymentMethod"
					value="creditcard"
					bind:group={selectedPaymentMethod}
					class="sr-only"
				/>
				{#if selectedPaymentMethod === 'creditcard'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="text-black-sheep size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
				{:else}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="text-black-sheep"
					>
						<path
							d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{/if}
				<div class="font-evolventa text-black-sheep text-base/[35px] tracking-[0.05px]">
					Creditcard
				</div>
			</label>
		</div>

		<label
			class="border-black-sheep mt-9 flex cursor-pointer items-center gap-x-[33px] border-y py-4"
		>
			<input type="checkbox" bind:checked={acceptTerms} class="sr-only" />
			{#if acceptTerms}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="text-black-sheep size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>
			{:else}
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="text-black-sheep"
				>
					<path
						d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{/if}
			<div class="font-evolventa text-black-sheep text-lg/[24px]">
				I accept the terms and conditions.
			</div>
		</label>

		<button
			class={[
				'font-evolventa border-black-sheep bg-enoki text-black-sheep mt-9 w-full rounded-full border py-[19px] text-center text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px]',
				'sm:text-lg/6'
			]}>Continue to payment</button
		>
	</section>
</div>
