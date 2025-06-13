export interface Activity {
  type: 'admission' | 'payment' | 'batch';
  title: string;
  details: string;
  time: string;
}

export interface DashboardStats {
  students: number;
  instructors: number;
  courses: number;
  revenue: number;
  batches: number;
  exams: number;
  pendingAdmissions: number;
  todayRevenue: number;
  monthlyRevenue: number;
}

export interface Notification {
  id: string;
  type: 'admission' | 'payment' | 'batch' | 'exam';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'exam' | 'event' | 'meeting';
} 