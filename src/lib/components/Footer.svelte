<script lang="ts">
	import { page } from '$app/state';
</script>

<footer class={['py-8', page.data.footerColor === 'white' ? 'bg-white' : 'bg-enoki']}>
	<div class={['container mx-auto px-4', 'md:px-8', 'lg:px-10', 'xl:px-16', '2xl:px-20']}>
		<h2 class="sr-only">Footer</h2>

		<div class={['flex flex-col gap-y-[42px]', 'md:flex-row md:justify-between md:gap-y-0']}>
			<enhanced:img
				src="$lib/assets/logo.co 2.png"
				alt="Paillette.co logo"
				class="h-auto w-[132px]"
			/>

			<div
				class={[
					'grid max-w-[320px] grid-cols-2 gap-y-8',
					'sm:max-w-[594px]',
					'md:max-w-[355px] md:gap-x-[55px]',
					'lg:mr-[54px] lg:flex lg:max-w-[340px] lg:flex-wrap lg:gap-x-16',
					'xl:mr-[46px] xl:max-w-[481px]'
				]}
			>
				<div class="flex flex-col items-start gap-y-4">
					<h3 class="font-evolventa text-xs/[16px] text-[#b1b2ae] uppercase">Company</h3>
					<a href="/about" class="font-evolventa text-black-sheep text-base/[21px]">About</a>
				</div>
				<div class="flex flex-col items-start gap-y-4">
					<h3 class="font-evolventa text-xs/[16px] text-[#b1b2ae] uppercase">Textiles</h3>
					<a href="/faq" class="font-evolventa text-black-sheep text-base/[21px]">FAQ</a>
					<a href="/login" class="font-evolventa text-black-sheep text-base/[21px]">Shop</a>
				</div>
				<div class={['flex flex-col items-start gap-y-4', 'lg:order-4']}>
					<h3 class="font-evolventa text-xs/[16px] text-[#b1b2ae] uppercase">Contact</h3>
					<a
						href="mailto:info@paillette.co"
						class="font-evolventa text-black-sheep text-base/[21px]">Email us</a
					>
					<a
						href="https://www.instagram.com/paillette.co"
						target="_blank"
						class="font-evolventa text-black-sheep text-base/[21px]">Instagram</a
					>
					<a
						href="https://www.linkedin.com"
						target="_blank"
						class="font-evolventa text-black-sheep text-base/[21px]">LinkedIn</a
					>
				</div>
				<div class="flex flex-col items-start gap-y-4">
					<h3 class="font-evolventa text-xs/[16px] text-[#b1b2ae] uppercase">Designers</h3>
					<a href="/community" class="font-evolventa text-black-sheep text-base/[21px]">Community</a
					>
					<a href="/threads-and-thoughts" class="font-evolventa text-black-sheep text-base/[21px]"
						>T & T</a
					>
				</div>
			</div>
		</div>

		<div
			class={[
				'mt-[75px] flex gap-x-[26px]',
				'sm:gap-x-11',
				'md:mt-[135px]',
				'lg:mt-[87px]',
				'xl:mt-[78px]'
			]}
		>
			<span class="font-evolventa text-black-sheep text-xs/4 uppercase"
				>© {new Date().getFullYear()} Paillette</span
			>
			<a href="/terms-and-conditions" class="font-evolventa text-black-sheep text-xs/4 uppercase"
				>Terms & Conditions</a
			>
			<a href="/privacy-policy" class="font-evolventa text-black-sheep text-xs/4 uppercase"
				>Privacy Policy</a
			>
		</div>
	</div>
</footer>
