export interface User {
  uid: string;
  surname: string;
  gender: Gender;
  status: ConnectionStatus;
  description: string;
  city: string;
  zipCode: number;
  image: string;
}

type Gender = 'male' | 'female' | 'Non-binary';
type ConnectionStatus = 'connected' | 'disconnected';

export const USERS: User[] = [
  {
    id: 'user1',
    surname: 'Alice',
    gender: 'female',
    status: 'connected',
    description:
      'Amatrice de randonnées et de cuisine exotique. Toujours prête à découvrir de nouvelles cultures.',
    city: 'Paris',
    zipCode: 75001,
    image: '',
  },
  {
    id: 'user2',
    surname: 'Marc',
    gender: 'male',
    status: 'disconnected',
    description:
      "Passionné de sport et de voyages. À la recherche d'une aventure unique.",
    city: 'Lyon',
    zipCode: 69001,
    image: '',
  },
  {
    id: '3',
    surname: 'Claire',
    gender: 'female',
    status: 'connected',
    description:
      "Adepte de lecture et de soirées cinéma. J'aime discuter de philosophie et d'art.",
    city: 'Marseille',
    zipCode: 13001,
    image: '',
  },
  {
    id: 'user4',
    surname: 'Paul',
    gender: 'male',
    status: 'disconnected',
    description:
      'Gourmet et amateur de bons vins. Toujours à la recherche de la meilleure table en ville.',
    city: 'Bordeaux',
    zipCode: 33000,
    image: '',
  },
  {
    id: '5',
    surname: 'Sophie',
    gender: 'female',
    status: 'connected',
    description:
      "J'aime les animaux et les balades en nature. Espère trouver quelqu'un pour partager de longues promenades.",
    city: 'Lille',
    zipCode: 59000,
    image: '',
  },
  {
    id: 'user6',
    surname: 'Lucas',
    gender: 'male',
    status: 'disconnected',
    description:
      'Photographe amateur et amoureux des couchers de soleil. À la recherche de la muse parfaite.',
    city: 'Toulouse',
    zipCode: 31000,
    image: '',
  },
  {
    id: 'user7',
    surname: 'Emma',
    gender: 'female',
    status: 'connected',
    description:
      "Fan de musique live et de concerts. Toujours à l'affût des dernières sorties musicales.",
    city: 'Nice',
    zipCode: 6000,
    image: '',
  },
  {
    id: 'user8',
    surname: 'Julien',
    gender: 'male',
    status: 'disconnected',
    description:
      "Entrepreneur et passionné de technologie. J'aime discuter d'innovations et de nouvelles idées.",
    city: 'Nantes',
    zipCode: 44000,
    image: '',
  },
  {
    id: 'user9',
    surname: 'Léa',
    gender: 'female',
    status: 'connected',
    description:
      'Amoureuse de la mer et des sports nautiques. Toujours prête à plonger dans une nouvelle aventure.',
    city: 'Montpellier',
    zipCode: 34000,
    image: '',
  },
  {
    id: 'user10',
    surname: 'Maxime',
    gender: 'Non-binary',
    status: 'disconnected',
    description:
      'Aficionado de la cuisine italienne et des voyages en Europe. Cherche à partager de nouveaux horizons.',
    city: 'Strasbourg',
    zipCode: 67000,
    image: '',
  },
];
