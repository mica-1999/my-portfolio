// Format number with commas and 2 decimal places
export const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

// Get status color
export const getStatusColor = (status: string): string => {
    switch (status.toUpperCase()) {
        case 'COMPLETED':
            return 'bg-green-500';
        case 'IN_PROGRESS':
            return 'bg-blue-500';
        case 'PLANNED':
            return 'bg-yellow-500';
        case 'PAUSED':
            return 'bg-gray-500';
        case 'ABANDONED':
            return 'bg-red-500';
        default:
            return 'bg-purple-500';
    }
};

// Get status background color (lighter version)
export const getStatusBgColor = (status: string): string => {
    switch (status.toUpperCase()) {
        case 'COMPLETED':
            return 'bg-green-100 dark:bg-green-900/30';
        case 'IN_PROGRESS':
            return 'bg-blue-100 dark:bg-blue-900/30';
        case 'PLANNED':
            return 'bg-yellow-100 dark:bg-yellow-900/30';
        case 'PAUSED':
            return 'bg-gray-100 dark:bg-gray-800/50';
        case 'ABANDONED':
            return 'bg-red-100 dark:bg-red-900/30';
        default:
            return 'bg-purple-100 dark:bg-purple-900/30';
    }
};

// Format date for display
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};