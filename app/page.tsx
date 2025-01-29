'use client';

import { ActivityHeatmap } from '@/components/activity-heatmap';
import { ConversationList } from '@/components/conversation-list';
import { Form } from '@/components/form';
import { conversationsAtom } from '@/lib/atom';
import { useAtomValue } from 'jotai';
import * as React from 'react';

// Sample data - in a real app this would come from your backend
const activityData = [
	{ day: '2024-05-08', value: 18 },
	// ... more dates
];

function Head() {
	return (
		<>
			<div className="space-y-2">
				<h1 className="text-2xl font-bold text-white">AI Usage Analytics</h1>
				<p className="text-gray-400">Track your AI interaction patterns over time</p>
			</div>
		</>
	);
}

export default function AIAnalytics() {
	const conversations = useAtomValue(conversationsAtom);

	React.useEffect(() => {
		console.log(conversations);
	}, [conversations]);

	return (
		<div className="min-h-screen bg-black p-8">
			<div className="mx-auto max-w-6xl space-y-8">
				<Head />
				{
					// eslint-disable-next-line ts/strict-boolean-expressions
					!conversations && <Form />
				}
				{
					// eslint-disable-next-line ts/strict-boolean-expressions
					conversations && (
						<>
							<ActivityHeatmap data={activityData} />
							<ConversationList
								date="May 08, 2024"
								stats={{
									conversations: 18,
									userMessages: 43,
									aiResponses: 46,
								}}
								conversations={conversations}
							/>
						</>
					)
				}
			</div>
		</div>
	);
}
