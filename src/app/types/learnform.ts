export interface Resource {
    type: string;
    title: string;
    url: string;
    notes: string;
}

export interface ResourcesProps {
    resources: Resource[];
    setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
    errors: { [key: string]: string };
}

export interface Link {
    title: string;
    url: string;
    description: string;
}

export interface LinksProps {
    links: Link[];
    setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
    errors: { [key: string]: string };
}

export interface Concept {
    name: string;
    description: string;
}

export interface KeyConceptsProps {
    concepts: Concept[];
    setConcepts: React.Dispatch<React.SetStateAction<Concept[]>>;
    errors: { [key: string]: string };
}

export interface CodeSnippet {
    title: string;
    language: string;
    code: string;
    explanation: string;
}

export interface CodeSnippetsProps {
    codeSnippets: CodeSnippet[];
    setCodeSnippets: React.Dispatch<React.SetStateAction<CodeSnippet[]>>;
    errors: { [key: string]: string };
}

export interface BasicInfoProps {
    formData: {
        title: string;
        description: string;
        status: string;
        category: string;
        subcategories: string[];
        complexity: string;
        startDate: string;
        endDate: string;
        progress: number;
        personalNotes: string;
        isPublic: boolean;
    };
    availableSubcategories: { value: string, display: string }[];
    errors: { [key: string]: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubcategoryChange: (subcategory: string) => void;
}