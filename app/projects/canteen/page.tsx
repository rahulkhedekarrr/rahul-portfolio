import { Metadata } from "next";
import CanteenProjectClient from "./CanteenProjectClient";
import { createPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Smart Canteen Management System",
  description:
    "QR-first canteen management system built with Next.js — real-time dashboards, payment gating, and kiosk-ready printing for high-volume food service.",
  path: "/projects/canteen",
});

export default function CanteenProjectPage() {
  return <CanteenProjectClient />;
}
