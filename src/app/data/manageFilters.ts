export interface FilterOption {
    value: string;
    display: string;
}

// Update the interface to remove color properties
export interface TagFilterOption extends FilterOption {
    // Color properties removed since we're using Tailwind classes now
}

export const roleFilters: FilterOption[] = [
    { value: '', display: 'Select a role' },
    { value: 'admin', display: 'Admin' },
    { value: 'editor', display: 'Editor' },
    { value: 'developer', display: 'Developer' },
    { value: 'viewer', display: 'Viewer' }
];

export const statusFilters: FilterOption[] = [
    { value: '', display: 'Select a status' },
    { value: 'active', display: 'Active' },
    { value: 'pending', display: 'Pending' },
    { value: 'suspended', display: 'Suspended' },
    { value: 'inactive', display: 'Inactive' }
];

export const timeRangeFilters: FilterOption[] = [
    { value: '', display: 'Select a time range' },
    { value: 'week', display: 'Last 7 days' },
    { value: 'month', display: 'Last 30 days' },
    { value: 'halfyear', display: 'Last 6 months' },
    { value: 'year', display: 'Last Year' }
];

export const stateFilters: FilterOption[] = [
    { value: '', display: 'Select a state' },
    { value: 'PLANNING', display: 'Planning' },
    { value: 'IN_PROGRESS', display: 'In Progress' },
    { value: 'COMPLETED', display: 'Completed' },
    { value: 'DELAYED', display: 'Delayed' }
];

// Update the tagFilters array to remove color and bgColor properties
export const tagFilters: TagFilterOption[] = [
    { value: 'HTML', display: 'HTML' },
    { value: 'CSS', display: 'CSS' },
    { value: 'JavaScript', display: 'JavaScript' },
    { value: 'TypeScript', display: 'TypeScript' },
    { value: 'React', display: 'React' },
    { value: 'Angular', display: 'Angular' },
    { value: 'Vue', display: 'Vue.js' },
    { value: 'Node', display: 'Node.js' },
    { value: 'Express', display: 'Express' },
    { value: 'MongoDB', display: 'MongoDB' },
    { value: 'Firebase', display: 'Firebase' },
    { value: 'PHP', display: 'PHP' },
    { value: 'Python', display: 'Python' },
    { value: 'Java', display: 'Java' },
    { value: 'CSharp', display: 'C#' },
    { value: 'CPP', display: 'C++' },
    { value: 'Ruby', display: 'Ruby' },
    { value: 'Tailwind', display: 'Tailwind CSS' },
    { value: 'NextJS', display: 'Next.js' },
    { value: 'Bootstrap', display: 'Bootstrap' },
    { value: 'API', display: 'API' },
    { value: 'SocketIO', display: 'Socket.IO' },
    { value: 'MaterialUI', display: 'Material UI' }
];