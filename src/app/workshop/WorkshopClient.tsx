"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, Circle, ChevronRight, ChevronLeft, Info, Lightbulb,
  Menu, X, Star, BookOpen, Award, Shield, GraduationCap, Loader2,
} from "lucide-react";
import {
  STEP_THEME, steps, content, mainSteps, bonusSteps, hasGraduated,
  type Step, type Task,
} from "@/lib/steps";
import SignOutButton from "@/components/SignOutButton";
import { setStepDone } from "./actions";

// ─── TASK CARD ────────────────────────────────────────────────────────────────
function TaskCard({ task, idx }: { task: Task; idx: number }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-slate-100 text-slate-600 mt-0.5 border border-slate-200">
        {idx + 1}
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-semibold text-slate-800 mb-2">{task.title}</h5>
        <ul className="space-y-1.5">
          {task.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <ChevronRight size={14} className="flex-shrink-0 mt-0.5 text-slate-400" />
              <span
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/✅ /g, '<span class="text-emerald-600 font-medium">✅ </span>')
                    .replace(/⚠️ /g, '<span class="text-amber-600 font-medium">⚠️ </span>'),
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── NAV ITEM ─────────────────────────────────────────────────────────────────
function NavItem({
  step, idx, isActive, isDone, onClick,
}: {
  step: Step; idx: number; isActive: boolean; isDone: boolean; onClick: (i: number) => void;
}) {
  const t = STEP_THEME[step.theme];
  return (
    <button
      onClick={() => onClick(idx)}
      className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all duration-150 group
        ${isActive ? `bg-white shadow-sm ring-1 ${t.ring.replace("ring-", "ring-1 ring-")}` : "hover:bg-slate-50"}`}
    >
      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
        {isDone ? (
          <CheckCircle2 size={18} className="text-emerald-500" />
        ) : (
          <div className={`w-2.5 h-2.5 rounded-full ${isActive ? t.dot : "bg-slate-300 group-hover:bg-slate-400"} transition-colors`} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isActive ? "text-slate-900" : "text-slate-600"}`}>
          {step.label}
        </p>
        <p className="text-xs text-slate-400 truncate">{step.sub}</p>
      </div>
    </button>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function WorkshopClient({
  fullName, batch, isAdmin, initialDone,
}: {
  fullName: string; batch: string; isAdmin: boolean; initialDone: number[];
}) {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState<Set<number>>(new Set(initialDone));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const step = steps[active];
  const c = content[active] || {};
  const t = STEP_THEME[step.theme];
  const progress = Math.round((done.size / steps.length) * 100);
  const mainDone = mainSteps.filter((s) => done.has(s.id)).length;
  const graduated = hasGraduated(done);

  const goTo = (i: number) => {
    setActive(i);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDone = async () => {
    const willBeDone = !done.has(active);
    const next = new Set(done);
    if (willBeDone) next.add(active);
    else next.delete(active);
    setDone(next); // optimistic

    setSaving(true);
    const res = await setStepDone(active, willBeDone);
    setSaving(false);

    if (!res.ok) {
      // revert on failure
      const revert = new Set(next);
      if (willBeDone) revert.delete(active);
      else revert.add(active);
      setDone(revert);
      alert("บันทึกความคืบหน้าไม่สำเร็จ กรุณาลองใหม่");
    }
  };

  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── TOP BAR ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 h-14 flex items-center px-4 gap-4">
        <button
          className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <BookOpen size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-slate-900 text-sm leading-tight">Odoo ERP Workshop</p>
            <p className="text-xs text-slate-400 leading-tight hidden sm:block">
              Full Loop: Make-to-Order
            </p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          {/* Progress */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-slate-500">ความคืบหน้า</p>
              <p className="text-sm font-bold text-slate-800">
                {done.size}/{steps.length} ขั้นตอน
              </p>
            </div>
            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-indigo-600 w-10 text-right">{progress}%</span>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden md:block" />

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-tight max-w-[10rem] truncate">
                {fullName}
              </p>
              <p className="text-xs text-slate-400 leading-tight">Odoo {batch}</p>
            </div>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Shield size={16} />
                <span className="hidden sm:inline">หลังบ้าน</span>
              </Link>
            )}
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* ── SIDEBAR ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={`fixed lg:static inset-y-14 left-0 w-72 bg-white border-r border-slate-200 z-40
            flex flex-col transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          {/* Progress mini (mobile) */}
          <div className="lg:hidden px-4 py-3 border-b border-slate-100">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>ความคืบหน้า</span>
              <span className="font-semibold text-slate-700">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Nav scroll */}
          <div className="flex-1 overflow-y-auto sidebar-scroll py-3 px-3 space-y-1">
            <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              หลักสูตรหลัก ({mainDone}/{mainSteps.length})
            </p>
            {mainSteps.map((s) => {
              const globalIdx = steps.indexOf(s);
              return (
                <NavItem
                  key={s.id}
                  step={s}
                  idx={globalIdx}
                  isActive={active === globalIdx}
                  isDone={done.has(globalIdx)}
                  onClick={goTo}
                />
              );
            })}

            <div className="h-px bg-slate-100 my-3" />

            <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
              <Star size={11} className="fill-amber-400 text-amber-400" /> Bonus
            </p>
            {bonusSteps.map((s) => {
              const globalIdx = steps.indexOf(s);
              return (
                <NavItem
                  key={s.id}
                  step={s}
                  idx={globalIdx}
                  isActive={active === globalIdx}
                  isDone={done.has(globalIdx)}
                  onClick={goTo}
                />
              );
            })}
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            {/* Graduation banner — shows on every step once all 14 main lessons are done */}
            {graduated && (
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 sm:p-8 text-center text-white shadow-lg">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap size={34} className="text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100 mb-2">
                  🎉 ขอแสดงความยินดี
                </p>
                <h2 className="text-xl sm:text-2xl font-bold mb-2 leading-snug">
                  คุณได้ผ่านการอบรมพื้นฐาน
                  <br className="sm:hidden" /> Odoo ERP Cloud Base แล้ว
                </h2>
                <p className="text-emerald-50 text-sm">
                  {fullName} · Odoo {batch} — ทำครบทั้ง {mainSteps.length} บทเรียนหลักเรียบร้อย
                </p>
              </div>
            )}

            {/* Case Study Banner (step 0 only) */}
            {active === 0 && (
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300 mb-2">
                  🏢 กรณีศึกษา
                </p>
                <h2 className="text-lg font-bold mb-2">กระบวนการสั่งทำโต๊ะทำงานพรีเมียม</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  ลูกค้าสั่งทำ{" "}
                  <strong className="text-white">&quot;โต๊ะทำงานไม้พรีเมียม&quot;</strong> 1 ตัว เงื่อนไข{" "}
                  <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded font-semibold text-xs mx-0.5">
                    มัดจำ 50%
                  </span>{" "}
                  ไม่มีวัตถุดิบในคลัง โรงงานต้องสั่งซื้อชิ้นส่วนมาประกอบและทำสีด่วนเพื่อส่งมอบให้ทันเวลา
                </p>
              </div>
            )}

            {/* Step Header Card */}
            <div className={`rounded-2xl bg-gradient-to-br ${t.header} text-white overflow-hidden`}>
              <div className="px-6 py-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {step.isBonus && (
                      <span className="bg-amber-400 text-amber-950 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star size={10} className="fill-amber-900" /> Bonus
                      </span>
                    )}
                    <span className="bg-white/20 text-white/90 text-xs px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                      {step.app}
                    </span>
                  </div>
                  <h1 className="text-xl font-bold leading-tight">{step.label}</h1>
                  <p className="text-white/70 text-sm">{step.sub}</p>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              {c.intro && (
                <div className="px-6 pt-6 pb-4 border-b border-slate-100">
                  <p className="text-slate-600 leading-relaxed">{c.intro}</p>
                </div>
              )}

              {c.warning && (
                <div className="mx-6 mt-5 flex gap-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
                  <Info size={18} className="text-rose-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-rose-800">
                    <strong>⚠️ สำคัญ:</strong> {c.warning}
                  </p>
                </div>
              )}

              {c.tasks && (
                <div className="px-6 py-6 space-y-6 divide-y divide-slate-50">
                  {c.tasks.map((task, i) => (
                    <div key={i} className={i > 0 ? "pt-6" : ""}>
                      <TaskCard task={task} idx={i} />
                    </div>
                  ))}
                </div>
              )}

              {c.tip && (
                <div className="mx-6 mb-6 flex gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3">
                  <Lightbulb size={18} className="text-indigo-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-indigo-800">
                    <strong>💡 Tip:</strong> {c.tip}
                  </p>
                </div>
              )}
            </div>

            {/* Full-loop completion note (last main step) */}
            {active === 13 && !graduated && (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award size={28} className="text-emerald-600" />
                </div>
                <h3 className="font-bold text-emerald-900 text-xl mb-2">เกือบครบแล้ว!</h3>
                <p className="text-emerald-700 text-sm leading-relaxed">
                  ทำเครื่องหมาย &quot;เสร็จสิ้น&quot; ให้ครบทั้ง {mainSteps.length} บทเรียนหลัก
                  เพื่อรับข้อความผ่านการอบรม
                </p>
              </div>
            )}

            {/* Bottom Nav */}
            <div className="flex items-center justify-between gap-2 pb-4">
              <button
                onClick={() => goTo(Math.max(0, active - 1))}
                disabled={active === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft size={16} /> <span className="hidden sm:inline">ก่อนหน้า</span>
              </button>

              <button
                onClick={toggleDone}
                disabled={saving}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border shadow-sm disabled:opacity-60
                  ${done.has(active)
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
              >
                {saving ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : done.has(active) ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Circle size={16} />
                )}
                {done.has(active) ? "เสร็จสิ้นแล้ว" : "ทำเครื่องหมายเสร็จ"}
              </button>

              <button
                onClick={() => goTo(Math.min(steps.length - 1, active + 1))}
                disabled={active === steps.length - 1}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <span className="hidden sm:inline">ถัดไป</span> <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
