
export enum UserRole {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface UserSession {
  role: UserRole;
  name: string;
  id: string;
  avatar: string;
  institution: string;
}

export interface Student {
  id: string;
  name: string;
  masteryScore: number;
  engagementIndex: number;
  riskStatus: 'low' | 'medium' | 'high';
  recentGaps: string[];
  badges: string[];
}
