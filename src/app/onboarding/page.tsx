import { redirect } from "next/navigation";
import { UserCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/SignOutButton";
import OnboardingForm from "./OnboardingForm";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, batch")
    .eq("id", user.id)
    .single();

  // Already completed onboarding -> go straight to the workshop.
  if (profile?.full_name && profile?.batch) redirect("/workshop");

  const defaultName =
    profile?.full_name ||
    (user.user_metadata?.full_name as string) ||
    (user.user_metadata?.name as string) ||
    "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-3">
          <SignOutButton />
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
              <UserCircle size={30} className="text-indigo-600" />
            </div>
            <h1 className="text-lg font-bold text-slate-900">ข้อมูลผู้เข้าอบรม</h1>
            <p className="text-sm text-slate-500 mt-1">
              กรอกข้อมูลก่อนเริ่มทำ Workshop
            </p>
          </div>
          <div className="px-8 py-6">
            <OnboardingForm defaultName={defaultName} email={user.email ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
