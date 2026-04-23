import { useState } from "react";

const markets = [
  {
    id: 1,
    icon: "🔗",
    title: "Thị trường 1: Kết nối Bán hàng → Kế toán → Cơ quan Thuế",
    subtitle: "Giải pháp tích hợp thay thế MISA trong hệ sinh thái Odoo+",
    color: "blue",
    context: "98% doanh nghiệp Việt Nam là SME. Hơn 65% đang dùng phần mềm quản lý riêng lẻ, nhiều doanh nghiệp sử dụng đồng thời 5–6 phần mềm rời rạc. MISA đang chiếm ưu thế với hơn 130.000 doanh nghiệp, nhưng khả năng kết nối liền mạch với Odoo+ còn hạn chế.",
    painPoints: [
      { pain: "Dữ liệu phân mảnh", detail: "Doanh nghiệp phải nhập liệu thủ công từ phần mềm bán hàng sang kế toán, gây sai lệch và mất thời gian." },
      { pain: "Kết nối thuế phức tạp", detail: "Quy trình kê khai thuế, nộp hóa đơn điện tử và đối chiếu với cơ quan thuế vẫn bán thủ công, rủi ro vi phạm cao." },
      { pain: "Thiếu tích hợp Odoo", detail: "MISA không tích hợp sâu vào hệ sinh thái Odoo – khoảng trống lớn cho doanh nghiệp đang dùng Odoo+." },
      { pain: "Quy định thay đổi liên tục", detail: "VAS, hóa đơn điện tử, chính sách thuế GTGT, nghị định 52/2024… đòi hỏi cập nhật liên tục mà nhiều phần mềm không theo kịp." },
    ],
    cassoSolution: [
      "Tích hợp native Odoo+ ↔ kế toán VAS ↔ eTax (cơ quan thuế) theo thời gian thực",
      "Auto-sync hóa đơn điện tử (meInvoice tương đương) vào sổ kế toán – giảm 80% nhập liệu thủ công",
      "Open Banking A2A: đối chiếu sao kê ngân hàng tự động với chứng từ kế toán",
      "Dashboard tuân thủ thuế: cảnh báo deadline kê khai, tự động xuất báo cáo thuế",
      "API connector chuẩn Thông tư 64/2024 – kết nối ngân hàng và cơ quan hành chính",
    ],
    competitors: ["MISA AMIS", "FAST Accounting", "Bravo 8", "AccNet ERP"],
    rice: {
      reach: 50000,
      reachNote: "~50.000 DN SME đang dùng Odoo+ hoặc cần tích hợp kế toán-thuế",
      impact: 3,
      impactNote: "Massive – giải quyết pain point cốt lõi hàng ngày",
      confidence: 80,
      confidenceNote: "Dữ liệu thị trường rõ ràng, MISA có điểm yếu đã biết",
      effort: 8,
      effortNote: "8 person-months (API Thuế + Odoo connector + kế toán VAS)",
    },
  },
  {
    id: 2,
    icon: "💰",
    title: "Thị trường 2: Hệ thống Quản trị Dòng tiền Nội bộ",
    subtitle: "Cash Flow Management + Mobile Approval trên nền tảng Open Banking",
    color: "green",
    context: "Thị trường Fintech Việt Nam đạt 15,7 tỷ USD năm 2024, dự báo vượt 50 tỷ USD vào 2030 (CAGR >21%). Thông tư 64/2024 có hiệu lực 1/3/2025 mở ra nền tảng pháp lý cho Open API Banking. Phân khúc B2B fintech tăng trưởng 23,87% CAGR giai đoạn 2025–2030.",
    painPoints: [
      { pain: "Mất kiểm soát dòng tiền", detail: "CEO/CFO không có visibility real-time về cash flow – phải chờ báo cáo cuối ngày hoặc cuối tuần mới biết tình hình." },
      { pain: "Quy trình duyệt chi chậm", detail: "Lệnh duyệt chi phải qua email/Zalo/giấy tờ – chậm, thiếu audit trail, tăng rủi ro gian lận nội bộ." },
      { pain: "Khó tiếp cận vốn ưu đãi", detail: "Doanh nghiệp không có dữ liệu dòng tiền minh bạch bị từ chối vay vốn hoặc phải vay lãi suất cao." },
      { pain: "Đa ngân hàng, dữ liệu rời rạc", detail: "SME thường có tài khoản ở 3–5 ngân hàng, không có giao diện tổng hợp để quản lý tập trung." },
    ],
    cassoSolution: [
      "Fintech Hub: kết nối đa ngân hàng (Open API Thông tư 64) – xem số dư, giao dịch real-time trên 1 màn hình",
      "Mobile approval: Ban lãnh đạo duyệt chi trực tiếp trên điện thoại với xác thực đa lớp (OTP + sinh trắc)",
      "A2A Payment: chuyển tiền nội bộ, trả lương, thanh toán nhà cung cấp tự động theo quy trình",
      "Cash flow forecast: AI dự báo dòng tiền 30/60/90 ngày dựa trên dữ liệu lịch sử Odoo+",
      "Credit scoring dashboard: minh bạch hóa hồ sơ tài chính giúp doanh nghiệp đủ điều kiện vay vốn ưu đãi",
    ],
    competitors: ["MISA SME (hạn chế)", "KiotViet (thanh toán)", "VietQR", "Ngân hàng số nội bộ"],
    rice: {
      reach: 80000,
      reachNote: "~80.000 DN SME có nhu cầu quản lý dòng tiền đa ngân hàng",
      impact: 3,
      impactNote: "Massive – tác động trực tiếp đến sống còn tài chính doanh nghiệp",
      confidence: 75,
      confidenceNote: "Thị trường rõ ràng nhưng cần thời gian xây dựng lòng tin với ngân hàng",
      effort: 10,
      effortNote: "10 person-months (Open API banking + mobile app + A2A)",
    },
  },
  {
    id: 3,
    icon: "📊",
    title: "Thị trường 3: CRM + HRM + Quản lý Dự án tích hợp Tài chính",
    subtitle: "Nền tảng vận hành toàn diện – minh bạch hóa bán hàng và kết quả tài chính",
    color: "purple",
    context: "65% doanh nghiệp SME Việt Nam đang triển khai phần mềm quản lý, nhưng đại đa số dùng các công cụ rời rạc (CRM riêng, HRM riêng, project riêng). Tỷ lệ ERP chỉ đạt hiệu quả dưới 50% mong đợi là 41% tại Việt Nam, chủ yếu do thiếu kết nối với kết quả tài chính.",
    painPoints: [
      { pain: "Bán hàng không kết nối tài chính", detail: "Sales team không biết margin thực của đơn hàng; CEO không thấy được hiệu quả bán hàng ảnh hưởng thế nào đến P&L." },
      { pain: "Quyết định mua hàng chậm", detail: "Thiếu dữ liệu tích hợp giữa pipeline bán hàng và tồn kho/tài chính dẫn đến quyết định mua hàng dựa trên cảm tính." },
      { pain: "Quản lý nhân sự và dự án rời rạc", detail: "KPI nhân sự, tiến độ dự án và chi phí thực tế không liên thông – khó đánh giá ROI của từng bộ phận." },
      { pain: "MISA & các tool hiện tại thiếu UX tốt", detail: "Giao diện phức tạp, khó tùy biến, thiếu tích hợp sâu giữa CRM – kế toán – HR trong một workflow duy nhất." },
    ],
    cassoSolution: [
      "Odoo+ CRM native: pipeline bán hàng kết nối trực tiếp hóa đơn, doanh thu, công nợ theo thời gian thực",
      "Project Management: gắn chi phí thực tế (nhân công, vật tư) vào từng dự án – thấy rõ lãi/lỗ từng hợp đồng",
      "HRM tích hợp Payroll + A2A: tính lương tự động, chi trả qua A2A banking không cần thao tác ngân hàng thủ công",
      "Decision dashboard: CEO/CFO thấy ngay chỉ số bán hàng → tồn kho → cash flow → P&L trên một màn hình",
      "Fintech Hub integration: mọi giao dịch tài chính từ CRM/HRM tự động ghi nhận sổ sách kế toán",
    ],
    competitors: ["MISA AMIS CRM", "Base.vn", "Salesforce (giá cao)", "Bitrix24"],
    rice: {
      reach: 35000,
      reachNote: "~35.000 DN vừa (10–200 nhân viên) có nhu cầu tích hợp CRM-HRM-Finance",
      impact: 2,
      impactNote: "High – cải thiện đáng kể nhưng nhu cầu chưa cấp thiết như dòng tiền",
      confidence: 65,
      confidenceNote: "Cạnh tranh cao, chu kỳ bán hàng dài hơn, cần nhiều customization",
      effort: 13,
      effortNote: "13 person-months (CRM + HRM + Project modules + financial bridge)",
    },
  },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    header: "bg-blue-600",
    badge: "bg-blue-100 text-blue-700",
    pill: "bg-blue-600",
    light: "text-blue-600",
  },
  green: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    header: "bg-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
    pill: "bg-emerald-600",
    light: "text-emerald-600",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    header: "bg-purple-600",
    badge: "bg-purple-100 text-purple-700",
    pill: "bg-purple-600",
    light: "text-purple-600",
  },
};

function riceScore(r) {
  return Math.round((r.reach * r.impact * (r.confidence / 100)) / r.effort);
}

function RICEBar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function MarketCard({ market, expanded, onToggle }) {
  const c = colorMap[market.color];
  const rice = market.rice;
  const score = riceScore(rice);

  return (
    <div className={`rounded-2xl border-2 ${c.border} overflow-hidden shadow-sm mb-6`}>
      {/* Header */}
      <div
        className={`${c.header} text-white px-6 py-4 cursor-pointer flex items-center justify-between`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{market.icon}</span>
          <div>
            <div className="font-bold text-lg leading-tight">{market.title}</div>
            <div className="text-sm opacity-80 mt-0.5">{market.subtitle}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs opacity-70">RICE Score</div>
            <div className="text-2xl font-black">{score.toLocaleString()}</div>
          </div>
          <span className="text-xl">{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {expanded && (
        <div className={`${c.bg} px-6 py-5 space-y-6`}>
          {/* Context */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span>🌍</span> Bối cảnh thị trường
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed bg-white rounded-xl px-4 py-3 border border-gray-100">
              {market.context}
            </p>
          </div>

          {/* Pain Points */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>⚡</span> Nhu cầu & Pain Points của khách hàng
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {market.painPoints.map((p, i) => (
                <div key={i} className="bg-white rounded-xl p-3 border border-red-100">
                  <div className="font-semibold text-red-600 text-sm mb-1">🔴 {p.pain}</div>
                  <div className="text-gray-600 text-xs leading-relaxed">{p.detail}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CASSO Solution */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>✅</span> CASSO có thể làm gì?
            </h4>
            <div className="space-y-2">
              {market.cassoSolution.map((s, i) => (
                <div key={i} className={`flex gap-2 items-start text-sm bg-white rounded-lg px-3 py-2 border border-gray-100`}>
                  <span className={`${c.light} font-bold shrink-0`}>→</span>
                  <span className="text-gray-700">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Competitors */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span>🏁</span> Đối thủ cạnh tranh chính
            </h4>
            <div className="flex flex-wrap gap-2">
              {market.competitors.map((comp, i) => (
                <span key={i} className={`${c.badge} text-xs font-medium px-3 py-1 rounded-full`}>
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* RICE Framework */}
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span>📐</span> RICE Framework Analysis
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: "Reach", value: rice.reach.toLocaleString(), note: rice.reachNote, unit: "DN/năm", max: 100000 },
                { label: "Impact", value: rice.impact + "×", note: rice.impactNote, unit: "0.25–3", max: 3 },
                { label: "Confidence", value: rice.confidence + "%", note: rice.confidenceNote, unit: "%", max: 100 },
                { label: "Effort", value: rice.effort, note: rice.effortNote, unit: "person-months", max: 15 },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                  <div className="text-gray-500 text-xs font-medium uppercase tracking-wide">{item.label}</div>
                  <div className={`text-2xl font-black ${c.light} my-1`}>{item.value}</div>
                  <RICEBar
                    value={i === 3 ? item.max - item.value + 1 : parseFloat(item.value)}
                    max={item.max}
                    color={c.pill}
                  />
                  <div className="text-gray-400 text-xs mt-2 leading-tight">{item.note}</div>
                </div>
              ))}
            </div>
            <div className={`${c.header} text-white rounded-xl px-5 py-3 flex items-center justify-between`}>
              <div>
                <div className="text-sm opacity-80">RICE Score = (Reach × Impact × Confidence%) ÷ Effort</div>
                <div className="text-xs opacity-60 mt-0.5">
                  = ({rice.reach.toLocaleString()} × {rice.impact} × {rice.confidence / 100}) ÷ {rice.effort}
                </div>
              </div>
              <div className="text-4xl font-black">{score.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const scores = markets.map((m) => ({ title: m.title.split(":")[1].trim().slice(0, 30) + "…", score: riceScore(m.rice), color: m.color, icon: m.icon }));
const maxScore = Math.max(...scores.map((s) => s.score));

export default function App() {
  const [expanded, setExpanded] = useState({ 0: true, 1: false, 2: false });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">CASSO</div>
            <div className="text-gray-400 text-sm">Open Banking × ERP Ecosystem</div>
          </div>
          <h1 className="text-2xl font-black text-white">Market Needs Analysis</h1>
          <p className="text-gray-300 text-sm mt-1">
            Phân tích nhu cầu thị trường · Identifying Market Needs · Đánh giá RICE Framework
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Objective Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-6">
          <div className="font-bold text-amber-700 text-sm mb-2 flex items-center gap-2">
            <span>🎯</span> MỤC TIÊU – Identifying Market Needs
          </div>
          <p className="text-amber-800 text-sm leading-relaxed">
            Xác định nhu cầu thị trường là nhiệm vụ cơ bản của Product Manager trong quá trình phân tích thị trường. Nhu cầu thị trường là điều thúc đẩy người tiêu dùng mua sản phẩm/dịch vụ. Phân tích thị trường yêu cầu PM nghiên cứu thị trường, hiểu hành vi và sở thích của khách hàng, theo dõi xu hướng hiện tại — từ đó giải mã khoảng trống thị trường, pain points chưa được giải quyết, và tìm cơ hội tạo ra hoặc cải thiện sản phẩm.
          </p>
        </div>

        {/* Market Context */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 mb-6">
          <h2 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
            <span>📈</span> Bối cảnh thị trường tổng quan – Việt Nam 2025
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "SME Việt Nam", value: "98%", sub: "tổng số doanh nghiệp là SME" },
              { label: "Tăng trưởng ERP", value: "15–20%", sub: "CAGR hàng năm tại Việt Nam" },
              { label: "Fintech Market", value: "$15.7B", sub: "2024 → $50B+ dự báo 2030" },
              { label: "Open Banking", value: "TT 64", sub: "Hiệu lực 1/3/2025 – nền tảng pháp lý" },
            ].map((s, i) => (
              <div key={i} className="bg-slate-50 rounded-xl px-3 py-3 text-center border border-slate-100">
                <div className="text-xl font-black text-slate-700">{s.value}</div>
                <div className="text-xs font-semibold text-slate-500 mt-0.5">{s.label}</div>
                <div className="text-xs text-gray-400 mt-1 leading-tight">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RICE Score Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-4 mb-6">
          <h2 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
            <span>🏆</span> So sánh độ hấp dẫn – RICE Score
          </h2>
          <div className="space-y-3">
            {[...scores].sort((a, b) => b.score - a.score).map((s, i) => {
              const c = colorMap[s.color];
              return (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-lg w-6 text-center">{s.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-600 mb-1">{s.title}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                        <div
                          className={`h-4 rounded-full ${c.pill} flex items-center justify-end pr-2 transition-all`}
                          style={{ width: `${(s.score / maxScore) * 100}%` }}
                        >
                          <span className="text-white text-xs font-bold">{s.score.toLocaleString()}</span>
                        </div>
                      </div>
                      {i === 0 && <span className="text-yellow-500 text-sm">★ Ưu tiên cao nhất</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            * RICE = (Reach × Impact × Confidence) ÷ Effort. Điểm cao hơn = thị trường hấp dẫn hơn để ưu tiên đầu tư.
          </p>
        </div>

        {/* Market Cards */}
        <h2 className="font-bold text-gray-800 text-base mb-4 flex items-center gap-2">
          <span>🔍</span> Phân tích chi tiết từng thị trường
        </h2>
        {markets.map((market, i) => (
          <MarketCard
            key={market.id}
            market={market}
            expanded={!!expanded[i]}
            onToggle={() => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))}
          />
        ))}

        {/* Strategic Recommendation */}
        <div className="bg-slate-800 text-white rounded-2xl px-5 py-5 mt-2">
          <h2 className="font-bold text-lg mb-3 flex items-center gap-2">
            <span>🚀</span> Khuyến nghị chiến lược
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            {[
              {
                phase: "Giai đoạn 1 (0–6 tháng)",
                action: "Ưu tiên Thị trường 2 (Cash Flow Management)",
                reason: "RICE score cao nhất, nhu cầu cấp thiết, Thông tư 64 vừa có hiệu lực tạo cửa sổ cơ hội.",
                color: "border-emerald-400",
              },
              {
                phase: "Giai đoạn 2 (6–12 tháng)",
                action: "Mở rộng sang Thị trường 1 (Kế toán–Thuế)",
                reason: "Tận dụng nền tảng Open Banking đã xây, bổ sung connector Odoo+kế toán+thuế để cross-sell.",
                color: "border-blue-400",
              },
              {
                phase: "Giai đoạn 3 (12–24 tháng)",
                action: "Phát triển Thị trường 3 (CRM/HRM/Dự án)",
                reason: "RICE score thấp hơn, cần chu kỳ bán dài, nhưng là lợi thế cạnh tranh dài hạn khi đã có dữ liệu tài chính.",
                color: "border-purple-400",
              },
            ].map((rec, i) => (
              <div key={i} className={`border-l-4 ${rec.color} pl-3`}>
                <div className="text-gray-400 text-xs font-medium mb-1">{rec.phase}</div>
                <div className="font-semibold mb-1">{rec.action}</div>
                <div className="text-gray-300 text-xs leading-relaxed">{rec.reason}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-gray-400 text-xs mt-4 pb-4">
          Báo cáo tổng hợp bởi CASSO Product Team · Dữ liệu: Vietnam Briefing 2025, MIC 2024, Mordor Intelligence, NIC 2024, SBV Thông tư 64/2024
        </div>
      </div>
    </div>
  );
}
