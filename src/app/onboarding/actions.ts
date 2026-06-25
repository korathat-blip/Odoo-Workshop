"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BATCHES } from "@/lib/steps";

export type OnboardingState = { error?: string };

export async function saveProfile(
  _prev: OnboardingState,
  formData: FormData
): Promise<OnboardingState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const batch = String(formData.get("batch") ?? "").trim();

  if (!fullName) return { error: "กรุณากรอกชื่อ-นามสกุล" };
  if (!BATCHES.includes(batch as (typeof BATCHES)[number])) {
    return { error: "กรุณาเลือกรุ่นที่อบรม" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: fullName, batch, updated_at: new Date().toISOString() })
    .eq("id", user.id);

  if (error) return { error: "บันทึกไม่สำเร็จ: " + error.message };

  redirect("/workshop");
}
