import type { Conversation } from '../lib/schema';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format, fromUnixTime } from 'date-fns';
import { atom, useAtom } from 'jotai';
import Link from 'next/link';
import * as React from 'react';

// 型定義を追加
type ConversationInfoDict = {
	userMessages: number;
	apiResponses: number;
};

const conversationsInfoAtom = atom<ConversationInfoDict>({
	userMessages: 0,
	apiResponses: 0,
});

type ConversationListProps = {
	date: string;
	conversations: Conversation[];
};

function Header({ date, conversations }: ConversationListProps) {
	const [conversationsInfo] = useAtom(conversationsInfoAtom);
	const totalUserMessages = conversationsInfo.userMessages;
	const totalAIResponses = conversationsInfo.apiResponses;

	return (
		<>
			<h2 className="text-lg font-medium">{date}</h2>
			<div className="mt-4 grid grid-cols-3 gap-4">
				<div>
					<div className="text-2xl font-bold">{conversations.length}</div>
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

function useConversationCounts(conversations: Conversation[]) {
	const [conversationsInfo, setConversationsInfo] = useAtom(conversationsInfoAtom);

	React.useEffect(() => {
		const counts = conversations.reduce((acc, conversation) => {
			const userMessages = Object
				.values(conversation.mapping)
				.filter(node => node.message?.author.role === 'user')
				.length;

			const aiResponses = Object
				.values(conversation.mapping)
				.filter(node => node.message?.author.role === 'assistant')
				.length;

			return {
				userMessages: acc.userMessages + userMessages,
				apiResponses: acc.apiResponses + aiResponses,
			};
		}, { userMessages: 0, apiResponses: 0 });

		setConversationsInfo(counts);
	}, [conversations, setConversationsInfo]);

	return conversationsInfo;
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

function Content({ conversations }: ConversationListProps) {
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

export function ConversationList({ ...props }: ConversationListProps) {
	useConversationCounts(props.conversations);

	return (
		<Card className="bg-[#1c1c1c] text-white">
			<CardHeader>
				<Header {...props} />
			</CardHeader>
			<CardContent className="space-y-4">
				<Content {...props} />
			</CardContent>
		</Card>
	);
}
