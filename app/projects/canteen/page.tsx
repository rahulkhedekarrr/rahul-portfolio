import { Metadata } from "next";
import CanteenProjectClient from "./CanteenProjectClient";

export const metadata: Metadata = {
  title: "Smart Canteen Management System | Next.js & QR Technology | Rahul Khedekar",
  description: "Complete QR-first canteen management system built with Next.js, featuring real-time dashboards, payment gating, and kiosk-ready printing for high-volume food service operations.",
  keywords: [
    "canteen management system",
    "QR code food ordering",
    "Next.js restaurant app",
    "food service technology",
    "catering management",
    "QR scanning system",
    "restaurant dashboard",
    "food ordering platform",
  ],
  openGraph: {
    title: "Smart Canteen Management System | Next.js & QR Technology",
    description: "Complete QR-first canteen management system with real-time dashboards and payment gating.",
    url: "https://www.rahulkhedekar.in/projects/canteen",
    type: "website",
  },
};

export default function CanteenProjectPage() {
  return <CanteenProjectClient />;
}
