import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import WorkshopClient from "./WorkshopClient";

export default async function WorkshopPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, batch, role")
    .eq("id", user.id)
    .single();

  if (!profile?.full_name || !profile?.batch) redirect("/onboarding");

  const { data: progress } = await supabase
    .from("progress")
    .select("step_id")
    .eq("user_id", user.id);

  const completed = (progress ?? []).map((p) => p.step_id);

  return (
    <WorkshopClient
      fullName={profile.full_name}
      batch={profile.batch}
      isAdmin={profile.role === "admin"}
      initialDone={completed}
    />
  );
}
