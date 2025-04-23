import { redirect } from "next/navigation";

// Redirect to the home page
export default function Home() {
  redirect("/pages/home");
}
