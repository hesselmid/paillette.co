<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let submittingCleanup = $state(false);
</script>

<svelte:head>
	<title>Dashboard - Paillette.co</title>
</svelte:head>

<div class={['bg-white py-[60px]', 'lg:py-20']}>
	<div class="container mx-auto">
		{#if data.currentUser}
			<h1
				class={[
					'font-apfel-grotezk-brukt text-black-sheep text-center text-5xl/[62px]',
					'lg:text-6xl/[77px]'
				]}
			>
				Hi, {data.currentUser.firstName}!
			</h1>
		{/if}

		<div class={['mt-16px flex flex-col items-center gap-y-[18px]', 'lg:flex-row']}>
			<a
				href="/admin/applications"
				class="bg-enoki border-dementer-green flex w-[308px] flex-col items-center gap-y-9 rounded-[10px] border px-[28px] pt-[60px] pb-[55px]"
			>
				<span class={['font-cormorant text-black-sheep text-4xl/[44px] font-light']}
					>Applications</span
				>
				<hr class="border-dementer-green w-full border-t" />
				<p class={['font-evolventa text-black-sheep text-lg/[24px]']}>See new applications</p>
			</a>
			<a
				href="/admin/orders"
				class="bg-enoki border-dementer-green flex w-[308px] flex-col items-center gap-y-9 rounded-[10px] border px-[28px] pt-[60px] pb-[55px]"
			>
				<span class={['font-cormorant text-black-sheep text-4xl/[44px] font-light']}>Orders</span>
				<hr class="border-dementer-green w-full border-t" />
				<p class={['font-evolventa text-black-sheep text-lg/[24px]']}>See orders</p>
			</a>
			<a
				href="/admin/prints"
				class="bg-enoki border-dementer-green flex w-[308px] flex-col items-center gap-y-9 rounded-[10px] border px-[28px] pt-[60px] pb-[55px]"
			>
				<span class={['font-cormorant text-black-sheep text-4xl/[44px] font-light']}>Prints</span>
				<hr class="border-dementer-green w-full border-t" />
				<p class={['font-evolventa text-black-sheep text-lg/[24px]']}>See prints</p>
			</a>
			<a
				href="/admin/users"
				class="bg-enoki border-dementer-green flex w-[308px] flex-col items-center gap-y-9 rounded-[10px] border px-[28px] pt-[60px] pb-[55px]"
			>
				<span class={['font-cormorant text-black-sheep text-4xl/[44px] font-light']}>Users</span>
				<hr class="border-dementer-green w-full border-t" />
				<p class={['font-evolventa text-black-sheep text-lg/[24px]']}>See users</p>
			</a>
		</div>

		<hr />

		<h2>Session Management</h2>
		<form
			method="POST"
			action="?/cleanupSessions"
			use:enhance={() => {
				submittingCleanup = true;
				return async ({ update }) => {
					await update();
					submittingCleanup = false;
				};
			}}
		>
			<button
				type="submit"
				disabled={submittingCleanup}
				class={[
					'font-evolventa border-black-sheep text-black-sheep cursor-pointer rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]',
					'sm:text-lg/6'
				]}
			>
				{#if submittingCleanup}
					Cleaning up...
				{:else}
					Cleanup Expired Sessions
				{/if}
			</button>
		</form>

		{#if form?.success && form?.message}
			<p>{form.message}</p>
		{/if}
		{#if !form?.success && form?.message}
			<p>{form.message}</p>
		{/if}

		<hr />

		<form method="POST" action="/logout">
			<button
				type="submit"
				class={[
					'font-evolventa border-black-sheep text-black-sheep cursor-pointer rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px] disabled:cursor-not-allowed disabled:border disabled:bg-[#ececec] disabled:px-[37px] disabled:py-[19px]',
					'sm:text-lg/6'
				]}>Logout</button
			>
		</form>
	</div>
</div>
