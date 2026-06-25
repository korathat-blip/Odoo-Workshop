"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // On success the browser is redirected to Google, so no further action here.
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-10 text-center text-white">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} className="text-white" />
          </div>
          <h1 className="text-xl font-bold">Odoo ERP Workshop</h1>
          <p className="text-indigo-200 text-sm mt-1">
            ระบบอบรมพื้นฐาน Odoo ERP Cloud Base
          </p>
        </div>

        <div className="px-8 py-8">
          <p className="text-slate-600 text-sm text-center mb-6 leading-relaxed">
            เข้าสู่ระบบด้วยบัญชี Google เพื่อเริ่มทำ Workshop
            และบันทึกความคืบหน้าของคุณ
          </p>

          <button
            onClick={signInWithGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-slate-300 rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon />
            {loading ? "กำลังเปลี่ยนเส้นทาง…" : "เข้าสู่ระบบด้วย Google"}
          </button>

          {error && (
            <p className="mt-4 text-sm text-rose-600 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
