export const statusFilters = [
    { value: '', display: 'All Statuses' },
    { value: 'completed', display: 'Completed' },
    { value: 'ongoing', display: 'Ongoing' },
    { value: 'planned', display: 'Planned' },
    { value: 'paused', display: 'Paused' }
];

export const categoryFilters = [
    { value: '', display: 'All Categories' },
    { value: 'programming', display: 'Programming' },
    { value: 'networking', display: 'Networking' },
    { value: 'database', display: 'Database' },
    { value: 'devops', display: 'DevOps' },
    { value: 'cloud', display: 'Cloud Computing' },
    { value: 'security', display: 'Security' },
    { value: 'frontend', display: 'Frontend' },
    { value: 'backend', display: 'Backend' },
    { value: 'mobile', display: 'Mobile Development' },
    { value: 'ai', display: 'AI/Machine Learning' },
];

export const subcategoryFilters = [
    { value: 'javascript', display: 'JavaScript', category: 'programming' },
    { value: 'typescript', display: 'TypeScript', category: 'programming' },
    { value: 'python', display: 'Python', category: 'programming' },
    { value: 'java', display: 'Java', category: 'programming' },
    { value: 'csharp', display: 'C#', category: 'programming' },
    { value: 'html', display: 'HTML', category: 'frontend' },
    { value: 'css', display: 'CSS', category: 'frontend' },
    { value: 'react', display: 'React', category: 'frontend' },
    { value: 'angular', display: 'Angular', category: 'frontend' },
    { value: 'vue', display: 'Vue.js', category: 'frontend' },
    { value: 'next', display: 'Next.js', category: 'frontend' },
    { value: 'node', display: 'Node.js', category: 'backend' },
    { value: 'express', display: 'Express', category: 'backend' },
    { value: 'sql', display: 'SQL', category: 'database' },
    { value: 'nosql', display: 'NoSQL', category: 'database' },
    { value: 'mongodb', display: 'MongoDB', category: 'database' },
    { value: 'postgres', display: 'PostgreSQL', category: 'database' },
    { value: 'docker', display: 'Docker', category: 'devops' },
    { value: 'kubernetes', display: 'Kubernetes', category: 'devops' },
    { value: 'aws', display: 'AWS', category: 'cloud' },
    { value: 'azure', display: 'Azure', category: 'cloud' },
    { value: 'gcp', display: 'Google Cloud', category: 'cloud' },
    { value: 'react-native', display: 'React Native', category: 'mobile' },
    { value: 'flutter', display: 'Flutter', category: 'mobile' },
    { value: 'tensorflow', display: 'TensorFlow', category: 'ai' },
    { value: 'pytorch', display: 'PyTorch', category: 'ai' },
];

export const timeRangeFilters = [
    { value: '', display: 'All Time' },
    { value: 'last7days', display: 'Last 7 Days' },
    { value: 'last30days', display: 'Last 30 Days' },
    { value: 'last90days', display: 'Last 90 Days' },
    { value: 'lastyear', display: 'Last Year' }
];