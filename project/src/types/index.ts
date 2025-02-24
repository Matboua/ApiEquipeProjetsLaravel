export interface Project {
  id: number;
  title: string;
  status: 'Terminé' | 'En Retard' | 'En Cours';
  start_date: string;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface Person {
  id: number;
  name: string;
  phone: string;
  city: string;
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}