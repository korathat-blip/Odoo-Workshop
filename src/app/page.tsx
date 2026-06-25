import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Entry point: route the signed-in user to onboarding or the workshop.
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware guarantees a user here, but guard anyway.
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, batch")
    .eq("id", user.id)
    .single();

  if (!profile?.full_name || !profile?.batch) {
    redirect("/onboarding");
  }

  redirect("/workshop");
}
