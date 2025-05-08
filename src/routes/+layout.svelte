<script lang="ts">
	let { data, children } = $props();

	let loginHref = $derived.by(() => {
		if (!data.user) {
			return '/login';
		}
		switch (data.user.role) {
			case 'admin':
				return '/admin/dashboard';
			case 'customer':
				return '/account/dashboard';
			case 'member':
				return '/member/dashboard';
			default:
				return '/login';
		}
	});

	let loginLabel = $derived.by(() => {
		if (!data.user) {
			return 'Login';
		}
		switch (data.user.role) {
			case 'admin':
				return 'Admin Dashboard';
			case 'customer':
				return 'Account Dashboard';
			case 'member':
				return 'Member Dashboard';
			default:
				return 'Login';
		}
	});
</script>

<nav>
	<a href="/">Paillette</a>

	<a href={loginHref} aria-label={loginLabel}
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill={data.user ? 'currentColor' : 'none'}
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
			style="width:20px"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
			/>
		</svg>
	</a>
	{#if data.user && data.user.role === 'customer'}
		<a href="/cart" aria-label="Cart"
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-6"
				style="width:20px"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
				/>
			</svg>
		</a>
	{/if}
	<ul>
		<li><a href="/services">Services</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/community">Community</a></li>
		<li><a href="/threads-and-thoughts">Threads & Thoughts</a></li>
		<li><a href="/contact">Contact</a></li>
		<li><a href="/faq">FAQ</a></li>
	</ul>
</nav>

<main>
	{@render children()}
</main>

<footer>
	<p>© {new Date().getFullYear()} Paillette</p>
	<a href="/terms-and-conditions">Terms & Conditions</a>
	<a href="/privacy-policy">Privacy Policy</a>
</footer>
