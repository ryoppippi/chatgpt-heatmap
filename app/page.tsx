import { ActivityHeatmap } from '@/components/activity-heatmap';
import { ConversationList } from '@/components/conversation-list';

// Sample data - in a real app this would come from your backend
const activityData = [
	{ date: '2024-05-08', value: 18 },
	// ... more dates
];

const conversations = [
	{
		id: '1',
		title: 'Delayed function execution',
		userMessages: 1,
		aiResponses: 1,
		timestamp: '05:35 PM',
		totalMessages: 2,
	},
	{
		id: '2',
		title: 'Performance Tools for Websites',
		userMessages: 1,
		aiResponses: 1,
		timestamp: '05:07 PM',
		totalMessages: 2,
	},
	{
		id: '3',
		title: 'Crispy Fish Batter Tips',
		userMessages: 3,
		aiResponses: 4,
		timestamp: '06:58 AM',
		totalMessages: 7,
	},
	{
		id: '4',
		title: 'HTML Sitemaps: Usefulness in 2024',
		userMessages: 1,
		aiResponses: 1,
		timestamp: '03:24 PM',
		totalMessages: 2,
	},
];

export default function AIAnalytics() {
	return (
		<div className="min-h-screen bg-black p-8">
			<div className="mx-auto max-w-6xl space-y-8">
				<div className="space-y-2">
					<h1 className="text-2xl font-bold text-white">AI Usage Analytics</h1>
					<p className="text-gray-400">Track your AI interaction patterns over time</p>
				</div>
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
			</div>
		</div>
	);
}
