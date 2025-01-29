export type Conversation = {
	title: string;
	create_time: number;
	update_time: number;
	mapping: Record<string, MappingNode>;
	// moderation_results: any[]; // 詳細不明なので適宜修正可能
	current_node: string;
	// plugin_ids: any | null;
	conversation_id: string;
	// conversation_template_id: any | null;
	// gizmo_id: any | null;
	// gizmo_type: any | null;
	is_archived: boolean;
	is_starred: boolean | null;
	safe_urls: string[];
	default_model_slug: string;
	// conversation_origin: any | null;
	// voice: any | null;
	// async_status: any | null;
	disabled_tool_ids: string[];
	id: string;
};

type MappingNode = {
	id: string;
	message: Message | null;
	parent: string | null;
	children: string[];
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
	role: string;
	name: string | null;
	// metadata: Record<string, any>;
};

type MessageContent = {
	content_type: string;
	parts: string[];
};

type MessageMetadata = {
	[key: string]: any;
};
