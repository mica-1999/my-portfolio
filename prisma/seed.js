const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userId = 8; // Using the specified userId

async function main() {
    console.log('Starting seed...');

    // Create software notes with associated data
    const notes = [
        {
            title: 'React Hooks Deep Dive',
            description: 'A comprehensive guide to React hooks including useState, useEffect, useContext, and custom hooks.',
            status: 'COMPLETED',
            category: 'Frontend',
            subcategories: ['React', 'Hooks', 'JavaScript'],
            complexity: 'INTERMEDIATE',
            startDate: new Date('2023-09-01'),
            endDate: new Date('2023-09-15'),
            progress: 100,
            personalNotes: 'Remember to review useCallback and useMemo periodically',
            isPublic: true,
            codeSnippets: {
                create: [
                    {
                        title: 'useState Example',
                        language: 'javascript',
                        code: `const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};`,
                        explanation: 'Basic example of useState hook for managing component state'
                    },
                    {
                        title: 'useEffect with Cleanup',
                        language: 'javascript',
                        code: `useEffect(() => {
  const subscription = dataSource.subscribe();
  
  return () => {
    subscription.unsubscribe();
  };
}, [dataSource]);`,
                        explanation: 'Example of useEffect with cleanup function to prevent memory leaks'
                    }
                ]
            },
            concepts: {
                create: [
                    {
                        name: 'State Management',
                        description: 'Process of managing application state and data flow in React components'
                    },
                    {
                        name: 'Side Effects',
                        description: 'Operations that affect something outside the scope of the function being executed'
                    }
                ]
            },
            links: {
                create: [
                    {
                        title: 'React Docs - Hooks',
                        url: 'https://reactjs.org/docs/hooks-intro.html',
                        description: 'Official React documentation on Hooks'
                    },
                    {
                        title: 'useEffect Complete Guide',
                        url: 'https://overreacted.io/a-complete-guide-to-useeffect/',
                        description: 'Dan Abramov\'s comprehensive guide to useEffect'
                    }
                ]
            },
            resources: {
                create: [
                    {
                        type: 'DOCUMENTATION',
                        title: 'React Hooks API Reference',
                        url: 'https://reactjs.org/docs/hooks-reference.html',
                        notes: 'Comprehensive API reference for all built-in hooks'
                    },
                    {
                        type: 'VIDEO',
                        title: 'React Hooks Course',
                        url: 'https://www.youtube.com/watch?v=hQAHSlTtcmY',
                        notes: 'Excellent tutorial on hooks fundamentals'
                    }
                ]
            }
        },
        {
            title: 'Next.js Authentication',
            description: 'Implementing authentication in Next.js applications using NextAuth.js',
            status: 'IN_PROGRESS',
            category: 'Full Stack',
            subcategories: ['Next.js', 'Authentication', 'Security'],
            complexity: 'ADVANCED',
            startDate: new Date('2023-10-10'),
            progress: 60,
            personalNotes: 'Need to implement JWT token refresh strategy',
            isPublic: false,
            codeSnippets: {
                create: [
                    {
                        title: 'NextAuth Configuration',
                        language: 'javascript',
                        code: `// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        // Authenticate user here
        // Return user object or null
      }
    })
  ],
  callbacks: {
    jwt: async (token, user) => {
      if (user) token.id = user.id;
      return token;
    },
    session: async (session, token) => {
      session.user.id = token.id;
      return session;
    }
  }
});`,
                        explanation: 'Basic NextAuth.js setup with credentials provider'
                    }
                ]
            },
            concepts: {
                create: [
                    {
                        name: 'JWT Authentication',
                        description: 'Authentication method using JSON Web Tokens to securely transmit information between parties'
                    },
                    {
                        name: 'OAuth Flow',
                        description: 'Authentication process where users can grant websites or applications access to their information on other services'
                    }
                ]
            },
            links: {
                create: [
                    {
                        title: 'NextAuth.js Documentation',
                        url: 'https://next-auth.js.org/getting-started/introduction',
                        description: 'Official NextAuth.js documentation'
                    }
                ]
            },
            resources: {
                create: [
                    {
                        type: 'TUTORIAL',
                        title: 'Complete NextAuth Guide',
                        url: 'https://blog.logrocket.com/nextjs-authentication-next-auth-tutorial/',
                        notes: 'Comprehensive tutorial on implementing authentication'
                    }
                ]
            }
        },
        {
            title: 'PostgreSQL Performance Optimization',
            description: 'Techniques for optimizing PostgreSQL database performance including indexing, query optimization, and configuration tuning.',
            status: 'PLANNED',
            category: 'Database',
            subcategories: ['PostgreSQL', 'Performance', 'SQL'],
            complexity: 'EXPERT',
            progress: 0,
            isPublic: true,
            codeSnippets: {
                create: [
                    {
                        title: 'Index Creation',
                        language: 'sql',
                        code: `-- Create an index on frequently queried columns
CREATE INDEX idx_user_email ON users(email);

-- Create a composite index for queries with multiple conditions
CREATE INDEX idx_orders_user_date ON orders(user_id, order_date);`,
                        explanation: 'SQL commands for creating indexes to speed up query performance'
                    }
                ]
            },
            concepts: {
                create: [
                    {
                        name: 'Query Execution Plan',
                        description: 'The sequence of steps the database will take to retrieve or modify data'
                    },
                    {
                        name: 'Table Partitioning',
                        description: 'Dividing large tables into smaller, more manageable pieces to improve query performance'
                    }
                ]
            },
            links: {
                create: [
                    {
                        title: 'PostgreSQL Documentation - Performance Tips',
                        url: 'https://www.postgresql.org/docs/current/performance-tips.html',
                        description: 'Official documentation on PostgreSQL performance optimization'
                    }
                ]
            },
            resources: {
                create: [
                    {
                        type: 'BOOK',
                        title: 'PostgreSQL 14 Administration Cookbook',
                        notes: 'Contains excellent chapters on performance optimization'
                    },
                    {
                        type: 'ARTICLE',
                        title: 'Optimizing PostgreSQL Database Performance',
                        url: 'https://www.enterprisedb.com/blog/optimizing-postgresql-database-performance',
                        notes: 'Practical tips for database optimization'
                    }
                ]
            }
        }
    ];

    // Create software notes with associated data
    for (const note of notes) {
        await prisma.softwareNotes.create({
            data: {
                ...note,
                userId
            }
        });
    }

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
