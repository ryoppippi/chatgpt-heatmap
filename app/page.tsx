'use client';

import type { Conversation } from '@/lib/schema';
import { ActivityHeatmap } from '@/components/activity-heatmap';
import { ConversationList } from '@/components/conversation-list';
import { Form } from '@/components/form';
import { conversationsAtom, selectedDayAtom } from '@/lib/atom';
import { format, fromUnixTime } from 'date-fns';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import * as React from 'react';

/** get activities from conversations */
function getActivities(conversations: Conversation[]): { day: string; value: number }[] {
	const activities: Record<string, number> = {};

	conversations.forEach((conversation) => {
		const date = fromUnixTime(conversation.create_time);
		const formattedDate = format(date, 'yyyy-MM-dd');
		activities[formattedDate] = (activities[formattedDate] ?? 0) + 1;
	});

	return Object.entries(activities).map(([day, value]) => ({ day, value }));
}

function filterConversationsByDay(conversations: Conversation[], day: string): Conversation[] {
	return conversations.filter((conversation) => {
		const date = fromUnixTime(conversation.create_time);
		const formattedDate = format(date, 'yyyy-MM-dd');
		return formattedDate === day;
	});
}

function Head() {
	return (
		<>
			<div className="space-y-2">
				<h1 className="text-2xl font-bold text-white">ChatGPT Usage Analytics</h1>
				<p className="text-gray-400">Track your AI interaction patterns over time</p>
			</div>
		</>
	);
}

export default function AIAnalytics() {
	const conversations = useAtomValue(conversationsAtom);
	const selectedDay = useAtomValue(selectedDayAtom);

	const filteredConversations = conversations != null && selectedDay != null ? filterConversationsByDay(conversations, selectedDay) : [];

	return (
		<div className="min-h-screen bg-black p-8">
			<div className="mx-auto max-w-6xl space-y-8">
				<Head />
				{
					// eslint-disable-next-line ts/strict-boolean-expressions
					!conversations && (
						<div className="space-y-4 text-gray-400">
							<p>
								Upload your
								{' '}
								<span className="font-bold">conversations.json</span>
								<br />
								<Link
									href="https://medium.com/@yjg30737/how-to-export-your-chatgpt-conversation-history-caa0946d6349"
									target="_blank"
									rel="noopener noreferrer"
									className="underline"
								>
									{' '}
									Here is how you can export your ChatGPT conversation history
								</Link>
								<br />
								This app does not store any of your data.
							</p>

							<div className="max-w-md mx-auto">
								<Form />
							</div>
						</div>
					)
				}
				{
					// eslint-disable-next-line ts/strict-boolean-expressions
					conversations && (
						<ActivityHeatmap data={getActivities(conversations)} />
					)
				}
				{
					// eslint-disable-next-line ts/strict-boolean-expressions
					conversations && selectedDay && (
						<ConversationList
							date={selectedDay ?? ''}
							conversations={filteredConversations}
						/>
					)
				}
			</div>

		</div>
	);
}
