import type { Conversation } from './schema';
import { atom } from 'jotai';

export const conversationsAtom = atom<Conversation[]>();

export const selectedDayAtom = atom<string | null>(null);
