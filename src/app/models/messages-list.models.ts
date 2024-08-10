export interface Message {
  id: string;
  conversationId: string;
  senderId: string; // UID de l'utilisateur authentifié ou ID du profil virtuel
  content: string;
  timestamp: number;
}

export const FAKE_MESSAGES: Message[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: 'user1',
    content: 'Hi there!',
    timestamp: new Date('2023-01-01T10:00:00'),
  },
  {
    id: '2',
    conversationId: '1',
    senderId: 'user2',
    content: 'Hello! How are you?',
    timestamp: new Date('2023-01-01T10:01:00'),
  },
  {
    id: '3',
    conversationId: '1',
    senderId: 'user1',
    content: 'I am good, thanks! How about you?',
    timestamp: new Date('2023-01-01T10:02:00'),
  },
  {
    id: '4',
    conversationId: '2',
    senderId: 'user1',
    content: "Hey, what's up?",
    timestamp: new Date('2023-02-01T11:00:00'),
  },
  {
    id: '5',
    conversationId: '2',
    senderId: 'user3',
    content: 'Not much, just chilling. You?',
    timestamp: new Date('2023-02-01T11:01:00'),
  },
  {
    id: '6',
    conversationId: '3',
    senderId: 'user1',
    content: 'Hello!',
    timestamp: new Date('2023-03-01T12:00:00'),
  },
  {
    id: '7',
    conversationId: '3',
    senderId: 'user4',
    content: 'Hi! How have you been?',
    timestamp: new Date('2023-03-01T12:01:00'),
  },
  {
    id: '8',
    conversationId: '3',
    senderId: 'user1',
    content: "I've been great, thanks for asking.",
    timestamp: new Date('2023-03-01T12:02:00'),
  },
  {
    id: '9',
    conversationId: '3',
    senderId: 'user4',
    content: 'Good to hear!',
    timestamp: new Date('2023-03-01T12:03:00'),
  },
];
