<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../app.css';

	let { data, children } = $props();
</script>

<Header user={data.user} />

<main class="flex-1">
	{@render children()}
</main>

<Footer user={data.user} />
