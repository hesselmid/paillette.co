<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Account - Paillette.co</title>
</svelte:head>

<div>
	<h1>Welcome to Your Dashboard</h1>

	{#if data.currentUser}
		<p>
			Hello, {data.currentUser.firstName}!
			{#if data.currentUser.companyName}
				(from {data.currentUser.companyName})
			{/if}
		</p>
	{:else}
		<p>Loading user data...</p>
	{/if}

	<p>Here you can manage your account, view orders, and more.</p>

	<a href="/account/orders">My Orders</a>
	<a href="/wishlist">Wish List</a>
	<a href="/account/profile">Account Details</a>

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
