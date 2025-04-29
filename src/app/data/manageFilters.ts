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
    { value: '', display: 'Select a tag' },
    { value: 'html', display: 'HTML' },
    { value: 'css', display: 'CSS' },
    { value: 'javascript', display: 'JavaScript' },
    { value: 'typescript', display: 'TypeScript' },
    { value: 'react', display: 'React' },
    { value: 'angular', display: 'Angular' },
    { value: 'vue', display: 'Vue.js' },
    { value: 'node', display: 'Node.js' },
    { value: 'express', display: 'Express' },
    { value: 'mongodb', display: 'MongoDB' },
    { value: 'firebase', display: 'Firebase' },
    { value: 'php', display: 'PHP' },
    { value: 'python', display: 'Python' },
    { value: 'java', display: 'Java' },
    { value: 'csharp', display: 'C#' },
    { value: 'cpp', display: 'C++' },
    { value: 'ruby', display: 'Ruby' },
    { value: 'tailwind', display: 'Tailwind CSS' },
    { value: 'nextjs', display: 'Next.js' },
    { value: 'bootstrap', display: 'Bootstrap' },
    { value: 'api', display: 'API' },
    { value: 'socketio', display: 'Socket.IO' },
    { value: 'materialui', display: 'Material UI' }
];