"use client";

import Link from "next/link";
import { m as motion } from "framer-motion";

export default function BlogPostClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <Link 
              href="/blog" 
              className="text-white/70 hover:text-white mb-8 inline-block"
            >
              ← Back to Blog
            </Link>
          </div>

          <article className="prose prose-invert max-w-none">
            <header className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                  MERN Stack
                </span>
                <span className="text-white/60 text-sm">8 min read</span>
                <time className="text-white/60 text-sm">
                  January 15, 2024
                </time>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Building a MERN App with Next.js: Complete Guide
              </h1>
              
              <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                Learn how to build a full-stack MERN application using Next.js as the frontend framework. 
                This comprehensive guide covers everything from setup to deployment, including best practices 
                for performance and SEO optimization.
              </p>
            </header>

            <div className="space-y-8">
              <motion.section
                className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Introduction to MERN Stack with Next.js
                </h2>
                <div className="text-white/80 space-y-4">
                  <p>
                    The MERN stack (MongoDB, Express.js, React, Node.js) is one of the most popular 
                    full-stack development combinations. When you replace the traditional React setup 
                    with Next.js, you get additional benefits like server-side rendering, static site 
                    generation, and built-in optimization features.
                  </p>
                  <p>
                    In this guide, we'll build a complete task management application that demonstrates 
                    the power of combining Next.js with a MERN stack backend. We'll cover authentication, 
                    CRUD operations, real-time updates, and deployment strategies.
                  </p>
                </div>
              </motion.section>

              <motion.section
                className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Project Setup and Architecture
                </h2>
                <div className="text-white/80 space-y-4">
                  <p>
                    Our application will consist of two main parts: a Next.js frontend and a Node.js/Express 
                    backend. The frontend will handle user interface and client-side routing, while the backend 
                    manages API endpoints, database operations, and authentication.
                  </p>
                  <h3 className="text-xl font-semibold text-white mt-6 mb-4">Frontend Setup (Next.js)</h3>
                  <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    <code className="text-green-400">
{`npx create-next-app@latest task-manager-frontend
cd task-manager-frontend
npm install axios react-query @tanstack/react-query
npm install @headlessui/react @heroicons/react`}
                    </code>
                  </pre>
                  
                  <h3 className="text-xl font-semibold text-white mt-6 mb-4">Backend Setup (Node.js/Express)</h3>
                  <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    <code className="text-green-400">
{`mkdir task-manager-backend
cd task-manager-backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon`}
                    </code>
                  </pre>
                </div>
              </motion.section>

              <motion.section
                className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Database Design with MongoDB
                </h2>
                <div className="text-white/80 space-y-4">
                  <p>
                    For our task management app, we'll create two main collections: Users and Tasks. 
                    This design allows for user authentication and task ownership while maintaining 
                    data relationships.
                  </p>
                  <h3 className="text-xl font-semibold text-white mt-6 mb-4">User Schema</h3>
                  <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    <code className="text-blue-400">
{`const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });`}
                    </code>
                  </pre>
                  
                  <h3 className="text-xl font-semibold text-white mt-6 mb-4">Task Schema</h3>
                  <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    <code className="text-blue-400">
{`const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });`}
                    </code>
                  </pre>
                </div>
              </motion.section>

              <motion.section
                className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  API Development with Express.js
                </h2>
                <div className="text-white/80 space-y-4">
                  <p>
                    Our Express.js backend will provide RESTful API endpoints for user authentication 
                    and task management. We'll implement JWT-based authentication and proper error handling.
                  </p>
                  <h3 className="text-xl font-semibold text-white mt-6 mb-4">Authentication Middleware</h3>
                  <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    <code className="text-yellow-400">
{`const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};`}
                    </code>
                  </pre>
                </div>
              </motion.section>

              <motion.section
                className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Next.js Frontend Implementation
                </h2>
                <div className="text-white/80 space-y-4">
                  <p>
                    The Next.js frontend will use App Router for routing, React Query for data fetching, 
                    and Tailwind CSS for styling. We'll implement both client and server components 
                    for optimal performance.
                  </p>
                  <h3 className="text-xl font-semibold text-white mt-6 mb-4">API Integration with React Query</h3>
                  <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    <code className="text-purple-400">
{`const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('/api/tasks', {
        headers: {
          'Authorization': \`Bearer \${getToken()}\`
        }
      });
      return response.json();
    }
  });
};`}
                    </code>
                  </pre>
                </div>
              </motion.section>

              <motion.section
                className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Performance Optimization and SEO
                </h2>
                <div className="text-white/80 space-y-4">
                  <p>
                    Next.js provides excellent built-in optimization features. We'll leverage static 
                    generation, image optimization, and proper meta tags for better SEO performance.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use Next.js Image component for optimized image loading</li>
                    <li>Implement proper meta tags and Open Graph data</li>
                    <li>Use dynamic imports for code splitting</li>
                    <li>Implement proper caching strategies</li>
                    <li>Optimize bundle size with tree shaking</li>
                  </ul>
                </div>
              </motion.section>

              <motion.section
                className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Deployment and Production Considerations
                </h2>
                <div className="text-white/80 space-y-4">
                  <p>
                    Deploying a MERN stack application requires careful consideration of both frontend 
                    and backend deployment strategies. We'll cover Vercel for Next.js and MongoDB Atlas 
                    for database hosting.
                  </p>
                  <h3 className="text-xl font-semibold text-white mt-6 mb-4">Environment Variables</h3>
                  <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    <code className="text-green-400">
{`# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_APP_URL=https://your-app-domain.com

# Backend (.env)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your-super-secret-jwt-key
PORT=5000`}
                    </code>
                  </pre>
                </div>
              </motion.section>

              <motion.section
                className="backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  Conclusion and Next Steps
                </h2>
                <div className="text-white/80 space-y-4">
                  <p>
                    Building a MERN application with Next.js provides a powerful foundation for modern 
                    web applications. The combination offers excellent developer experience, performance, 
                    and scalability.
                  </p>
                  <p>
                    Consider implementing additional features like real-time updates with Socket.io, 
                    file uploads with Multer, and advanced authentication with OAuth providers. 
                    The modular architecture makes it easy to extend and maintain your application.
                  </p>
                </div>
              </motion.section>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex items-center justify-between">
                <Link
                  href="/blog"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  ← Back to Blog
                </Link>
                <Link
                  href="/"
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  View Portfolio →
                </Link>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </div>
  );
}
