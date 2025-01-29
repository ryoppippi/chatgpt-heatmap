import type { Conversation } from '../types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

type ConversationListProps = {
	date: string;
	stats: {
		conversations: number;
		userMessages: number;
		aiResponses: number;
	};
	conversations: Conversation[];
};

export function ConversationList({ date, stats, conversations }: ConversationListProps) {
	return (
		<Card className="bg-[#1c1c1c] text-white">
			<CardHeader>
				<h2 className="text-lg font-medium">{date}</h2>
				<div className="mt-4 grid grid-cols-3 gap-4">
					<div>
						<div className="text-2xl font-bold">{stats.conversations}</div>
						<div className="text-sm text-gray-400">Total conversations</div>
					</div>
					<div>
						<div className="text-2xl font-bold">{stats.userMessages}</div>
						<div className="text-sm text-gray-400">User messages</div>
					</div>
					<div>
						<div className="text-2xl font-bold">{stats.aiResponses}</div>
						<div className="text-sm text-gray-400">AI responses</div>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<h3 className="text-sm font-medium text-gray-400">Conversations</h3>
				<div className="space-y-2">
					{conversations.map(conversation => (
						<div key={conversation.id} className="rounded-lg bg-[#2d2d2d] p-4 hover:bg-[#3d3d3d] transition-colors">
							<div className="flex items-center justify-between">
								<h4 className="font-medium">{conversation.title}</h4>
								<span className="text-sm text-gray-400">{conversation.timestamp}</span>
							</div>
							<div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
								<span>
									{conversation.totalMessages}
									{' '}
									messages
								</span>
								<span>
									{conversation.userMessages}
									{' '}
									user messages
								</span>
								<span>
									{conversation.aiResponses}
									{' '}
									AI responses
								</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
