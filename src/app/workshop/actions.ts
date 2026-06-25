"use server";

import { createClient } from "@/lib/supabase/server";

export type ToggleResult = { ok: boolean; error?: string };

// Marks a step complete (insert) or not-complete (delete) for the current user.
export async function setStepDone(
  stepId: number,
  done: boolean
): Promise<ToggleResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "ไม่ได้เข้าสู่ระบบ" };

  if (done) {
    const { error } = await supabase
      .from("progress")
      .upsert(
        { user_id: user.id, step_id: stepId },
        { onConflict: "user_id,step_id" }
      );
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase
      .from("progress")
      .delete()
      .eq("user_id", user.id)
      .eq("step_id", stepId);
    if (error) return { ok: false, error: error.message };
  }

  return { ok: true };
}
