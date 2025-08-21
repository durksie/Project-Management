export interface Project {
  title: string;
  status: string;
  date: string;
  startDate: string;
  dueDate: string;
  dateSort: string;
  members: number;
  comments: number;
  progress: number;
  description: string;
  techStack: string;
  author: string;
  memberAvatars: string[];
}

export interface Event {
  title: string;
  date: string;
  time: string;
  project: string;
  attendees: number;
}

export interface Member {
  name: string;
  role: string;
  department: string;
  avatar: string;
  status: "online" | "offline";
}

export interface SidebarItem {
  name: string;
  icon: string;
}