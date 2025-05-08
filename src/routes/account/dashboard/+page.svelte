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

	<hr />

	<form method="POST" action="/logout">
		<button type="submit">Logout</button>
	</form>
</div>
