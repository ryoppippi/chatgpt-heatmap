import { z } from 'zod/v4-mini';

const AuthorSchema = z.object({
	role: z.enum(['system', 'assistant', 'tool', 'user']),
	name: z.union([z.string(), z.null()]),
	metadata: z.record(z.string(), z.unknown()),
});

const MessageContentSchema = z.object({
	content_type: z.string(),
	parts: z.optional(z.array(z.unknown())),
});

const MessageMetadataSchema = z.record(z.string(), z.any());

const MessageSchema = z.object({
	id: z.string(),
	author: AuthorSchema,
	create_time: z.union([z.number(), z.null()]),
	update_time: z.union([z.number(), z.null()]),
	content: MessageContentSchema,
	status: z.string(),
	end_turn: z.union([z.boolean(), z.null()]),
	weight: z.number(),
	metadata: MessageMetadataSchema,
	recipient: z.string(),
	channel: z.union([z.string(), z.null()]),
});

const MappingNodeSchema = z.object({
	id: z.string(),
	message: z.union([MessageSchema, z.null()]),
	parent: z.union([z.string(), z.null()]),
	children: z.array(z.string()),
});

export const ConversationSchema = z.object({
	id: z.string(),
	title: z.string(),
	create_time: z.number(),
	update_time: z.number(),
	mapping: z.record(z.string(), MappingNodeSchema),
	conversation_id: z.string(),
	current_node: z.string(),
	is_archived: z.boolean(),
});

export type Conversation = z.infer<typeof ConversationSchema>;
