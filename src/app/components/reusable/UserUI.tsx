import { UserRole, UserStatus, TimelineEventType } from '@/app/types/dashmain';
import { tagFilters } from '@/app/data/manageFilters';

// Helper function to get role styles
export const getRoleStyles = (role: string) => {
    switch (role.toLowerCase()) {
        case UserRole.ADMIN:
            return {
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#666CFF]" viewBox="0 0 20 20" fill="currentColor" >
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028A5.001 5.001 0 0010 11z" clipRule="evenodd" />
                    </svg>
                ),
                textColor: 'text-[#666CFF]',
                output: 'Admin'
            };
        case UserRole.EDITOR:
            return {
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FF4D49]" viewBox="0 0 20 20" fill="currentColor" >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                ),
                textColor: 'text-[#FF4D49]',
                output: 'Editor'
            };
        case UserRole.DEVELOPER:
            return {
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#72E128]" viewBox="0 0 20 20" fill="currentColor" >
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                ),
                textColor: 'text-[#72E128]',
                output: 'Developer'
            };
        default:
            return {
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#A26CF8]" viewBox="0 0 20 20" fill="currentColor" >
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                ),
                textColor: 'text-[#A26CF8]',
                output: 'Viewer'
            };
    }
};

// Helper function to get active status styles
export const getActiveStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
        case UserStatus.ACTIVE:
            return 'bg-[#3B4F48] text-[#72E128]';
        case UserStatus.PENDING:
            return 'bg-[#4D4538] text-[#FFB400]';
        case UserStatus.SUSPENDED:
            return 'bg-[#4A3F59] text-[#A26CF8]';
        default:
            return 'bg-[#51374D] text-[#FF4D49]';
    }
};

// Format date for display
export const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
};

// Timeline utility functions
// Helper function to get state color based on event type
export const getTimelineEventColor = (eventType: TimelineEventType) => {
    switch (eventType) {
        case TimelineEventType.ACCOUNT_CREATED:
        case TimelineEventType.PROJECT_CREATED:
        case TimelineEventType.NOTE_CREATED:
            return "bg-[#72E128]"; // green - creation events

        case TimelineEventType.LOGIN:
        case TimelineEventType.PROJECT_JOINED:
        case TimelineEventType.TRANSACTION_MADE:
        case TimelineEventType.MESSAGE_SENT:
            return "bg-[#666CFF]"; // blue - activity events

        case TimelineEventType.PROFILE_UPDATE:
        case TimelineEventType.SETTINGS_CHANGED:
        case TimelineEventType.PROJECT_UPDATED:
        case TimelineEventType.PASSWORD_CHANGE:
            return "bg-[#A26CF8]"; // purple - update events

        case TimelineEventType.LOGOUT:
        case TimelineEventType.SYSTEM_NOTIFICATION:
            return "bg-[#FF4D49]"; // red - system/alert events

        default:
            return "bg-gray-400"; // default fallback
    }
};

// Format the timeline event title based on event type
export const formatTimelineEventTitle = (eventType: TimelineEventType) => {
    return eventType.replace(/_/g, ' ').toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
};

// Format timestamp to display time
export const formatTimelineTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    const isYesterday = date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    if (isToday) {
        return `Today ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isYesterday) {
        return `Yesterday ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' }) +
            ` ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
};

// Project utility functions
// Get badge color based on project state
export const getProjectStateBadgeColor = (state: string) => {
    switch (state) {
        case 'COMPLETED':
            return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        case 'IN_PROGRESS':
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
        case 'PLANNING':
            return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
        case 'DELAYED':
            return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
    }
};

// Format state for display
export const formatProjectState = (state: string) => {
    return state.replace('_', ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};

// Format date for project display
export const formatProjectDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};

// Get tag styling for project tags
export const getTagStyling = (tag: string) => {
    const tagLower = tag.toLowerCase();

    switch (tagLower) {
        // Frontend technologies
        case 'html':
            return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
        case 'css':
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        case 'javascript':
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
        case 'typescript':
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";

        // Frontend frameworks
        case 'react':
            return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400";
        case 'angular':
            return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
        case 'vue':
            return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        case 'nextjs':
            return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";

        // Backend technologies
        case 'node':
        case 'nodejs':
            return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        case 'express':
            return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
        case 'php':
            return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
        case 'python':
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        case 'java':
            return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
        case 'csharp':
        case 'c#':
            return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
        case 'cpp':
        case 'c++':
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        case 'ruby':
            return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";

        // CSS frameworks
        case 'tailwind':
        case 'tailwindcss':
            return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400";
        case 'bootstrap':
            return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
        case 'materialui':
        case 'mui':
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";

        // Databases
        case 'mongodb':
            return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        case 'firebase':
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";

        // APIs and real-time
        case 'api':
            return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
        case 'socketio':
            return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";

        // Default for unknown tags
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
    }
};
