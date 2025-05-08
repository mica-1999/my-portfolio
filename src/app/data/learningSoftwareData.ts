export const statusFilters = [
    { value: '', display: 'All Statuses' },
    { value: 'PLANNED', display: 'Planned' },
    { value: 'IN_PROGRESS', display: 'In Progress' },
    { value: 'COMPLETED', display: 'Completed' },
    { value: 'PAUSED', display: 'Paused' },
    { value: 'ABANDONED', display: 'Abandoned' }
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
    { value: 'fullstack', display: 'Full Stack' },
    { value: 'mobile', display: 'Mobile Development' },
    { value: 'ai', display: 'AI/Machine Learning' },
];

// Expanded subcategories for each category
export const programmingSubcategories = [
    { value: 'javascript', display: 'JavaScript' },
    { value: 'typescript', display: 'TypeScript' },
    { value: 'python', display: 'Python' },
    { value: 'java', display: 'Java' },
    { value: 'csharp', display: 'C#' },
    { value: 'cpp', display: 'C++' },
    { value: 'go', display: 'Go' },
    { value: 'rust', display: 'Rust' },
    { value: 'php', display: 'PHP' },
    { value: 'ruby', display: 'Ruby' },
    { value: 'swift', display: 'Swift' },
    { value: 'kotlin', display: 'Kotlin' },
    { value: 'scala', display: 'Scala' },
    { value: 'haskell', display: 'Haskell' },
    { value: 'dart', display: 'Dart' },
    { value: 'shell', display: 'Shell Scripting' },
    { value: 'dsa', display: 'Data Structures & Algorithms' },
    { value: 'functional', display: 'Functional Programming' },
    { value: 'oop', display: 'Object-Oriented Programming' },
    { value: 'react', display: 'React' },
];

export const networkingSubcategories = [
    { value: 'tcp-ip', display: 'TCP/IP' },
    { value: 'http', display: 'HTTP/HTTPS' },
    { value: 'dns', display: 'DNS' },
    { value: 'routing', display: 'Routing & Switching' },
    { value: 'firewalls', display: 'Firewalls' },
    { value: 'load-balancing', display: 'Load Balancing' },
    { value: 'vpn', display: 'VPN' },
    { value: 'websockets', display: 'WebSockets' },
    { value: 'proxy', display: 'Proxy Servers' },
    { value: 'ipv6', display: 'IPv6' },
    { value: 'wifi', display: 'Wi-Fi Technologies' },
    { value: 'sdn', display: 'Software-Defined Networking' },
    { value: 'nat', display: 'Network Address Translation' },
    { value: 'network-monitoring', display: 'Network Monitoring' },
    { value: 'ftp', display: 'FTP/SFTP' },
    { value: 'smtp', display: 'SMTP' },
    { value: 'imap', display: 'IMAP/POP3' },
    { value: 'ssh', display: 'SSH' },
    { value: 'ldap', display: 'LDAP' },
    { value: 'sip', display: 'SIP' },
    { value: 'ssl-tls', display: 'SSL/TLS' },
    { value: 'tcp', display: 'TCP' },
    { value: 'udp', display: 'UDP' },
    { value: 'ip', display: 'IP Protocol' },
    { value: 'icmp', display: 'ICMP' },
    { value: 'arp', display: 'ARP' },
];

export const databaseSubcategories = [
    { value: 'sql', display: 'SQL' },
    { value: 'nosql', display: 'NoSQL' },
    { value: 'mongodb', display: 'MongoDB' },
    { value: 'postgres', display: 'PostgreSQL' },
    { value: 'mysql', display: 'MySQL' },
    { value: 'oracle', display: 'Oracle' },
    { value: 'sqlserver', display: 'SQL Server' },
    { value: 'redis', display: 'Redis' },
    { value: 'elasticsearch', display: 'Elasticsearch' },
    { value: 'cassandra', display: 'Cassandra' },
    { value: 'neo4j', display: 'Neo4j' },
    { value: 'dynamodb', display: 'DynamoDB' },
    { value: 'firebase', display: 'Firebase' },
    { value: 'db-indexing', display: 'Database Indexing' },
    { value: 'db-sharding', display: 'Database Sharding' },
    { value: 'db-replication', display: 'Database Replication' },
    { value: 'orm', display: 'ORM' },
    { value: 'prisma', display: 'Prisma' },
    { value: 'mongoose', display: 'Mongoose' },
];

export const devopsSubcategories = [
    { value: 'docker', display: 'Docker' },
    { value: 'kubernetes', display: 'Kubernetes' },
    { value: 'ci-cd', display: 'CI/CD' },
    { value: 'jenkins', display: 'Jenkins' },
    { value: 'gitlab-ci', display: 'GitLab CI' },
    { value: 'github-actions', display: 'GitHub Actions' },
    { value: 'ansible', display: 'Ansible' },
    { value: 'terraform', display: 'Terraform' },
    { value: 'chef', display: 'Chef' },
    { value: 'puppet', display: 'Puppet' },
    { value: 'prometheus', display: 'Prometheus' },
    { value: 'grafana', display: 'Grafana' },
    { value: 'elk', display: 'ELK Stack' },
    { value: 'sre', display: 'Site Reliability Engineering' },
    { value: 'infrastructure-as-code', display: 'Infrastructure as Code' },
];

export const cloudSubcategories = [
    { value: 'aws', display: 'AWS' },
    { value: 'azure', display: 'Azure' },
    { value: 'gcp', display: 'Google Cloud' },
    { value: 'ibm-cloud', display: 'IBM Cloud' },
    { value: 'oracle-cloud', display: 'Oracle Cloud' },
    { value: 'digital-ocean', display: 'Digital Ocean' },
    { value: 'heroku', display: 'Heroku' },
    { value: 'vercel', display: 'Vercel' },
    { value: 'netlify', display: 'Netlify' },
    { value: 'iaas', display: 'IaaS' },
    { value: 'paas', display: 'PaaS' },
    { value: 'saas', display: 'SaaS' },
    { value: 'faas', display: 'FaaS/Serverless' },
    { value: 'serverless', display: 'Serverless Computing' },
    { value: 'cloud-security', display: 'Cloud Security' },
    { value: 'cloud-migration', display: 'Cloud Migration' },
    { value: 'multi-cloud', display: 'Multi-Cloud Strategies' },
];

export const securitySubcategories = [
    { value: 'web-security', display: 'Web Security' },
    { value: 'encryption', display: 'Encryption' },
    { value: 'auth', display: 'Authentication & Authorization' },
    { value: 'oauth', display: 'OAuth' },
    { value: 'jwt', display: 'JWT' },
    { value: 'cybersecurity', display: 'Cybersecurity' },
    { value: 'penetration-testing', display: 'Penetration Testing' },
    { value: 'devsecops', display: 'DevSecOps' },
    { value: 'ssl-tls', display: 'SSL/TLS' },
    { value: 'security-auditing', display: 'Security Auditing' },
    { value: 'owasp', display: 'OWASP Top 10' },
    { value: 'api-security', display: 'API Security' },
    { value: 'secure-coding', display: 'Secure Coding Practices' },
    { value: 'identity-management', display: 'Identity & Access Management' },
    { value: 'zero-trust', display: 'Zero Trust Security Model' },
];

export const frontendSubcategories = [
    { value: 'html', display: 'HTML' },
    { value: 'css', display: 'CSS' },
    { value: 'javascript', display: 'JavaScript' },
    { value: 'react', display: 'React' },
    { value: 'angular', display: 'Angular' },
    { value: 'vue', display: 'Vue.js' },
    { value: 'next', display: 'Next.js' },
    { value: 'svelte', display: 'Svelte' },
    { value: 'sass', display: 'Sass' },
    { value: 'tailwind', display: 'Tailwind CSS' },
    { value: 'bootstrap', display: 'Bootstrap' },
    { value: 'material-ui', display: 'Material UI' },
    { value: 'redux', display: 'Redux' },
    { value: 'graphql-client', display: 'GraphQL Client' },
    { value: 'webpack', display: 'Webpack' },
    { value: 'vite', display: 'Vite' },
    { value: 'storybook', display: 'Storybook' },
    { value: 'pwa', display: 'Progressive Web Apps' },
    { value: 'web-performance', display: 'Web Performance' },
    { value: 'a11y', display: 'Accessibility' },
    { value: 'responsive-design', display: 'Responsive Design' },
    { value: 'i18n', display: 'Internationalization' },
];

export const backendSubcategories = [
    { value: 'node', display: 'Node.js' },
    { value: 'express', display: 'Express' },
    { value: 'nestjs', display: 'NestJS' },
    { value: 'django', display: 'Django' },
    { value: 'flask', display: 'Flask' },
    { value: 'fastapi', display: 'FastAPI' },
    { value: 'spring', display: 'Spring' },
    { value: 'spring-boot', display: 'Spring Boot' },
    { value: 'laravel', display: 'Laravel' },
    { value: 'dotnet', display: '.NET' },
    { value: 'asp-net', display: 'ASP.NET' },
    { value: 'go-gin', display: 'Gin (Go)' },
    { value: 'graphql', display: 'GraphQL' },
    { value: 'rest-api', display: 'REST API' },
    { value: 'microservices', display: 'Microservices' },
    { value: 'api-gateway', display: 'API Gateway' },
    { value: 'message-brokers', display: 'Message Brokers' },
    { value: 'rabbitmq', display: 'RabbitMQ' },
    { value: 'kafka', display: 'Kafka' },
    { value: 'websockets', display: 'WebSockets' },
    { value: 'authentication', display: 'Authentication' },
    { value: 'caching', display: 'Caching Strategies' },
    { value: 'prisma', display: 'Prisma' },
    { value: 'mongoose', display: 'Mongoose' },
];

export const fullstackSubcategories = [
    { value: 'nextjs', display: 'Next.js' },
    { value: 'nuxtjs', display: 'Nuxt.js' },
    { value: 'mern', display: 'MERN Stack' },
    { value: 'mean', display: 'MEAN Stack' },
    { value: 'jamstack', display: 'JAMstack' },
    { value: 'lamp', display: 'LAMP Stack' },
    { value: 'ruby-on-rails', display: 'Ruby on Rails' },
    { value: 'django-fullstack', display: 'Django Full Stack' },
    { value: 'laravel-fullstack', display: 'Laravel Full Stack' },
    { value: 'asp-net-fullstack', display: 'ASP.NET Full Stack' },
    { value: 'spring-fullstack', display: 'Spring Full Stack' },
    { value: 'graphql-fullstack', display: 'GraphQL Full Stack' },
    { value: 'apollo', display: 'Apollo' },
    { value: 'remix', display: 'Remix' },
    { value: 'sveltekit', display: 'SvelteKit' },
    { value: 'blitz', display: 'Blitz.js' },
    { value: 'redwood', display: 'RedwoodJS' },
];

export const mobileSubcategories = [
    { value: 'react-native', display: 'React Native' },
    { value: 'flutter', display: 'Flutter' },
    { value: 'swift', display: 'Swift' },
    { value: 'swiftui', display: 'SwiftUI' },
    { value: 'android', display: 'Android Development' },
    { value: 'kotlin', display: 'Kotlin for Android' },
    { value: 'java-mobile', display: 'Java for Android' },
    { value: 'ionic', display: 'Ionic' },
    { value: 'xamarin', display: 'Xamarin' },
    { value: 'capacitor', display: 'Capacitor' },
    { value: 'cordova', display: 'Cordova' },
    { value: 'pwa-mobile', display: 'PWA for Mobile' },
    { value: 'responsive-mobile', display: 'Responsive Mobile Design' },
    { value: 'offline-first', display: 'Offline-First Apps' },
    { value: 'mobile-ui', display: 'Mobile UI/UX' },
    { value: 'mobile-performance', display: 'Mobile Performance' },
];

export const aiSubcategories = [
    { value: 'machine-learning', display: 'Machine Learning' },
    { value: 'deep-learning', display: 'Deep Learning' },
    { value: 'nlp', display: 'Natural Language Processing' },
    { value: 'computer-vision', display: 'Computer Vision' },
    { value: 'tensorflow', display: 'TensorFlow' },
    { value: 'pytorch', display: 'PyTorch' },
    { value: 'keras', display: 'Keras' },
    { value: 'scikit-learn', display: 'Scikit-learn' },
    { value: 'data-science', display: 'Data Science' },
    { value: 'data-analysis', display: 'Data Analysis' },
    { value: 'pandas', display: 'Pandas' },
    { value: 'numpy', display: 'NumPy' },
    { value: 'reinforcement-learning', display: 'Reinforcement Learning' },
    { value: 'generative-ai', display: 'Generative AI' },
    { value: 'llm', display: 'Large Language Models' },
    { value: 'ai-ethics', display: 'AI Ethics' },
    { value: 'neural-networks', display: 'Neural Networks' },
    { value: 'ml-ops', display: 'MLOps' },
];

export const subcategoryFilters = [
    { value: 'javascript', display: 'JavaScript', category: 'programming' },
    { value: 'typescript', display: 'TypeScript', category: 'programming' },
    { value: 'python', display: 'Python', category: 'programming' },
    { value: 'java', display: 'Java', category: 'programming' },
    { value: 'csharp', display: 'C#', category: 'programming' },
    { value: 'html', display: 'HTML', category: 'frontend' },
    { value: 'css', display: 'CSS', category: 'frontend' },
    { value: 'react', display: 'React', category: 'programming' },
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
    { value: 'nextjs', display: 'Next.js', category: 'fullstack' },
    { value: 'mern', display: 'MERN Stack', category: 'fullstack' },
    { value: 'jamstack', display: 'JAMstack', category: 'fullstack' },
    { value: 'prisma', display: 'Prisma', category: 'database' },
    { value: 'mongoose', display: 'Mongoose', category: 'database' },
    { value: 'ssl-tls', display: 'SSL/TLS', category: 'security' },
    { value: 'ssl-tls', display: 'SSL/TLS', category: 'networking' },
    { value: 'tcp', display: 'TCP', category: 'networking' },
    { value: 'udp', display: 'UDP', category: 'networking' },
    { value: 'ip', display: 'IP Protocol', category: 'networking' },
    { value: 'icmp', display: 'ICMP', category: 'networking' },
    { value: 'arp', display: 'ARP', category: 'networking' },
];

export const timeRangeFilters = [
    { value: '', display: 'All Time' },
    { value: 'last7days', display: 'Last 7 Days' },
    { value: 'last30days', display: 'Last 30 Days' },
    { value: 'last90days', display: 'Last 90 Days' },
    { value: 'lastyear', display: 'Last Year' }
];

// Complexity options
export const complexityOptions = [
    { value: 'BEGINNER', display: 'Beginner' },
    { value: 'INTERMEDIATE', display: 'Intermediate' },
    { value: 'ADVANCED', display: 'Advanced' },
    { value: 'EXPERT', display: 'Expert' }
];

// Helper function to get subcategories by category
export const getSubcategoriesByCategory = (category: string) => {
    switch (category) {
        case 'programming':
            return programmingSubcategories;
        case 'networking':
            return networkingSubcategories;
        case 'database':
            return databaseSubcategories;
        case 'devops':
            return devopsSubcategories;
        case 'cloud':
            return cloudSubcategories;
        case 'security':
            return securitySubcategories;
        case 'frontend':
            return frontendSubcategories;
        case 'backend':
            return backendSubcategories;
        case 'fullstack':
            return fullstackSubcategories;
        case 'mobile':
            return mobileSubcategories;
        case 'ai':
            return aiSubcategories;
        default:
            return [];
    }
};