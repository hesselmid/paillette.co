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
	<form method="POST" class="flex flex-col gap-y-5" use:enhance>
		<div>
			<label for="email" class="sr-only">Email:</label>
			<input
				type="email"
				name="email"
				id="email"
				bind:value={$form.email}
				placeholder="Email"
				required
				disabled={$submitting}
				aria-invalid={$errors.email ? 'true' : undefined}
				class={[
					'font-evolventa bg-foundation-white text-black-sheep placeholder:text-black-sheep w-full rounded-full px-[38px] py-[20px] text-base/[21px]',
					'sm:text-lg/[24px]',
					'md:text-xl/[27px]',
					'lg:text-2xl/[32px]'
				]}
			/>
			{#if $errors.email}
				<p>{$errors.email[0]}</p>
			{/if}
		</div>

		{#if $message}
			<p>{$message}</p>
		{/if}

		<button
			type="submit"
			disabled={$submitting}
			class={[
				'font-evolventa border-black-sheep text-black-sheep cursor-pointer self-start rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]',
				'sm:text-lg/6'
			]}
		>
			{#if $submitting}Sending OTP...{:else}Send OTP{/if}
		</button>
	</form>
</div>
