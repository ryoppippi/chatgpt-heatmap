export type Conversation = {
	id: string;
	title: string;
	create_time: number;
	update_time: number;
	mapping: Record<string, MappingNode>;
	conversation_id: string;
	current_node: string;
	is_archived: boolean;
};

type MappingNode = {
	id: string;
	message: Message | null;
	parent: string | null; // previous message node
	children: string[]; // next message nodes
};

type Message = {
	id: string;
	author: Author;
	create_time: number | null;
	update_time: number | null;
	content: MessageContent;
	status: string;
	end_turn: boolean | null;
	weight: number;
	metadata: MessageMetadata;
	recipient: string;
	channel: string | null;
};

type Author = {
	role: 'system' | 'assistant' | 'tool' | 'user';
	name: string | null;
	metadata: Record<string, unknown>;
};

type MessageContent = {
	content_type: string; // text, image, voice, etc.
	parts?: unknown[];
};

type MessageMetadata = {
	[key: string]: any;
};
