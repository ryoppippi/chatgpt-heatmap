'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type CalendarDatum, ResponsiveCalendar } from '@nivo/calendar';

type ActivityHeatmapProps = {
	data: CalendarDatum[];
};

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
	return (
		<Card className="bg-[#1c1c1c] text-white">
			<CardHeader>
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
					Activity Heatmap 2024
				</CardTitle>
			</CardHeader>
			<CardContent className="h-[200px]">
				<ResponsiveCalendar
					data={data}
					from="2024-01-01"
					to="2024-12-31"
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
				/>
			</CardContent>
		</Card>
	);
}
