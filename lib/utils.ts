import type { ClassValue } from 'clsx';
import type { Conversation } from './schema';
import { clsx } from 'clsx';
import { format, fromUnixTime } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function filterConversationsByDay(conversations: Conversation[], day: string): Conversation[] {
	return conversations.filter((conversation) => {
		const date = fromUnixTime(conversation.create_time);
		const formattedDate = format(date, 'yyyy-MM-dd');
		return formattedDate === day;
	});
}
