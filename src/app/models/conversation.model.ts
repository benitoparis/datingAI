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
    userId: 'user1',
    virtualProfileId: 'virtualProfile1',
    messages: FAKE_MESSAGES.filter((message) => message.conversationId === '1'),
  },
  {
    id: '2',
    userId: 'user1',
    virtualProfileId: 'virtualProfile2',
    messages: FAKE_MESSAGES.filter((message) => message.conversationId === '2'),
  },
  {
    id: '3',
    userId: 'user1',
    virtualProfileId: 'virtualProfile4',
    messages: FAKE_MESSAGES.filter((message) => message.conversationId === '3'),
  },
];
