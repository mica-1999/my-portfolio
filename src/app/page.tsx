/**
 * Root page of the application.
 * This page redirects to the home page.
 */
// REVIEWED: 2025-05-05 - Good to go ✅

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/pages/home");
}
