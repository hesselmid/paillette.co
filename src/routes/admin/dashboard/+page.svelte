<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let submittingCleanup = $state(false);
</script>

<svelte:head>
	<title>Dashboard - Paillette.co</title>
</svelte:head>

<h1>Dashboard</h1>

{#if data.currentUser}
	<p>Hello, {data.currentUser.firstName}!</p>
{/if}

<a href="/admin/users">Users</a>

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
	<button type="submit" disabled={submittingCleanup}>
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
	<button type="submit">Logout</button>
</form>
