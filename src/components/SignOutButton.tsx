"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={signOut}
      disabled={loading}
      className={
        className ??
        "flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors disabled:opacity-50"
      }
    >
      <LogOut size={16} />
      <span className="hidden sm:inline">ออกจากระบบ</span>
    </button>
  );
}
