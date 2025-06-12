import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

const schema = z.object({
	name: z.string().min(1, 'Name is required.'),
	company: z.string().min(1, 'Company is required.'),
	email: z.string().email('Invalid email format.'),
	message: z.string().min(1, 'Message is required.')
});

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form, footerColor: 'white' };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, 'Form posted successfully!');
	}
};
