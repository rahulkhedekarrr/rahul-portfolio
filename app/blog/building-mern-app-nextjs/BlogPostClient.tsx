"use client";

import Link from "next/link";
import Background from "../../../components/layout/Background";
import SectionLabel from "../../../components/case-study/SectionLabel";

export default function BlogPostClient() {
  return (
    <div className="relative min-h-screen bg-sharp text-sharp-fg">
      <Background />

      <div className="relative z-10 border-b border-sharp">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-[0.16em] text-sharp-muted transition-colors hover:text-sharp-accent"
          >
            ← Blog
          </Link>
          <span className="font-mono text-xs tracking-[0.2em] text-sharp-fg">
            RK
          </span>
        </div>
      </div>

      <article className="relative z-10 mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mb-12 border border-sharp bg-sharp-surface p-6 sm:p-8">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="chip">MERN Stack</span>
            <span className="font-mono text-[11px] text-sharp-muted">
              8 min read
            </span>
            <time className="font-mono text-[11px] text-sharp-muted">
              January 15, 2024
            </time>
          </div>

          <h1 className="mb-5 text-3xl font-bold tracking-tight text-sharp-fg sm:text-5xl">
            Building a MERN App with Next.js: Complete Guide
          </h1>

          <p className="text-base leading-relaxed text-sharp-muted sm:text-lg">
            Learn how to build a full-stack MERN application using Next.js as
            the frontend framework — from setup to deployment, including
            performance and SEO practices.
          </p>
        </header>

        <div className="space-y-12">
          <section>
            <SectionLabel index="01" title="Introduction" />
            <div className="space-y-4 text-sharp-muted">
              <p>
                The MERN stack (MongoDB, Express.js, React, Node.js) is one of
                the most popular full-stack combinations. Replacing a plain
                React SPA with Next.js adds SSR/SSG, routing, and built-in
                optimization.
              </p>
              <p>
                This guide walks through a task management app that covers
                authentication, CRUD, and a practical deploy path.
              </p>
            </div>
          </section>

          <section>
            <SectionLabel index="02" title="Setup & architecture" />
            <div className="space-y-4 text-sharp-muted">
              <p>
                Two parts: a Next.js frontend and a Node/Express API. The
                frontend owns UI and routing; the backend owns auth, data, and
                API endpoints.
              </p>
              <h3 className="pt-2 font-mono text-xs uppercase tracking-[0.16em] text-sharp-accent">
                Frontend
              </h3>
              <pre className="overflow-x-auto border border-sharp bg-sharp-surface p-4 font-mono text-xs text-sharp-fg sm:text-sm">
                <code>{`npx create-next-app@latest task-manager-frontend
cd task-manager-frontend
npm install axios @tanstack/react-query`}</code>
              </pre>
              <h3 className="pt-2 font-mono text-xs uppercase tracking-[0.16em] text-sharp-accent">
                Backend
              </h3>
              <pre className="overflow-x-auto border border-sharp bg-sharp-surface p-4 font-mono text-xs text-sharp-fg sm:text-sm">
                <code>{`mkdir task-manager-backend
cd task-manager-backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon`}</code>
              </pre>
            </div>
          </section>

          <section>
            <SectionLabel index="03" title="MongoDB models" />
            <div className="space-y-4 text-sharp-muted">
              <p>
                Two collections — Users and Tasks — keep ownership clear while
                staying simple to query.
              </p>
              <pre className="overflow-x-auto border border-sharp bg-sharp-surface p-4 font-mono text-xs text-sharp-fg sm:text-sm">
                <code>{`const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });`}</code>
              </pre>
              <pre className="overflow-x-auto border border-sharp bg-sharp-surface p-4 font-mono text-xs text-sharp-fg sm:text-sm">
                <code>{`const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });`}</code>
              </pre>
            </div>
          </section>

          <section>
            <SectionLabel index="04" title="Express API" />
            <div className="space-y-4 text-sharp-muted">
              <p>
                REST endpoints for auth and tasks, with JWT middleware and clear
                error responses.
              </p>
              <pre className="overflow-x-auto border border-sharp bg-sharp-surface p-4 font-mono text-xs text-sharp-fg sm:text-sm">
                <code>{`const authenticateToken = (req, res, next) => {
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
};`}</code>
              </pre>
            </div>
          </section>

          <section>
            <SectionLabel index="05" title="Next.js frontend" />
            <div className="space-y-4 text-sharp-muted">
              <p>
                App Router for structure, React Query for server state, and a
                mix of server/client components where each fits.
              </p>
              <pre className="overflow-x-auto border border-sharp bg-sharp-surface p-4 font-mono text-xs text-sharp-fg sm:text-sm">
                <code>{`const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('/api/tasks', {
        headers: { Authorization: \`Bearer \${getToken()}\` }
      });
      return response.json();
    }
  });
};`}</code>
              </pre>
            </div>
          </section>

          <section>
            <SectionLabel index="06" title="Performance & SEO" />
            <ul className="list-disc space-y-2 pl-5 text-sharp-muted">
              <li>Prefer Next.js Image for media</li>
              <li>Ship solid meta tags and Open Graph</li>
              <li>Dynamic-import heavy client modules</li>
              <li>Cache API responses thoughtfully</li>
              <li>Keep bundles lean with tree-shaking</li>
            </ul>
          </section>

          <section>
            <SectionLabel index="07" title="Deploy" />
            <div className="space-y-4 text-sharp-muted">
              <p>
                Common split: Vercel for Next.js, a Node host for the API, and
                MongoDB Atlas for data.
              </p>
              <pre className="overflow-x-auto border border-sharp bg-sharp-surface p-4 font-mono text-xs text-sharp-fg sm:text-sm">
                <code>{`# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://your-api-domain.com

# Backend (.env)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-super-secret-jwt-key
PORT=5000`}</code>
              </pre>
            </div>
          </section>

          <section>
            <SectionLabel index="08" title="Wrap-up" />
            <div className="space-y-4 text-sharp-muted">
              <p>
                MERN + Next.js is a strong default for apps that need a real
                API and a fast, SEO-friendly frontend. Extend with sockets,
                uploads, or OAuth when the product needs them.
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-sharp pt-8">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-[0.14em] text-sharp-muted transition-colors hover:text-sharp-accent"
          >
            ← Back to blog
          </Link>
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.14em] text-sharp-muted transition-colors hover:text-sharp-accent"
          >
            Portfolio →
          </Link>
        </footer>
      </article>
    </div>
  );
}
