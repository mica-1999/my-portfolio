export interface UserFilters {
    role: string;
    status: string;
    timeRange: string;
    search: string;
}

export interface ProjectFilters {
    status: string;
    priority: string;
    timeRange: string;
    search: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    lastActive?: string;
    createdAt: string;
}