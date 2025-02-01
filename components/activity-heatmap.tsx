'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { conversationsAtom, selectedDayAtom } from '@/lib/atom';
import { ResponsiveCalendar } from '@nivo/calendar';
import { format, fromUnixTime } from 'date-fns';
import html2canvas from 'html2canvas';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { useRef } from 'react';

const currentYearAtom = atom(new Date().getFullYear());

// /** get activities from conversations */
const activitiesAtom = atom((get) => {
	const conversations = get(conversationsAtom);
	const activities: Record<string, number> = {};

	if (conversations == null) {
		return [];
	}

	conversations.forEach((conversation) => {
		const date = fromUnixTime(conversation.create_time);
		const formattedDate = format(date, 'yyyy-MM-dd');
		activities[formattedDate] = (activities[formattedDate] ?? 0) + 1;
	});

	return Object.entries(activities).map(([day, value]) => ({ day, value }));
});

const activitiesByYearAtom = atom((get) => {
	const activities = get(activitiesAtom);
	const currentYear = get(currentYearAtom);

	return activities.filter((item) => {
		const year = new Date(item.day).getFullYear();
		return year === currentYear;
	});
});

const totalConversationsAtom = atom((get) => {
	const activities = get(activitiesByYearAtom);
	return activities.reduce((sum, item) => sum + item.value, 0);
});

export function ActivityHeatmap() {
	const [currentYear, setCurrentYear] = useAtom(currentYearAtom);
	const heatmapRef = useRef<HTMLDivElement>(null);

	const setDayAtom = useSetAtom(selectedDayAtom);
	const activitiesByYear = useAtomValue(activitiesByYearAtom);
	const totalConversations = useAtomValue(totalConversationsAtom);

	const handlePreviousYear = () => {
		setCurrentYear(prev => prev - 1);
	};

	const handleNextYear = () => {
		setCurrentYear(prev => prev + 1);
	};

	const handleDownload = async () => {
		if (heatmapRef.current != null) {
			const canvas = await html2canvas(heatmapRef.current);
			const image = canvas.toDataURL('image/png', 1.0);
			const link = document.createElement('a');
			link.download = `heatmap-${currentYear}.png`;
			link.href = image;
			link.click();
		}
	};

	return (
		<Card className="bg-[#1c1c1c] text-white">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<CardTitle className="flex items-center gap-2 text-lg font-medium">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
								<line x1="16" y1="2" x2="16" y2="6" />
								<line x1="8" y1="2" x2="8" y2="6" />
								<line x1="3" y1="10" x2="21" y2="10" />
							</svg>
							Activity Heatmap
							{' '}
							{currentYear}
						</CardTitle>
						<p className="mt-1 text-sm text-gray-400">
							Total conversations:
							{' '}
							<span className="font-bold text-white">{totalConversations}</span>
						</p>
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={handlePreviousYear}
							className="h-8 w-8 text-white hover:bg-[#2d2d2d] cursor-pointer"
						>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Previous year</span>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleNextYear}
							className="h-8 w-8 text-white hover:bg-[#2d2d2d] cursor-pointer"
						>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Next year</span>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleDownload}
							className="h-8 w-8 text-white hover:bg-[#2d2d2d] cursor-pointer"
						>
							<Download className="h-4 w-4" />
							<span className="sr-only">Download heatmap</span>
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="h-[200px]" ref={heatmapRef}>
				<ResponsiveCalendar
					data={activitiesByYear}
					from={`${currentYear}-01-01`}
					to={`${currentYear}-12-31`}
					emptyColor="#2d2d2d"
					colors={['#4B2D89', '#6B3FA0', '#8B51B7', '#AB63CE', '#CB75E5']}
					margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
					yearSpacing={40}
					monthBorderColor="#2d2d2d"
					dayBorderWidth={2}
					dayBorderColor="#1c1c1c"
					tooltip={data => (
						<div className="rounded-lg bg-[#2d2d2d] p-2 text-sm text-white">
							<strong>{data.day}</strong>
							<br />
							{data.value}
							{' '}
							conversations
						</div>
					)}
					theme={{
						text: {
							fill: '#ffffff80',
						},
					}}
					onClick={day => setDayAtom(format(new Date(day.day), 'yyyy-MM-dd'))}
				/>
			</CardContent>
		</Card>
	);
}
