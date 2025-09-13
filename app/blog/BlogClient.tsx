"use client";

import Link from "next/link";
import { m as motion } from "framer-motion";

const blogPosts = [
  {
    id: "building-mern-app-nextjs",
    title: "Building a MERN App with Next.js: Complete Guide",
    excerpt: "Learn how to build a full-stack MERN application using Next.js as the frontend framework. This comprehensive guide covers everything from setup to deployment.",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "MERN Stack",
    slug: "/blog/building-mern-app-nextjs",
  },
  {
    id: "nextjs-performance-optimization",
    title: "Next.js Performance Optimization: Core Web Vitals",
    excerpt: "Discover essential techniques to optimize your Next.js applications for better Core Web Vitals scores and improved user experience.",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Next.js",
    slug: "/blog/nextjs-performance-optimization",
  },
  {
    id: "react-state-management-best-practices",
    title: "React State Management: Best Practices for 2024",
    excerpt: "Explore modern state management patterns in React applications, including Context API, Zustand, and Redux Toolkit comparisons.",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "React",
    slug: "/blog/react-state-management-best-practices",
  },
];

export default function BlogClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <Link 
              href="/" 
              className="text-white/70 hover:text-white mb-8 inline-block"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              MERN Stack & Next.js Blog
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl">
              Insights, tutorials, and best practices for modern web development with MERN stack and Next.js.
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group backdrop-blur-optimized rounded-3xl border border-white/20 shadow-2xl p-8 hover-optimized gpu-accelerated"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                    {post.category}
                  </span>
                  <span className="text-white/60 text-sm">{post.readTime}</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                  <Link href={post.slug} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <time className="text-white/60 text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <Link
                    href={post.slug}
                    className="text-purple-400 hover:text-purple-300 font-medium group-hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
