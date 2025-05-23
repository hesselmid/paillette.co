<script lang="ts">
	import Faq from '$lib/components/Faq.svelte';

	const brandFaqs = [
		{
			question: 'Do you show your collection at any textile fair?',
			answer:
				'Currently we do not show at any textile fair. At the moment, all our designs are digital, allowing our clients total freedom to bring our designs from the digital world to the physical world. We do offer a service to advise on material.'
		},
		{
			question: 'Could a representative of Paillette come by our office for an in-person meeting?',
			answer:
				"Our team is based in Amsterdam, The Netherlands, but as a global community, our designers work from locations around the world. We typically connect via video calls, but if you're located near Amsterdam, we're happy to meet at your office or a convenient location. If you’re located outside The Netherlands and would prefer an in-person meeting, feel free to let us know, and we’ll be pleased to explore how we might arrange it."
		},
		{
			question: 'How often do you present a new collection?',
			answer:
				'We continuously update our collection rather than working with seasonal drops. This ensures a fresh selection of designs throughout the year.'
		},
		{
			question: 'Are the designs sold in full exclusivity to the client?',
			answer:
				'Yes, when you purchase a design, it is sold exclusively to you and will no longer be available to other clients. We believe in providing unique, one-of-a-kind designs to each brand.'
		},
		{
			question: 'Can you modify the design/colorway according to the client’s need?',
			answer:
				'Yes, we can adjust colors and certain design elements to better fit your needs. Minor modifications may be included in the design price, while more extensive changes may require an additional fee.'
		},
		{
			question: 'What is the price of a design?',
			answer:
				'The price of a design depends on factors such as complexity and customization. For detailed pricing, please refer to our service menu.'
		},
		{
			question:
				'Can you do a custom design for a client, based on the client’s briefing/moodboard?',
			answer:
				'Absolutely! We offer custom design services where we work closely with you to create a print that aligns with your vision. Send us your mood board or briefing, and we’ll take care of the rest.'
		},
		{
			question: 'How do you deliver the files?',
			answer:
				'Files are delivered in high-resolution formats such as 300dpi RGB TIFF files with color separations, in repeat. We ensure all files are print-ready and organized for easy use.'
		},
		{
			question: 'Can you follow up on the sampling/development of the printed fabrics for us?',
			answer:
				'Yes, we can assist in the sampling and development process, collaborating with your production team or suppliers to ensure the final fabric aligns with the intended design.'
		},
		{
			question: "Can you provide material for the 'making of the design' for social media use?",
			answer:
				'If backstage content was provided by a designer for a ready-to-buy design, it will be stated in the shop. For custom designs, we can provide process visuals, mockups, or behind-the-scenes insights to support your storytelling and social media content. Let us know what you need, and we’ll tailor the materials accordingly.'
		},
		{
			question: 'What if I want to hire a designer directly after working together?',
			answer:
				"We’re thrilled when our designers find full-time opportunities through Paillette. To make this transition smooth, we ask brands to either begin with an initial project through Paillette or pay a hiring fee, supporting our platform's investment in talent development."
		}
	];

	const designerFaqs = [
		{
			question: 'Do I need to have a design/art degree to be considered as a designer?',
			answer:
				'No, at Paillette, we believe that you do not necessarily need a degree to be a good designer. However, a solid understanding of print design principles and technical skills is expected so we can guide you effectively.'
		},
		{
			question:
				'Is there a selection process that will determine if I can join Paillette as a designer?',
			answer:
				'Yes, we carefully curate our community of designers. The selection process involves reviewing your portfolio to ensure your work aligns with Paillette’s aesthetic and quality standards.'
		},
		{
			question: 'Do I have to pay an amount to become part of the Paillette community?',
			answer:
				'No, designers do not need to pay to join Paillette. Our goal is to create a space where talented designers can thrive without financial barriers.'
		},
		{
			question: 'Do I need a tax number to work as a designer for Paillette?',
			answer:
				'Yes, a valid tax number is required, as you’ll be working as an independent designer. This ensures smooth payment processing and compliance with regulations.'
		},
		{
			question: 'When and how will I receive payment?',
			answer:
				'Payments are made upon the sale of your designs or upon completion of custom projects. We process payments via bank transfer or PayPal, depending on your preference.'
		},
		{
			question: 'Is it possible to discuss percentage rates?',
			answer: `To keep things fair, we work with a Tier System that rewards designers as they progress.\n\nLevels:\n\nPaillette Beginner - 35% designer, 65% platform.\nPaillette Rising Talent - 40% designer, 60% platform.\nPaillette Pro - 50% designer, 50% platform.\nPaillette Master - 60% designer, 40% platform.\n\nHere (link) you can find more in-depth information on what each tier entails.`
		},
		{
			question: 'What can I expect to learn from the coaching sessions?',
			answer:
				'Our coaching sessions focus on professional development, helping you refine your artistic identity, improve presentation techniques, and navigate industry trends. You’ll receive tailored guidance to enhance your career.'
		},
		{
			question: 'Can I get in touch with previous members to hear their testimonials?',
			answer:
				'At Paillette, we work with ambassadors who share their experiences. You can find their testimonials here. If you have further questions, email ambassadors@paillette.com, and we can connect you with one of them personally.'
		}
	];

	const otherFaqs = [
		{
			question: 'Can I hire Paillette to organise a design event/course/workshop?',
			answer:
				'Yes! We offer curated events, courses, and workshops focused on print design, trend forecasting, and creative techniques—whether for a brand team or a group of independent designers. We also provide guest lectures at schools or send representatives to industry events. Contact us for details.'
		}
	];
</script>

<svelte:head>
	<title>FAQ - Paillette.co</title>
</svelte:head>

<div class={['bg-white py-16', 'lg:py-20']}>
	<h1
		class={[
			'font-cormorant text-black-sheep text-center text-3xl/[36px]',
			'sm:text-4xl/[44px]',
			'md:text-5xl/[58px]',
			'lg:text-7xl/[87px]',
			'2xl:text-8xl/[116px]'
		]}
	>
		FAQ
	</h1>

	<section
		class={[
			'mx-auto mt-[9px] max-w-[358px] space-y-5',
			'sm:mt-[2px] sm:max-w-[535px]',
			'md:-mt-[6px] md:max-w-[646px]',
			'lg:-mt-[2px] lg:max-w-[806px]',
			'xl:-mt-[17px] xl:max-w-[956px]',
			'2xl:max-w-[1142px]'
		]}
	>
		<h2
			class={[
				'font-apfel-grotezk-brukt text-black-sheep text-2xl/[31px]',
				'sm:text-3xl/[38px]',
				'md:text-4xl/[46px]',
				'lg:text-5xl/[62px]',
				'2xl:text-6xl/[77px]'
			]}
		>
			Brands
		</h2>
		<Faq items={brandFaqs} baseColor="#ee66a6" initialOpenIndex={0} />
	</section>
	<section
		class={[
			'mx-auto mt-16 max-w-[358px] space-y-5',
			'sm:max-w-[535px]',
			'md:max-w-[646px]',
			'lg:mt-20 lg:max-w-[806px]',
			'xl:max-w-[956px]',
			'2xl:max-w-[1142px]'
		]}
	>
		<h2
			class={[
				'font-apfel-grotezk-brukt text-black-sheep text-2xl/[31px]',
				'sm:text-3xl/[38px]',
				'md:text-4xl/[46px]',
				'lg:text-5xl/[62px]',
				'2xl:text-6xl/[77px]'
			]}
		>
			Designers
		</h2>
		<Faq items={designerFaqs} baseColor="#ff5249" initialOpenIndex={0} />
	</section>
	<section
		class={[
			'mx-auto mt-16 max-w-[358px] space-y-5',
			'sm:max-w-[535px]',
			'md:max-w-[646px]',
			'lg:mt-20 lg:max-w-[806px]',
			'xl:max-w-[956px]',
			'2xl:max-w-[1142px]'
		]}
	>
		<h2
			class={[
				'font-apfel-grotezk-brukt text-black-sheep text-2xl/[31px]',
				'sm:text-3xl/[38px]',
				'md:text-4xl/[46px]',
				'lg:text-5xl/[62px]',
				'2xl:text-6xl/[77px]'
			]}
		>
			Others
		</h2>
		<Faq items={otherFaqs} baseColor="#6ae367" initialOpenIndex={0} />
	</section>
</div>

<section class={['bg-enoki pt-9 pb-16', 'lg:pt-12 lg:pb-20']}>
	<div class="container mx-auto">
		<div
			class={[
				'flex flex-col items-center gap-y-9',
				'lg:flex-row lg:justify-center lg:gap-x-[57px] lg:gap-y-0',
				'xl:gap-x-[69px]',
				'2xl:gap-x-[255px]'
			]}
		>
			<enhanced:img
				src="$lib/assets/FAQ_drawing 3.png?w=358;409;716;818"
				alt=""
				sizes="(min-width: 640px) 409px, 358px"
				class={['h-auto w-[358px]', 'sm:w-[409px]']}
				draggable="false"
			/>
			<div class={['flex flex-col items-center gap-y-9', 'lg:gap-y-12']}>
				<p
					class={[
						'font-cormorant text-black-sheep max-w-[239px] text-center text-lg/[64px] font-light',
						'sm:max-w-[319px] sm:text-2xl/[64px]',
						'md:max-w-[398px] md:text-3xl/[64px]',
						'lg:max-w-[478px] lg:text-left lg:text-4xl/[64px]'
					]}
				>
					"Every paillette catches the light—<br />
					let your collection do the same."
				</p>
				<a
					href="/contact"
					class={[
						'font-evolventa border-black-sheep text-black-sheep rounded-full border px-[37px] py-[19px] text-base/[21px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:border-[5px] hover:px-[33px] hover:py-[15px]',
						'sm:text-lg/6',
						'md:-translate-x-[6px] md:self-end',
						'lg:translate-x-0',
						'xl:-translate-x-[45px]',
						'2xl:translate-x-0'
					]}>Get in touch</a
				>
			</div>
		</div>
	</div>
</section>
