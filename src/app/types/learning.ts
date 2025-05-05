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
    progress: number;
    personalNotes?: string;
    isPublic?: boolean;
    createdAt?: string;
    updatedAt?: string;

    // Define the resource type based on the schema
    resources?: {
        id?: number;
        type: string;
        title: string;
        url?: string;
        notes?: string;
    }[];

    // Define code snippets
    codeSnippets?: {
        id?: number;
        title: string;
        language: string;
        code: string;
        explanation?: string;
    }[];

    // Define concepts
    concepts?: {
        id?: number;
        name: string;
        description: string;
    }[];

    // Define links
    links?: {
        id?: number;
        title: string;
        url: string;
        description?: string;
    }[];
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