import type { Conversation } from './schema';
import { atom } from 'jotai';

export const conversationDataAtom = atom<Conversation>();
