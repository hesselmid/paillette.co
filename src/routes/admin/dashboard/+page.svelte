<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Dashboard - Paillette.co</title>
</svelte:head>

<h1>Dashboard</h1>

{#if data.currentUser}
	<p>Hello, {data.currentUser.firstName}!</p>
{/if}
