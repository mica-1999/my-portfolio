export interface BankDetails {
    totalBalance: number;
    depositThisMonth: number;
    withdrawThisMonth: number;
}

export interface Project {
    id: number;
    name: string;
    description: string | null;
    state: ProjectState;
    createdAt: string;
    updatedAt: string;
}

export interface UserProject {
    id: number;
    userId: number;
    projectId: number;
    role: ProjectRole;
    joinedAt: string;
    project: Project;
}

export enum ProjectState {
    PLANNING = "PLANNING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    DELAYED = "DELAYED"
}

export enum ProjectRole {
    OWNER = "OWNER",
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    VIEWER = "VIEWER"
}

export interface TimelineItem {
    id: number;
    userId: number;
    eventType: TimelineEventType;
    description: string | null;
    createdAt: string;
}

export enum TimelineEventType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    PROFILE_UPDATE = "PROFILE_UPDATE",
    PASSWORD_CHANGE = "PASSWORD_CHANGE",
    PROJECT_CREATED = "PROJECT_CREATED",
    PROJECT_JOINED = "PROJECT_JOINED",
    PROJECT_UPDATED = "PROJECT_UPDATED",
    TRANSACTION_MADE = "TRANSACTION_MADE",
    ACCOUNT_CREATED = "ACCOUNT_CREATED",
    SETTINGS_CHANGED = "SETTINGS_CHANGED",
    NOTE_CREATED = "NOTE_CREATED",
    MESSAGE_SENT = "MESSAGE_SENT",
    SYSTEM_NOTIFICATION = "SYSTEM_NOTIFICATION"
}

export interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone?: string;
    role: UserRole;
    isactive: UserStatus;
    lastlogin?: string;
    createdat: string;
    job?: string;
}

export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    DEVELOPER = "developer",
    VIEWER = "viewer"
}

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING = "pending",
    SUSPENDED = "suspended"
}