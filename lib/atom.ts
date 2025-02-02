import type { Conversation } from './schema';
import { atom } from 'jotai';
import { filterConversationsByDay } from './utils';

export const selectedDayAtom = atom<string | null>(null);

export const conversationsAtom = atom<Conversation[]>();

export const conversationsBySelectedDayAtom = atom((get) => {
	const conversations = get(conversationsAtom);
	const selectedDay = get(selectedDayAtom);
	return conversations != null && selectedDay != null ? filterConversationsByDay(conversations, selectedDay) : [];
});
