// Define the learning item type
export interface LearningItem {
    id: string;
    title: string;
    description: string;
    status: string;
    category: string;
    subcategories: string[];
    startDate: string;
    endDate?: string;
    resources?: string[];
    notes?: string;
    progress?: number;
}

// Define filters type
export interface LearningFilters {
    status: string;
    category: string;
    subcategories: string[];
    timeRange: string;
    search: string;
}

export interface FiltersProps {
    filters: LearningFilters;
    setFilters: React.Dispatch<React.SetStateAction<LearningFilters>>;
    clearFilters: () => void;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}