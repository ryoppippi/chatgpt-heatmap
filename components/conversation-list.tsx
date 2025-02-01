import type { Conversation } from '../lib/schema';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { conversationsByDayAtom, selectedDayAtom } from '@/lib/atom';
import { format, fromUnixTime } from 'date-fns';
import { atom, useAtomValue } from 'jotai';
import Link from 'next/link';

const totalUserMessagesAtom = atom((get) => {
	const conversations = get(conversationsByDayAtom);
	if (conversations == null) {
		return 0;
	}
	return conversations.reduce((acc, conversation) => {
		const userMessages = Object.values(conversation.mapping).filter(node => node.message?.author.role === 'user').length;
		return acc + userMessages;
	}, 0);
});

const totalApiResponsesAtom = atom((get) => {
	const conversations = get(conversationsByDayAtom);
	if (conversations == null) {
		return 0;
	}
	return conversations.reduce((acc, conversation) => {
		const aiResponses = Object.values(conversation.mapping).filter(node => node.message?.author.role === 'assistant').length;
		return acc + aiResponses;
	}, 0);
});

const totalConversationsLengthAtom = atom((get) => {
	const conversations = get(conversationsByDayAtom);
	return conversations?.length ?? 0;
});

function Header() {
	const date = useAtomValue(selectedDayAtom);
	const totalUserMessages = useAtomValue(totalUserMessagesAtom);
	const totalAIResponses = useAtomValue(totalApiResponsesAtom);
	const totalConversations = useAtomValue(totalConversationsLengthAtom);

	return (
		<>
			<h2 className="text-lg font-medium">{date}</h2>
			<div className="mt-4 grid grid-cols-3 gap-4">
				<div>
					<div className="text-2xl font-bold">{totalConversations}</div>
					<div className="text-sm text-gray-400">Total conversations</div>
				</div>
				<div>
					<div className="text-2xl font-bold">{totalUserMessages}</div>
					<div className="text-sm text-gray-400">User messages</div>
				</div>
				<div>
					<div className="text-2xl font-bold">{totalAIResponses}</div>
					<div className="text-sm text-gray-400">AI responses</div>
				</div>
			</div>
		</>
	);
}

function ConversationInfo({ conversation }: { conversation: Conversation }) {
	const userMessages = Object
		.values(conversation.mapping)
		.filter(node => node.message?.author.role === 'user')
		.length;

	const aiResponses = Object
		.values(conversation.mapping)
		.filter(node => node.message?.author.role === 'assistant')
		.length;

	const totalMessages = userMessages + aiResponses;
	const dateTime = fromUnixTime(conversation.create_time);
	const chatGPTLink = `https://chatgpt.com/c/${conversation.conversation_id}`;

	return (
		<div className="rounded-lg bg-[#2d2d2d] p-4 hover:bg-[#3d3d3d] transition-colors">
			<Link href={chatGPTLink} target="_blank" rel="noopener noreferrer">
				<div className="flex items-center justify-between">
					<h4 className="font-medium">
						{' '}
						{conversation.title}
						{' '}
					</h4>
					<span className="text-sm text-gray-400">{format(dateTime, 'HH:mm')}</span>
				</div>
				<div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
					<span>
						{totalMessages}
						{' '}
						messages
					</span>
					<span>
						{userMessages}
						{' '}
						user messages
					</span>
					<span>
						{aiResponses}
						{' '}
						AI responses
					</span>
				</div>
			</Link>
		</div>
	);
}

function Content() {
	const conversations = useAtomValue(conversationsByDayAtom);

	if (conversations == null) {
		return null;
	}

	return (
		<>
			<h3 className="text-sm font-medium text-gray-400">Conversations</h3>
			<div className="space-y-2">
				{conversations.map(conversation => (
					<ConversationInfo conversation={conversation} key={conversation.id} />
				))}
			</div>
		</>
	);
}

export function ConversationList() {
	return (
		<Card className="bg-[#1c1c1c] text-white">
			<CardHeader>
				<Header />
			</CardHeader>
			<CardContent className="space-y-4">
				<Content />
			</CardContent>
		</Card>
	);
}
