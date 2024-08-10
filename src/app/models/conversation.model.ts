import { FAKE_MESSAGES, Message } from './messages-list.models';

export interface Conversation {
  id: string;
  userId: string; // UID de l'utilisateur authentifié;
  virtualProfileId: string; // ID du profil virtuel
  messages?: Message[];
}

export const FAKE_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    user1: 'user1',
    user2: 'user2',
    messages: FAKE_MESSAGES.filter((message) => message.conversationId === '1'),
  },
  {
    id: '2',
    user1: 'user1',
    user2: 'user3',
    messages: FAKE_MESSAGES.filter((message) => message.conversationId === '2'),
  },
  {
    id: '3',
    user1: 'user1',
    user2: 'user4',
    messages: FAKE_MESSAGES.filter((message) => message.conversationId === '3'),
  },
];
