import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MotionProvider } from '../components/motion-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rahul Khedekar - Full Stack Developer',
  description: 'Professional portfolio of Rahul Khedekar, a Full Stack Web Developer specializing in MERN stack development.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}