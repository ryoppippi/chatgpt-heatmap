'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { selectedDayAtom } from '@/lib/atom';
import { type CalendarDatum, ResponsiveCalendar } from '@nivo/calendar';
import { format } from 'date-fns';
import { useSetAtom } from 'jotai';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type ActivityHeatmapProps = {
	data: CalendarDatum[];
};

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const setDayAtom = useSetAtom(selectedDayAtom);

	const filteredData = data.filter((item) => {
		const year = new Date(item.day).getFullYear();
		return year === currentYear;
	});

	const totalConversations = filteredData.reduce((sum, item) => sum + item.value, 0);

	const handlePreviousYear = () => {
		setCurrentYear(prev => prev - 1);
	};

	const handleNextYear = () => {
		setCurrentYear(prev => prev + 1);
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
							className="h-8 w-8 text-white hover:bg-[#2d2d2d]"
						>
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Previous year</span>
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleNextYear}
							className="h-8 w-8 text-white hover:bg-[#2d2d2d]"
						>
							<ChevronRight className="h-4 w-4" />
							<span className="sr-only">Next year</span>
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent className="h-[200px]">
				<ResponsiveCalendar
					data={filteredData}
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
