"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { saveProfile, type OnboardingState } from "./actions";
import { BATCHES } from "@/lib/steps";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-indigo-600 text-white rounded-xl px-4 py-3 font-medium hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "กำลังบันทึก…" : "เริ่มทำ Workshop"}
    </button>
  );
}

export default function OnboardingForm({
  defaultName,
  email,
}: {
  defaultName: string;
  email: string;
}) {
  const [state, formAction] = useActionState<OnboardingState, FormData>(
    saveProfile,
    {}
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          อีเมล
        </label>
        <input
          type="text"
          value={email}
          disabled
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-500"
        />
      </div>

      <div>
        <label
          htmlFor="full_name"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          ชื่อ-นามสกุล <span className="text-rose-500">*</span>
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          required
          defaultValue={defaultName}
          placeholder="เช่น สมชาย ใจดี"
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <div>
        <label
          htmlFor="batch"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          รุ่นที่อบรม <span className="text-rose-500">*</span>
        </label>
        <select
          id="batch"
          name="batch"
          required
          defaultValue=""
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="" disabled>
            — เลือกรุ่น —
          </option>
          {BATCHES.map((b) => (
            <option key={b} value={b}>
              Odoo {b}
            </option>
          ))}
        </select>
      </div>

      {state.error && (
        <p className="text-sm text-rose-600">{state.error}</p>
      )}

      <SubmitButton />
    </form>
  );
}
