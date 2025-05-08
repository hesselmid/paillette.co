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
	<ul>
		<li><a href="/services">Services</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/community">Community</a></li>
		<li><a href="/threads-and-thoughts">Threads & Thoughts</a></li>
		<li><a href="/contact">Contact</a></li>
		<li><a href="/faq">FAQ</a></li>
	</ul>
</nav>

{@render children()}

<footer>
	<a href="/terms-and-conditions">Terms & Conditions</a>
	<a href="/privacy-policy">Privacy Policy</a>
</footer>
