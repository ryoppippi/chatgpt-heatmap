import type { Conversation } from './schema';
import typia from 'typia';

export function validateConversations(data: unknown) {
	const validationRes = typia.validate<Conversation[]>(data);
	return validationRes;
}
