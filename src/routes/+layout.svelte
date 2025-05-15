<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	let { data, children } = $props();
</script>

<Header user={data.user} />

<main>
	{@render children()}
</main>

<footer class="bg-enoki">
	<p>© {new Date().getFullYear()} Paillette</p>
	<a href="/terms-and-conditions">Terms & Conditions</a>
	<a href="/privacy-policy">Privacy Policy</a>
</footer>
