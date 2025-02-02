'use client';

import { ActivityHeatmap } from '@/components/activity-heatmap';
import { ConversationList } from '@/components/conversation-list';
import { Form } from '@/components/form';
import { conversationsAtom } from '@/lib/atom';
import { atom, useAtomValue } from 'jotai';
import Link from 'next/link';

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

const viewAtom = atom((get) => {
	const conversations = get(conversationsAtom);
	if (conversations == null) {
		return 'upload';
	}
	return 'analytics';
});

function UploadForm() {
	return (
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
	);
}

function AnalyticsView() {
	return (
		<div className="space-y-8">
			<ActivityHeatmap />
			<ConversationList />
		</div>
	);
}

export default function AIAnalytics() {
	const view = useAtomValue(viewAtom);

	return (
		<div className="min-h-screen bg-black p-8">
			<div className="mx-auto max-w-6xl space-y-8">
				<Head />
				{ view === 'upload' ? <UploadForm /> : <AnalyticsView /> }
			</div>
		</div>
	);
}
