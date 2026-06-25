import {
  Package, Settings, FileText, CreditCard, Wrench, Truck, Receipt,
  BarChart3, Globe, ShoppingCart, Lightbulb, Tag, Users, Lock,
  Building2, LayoutDashboard, ArrowRightLeft, Calculator,
  type LucideIcon,
} from "lucide-react";

// ─── THEME ───────────────────────────────────────────────────────────────────
export const STEP_THEME: Record<string, {
  badge: string; header: string; ring: string; dot: string;
}> = {
  sky:     { badge:"bg-sky-100 text-sky-700",     header:"from-sky-500 to-sky-700",     ring:"ring-sky-400",   dot:"bg-sky-500"   },
  violet:  { badge:"bg-violet-100 text-violet-700", header:"from-violet-500 to-violet-700", ring:"ring-violet-400", dot:"bg-violet-500" },
  blue:    { badge:"bg-blue-100 text-blue-700",   header:"from-blue-500 to-blue-700",   ring:"ring-blue-400",  dot:"bg-blue-500"  },
  fuchsia: { badge:"bg-fuchsia-100 text-fuchsia-700", header:"from-fuchsia-500 to-pink-600", ring:"ring-fuchsia-400", dot:"bg-fuchsia-500" },
  purple:  { badge:"bg-purple-100 text-purple-700", header:"from-purple-500 to-fuchsia-700", ring:"ring-purple-400", dot:"bg-purple-500" },
  cyan:    { badge:"bg-cyan-100 text-cyan-700",   header:"from-cyan-500 to-cyan-700",   ring:"ring-cyan-400",  dot:"bg-cyan-500"  },
  teal:    { badge:"bg-teal-100 text-teal-700",   header:"from-teal-400 to-teal-600",   ring:"ring-teal-400",  dot:"bg-teal-500"  },
  indigo:  { badge:"bg-indigo-100 text-indigo-700", header:"from-indigo-500 to-indigo-700", ring:"ring-indigo-400", dot:"bg-indigo-500" },
  pink:    { badge:"bg-pink-100 text-pink-700",   header:"from-pink-500 to-rose-600",   ring:"ring-pink-400",  dot:"bg-pink-500"  },
  orange:  { badge:"bg-orange-100 text-orange-700", header:"from-orange-400 to-orange-600", ring:"ring-orange-400", dot:"bg-orange-500" },
  emerald: { badge:"bg-emerald-100 text-emerald-700", header:"from-emerald-500 to-emerald-700", ring:"ring-emerald-400", dot:"bg-emerald-500" },
  rose:    { badge:"bg-rose-100 text-rose-700",   header:"from-rose-500 to-rose-700",   ring:"ring-rose-400",  dot:"bg-rose-500"  },
  slate:   { badge:"bg-slate-100 text-slate-700", header:"from-slate-700 to-slate-900", ring:"ring-slate-400", dot:"bg-slate-500" },
  blueind: { badge:"bg-blue-100 text-indigo-700", header:"from-blue-400 to-indigo-600", ring:"ring-indigo-400", dot:"bg-indigo-500" },
  amber:   { badge:"bg-amber-100 text-amber-700", header:"from-amber-500 to-orange-500", ring:"ring-amber-400", dot:"bg-amber-500" },
};

export type Step = {
  id: number;
  theme: string;
  icon: LucideIcon;
  app: string;
  label: string;
  sub: string;
  isBonus?: boolean;
};

// ─── STEP DATA ────────────────────────────────────────────────────────────────
export const steps: Step[] = [
  { id:0,  theme:"sky",     icon:Globe,          app:"Odoo.com / Settings", label:"เริ่มต้นและตั้งค่าระบบ",       sub:"Getting Started" },
  { id:1,  theme:"violet",  icon:Users,          app:"Contacts",            label:"ข้อมูลคู่ค้าและลูกค้า",       sub:"Contacts Setup" },
  { id:2,  theme:"blue",    icon:Package,        app:"Inventory",           label:"สร้างสินค้าและวัตถุดิบ",       sub:"Master Data Setup" },
  { id:3,  theme:"fuchsia", icon:Calculator,     app:"Accounting / Inventory", label:"ตั้งค่าบัญชีและ P&L",       sub:"Accounting Setup" },
  { id:4,  theme:"purple",  icon:Settings,       app:"Manufacturing",       label:"ศูนย์ผลิตและสูตรการผลิต",      sub:"Work Center & BOM" },
  { id:5,  theme:"cyan",    icon:Tag,            app:"Sales",               label:"ตั้งค่าราคา",                  sub:"Pricelists" },
  { id:6,  theme:"teal",    icon:FileText,       app:"Sales",               label:"ออกใบเสนอราคา",                sub:"Quotation" },
  { id:7,  theme:"indigo",  icon:CreditCard,     app:"Accounting / Sales",  label:"รับชำระเงินมัดจำ",             sub:"Advance Payment" },
  { id:8,  theme:"pink",    icon:ShoppingCart,   app:"Purchase / Inventory",label:"สั่งซื้อและรับวัตถุดิบ",       sub:"Procurement" },
  { id:9,  theme:"orange",  icon:Wrench,         app:"Manufacturing",       label:"ดำเนินการผลิต",                sub:"Manufacturing Process" },
  { id:10, theme:"emerald", icon:Truck,          app:"Inventory / Sales",   label:"จัดส่งสินค้า",                 sub:"Delivery" },
  { id:11, theme:"rose",    icon:Receipt,        app:"Sales / Accounting",  label:"เก็บเงินงวดสุดท้าย",           sub:"Final Invoicing" },
  { id:12, theme:"slate",   icon:BarChart3,      app:"Accounting",          label:"ดูรายงานการเงิน",              sub:"Financial Reports" },
  { id:13, theme:"blueind", icon:LayoutDashboard,app:"Dashboards",          label:"สร้าง Dashboard",              sub:"Data Analysis" },
  { id:14, theme:"amber",   icon:Lightbulb,      app:"Accounting / Sales",  label:"การชำระหลายงวด",              sub:"Payment Installments", isBonus:true },
  { id:15, theme:"slate",   icon:Lock,           app:"Settings",            label:"สิทธิ์การเข้าถึง",             sub:"Access Rights",         isBonus:true },
  { id:16, theme:"fuchsia", icon:Building2,      app:"Settings / Inventory",label:"คลังหลายบริษัท",               sub:"Multi-Company",          isBonus:true },
  { id:17, theme:"teal",    icon:ArrowRightLeft, app:"Inventory",           label:"กลยุทธ์เบิกจ่ายสินค้า",       sub:"Removal Strategies",    isBonus:true },
];

export const mainSteps  = steps.filter((s) => !s.isBonus);
export const bonusSteps = steps.filter((s) => s.isBonus);

/** Step ids required to pass the course (14 main lessons, bonus excluded). */
export const MAIN_STEP_IDS = mainSteps.map((s) => s.id);
export const TOTAL_STEPS = steps.length;

/** Has the learner completed every required main lesson? */
export function hasGraduated(completed: Iterable<number>): boolean {
  const set = new Set(completed);
  return MAIN_STEP_IDS.every((id) => set.has(id));
}

// ─── STEP CONTENT (summaries) ─────────────────────────────────────────────────
export type Task = { title: string; items: string[] };
export type StepContent = { intro?: string; tasks?: Task[]; warning?: string; tip?: string };

export const content: Record<number, StepContent> = {
  0: {
    intro:"ก่อนเริ่มกระบวนการในระบบ ต้องสร้างฐานข้อมูล Odoo และตั้งค่าบริษัทพื้นฐาน",
    tasks:[
      { title:"สมัครและเลือกแอปพลิเคชัน", items:["ไปที่ Odoo.com → ปุ่ม 'Start now - It's free'", "เลือก 5 แอปหลัก: Sales, Purchase, Inventory, Manufacturing, Accounting", "กด Continue"] },
      { title:"สร้างฐานข้อมูล", items:["กรอก ชื่อ, อีเมล, ชื่อบริษัท: 'Premium Desk Co., Ltd.', ประเทศ, ขนาดองค์กร", "กด 'เริ่มเลย'"] },
      { title:"ยืนยันอีเมล", items:["รับอีเมลจาก Odoo แล้วคลิก 'Click to activate your database'", "ตั้งรหัสผ่านสำหรับเข้าระบบ"] },
      { title:"ตั้งค่าบริษัทเบื้องต้น", items:["Settings → General Settings → Companies → แก้ไขข้อมูลบริษัท", "ตั้งค่าสกุลเงิน: THB - Thai Baht"] },
    ]
  },
  1: {
    intro:"เตรียมฐานข้อมูลรายชื่อคู่ค้าและลูกค้าก่อนเริ่มสร้างสินค้าหรือทำการซื้อขาย",
    tasks:[
      { title:"เข้าแอป Contacts", items:["Home → แอป Contacts → กด New"] },
      { title:"เพิ่มคู่ค้า (Vendor)", items:["Name: 'บริษัท ค้าไม้ไทย จำกัด'", "Company Type: Company", "ใส่ที่อยู่, เบอร์, อีเมล → Save"] },
      { title:"เพิ่มลูกค้า (Customer)", items:["กด New อีกครั้ง", "Name: 'คุณสมชาย ใจดี'", "Company Type: Individual", "ใส่ที่อยู่จัดส่ง → Save"] },
    ]
  },
  2: {
    intro:"สร้างโต๊ะทำงานไม้พรีเมียมและวัตถุดิบที่ใช้ประกอบ พร้อมตั้งค่า Route สำหรับ MTO",
    tasks:[
      { title:"สร้างสินค้าสำเร็จรูป", items:["Inventory → Products → กด New", "Product Name: 'โต๊ะทำงานไม้พรีเมียม'", "Product Type: Storable Product, Sales Price: 10,000 บาท"] },
      { title:"ตั้งค่า Routes (MTO)", items:["แท็บ Inventory → Routes:", "✅ Replenish on Order (MTO)", "✅ Manufacture"] },
      { title:"สร้างวัตถุดิบ 4 รายการ", items:["Product Type: Storable Product ทุกรายการ", "Routes: ✅ Buy + ✅ MTO", "แท็บ Purchase: ผูก Vendor 'บริษัท ค้าไม้ไทย จำกัด' + ราคา", "แผ่นไม้ 1,500 | ขาโต๊ะ 200 | น้ำยาเคลือบ 300 | น็อต 2 บาท"] },
    ]
  },
  3: {
    intro:"ตั้งค่าระบบบัญชีให้รับรู้ต้นทุนขาย (COGS) อัตโนมัติและดู P&L แยกโปรเจกต์ได้",
    tasks:[
      { title:"ตั้งค่า Automated Inventory Valuation", items:["Inventory → Configuration → Product Categories → All", "Costing Method: FIFO หรือ AVCO", "Inventory Valuation: Automated (จาก Manual)", "ตรวจสอบบัญชี Stock Valuation, Journal, COGS"] },
      { title:"เปิด Analytic Accounting", items:["Accounting → Configuration → Settings → เปิด Analytic Accounting → Save", "Configuration → Analytic Accounts → New: 'โปรเจกต์: โต๊ะพรีเมียม'"] },
    ],
    warning:"หากไม่เปิด Automated Valuation ระบบจะไม่รับรู้ต้นทุนวัตถุดิบ งบ P&L จะแสดงกำไร 100% ซึ่งผิดหลักบัญชี"
  },
  4: {
    intro:"สร้างสถานที่ผลิตและกำหนดสูตรว่า โต๊ะ 1 ตัว ใช้ชิ้นส่วนอะไรบ้างและผ่านขั้นตอนใด",
    tasks:[
      { title:"เปิดฟีเจอร์ Work Orders", items:["Manufacturing → Configuration → Settings → ✅ Work Orders → Save"] },
      { title:"สร้าง Work Center", items:["Manufacturing → Configuration → Work Centers → New", "Name: 'แผนกประกอบไม้' (และ 'แผนกทำสี')", "Cost per hour: 200 บาท (คำนวณค่าแรงอัตโนมัติ)"] },
      { title:"สร้าง Bill of Materials", items:["Products → Bills of Materials → New", "Product: โต๊ะทำงานไม้พรีเมียม | BOM Type: Manufacture", "Components: แผ่นไม้ 1 | ขาโต๊ะ 4 | น็อต 16 | น้ำยา 1", "Operations: 1) ประกอบโต๊ะ  2) เคลือบเงาและอบแห้ง"] },
    ]
  },
  5: {
    intro:"ตั้งค่า Pricelist สำหรับโปรโมชันหรือราคาพิเศษสำหรับลูกค้าแต่ละกลุ่ม",
    tasks:[
      { title:"เปิดฟีเจอร์ Pricelists", items:["Sales → Configuration → Settings → ✅ Pricelists → Save"] },
      { title:"สร้าง Pricelist", items:["Sales → Products → Pricelists → New", "Name: 'ราคาโปรโมชันช่วงเปิดตัว' หรือ 'VIP Customer'", "Price Rules → Add a line: ลด 10% หรือ Fixed Price"] },
      { title:"ผูก Pricelist กับลูกค้า", items:["Contacts → 'คุณสมชาย ใจดี' → แท็บ Sales & Purchase", "เลือก Pricelist → ระบบดึงราคานี้อัตโนมัติเมื่อสร้าง SO"] },
    ]
  },
  6: {
    intro:"เปิดการขายโดยจำลองสถานการณ์ที่ลูกค้าตกลงสั่งซื้อโต๊ะทำงาน",
    tasks:[
      { title:"สร้างใบเสนอราคา", items:["Sales → Orders → Quotations → New", "Customer: 'คุณสมชาย ใจดี'"] },
      { title:"เพิ่มสินค้าและ Analytic Account", items:["Order Lines → Add a product → 'โต๊ะทำงานไม้พรีเมียม' (1 ตัว)", "คอลัมน์ Analytic Account: เลือก 'โปรเจกต์: โต๊ะพรีเมียม'"] },
      { title:"ยืนยันการขาย", items:["ตรวจสอบยอดรวม → กด Confirm", "สถานะเปลี่ยนจาก Quotation → Sales Order", "มุมขวาบน: Smart Button รูปประแจ (Manufacturing) จะปรากฏอัตโนมัติ"] },
    ]
  },
  7: {
    intro:"ตั้งค่าบัญชีเงินมัดจำและออกใบแจ้งหนี้ 50% พร้อมบันทึกรับชำระเงิน",
    tasks:[
      { title:"สร้างบัญชี 'เงินมัดจำรับล่วงหน้า'", items:["Accounting → Configuration → Chart of Accounts", "ค้นหา 'Customer Deposits' หรือสร้างใหม่", "Type: Current Liabilities (หนี้สินหมุนเวียน)"] },
      { title:"ตั้งค่าสินค้า Down Payment", items:["Sales → Products → ค้นหา 'Down payment'", "Product Type: Service", "แท็บ Accounting → Income Account: เงินมัดจำรับล่วงหน้า", "Customer Taxes: 7% VAT"] },
      { title:"ออกใบแจ้งหนี้มัดจำ 50%", items:["Sales Order → Create Invoice", "เลือก Down payment (percentage) → Amount: 50%", "Create and View Invoice → Confirm"] },
      { title:"รับชำระเงินมัดจำ", items:["กด Register Payment → เลือก Journal: ธนาคาร/เงินสด", "Create Payment → สถานะ: IN PAYMENT"] },
    ],
    tip:"Journal Entry อัตโนมัติ: เดบิต ลูกหนี้การค้า / เครดิต เงินมัดจำรับล่วงหน้า + ภาษีขาย"
  },
  8: {
    intro:"สั่งซื้อชิ้นส่วนจากผู้จำหน่ายเมื่อระบบแจ้งว่าของขาดสต็อก",
    tasks:[
      { title:"ตรวจสอบสถานะวัตถุดิบ", items:["Sales Order → Smart Button Manufacturing", "แท็บ Components: สินค้าทุกรายการเป็นสีแดง (Not Available)"] },
      { title:"สร้างใบสั่งซื้อ", items:["Purchase → New → เลือก Vendor: 'บริษัท ค้าไม้ไทย จำกัด'", "Add a line: แผ่นไม้ 1 | ขาโต๊ะ 4 | น็อต 16 | น้ำยา 1", "Analytic Account: 'โปรเจกต์: โต๊ะพรีเมียม'", "กด Confirm Order → สถานะ: Purchase Order"] },
      { title:"รับสินค้าเข้าคลัง", items:["Smart Button Receipt → ตรวจสอบรายการ", "กด Validate → สต็อกวัตถุดิบเพิ่มขึ้น พร้อมบันทึกมูลค่าในบัญชีทันที"] },
    ]
  },
  9: {
    intro:"เมื่อวัตถุดิบครบ ฝ่ายผลิตเบิกของและเริ่มลงมือประกอบและทำสีโต๊ะทำงาน",
    tasks:[
      { title:"เปิดใบสั่งผลิต (MO)", items:["Manufacturing → Operations → Manufacturing Orders", "Components ทั้ง 4 รายการเปลี่ยนเป็นสีเขียว (Available)", "ใส่ Analytic Account: 'โปรเจกต์: โต๊ะพรีเมียม'"] },
      { title:"ดำเนินการตาม Work Order", items:["แท็บ Work Orders: 2 ขั้นตอน", "กด Start เพื่อจับเวลา → เวลาจริง = ค่าแรง/Cost", "กด Done เมื่อแต่ละขั้นตอนเสร็จ"] },
      { title:"ปิดงานผลิต", items:["กด Produce All", "ระบบตัดสต็อกวัตถุดิบ + บวกค่าแรง = มูลค่าโต๊ะสำเร็จรูปในคลัง"] },
    ]
  },
  10: {
    intro:"ส่งมอบโต๊ะที่ผลิตเสร็จให้ลูกค้า ระบบจะตัดต้นทุนขาย (COGS) อัตโนมัติ",
    tasks:[
      { title:"เปิดใบส่งสินค้า", items:["Sales → Sales Order เดิม", "Smart Button Delivery (รูปหัวรถบรรทุก)"] },
      { title:"ยืนยันการจัดส่ง", items:["แท็บ Operations: โต๊ะพรีเมียม 1 ตัว Reserved = 1 (พร้อมส่ง)", "กด Validate"] },
    ],
    tip:"Automated Accounting: เดบิต ต้นทุนขาย (COGS) / เครดิต สินค้าคงเหลือ → P&L แสดงต้นทุนทันที"
  },
  11: {
    intro:"เรียกเก็บเงินส่วนที่เหลือ 50% หลังลูกค้าได้รับสินค้าเรียบร้อยแล้ว",
    tasks:[
      { title:"สร้างใบแจ้งหนี้งวดสุดท้าย", items:["Sales Order → Create Invoice", "เลือก Regular Invoice (ระบบรู้ว่าต้องเก็บส่วนต่างที่เหลือ)", "Create and View Invoice"] },
      { title:"ยืนยันและรับเงิน", items:["Invoice ใบที่ 2: หักยอด Down Payment 50% แล้ว → เหลือ 50%", "Confirm → Register Payment → เลือก Journal → Create Payment", "สถานะ: IN PAYMENT — รับเงินครบ 100%"] },
    ]
  },
  12: {
    intro:"ตรวจสอบงบการเงินที่รวมยอดขาย ต้นทุน และค่าแรงอัตโนมัติ",
    tasks:[
      { title:"งบกำไรขาดทุน (P&L)", items:["Accounting → Reporting → Profit and Loss", "Operating Income: ยอดขาย 10,000 บาท", "Cost of Revenue: ต้นทุน (วัตถุดิบ + ค่าแรง)", "Net Profit: กำไรสุทธิแม่นยำ"] },
      { title:"รายงาน Analytic", items:["Reporting → Analytic Report", "กรองดูเฉพาะ 'โปรเจกต์: โต๊ะพรีเมียม' → P&L แยกโปรเจกต์ชัดเจน"] },
      { title:"งบดุล (Balance Sheet)", items:["Reporting → Balance Sheet", "Bank and Cash เพิ่มตามเงินรับ | Inventory Valuation อัปเดต Real-time"] },
    ]
  },
  13: {
    intro:"นำข้อมูล Odoo มาวิเคราะห์และสร้าง Dashboard อัปเดตแบบ Real-time",
    tasks:[
      { title:"นำเข้าข้อมูล (Odoo List)", items:["Inventory → Reporting → Stock / Moves History", "จัดกลุ่มตาม Location หรือ Product Category", "กด 'Insert in Spreadsheet' → Blank Spreadsheet"] },
      { title:"แทรกกราฟ (Odoo Chart)", items:["กลับหน้า Reporting → เปลี่ยนเป็น Graph View", "เลือกประเภทกราฟ → Insert in Spreadsheet (ไฟล์เดิม)"] },
      { title:"จัดรูปแบบและ Template", items:["จัดวาง Chart/List, ใช้ Formulas คล้าย Excel", "Conditional Formatting แจ้งเตือนสต็อกต่ำ", "ตั้งสิทธิ์เฉพาะผู้จัดการ → ข้อมูลอัปเดต Real-time อัตโนมัติ"] },
    ]
  },
  14: {
    intro:"แบ่งชำระมากกว่า 1 งวด (เช่น 30%/30%/40%) ด้วย 2 วิธีหลัก",
    tasks:[
      { title:"วิธี 1: Payment Terms (ใบแจ้งหนี้ใบเดียว หลาย Due Date)", items:["Accounting → Configuration → Payment Terms → New", "ตั้ง Rules 3 บรรทัด: 30% ทันที | 30% 30 วัน | Balance 60 วัน", "ผูกกับ SO หรือ Invoice → ระบบแบ่งยอดลูกหนี้อัตโนมัติ"] },
      { title:"วิธี 2: Multiple Down Payments (ใบแจ้งหนี้แยกงวด — แนะนำสำหรับไทย)", items:["งวด 1 (30%): SO → Create Invoice → Down payment 30% → รับชำระ", "งวด 2 (30%): SO เดิม → Create Invoice → Down payment 30% → รับชำระ", "งวด 3 (40%): SO → Create Invoice → Regular Invoice → ระบบหักมัดจำให้อัตโนมัติ"] },
    ],
    tip:"แนะนำ Workshop: ใช้วิธี 2 เป็นโจทย์ Case Study — ผู้เรียนเห็นความสามารถตรวจสอบยอดคงเหลือจาก SO ได้ชัดเจนที่สุด"
  },
  15: {
    intro:"กำหนดสิทธิ์การเข้าถึงแอปและเมนูต่างๆ สำหรับความปลอดภัยขององค์กร",
    tasks:[
      { title:"เข้าจัดการผู้ใช้งาน", items:["Settings → Users & Companies → Users"] },
      { title:"เลือกพนักงานและแท็บ Access Rights", items:["คลิกชื่อพนักงานที่ต้องการปรับสิทธิ์", "ว่าง = มองไม่เห็นแอปเลย", "User = จัดการเอกสารตนเองได้", "Administrator = สิทธิ์สูงสุด เห็นทุกเอกสาร"] },
      { title:"บันทึกและทดสอบ", items:["Save → ให้พนักงานล็อกอินตรวจสอบว่าเมนูที่จำกัดหายไปจริง"] },
    ]
  },
  16: {
    intro:"จัดการคลังสินค้าแบบหลายบริษัท แยกสต็อกและซื้อขายระหว่างบริษัทในเครือ",
    tasks:[
      { title:"ตั้งค่าบริษัทและสิทธิ์", items:["Settings → Companies → สร้างบริษัทในเครือ", "โปรไฟล์พนักงาน → Allowed Companies: ติ๊กบริษัทที่อนุญาต"] },
      { title:"ผูกคลังกับบริษัท", items:["Inventory → Configuration → Warehouses → สร้างใหม่", "ฟิลด์ Company: ระบุบริษัทเจ้าของคลัง → สต็อกแยกเด็ดขาด"] },
      { title:"การมองเห็นสินค้า", items:["General Info → Company ว่าง: แชร์ทุกบริษัท", "General Info → Company ระบุ: เฉพาะบริษัทนั้นเท่านั้น"] },
      { title:"Inter-Company Rules", items:["A สั่งซื้อ (PO) จาก B → ระบบสร้าง SO ใน B อัตโนมัติ", "B ส่งของ → A กดรับเข้าคลังได้ทันที"] },
    ]
  },
  17: {
    intro:"หลักการจัดการคลังขั้นสูง ให้ระบบเลือกหยิบสินค้าออกจากสต็อกได้ถูกต้อง",
    tasks:[
      { title:"FIFO — เข้าก่อน ออกก่อน", items:["จองและเบิกจ่ายสินค้าจากล็อตที่รับเข้าก่อน", "✅ เหมาะกับ: สินค้าแฟชั่น, เครื่องใช้ไฟฟ้า ป้องกันสต็อกค้าง"] },
      { title:"LIFO — เข้าหลัง ออกก่อน", items:["เบิกจ่ายสินค้าจากล็อตที่รับเข้าล่าสุดก่อน", "✅ เหมาะกับ: วัสดุก่อสร้าง (กองหิน, ทราย, เหล็กเส้น)"] },
      { title:"FEFO — หมดอายุก่อน ออกก่อน", items:["เบิกจ่ายสินค้าที่มีวันหมดอายุใกล้ที่สุดก่อน", "✅ เหมาะกับ: อาหาร, ยา, เครื่องสำอาง", "⚠️ ต้องเปิดฟีเจอร์ Lots & Serial Numbers + Expiration Dates"] },
    ]
  },
};

export const BATCHES = ["รุ่นที่ 1", "รุ่นที่ 2"] as const;
export type Batch = (typeof BATCHES)[number];
