export const INITIAL_CATEGORIES = [
  { id: 'casso', label: 'CASSO Projects', color: 'bg-indigo-100/80', border: 'border-indigo-400 text-indigo-900' },
  { id: 'wispace', label: 'WISPACE (Startup)', color: 'bg-purple-100/80', border: 'border-purple-400 text-purple-900' },
  { id: 'lowca', label: 'LOWCA', color: 'bg-orange-100/80', border: 'border-orange-400 text-orange-900' },
  { id: 'digi', label: 'DIGI Team', color: 'bg-red-100/80', border: 'border-red-400 text-red-900' },
];

export const DAYS = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export const initialTasks = [
  // --- CHỦ NHẬT (0) ---
  { id: 'sun-digi', title: 'DIGI: Process làm việc, hẹn/họp anh Khang', category: 'digi', days: [0], startHour: 8, endHour: 11.5, highlight: 'red' },
  { id: 'sun-plan', title: 'Lên kế hoạch tuần 3 WISPACE, CASSO, LOWCA, DIGI', category: 'wispace', days: [0], startHour: 11.5, endHour: 12.5, highlight: 'green' },
  { id: 'sun-lowca', title: 'LOWCA: Họp Tần, Châu, Đạt phân task & định hướng', category: 'lowca', days: [0], startHour: 14, endHour: 16.5, highlight: 'yellow' },
  { id: 'sun-wispace-1', title: 'Review code AI Grading 2.1 & Deploy lên Main', category: 'wispace', days: [0], startHour: 16.5, endHour: 18, highlight: 'green' },
  { id: 'sun-wispace-2', title: 'Bàn Triều collect data. Lên Todo list team AI', category: 'wispace', days: [0], startHour: 18, endHour: 19.5, highlight: 'green' },
  { id: 'sun-wispace-3', title: 'Họp Marketing: Showcase định hướng sản phẩm', category: 'wispace', days: [0], startHour: 20, endHour: 22, highlight: 'yellow' },
  { id: 'sun-plan-self', title: 'Thực hiện task Q2/Review cá nhân', category: 'casso', days: [0], startHour: 22, endHour: 23.5, highlight: 'none' },

  // --- THỨ 2 (1) ---
  { id: 'mon-casso-1', title: '[X-doo+] Viết Market Overview (Viindoo)', category: 'casso', days: [1], startHour: 8, endHour: 12, highlight: 'yellow' },
  { id: 'mon-casso-2', title: '[X-sign] Viết PRDs/Stories luồng MVP', category: 'casso', days: [1], startHour: 13, endHour: 18, highlight: 'none' },
  { id: 'mon-wispace-1', title: 'QA Dev WISPACE Class Phase 2', category: 'wispace', days: [1], startHour: 20, endHour: 23.5, highlight: 'green' },

  // --- THỨ 3 (2) ---
  { id: 'tue-casso-1', title: '[X-doo+] Chốt Positioning Strategy', category: 'casso', days: [2], startHour: 8, endHour: 12, highlight: 'yellow' },
  { id: 'tue-casso-2', title: '[X-clock-in] User Stories & Prototype', category: 'casso', days: [2], startHour: 13, endHour: 18, highlight: 'none' },
  { id: 'tue-wispace-1', title: 'Theo dõi & Quản trị AI Teacher Roadmap', category: 'wispace', days: [2], startHour: 20, endHour: 23.5, highlight: 'green' },

  // --- THỨ 4 (3) ---
  { id: 'wed-casso-1', title: '[X-doo+] Viết PRDs & Product Roadmaps', category: 'casso', days: [3], startHour: 8, endHour: 12, highlight: 'yellow' },
  { id: 'wed-casso-2', title: '[X-press] Review MVP, ra quyết định Go/No-go', category: 'casso', days: [3], startHour: 13, endHour: 18, highlight: 'none' },
  { id: 'wed-wispace-1', title: 'R&D: Data Dashboard & Flow AI Teacher', category: 'wispace', days: [3], startHour: 20, endHour: 23.5, highlight: 'green' },

  // --- THỨ 5 (4) ---
  { id: 'thu-casso-1', title: '[X-doo+] Backlog Management (Jira/Linear)', category: 'casso', days: [4], startHour: 8, endHour: 12, highlight: 'yellow' },
  { id: 'thu-casso-2', title: '[X-sign] Prototype/Wireframes', category: 'casso', days: [4], startHour: 13, endHour: 17, highlight: 'none' },
  { id: 'thu-digi-1', title: 'Check in quá trình bàn giao DIGI', category: 'digi', days: [4], startHour: 17, endHour: 18, highlight: 'red' },
  { id: 'thu-wispace-1', title: 'R&D: Cấu trúc Student Site 2.0', category: 'wispace', days: [4], startHour: 20, endHour: 23.5, highlight: 'green' },

  // --- THỨ 6 (5) ---
  { id: 'fri-casso-1', title: 'Review tiến độ team ISA (X-doo, sign, clock)', category: 'casso', days: [5], startHour: 8, endHour: 12, highlight: 'red' },
  { id: 'fri-lowca-1', title: 'LOWCA: Review Blueprint B2B của Châu', category: 'lowca', days: [5], startHour: 13, endHour: 18, highlight: 'none' },
  { id: 'fri-wispace-1', title: 'Marketing: Tập trung làm Pitch Deck WISPACE', category: 'wispace', days: [5], startHour: 20, endHour: 23.5, highlight: 'yellow' },

  // --- THỨ 7 (6) ---
  { id: 'sat-wispace-1', title: 'Sprint Planning team Dev WISPACE', category: 'wispace', days: [6], startHour: 8, endHour: 12, highlight: 'yellow' },
  { id: 'sat-wispace-2', title: 'Growth: Review Campaign thu hút Teacher', category: 'wispace', days: [6], startHour: 13.5, endHour: 18, highlight: 'none' },
  { id: 'sat-casso-1', title: 'Review KPI Tuần & Nghỉ ngơi', category: 'casso', days: [6], startHour: 20, endHour: 22, highlight: 'red' },
];
