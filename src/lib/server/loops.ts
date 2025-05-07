import { LoopsClient } from 'loops';
import { LOOPS_API_KEY } from '$env/static/private';

export const loops = new LoopsClient(LOOPS_API_KEY);
