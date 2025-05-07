<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>Admin Dashboard</h1>

{#if data.currentUser}
	<p>Hello, {data.currentUser.firstName}!</p>
{/if}
