export const INITIAL_CATEGORIES = [
  { id: 'casso', label: 'CASSO Projects', color: 'bg-indigo-100/80', border: 'border-indigo-400 text-indigo-900' },
  { id: 'wispace', label: 'WISPACE (Startup)', color: 'bg-purple-100/80', border: 'border-purple-400 text-purple-900' },
  { id: 'lowca', label: 'LOWCA & DIGI', color: 'bg-orange-100/80', border: 'border-orange-400 text-orange-900' },
];

export const DAYS = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export const initialTasks = [
  // --- CHỦ NHẬT (0) ---
  { id: 'sun-wispace-1', title: 'Data thị trường đi gọi vốn', category: 'wispace', days: [0], startHour: 8, endHour: 10, highlight: 'yellow' },
  { id: 'sun-lowca-1', title: 'Chốt pivot B2B (Maintance mode)', category: 'lowca', days: [0], startHour: 10, endHour: 12, highlight: 'none' },
  { id: 'sun-wispace-2', title: 'Setup AI Grading, test Open-source', category: 'wispace', days: [0], startHour: 13.5, endHour: 16, highlight: 'green' },
  { id: 'sun-wispace-4', title: 'Teacher Admin & Test các model AI (Setup GPU ảo)', category: 'wispace', days: [0], startHour: 20, endHour: 22, highlight: 'none' },
  { id: 'sun-wispace-3', title: 'Test tool của Kiệt', category: 'wispace', days: [0], startHour: 22, endHour: 24, highlight: 'none' },

  // --- THỨ 2 (1) ---
  { id: 'mon-lowca-1', title: 'Gỡ bom nợ DIGI, chốt Seeder', category: 'lowca', days: [1], startHour: 8, endHour: 9, highlight: 'red' },
  { id: 'mon-casso-1', title: '[X-sign] Lộ trình Workflow & KPI HR', category: 'casso', days: [1], startHour: 9, endHour: 12, highlight: 'green' },
  { id: 'mon-casso-2', title: '[X-press] Sync Dev 50% MVP & Đọc Viindoo docs', category: 'casso', days: [1], startHour: 13, endHour: 18, highlight: 'none' },
  { id: 'mon-wispace-1', title: 'AI Grading (bàn giao Academic) & Test tool', category: 'wispace', days: [1], startHour: 20, endHour: 23.75, highlight: 'green' },

  // --- THỨ 3 (2) ---
  { id: 'tue-casso-1', title: '[X-sign] Họp HR lấy Requirement thực tế', category: 'casso', days: [2], startHour: 8, endHour: 12, highlight: 'yellow' },
  { id: 'tue-casso-2', title: '[X-press] UAT luồng MVP & Kiến trúc Viindoo', category: 'casso', days: [2], startHour: 13, endHour: 18, highlight: 'none' },
  { id: 'tue-wispace-1', title: 'Họp Marketing rà soát Data thị trường', category: 'wispace', days: [2], startHour: 20, endHour: 22, highlight: 'yellow' },

  // --- THỨ 4 (3) ---
  { id: 'wed-casso-1', title: '[X-sign] Viết Roadmap Design/Dev & Phác thảo Wireframe', category: 'casso', days: [3], startHour: 8, endHour: 12, highlight: 'green' },
  { id: 'wed-casso-2', title: '[X-press] Ép fix bug UAT & Phân tích Touchpoints', category: 'casso', days: [3], startHour: 13, endHour: 18, highlight: 'none' },
  { id: 'wed-wispace-1', title: 'Control công việc của team AI (WISPACE)', category: 'wispace', days: [3], startHour: 20, endHour: 23.75, highlight: 'green' },

  // --- THỨ 5 (4) ---
  { id: 'thu-casso-1', title: '[X-sign] Hoàn thiện Prototype & Trình bày Blueprint Doc', category: 'casso', days: [4], startHour: 8, endHour: 12, highlight: 'yellow' },
  { id: 'thu-casso-2', title: '[X-press] Đóng module lõi AI & Nháp kiến trúc Viindoo', category: 'casso', days: [4], startHour: 13, endHour: 18, highlight: 'none' },
  { id: 'thu-wispace-1', title: 'Control công việc team Product (Tính năng tháng 4)', category: 'wispace', days: [4], startHour: 20, endHour: 23.75, highlight: 'green' },

  // --- THỨ 6 (5) ---
  { id: 'fri-casso-1', title: '[X-sign] Họp CEO Điệp chốt Roadmap Develop', category: 'casso', days: [5], startHour: 8, endHour: 12, highlight: 'red' },
  { id: 'fri-casso-2', title: '[X-press] Đo lường chốt MVP 80% & Đóng băng Viindoo', category: 'casso', days: [5], startHour: 13, endHour: 18, highlight: 'none' },
  { id: 'fri-wispace-1', title: 'Tổng hợp data & Build luồng slide gọi vốn cuối tuần', category: 'wispace', days: [5], startHour: 20, endHour: 23.75, highlight: 'green' },

  // --- THỨ 7 (6) ---
  { id: 'sat-wispace-1', title: 'Pitching Gọi Vốn (Ưu tiên số 1)', category: 'wispace', days: [6], startHour: 8, endHour: 12, highlight: 'red' },
  { id: 'sat-lowca-1', title: 'Code AI LOWCA + Xử lý task uỷ quyền', category: 'lowca', days: [6], startHour: 13.5, endHour: 18, highlight: 'none' },
  { id: 'sat-wispace-2', title: 'Review cuối tuần & Chiến lược T2', category: 'wispace', days: [6], startHour: 20, endHour: 23.5, highlight: 'yellow' },
];
