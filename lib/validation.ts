import { z } from 'zod/v4-mini';
import { ConversationSchema } from './schema';

const ConversationsArraySchema = z.array(ConversationSchema);

export function validateConversations(data: unknown) {
	const result = ConversationsArraySchema.safeParse(data);

	if (result.success) {
		return {
			success: true,
			data: result.data,
		};
	}
	else {
		return {
			success: false,
			errors: result.error,
		};
	}
}
