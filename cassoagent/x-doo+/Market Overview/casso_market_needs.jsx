import { useState } from "react";

const marketNeeds = [
  // ─────────────────────── MARKET 1 ───────────────────────
  {
    market: "Thị trường 1",
    marketLabel: "Kết nối Bán hàng → Kế toán → Cơ quan Thuế",
    marketColor: "#1d4ed8",
    marketBg: "#eff6ff",
    marketBorder: "#bfdbfe",
    insights: [
      {
        id: "1A",
        insight: "Tuân thủ pháp lý: Theo Nghị định 70/2025/NĐ-CP (hiệu lực 01/06/2025), các doanh nghiệp, hộ kinh doanh bán lẻ phải áp dụng hóa đơn điện tử khởi tạo từ máy tính tiền — cột mốc quan trọng trong lộ trình chuyển đổi số của Chính phủ.",
        who: [
          "Đơn vị kinh doanh bán lẻ: quán ăn, thời trang, vật tư, F&B chuỗi",
          "Hộ kinh doanh chưa có phần mềm POS",
          "SME bán hàng online đang dùng phần mềm bán hàng rời rạc",
        ],
        painOutcome: {
          pain: [
            "Khách hàng rất sợ bị phạt — nhưng chưa biết giải pháp nào mượt mà để tuân thủ",
            "Chưa có POS → phải tích hợp mới; yêu cầu bắt buộc là hóa đơn điện tử gửi lên Thuế",
            "Đã có phần mềm kế toán riêng → nhập liệu thủ công từ POS sang kế toán, mất thời gian, dễ sai sót",
            "Hoặc bị 'dính chặt' vào hệ sinh thái đóng (MISA, Posapp, E-invoice) — mất tính linh hoạt",
            "Bán online → phải dùng phần mềm bán hàng riêng (Misa, Base) kết nối kế toán → API đắt, tính theo lượt",
          ],
          outcome: [
            "Giải pháp kết nối liền mạch: POS / phần mềm bán hàng → kế toán → hóa đơn điện tử → cơ quan Thuế trong một luồng",
            "Đồng bộ tức thời, tự động hóa toàn bộ — không nhập liệu thủ công",
            "Giá hợp lý, không bị lock-in vào 1 nhà cung cấp",
          ],
        },
        sowhat: "Phát triển giải pháp đồng liên thông và đồng bộ hóa tức thời:\nXây dựng phần mềm bán hàng trên Odoo+ kết nối API tới: Phần mềm kế toán (VAS) + Open Banking API ngân hàng + Hóa đơn điện tử + API cơ quan Thuế.\nMISA mạnh kế toán nhưng phần mềm bán hàng yếu và cứng nhắc → CASSO có thể chen vào khoảng trống này bằng Odoo+ linh hoạt hơn.",
        evidence: "NĐ 70/2025/NĐ-CP | CS X-doo+ (Notebooklm) | MIC Báo cáo CĐS 2024",
        tag: "REGULATORY",
        tagColor: "#dc2626",
      },
      {
        id: "1B",
        insight: "Phân mảnh phần mềm: Hơn 65% SME Việt Nam đang dùng đồng thời 5–6 phần mềm riêng lẻ (POS, kế toán, kho, HRM, CRM) — dữ liệu không đồng bộ, quyết định chậm trễ và thiếu chính xác.",
        who: [
          "CEO / kế toán trưởng các SME thương mại, dịch vụ (10–200 nhân viên)",
          "Chuỗi bán lẻ, phân phối đang scale-up",
        ],
        painOutcome: {
          pain: [
            "Mỗi lần cần doanh thu hay tồn kho, phải ghép file Excel từ 3–4 hệ thống — tốn thời gian, sai lệch",
            "Kế toán nhập liệu chồng chéo từ POS → sổ sách → khai thuế: trung bình mất 4 ngày/báo cáo tài chính",
            "Không có visibility real-time: CEO không biết tình hình tài chính đến cuối ngày hoặc cuối tuần",
          ],
          outcome: [
            "Một nền tảng duy nhất: dữ liệu bán hàng → kế toán → báo cáo tài chính → thuế đồng bộ real-time",
            "Giảm 70–80% thời gian lập báo cáo (từ 4 ngày xuống dưới 1 ngày — theo báo cáo MIC 2024)",
            "CEO / CFO có thể ra quyết định dựa trên dữ liệu live, không cần chờ báo cáo cuối kỳ",
          ],
        },
        sowhat: "Xây dựng connector Odoo+ ↔ kế toán VAS ↔ eTax theo thời gian thực.\nTích hợp auto-sync hóa đơn điện tử vào sổ kế toán → giảm 80% nhập liệu thủ công.\nCung cấp dashboard CEO real-time: bán hàng → dòng tiền → báo cáo thuế trên 1 màn hình.",
        evidence: "MISA AMIS Survey 2025 (65% SME dùng phần mềm QL) | MIC 2024 (rút ngắn lập báo cáo từ 4 ngày → <1 ngày) | Vietnam Digital Transformation Report 2024",
        tag: "OPERATIONAL",
        tagColor: "#d97706",
      },
    ],
  },

  // ─────────────────────── MARKET 2 ───────────────────────
  {
    market: "Thị trường 2",
    marketLabel: "Quản trị Dòng tiền Nội bộ & Mobile Approval",
    marketColor: "#059669",
    marketBg: "#f0fdf4",
    marketBorder: "#bbf7d0",
    insights: [
      {
        id: "2A",
        insight: "Open Banking Thông tư 64: Ngày 31/12/2024, NHNN ban hành Thông tư 64/2024/TT-NHNN (hiệu lực 01/03/2025) — lần đầu tiên quy định chuẩn kỹ thuật Open API cho ngân hàng, cho phép bên thứ ba truy cập dữ liệu tài chính một cách hợp pháp và chuẩn hóa.",
        who: [
          "Doanh nghiệp SME có tài khoản ở nhiều ngân hàng (3–5 ngân hàng phổ biến)",
          "CFO / Giám đốc tài chính doanh nghiệp vừa",
          "Startup / scale-up cần kiểm soát dòng tiền chặt chẽ",
        ],
        painOutcome: {
          pain: [
            "Không có dashboard tổng hợp đa ngân hàng → phải đăng nhập từng app ngân hàng để kiểm tra số dư",
            "Chỉ 38% ngân hàng Việt Nam có hệ thống core banking hỗ trợ Open API (so với 92% ở Singapore)",
            "Dòng tiền bị 'mù' đến cuối ngày hoặc cuối tuần — CEO ra quyết định dựa trên cảm tính, không dữ liệu",
            "Thanh toán nhà cung cấp, trả lương, thu tiền khách hàng: đang làm thủ công, không tự động hóa",
          ],
          outcome: [
            "Một màn hình tổng hợp: xem số dư, giao dịch real-time từ tất cả ngân hàng",
            "Cash flow forecast tự động 30/60/90 ngày giúp chủ động kế hoạch tài chính",
            "Tự động hóa A2A payment: trả lương, thanh toán NCC, thu tiền theo quy trình định sẵn",
          ],
        },
        sowhat: "Fintech Hub (đa ngân hàng): kết nối Open API Thông tư 64 → dashboard tổng hợp số dư, giao dịch real-time.\nA2A Payment automation: chuyển tiền nội bộ, trả lương, thanh toán NCC tự động theo workflow Odoo+.\nThị trường B2B fintech tăng trưởng 23.87% CAGR 2025–2030 → cửa sổ cơ hội đang mở.",
        evidence: "TT 64/2024/TT-NHNN (hiệu lực 01/03/2025) | NHNN Survey 2023 (38% ngân hàng hỗ trợ Open API) | Mordor Intelligence: Vietnam Fintech CAGR B2B 23.87%",
        tag: "REGULATORY + MARKET",
        tagColor: "#0891b2",
      },
      {
        id: "2B",
        insight: "Kiểm soát duyệt chi kém: Quy trình phê duyệt chi phí nội bộ của phần lớn SME Việt Nam vẫn dựa trên email / Zalo / giấy tờ vật lý — không có audit trail, chậm trễ, rủi ro gian lận và khó tiếp cận vốn ưu đãi.",
        who: [
          "CEO, CFO, trưởng phòng kế toán các DN vừa (20–500 nhân viên)",
          "Doanh nghiệp có nhiều chi nhánh / đội nhóm phân tán",
          "DN đang cần hồ sơ tài chính minh bạch để vay vốn ngân hàng",
        ],
        painOutcome: {
          pain: [
            "Lệnh duyệt chi qua Zalo/email → không có audit trail → rủi ro gian lận nội bộ, tranh chấp",
            "CEO đi công tác không duyệt được chi phí → hoạt động bị tắc nghẽn",
            "Dữ liệu dòng tiền không minh bạch → bị từ chối vay vốn hoặc phải chấp nhận lãi suất cao",
            "Không biết trước rủi ro thiếu tiền → phản ứng bị động khi cash flow âm",
          ],
          outcome: [
            "Mobile approval: duyệt chi trực tiếp trên điện thoại với xác thực đa lớp (OTP + sinh trắc học)",
            "Audit trail đầy đủ → minh bạch cho kiểm toán, ngân hàng, nhà đầu tư",
            "Credit scoring dashboard: dữ liệu dòng tiền thực → tiếp cận vốn ưu đãi dễ hơn",
            "Cảnh báo sớm rủi ro dòng tiền âm trước 30–90 ngày",
          ],
        },
        sowhat: "Xây dựng module Workflow Duyệt chi trên Odoo+ với mobile-first UI:\nChuỗi duyệt chi đa cấp → ghi nhận sổ kế toán tự động → A2A thanh toán ngay khi được duyệt.\nTích hợp AI cash flow forecast: cảnh báo ngưỡng thiếu tiền dựa trên dữ liệu lịch sử Odoo+.\nBộ báo cáo dòng tiền chuẩn theo yêu cầu của ngân hàng để hỗ trợ doanh nghiệp tiếp cận vốn ưu đãi.",
        evidence: "Vietnam Briefing 2025 | NIC 2024 (230+ fintech startup, 30% dùng Open API) | Mordor Intelligence Vietnam Fintech Market Report 2025",
        tag: "OPERATIONAL + FINANCIAL",
        tagColor: "#7c3aed",
      },
    ],
  },

  // ─────────────────────── MARKET 3 ───────────────────────
  {
    market: "Thị trường 3",
    marketLabel: "CRM + HRM + Quản lý Dự án tích hợp Tài chính",
    marketColor: "#7c3aed",
    marketBg: "#faf5ff",
    marketBorder: "#ddd6fe",
    insights: [
      {
        id: "3A",
        insight: "Quyết định kinh doanh mù về tài chính: Dữ liệu bán hàng (CRM/POS) và dữ liệu tài chính (kế toán/dòng tiền) đang tồn tại trong 2 hệ thống riêng biệt — khiến CEO không thể ra quyết định mua/bán nhanh dựa trên lợi nhuận thực.",
        who: [
          "CEO, Sales Director các DN thương mại, dịch vụ, phân phối (10–200 nhân viên)",
          "Doanh nghiệp có đội sales > 5 người",
          "DN dịch vụ/tư vấn quản lý theo dự án (project-based)",
        ],
        painOutcome: {
          pain: [
            "Sales team không biết margin thực của từng đơn hàng → chào giá thiếu cơ sở, giảm giá vô tội vạ",
            "CEO không thấy pipeline bán hàng ảnh hưởng thế nào đến P&L → ra quyết định chậm và dựa cảm tính",
            "Chi phí dự án (nhân công, vật tư) không gắn với sổ kế toán → không biết lãi/lỗ từng hợp đồng",
            "Quyết định mua hàng dựa trên cảm tính vì thiếu dữ liệu tồn kho + tài chính tích hợp",
          ],
          outcome: [
            "Pipeline CRM kết nối trực tiếp với doanh thu, margin, công nợ real-time",
            "CEO thấy ngay: bán hàng → tồn kho → dòng tiền → P&L trên 1 màn hình",
            "Từng dự án/hợp đồng hiển thị lãi/lỗ thực tế → ra quyết định giá, mua hàng nhanh và chính xác hơn",
          ],
        },
        sowhat: "Odoo+ CRM native: pipeline bán hàng kết nối trực tiếp hóa đơn, doanh thu, công nợ real-time.\nProject Management module: gắn chi phí thực tế (nhân công, vật tư) vào từng dự án → thấy rõ lãi/lỗ từng hợp đồng.\nDecision Dashboard: tích hợp CRM + kho + kế toán + dòng tiền → 1 màn hình, 1 nguồn sự thật duy nhất.\nKhác biệt so với MISA/Base: CASSO tích hợp Open Banking nên dòng tiền thực tế từ ngân hàng cũng hiển thị trong cùng dashboard.",
        evidence: "OCD Report 2026: thị trường ERP Việt Nam CAGR 8–14% | Vietnam Briefing 2025 (ERP tăng 15–20%/năm) | Cafebiz SME Survey 2025",
        tag: "STRATEGIC",
        tagColor: "#0891b2",
      },
      {
        id: "3B",
        insight: "Hiệu quả nhân sự không đo lường được: HRM, chấm công, tính lương và KPI của nhân viên đang tách biệt khỏi kết quả tài chính và dự án — doanh nghiệp không đo được ROI của từng bộ phận / nhân viên.",
        who: [
          "HR Manager / CEO các DN dịch vụ, tư vấn, công nghệ (20–300 nhân viên)",
          "Doanh nghiệp đang scale-up, cần chuẩn hóa quy trình nhân sự",
          "DN có nhiều chi nhánh, đội nhóm phân tán địa lý",
        ],
        painOutcome: {
          pain: [
            "Chấm công, tính lương thủ công trên Excel hoặc phần mềm riêng → sai sót lương, mất lòng tin nhân viên",
            "KPI nhân viên không liên kết với kết quả tài chính → không biết bộ phận nào sinh lời, bộ phận nào lãng phí",
            "Chi trả lương thủ công qua ngân hàng → tốn nhân lực, dễ sai lệch, không có audit trail",
            "Quy trình nghỉ phép, xét duyệt nội bộ qua Zalo/email → không chuẩn hóa, mất thời gian theo dõi",
          ],
          outcome: [
            "Quy trình nhân sự chuẩn hóa: tuyển dụng → onboarding → chấm công → lương → KPI trên 1 nền tảng",
            "Tự động chi trả lương qua A2A banking — không cần thao tác thủ công ở ngân hàng",
            "Kết nối KPI nhân viên với doanh thu / lợi nhuận từng bộ phận → CEO thấy ROI nhân sự",
          ],
        },
        sowhat: "HRM module trên Odoo+ tích hợp Payroll + A2A banking:\nTính lương tự động → duyệt chi → A2A payment đến tài khoản nhân viên → ghi nhận kế toán tức thì.\nDashboard ROI nhân sự: chi phí lương / bộ phận ÷ doanh thu / bộ phận = hiệu quả đầu tư nhân sự.\nĐây là điểm khác biệt CASSO so với MISA HRM: tích hợp ngân hàng A2A, không cần thao tác thủ công ở bước chi trả.",
        evidence: "Vietnam Digital Transformation Report 2024 (tiết kiệm 30–50% chi phí nhân sự kế toán) | IBM Survey (56% DN Việt dùng cloud management platform) | OCD Report 2026",
        tag: "OPERATIONAL",
        tagColor: "#d97706",
      },
    ],
  },
];

const tagStyles = {
  REGULATORY: { bg: "#fef2f2", text: "#dc2626", border: "#fecaca" },
  OPERATIONAL: { bg: "#fffbeb", text: "#d97706", border: "#fde68a" },
  "REGULATORY + MARKET": { bg: "#ecfeff", text: "#0891b2", border: "#a5f3fc" },
  "OPERATIONAL + FINANCIAL": { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" },
  STRATEGIC: { bg: "#ecfeff", text: "#0891b2", border: "#a5f3fc" },
};

function Tag({ label }) {
  const s = tagStyles[label] || { bg: "#f3f4f6", text: "#6b7280", border: "#e5e7eb" };
  return (
    <span
      style={{ background: s.bg, color: s.text, border: `1px solid ${s.border}` }}
      className="text-xs font-bold px-2 py-0.5 rounded-full tracking-wide"
    >
      {label}
    </span>
  );
}

function InsightRow({ insight, idx, isLast }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div
      className="rounded-xl border overflow-hidden mb-3"
      style={{ borderColor: open ? "#94a3b8" : "#e2e8f0" }}
    >
      {/* Row Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          <div
            className="text-xs font-black px-2 py-0.5 rounded text-white"
            style={{ background: "#334155" }}
          >
            #{insight.id}
          </div>
          <Tag label={insight.tag} />
        </div>
        <div className="flex-1 text-sm text-slate-700 font-medium leading-snug">
          {insight.insight.split(":")[0]}
          <span className="text-slate-400 font-normal">
            : {insight.insight.split(":").slice(1).join(":")}
          </span>
        </div>
        <span className="text-slate-400 text-lg shrink-0 mt-0.5">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="border-t border-slate-100">
          {/* 4-column grid */}
          <div className="grid grid-cols-4 divide-x divide-slate-100">
            {/* Col 1: Ai gặp */}
            <div className="p-4 bg-slate-50">
              <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <span>👤</span> Ai gặp?
              </div>
              <ul className="space-y-2">
                {insight.who.map((w, i) => (
                  <li key={i} className="text-xs text-slate-700 flex gap-2">
                    <span className="text-blue-400 shrink-0 mt-0.5">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 2: Pain & Desired Outcome */}
            <div className="p-4 col-span-1">
              <div className="mb-3">
                <div className="text-xs font-black text-red-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span>🔴</span> Pain / Cost
                </div>
                <ul className="space-y-1.5">
                  {insight.painOutcome.pain.map((p, i) => (
                    <li key={i} className="text-xs text-slate-700 flex gap-2">
                      <span className="text-red-300 shrink-0 mt-0.5">▸</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-dashed border-slate-200 pt-3 mt-3">
                <div className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span>✅</span> Desired Outcome
                </div>
                <ul className="space-y-1.5">
                  {insight.painOutcome.outcome.map((o, i) => (
                    <li key={i} className="text-xs text-slate-700 flex gap-2">
                      <span className="text-emerald-400 shrink-0 mt-0.5">▸</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Col 3: So what */}
            <div className="p-4 bg-slate-50">
              <div className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                <span>💡</span> So what — Hàm ý sản phẩm
              </div>
              <div className="space-y-2">
                {insight.sowhat.split("\n").map((line, i) => (
                  <p key={i} className={`text-xs leading-relaxed ${i === 0 ? "text-slate-800 font-semibold" : "text-slate-600"}`}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Col 4: Evidence */}
            <div className="p-4">
              <div className="text-xs font-black text-amber-600 uppercase tracking-widest mb-2 flex items-center gap-1">
                <span>📎</span> Evidence
              </div>
              <div className="space-y-1.5">
                {insight.evidence.split("|").map((ev, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-amber-400 shrink-0 text-xs mt-0.5">◆</span>
                    <span className="text-xs text-slate-600 leading-relaxed">{ev.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [activeMarket, setActiveMarket] = useState(null);
  const filtered = activeMarket ? marketNeeds.filter((m) => m.market === activeMarket) : marketNeeds;

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <div
        className="px-6 py-5 border-b border-slate-200"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500 text-white text-xs font-black px-2.5 py-1 rounded-md tracking-wide">
              CASSO
            </div>
            <span className="text-slate-400 text-sm">×</span>
            <div className="text-slate-300 text-sm font-medium">Market Needs Analysis</div>
            <div className="ml-auto text-slate-500 text-xs">April 2026</div>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Identifying Market Needs
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Open Banking × ERP Ecosystem · 3 phân khúc thị trường · 6 market insights
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Column Legend */}
        <div className="hidden md:grid grid-cols-4 gap-3 mb-5">
          {[
            { icon: "👤", label: "Ai gặp?", sub: "Chân dung khách hàng", col: "bg-slate-50" },
            { icon: "🔴/✅", label: "Pain / Desired Outcome", sub: "Vấn đề và kết quả mong muốn", col: "bg-white" },
            { icon: "💡", label: "So what", sub: "Hàm ý sản phẩm CASSO", col: "bg-slate-50" },
            { icon: "📎", label: "Evidence", sub: "Nguồn dữ liệu & nghiên cứu", col: "bg-white" },
          ].map((c, i) => (
            <div key={i} className={`${c.col} rounded-lg px-3 py-2 border border-slate-100 text-center`}>
              <div className="text-base">{c.icon}</div>
              <div className="text-xs font-bold text-slate-600 mt-1">{c.label}</div>
              <div className="text-xs text-slate-400">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Market Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveMarket(null)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              !activeMarket
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            Tất cả thị trường
          </button>
          {marketNeeds.map((m) => (
            <button
              key={m.market}
              onClick={() => setActiveMarket(activeMarket === m.market ? null : m.market)}
              className="text-xs font-bold px-3 py-1.5 rounded-full border transition-all"
              style={{
                background: activeMarket === m.market ? m.marketColor : "white",
                color: activeMarket === m.market ? "white" : m.marketColor,
                borderColor: m.marketColor,
              }}
            >
              {m.market}: {m.marketLabel}
            </button>
          ))}
        </div>

        {/* Market Sections */}
        {filtered.map((market) => (
          <div key={market.market} className="mb-8">
            {/* Market Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-xl mb-3"
              style={{ background: market.marketBg, border: `1.5px solid ${market.marketBorder}` }}
            >
              <div
                className="text-xs font-black text-white px-2 py-1 rounded-md"
                style={{ background: market.marketColor }}
              >
                {market.market}
              </div>
              <div className="font-bold text-slate-700 text-sm">{market.marketLabel}</div>
              <div className="ml-auto text-xs text-slate-400">{market.insights.length} insights</div>
            </div>

            {/* Insight Rows */}
            {market.insights.map((ins, i) => (
              <InsightRow key={ins.id} insight={ins} idx={i} isLast={i === market.insights.length - 1} />
            ))}
          </div>
        ))}

        {/* Summary Footer */}
        <div className="bg-slate-900 text-white rounded-2xl px-5 py-5 mt-4">
          <div className="font-bold text-sm mb-3 text-slate-300 uppercase tracking-widest">Tổng kết — 6 Market Needs</div>
          <div className="grid md:grid-cols-3 gap-4">
            {marketNeeds.map((m) => (
              <div key={m.market} className="border border-slate-700 rounded-xl p-3">
                <div className="text-xs font-black mb-2" style={{ color: m.marketColor }}>
                  {m.market}
                </div>
                <div className="text-xs text-slate-300 font-semibold mb-2">{m.marketLabel}</div>
                <ul className="space-y-1">
                  {m.insights.map((ins) => (
                    <li key={ins.id} className="text-xs text-slate-400 flex gap-2">
                      <span style={{ color: m.marketColor }}>#{ins.id}</span>
                      <span>{ins.insight.split(":")[0]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-xs text-slate-600 mt-4 border-t border-slate-800 pt-3">
            Sources: NĐ 70/2025 · TT 64/2024/TT-NHNN · MIC Báo cáo CĐS 2024 · Vietnam Briefing 2025 · Mordor Intelligence 2025 · NIC 2024 · OCD Report 2026 · Vietnam Digital Transformation Report 2024
          </div>
        </div>
      </div>
    </div>
  );
}
