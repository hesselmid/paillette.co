<script lang="ts">
	import { afterNavigate } from '$app/navigation';

	let { user } = $props();

	let isOpen = $state(false);

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/services', label: 'Services' },
		// { href: '/about', label: 'About' },
		// { href: '/community', label: 'Community' },
		// { href: '/threads-and-thoughts', label: 'Threads & Thoughts' },
		{ href: '/contact', label: 'Contact' },
		{ href: '/faq', label: 'FAQ' }
	];

	const loginInfo = $derived.by(() => {
		if (!user) {
			return { href: '/login', label: 'Login' };
		}
		switch (user.role) {
			case 'admin':
				return { href: '/admin/dashboard', label: 'Admin Dashboard' };
			case 'customer':
				return { href: '/account/dashboard', label: 'Account Dashboard' };
			case 'member':
				return { href: '/member/dashboard', label: 'Member Dashboard' };
			default:
				return { href: '/login', label: 'Login' };
		}
	});

	afterNavigate(() => {
		isOpen = false;
	});
</script>

<nav class={['container mx-auto mt-6 px-2', 'md:px-4', 'lg:px-5', 'xl:px-8', '2xl:px-10']}>
	<div class="bg-enoki rounded-[10px] py-[10px]">
		<div class="relative flex items-center justify-between px-10">
			<div>
				<button
					type="button"
					class="text-black-sheep cursor-pointer rounded-[10px] px-2.5 py-[5px] hover:bg-white"
					aria-controls="main-menu"
					aria-expanded={isOpen}
					aria-label="Toggle navigation menu"
					onclick={() => (isOpen = !isOpen)}
				>
					{#if !isOpen}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					{/if}
				</button>
			</div>
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<a href="/" aria-label="Paillette Homepage">
					<enhanced:img
						src="$lib/assets/logo.png"
						alt="Paillette logo"
						class="h-[42px] w-auto"
					/></a
				>
			</div>
			<div class="flex items-center">
				<a
					href={loginInfo.href}
					class="inline-block cursor-pointer rounded-[10px] px-2.5 py-[5px] hover:bg-white"
					aria-label={loginInfo.label}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="size-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
						/>
					</svg>
				</a>
				{#if user && user.role === 'customer'}
					<a
						href="/cart"
						class="inline-block cursor-pointer rounded-[10px] px-2.5 py-[5px] hover:bg-white"
						aria-label="Cart"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="size-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
							/>
						</svg>
					</a>
				{/if}
			</div>
		</div>
		<div
			id="main-menu"
			class={[
				'overflow-hidden  transition-[height] duration-300 ease-in-out [interpolate-size:allow-keywords]',
				isOpen ? 'h-[268px] md:h-[64px]' : 'h-0'
			]}
		>
			<ul class={['mx-[10px] mt-[10px] rounded-[10px] bg-white px-[30px] py-[10px]', 'md:flex']}>
				{#each navLinks as link (link.href)}
					<li>
						<a
							href={link.href}
							class="font-evolventa text-black-sheep hover:bg-enoki inline-block rounded-[10px] px-[10px] pt-[6px] pb-[7px] text-base/[21px]"
							>{link.label}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</nav>
