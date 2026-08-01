import type { Metadata } from "next";
import EcommerceProjectClient from "./EcommerceProjectClient";
import { createPageMetadata } from "../../../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Ecommerce Website — Next.js & Redux",
  description:
    "Modern ecommerce storefront with categories, product pages, cart, wishlist, search, and sorting — built with Next.js, Redux, and Bootstrap.",
  path: "/projects/ecommerce",
});

export default function EcommerceProjectPage() {
  return <EcommerceProjectClient />;
}
