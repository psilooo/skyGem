export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface NavigationState {
  isOpen: boolean;
  currentView: 'home' | 'project';
  activeProjectId: string | null;
}

export enum ViewState {
  HOME = 'HOME',
  PROJECT = 'PROJECT'
}
