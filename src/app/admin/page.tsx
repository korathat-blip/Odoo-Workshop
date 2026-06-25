import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, GraduationCap, Users, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/SignOutButton";
import { steps, mainSteps, MAIN_STEP_IDS, hasGraduated } from "@/lib/steps";

export const dynamic = "force-dynamic";

type Row = {
  id: string;
  full_name: string | null;
  email: string | null;
  batch: string | null;
  doneIds: number[];
  mainDone: number;
  graduated: boolean;
  lastActive: string | null;
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: me } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (me?.role !== "admin") redirect("/workshop");

  // RLS allows an admin to read all rows.
  const [{ data: profiles }, { data: progress }] = await Promise.all([
    supabase
      .from("profiles")
      .select("id, full_name, email, batch, role")
      .order("batch", { ascending: true })
      .order("full_name", { ascending: true }),
    supabase.from("progress").select("user_id, step_id, completed_at"),
  ]);

  const byUser = new Map<string, { ids: number[]; last: string | null }>();
  for (const p of progress ?? []) {
    const entry = byUser.get(p.user_id) ?? { ids: [], last: null };
    entry.ids.push(p.step_id);
    if (!entry.last || p.completed_at > entry.last) entry.last = p.completed_at;
    byUser.set(p.user_id, entry);
  }

  const rows: Row[] = (profiles ?? [])
    .filter((p) => p.role !== "admin")
    .map((p) => {
      const entry = byUser.get(p.id) ?? { ids: [], last: null };
      const mainDone = MAIN_STEP_IDS.filter((id) => entry.ids.includes(id)).length;
      return {
        id: p.id,
        full_name: p.full_name,
        email: p.email,
        batch: p.batch,
        doneIds: entry.ids,
        mainDone,
        graduated: hasGraduated(entry.ids),
        lastActive: entry.last,
      };
    });

  const total = rows.length;
  const graduatedCount = rows.filter((r) => r.graduated).length;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 h-14 flex items-center px-4 gap-4">
        <Link
          href="/workshop"
          className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} /> <span className="hidden sm:inline">กลับสู่ Workshop</span>
        </Link>
        <h1 className="font-bold text-slate-900 text-sm sm:text-base">
          ระบบหลังบ้าน — ความคืบหน้าผู้อบรม
        </h1>
        <div className="ml-auto">
          <SignOutButton />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard icon={<Users size={20} />} label="ผู้เข้าอบรมทั้งหมด" value={total} color="indigo" />
          <StatCard icon={<GraduationCap size={20} />} label="ผ่านการอบรมแล้ว" value={graduatedCount} color="emerald" />
          <StatCard
            icon={<CheckCircle2 size={20} />}
            label="อัตราผ่าน"
            value={total ? `${Math.round((graduatedCount / total) * 100)}%` : "—"}
            color="violet"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-left">
                  <th className="px-4 py-3 font-semibold">ผู้เข้าอบรม</th>
                  <th className="px-4 py-3 font-semibold">รุ่น</th>
                  <th className="px-4 py-3 font-semibold">บทหลัก</th>
                  <th className="px-4 py-3 font-semibold min-w-[180px]">ความคืบหน้า</th>
                  <th className="px-4 py-3 font-semibold">สถานะ</th>
                  <th className="px-4 py-3 font-semibold hidden md:table-cell">ล่าสุด</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                      ยังไม่มีผู้เข้าอบรม
                    </td>
                  </tr>
                )}
                {rows.map((r) => {
                  const pct = Math.round((r.mainDone / mainSteps.length) * 100);
                  return (
                    <tr key={r.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800">{r.full_name ?? "—"}</p>
                        <p className="text-xs text-slate-400">{r.email}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {r.batch ? `Odoo ${r.batch}` : "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                        {r.mainDone}/{mainSteps.length}
                        <span className="text-xs text-slate-400"> ({r.doneIds.length}/{steps.length})</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden min-w-[80px]">
                            <div
                              className={`h-full rounded-full ${r.graduated ? "bg-emerald-500" : "bg-indigo-500"}`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 w-9 text-right">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {r.graduated ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                            <GraduationCap size={12} /> ผ่านการอบรม
                          </span>
                        ) : (
                          <span className="inline-flex items-center bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-1 rounded-full">
                            กำลังเรียน
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-400 hidden md:table-cell whitespace-nowrap">
                        {r.lastActive
                          ? new Date(r.lastActive).toLocaleString("th-TH", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                          : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon, label, value, color,
}: {
  icon: React.ReactNode; label: string; value: number | string; color: "indigo" | "emerald" | "violet";
}) {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-600",
    emerald: "bg-emerald-100 text-emerald-600",
    violet: "bg-violet-100 text-violet-600",
  }[color];
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-slate-900 leading-tight">{value}</p>
        <p className="text-xs text-slate-500 truncate">{label}</p>
      </div>
    </div>
  );
}
