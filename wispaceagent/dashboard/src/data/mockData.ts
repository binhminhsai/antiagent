export const funnelDataAll = [
  { step: 'Traffic', value: 120000, label: 'Tổng truy cập' },
  { step: 'Sign-up', value: 45000, label: 'Tổng Sign-up' },
  { step: 'Qualified Trial', value: 32000, label: 'Dùng Goal Setting' },
  { step: 'Active User', value: 25000, label: 'Nhấn Submit (EG, VP, VE)' },
  { step: 'Potential User', value: 18000, label: 'Tính năng luyện tập' },
  { step: 'Retention', value: 12000, label: 'Quay lại luyện tập >= 2' },
  { step: 'Paid 1 Lần', value: 5000, label: 'Paid lần 1' },
  { step: 'Referral', value: 1200, label: 'Nhập mã code' },
];

export const funnelDataNew = [
  { step: 'New Traffic', value: 35000, label: 'Tổng truy cập mới' },
  { step: 'New Sign-up', value: 15000, label: 'Sign-up mới' },
  { step: 'New Qualified', value: 12000, label: 'Mới dùng Goal Setting' },
  { step: 'New Active', value: 8500, label: 'Mới nhấn Submit' },
  { step: 'New Potential', value: 6000, label: 'Mới dùng luyện tập' },
  { step: 'New Retention', value: 3500, label: 'Mới quay lại luyện tập >= 2' },
  { step: 'New Paid 1 Lần', value: 1500, label: 'Mới Paid lần đầu' },
  { step: 'New Referral', value: 450, label: 'Mã code mới' },
];

export const activeUserMixDataAll = [
  { name: 'Week 1', qualified: 7500, active: 5000, potential: 3200, growth: 12 },
  { name: 'Week 2', qualified: 8100, active: 5600, potential: 3800, growth: 15 },
  { name: 'Week 3', qualified: 7800, active: 5200, potential: 3500, growth: -5 },
  { name: 'Week 4', qualified: 8600, active: 6100, potential: 4200, growth: 18 },
  { name: 'Week 5', qualified: 9200, active: 6800, potential: 4800, growth: 22 },
];

export const activeUserMixDataNew = [
  { name: 'Week 1', qualified: 2500, active: 1800, potential: 1200, growth: 10 },
  { name: 'Week 2', qualified: 2800, active: 2000, potential: 1400, growth: 14 },
  { name: 'Week 3', qualified: 2600, active: 1900, potential: 1300, growth: -2 },
  { name: 'Week 4', qualified: 3100, active: 2400, potential: 1700, growth: 20 },
  { name: 'Week 5', qualified: 3500, active: 2800, potential: 2000, growth: 25 },
];

export const timeToAhaData = [
  { stage: 'Sign -> Qualified', avgTime: '2.5 giờ' },
  { stage: 'Sign -> Submit', avgTime: '4.2 giờ' },
  { stage: 'Submit -> Potential', avgTime: '1.5 ngày' },
];

export const submitSourceData = [
  { name: 'EG1', All: 8500, New: 3200 },
  { name: 'EG2', All: 6200, New: 2100 },
  { name: 'VP1', All: 4800, New: 1500 },
  { name: 'VP2', All: 3500, New: 1100 },
  { name: 'VE', All: 2000, New: 600 },
];

export const practiceFeatureData = [
  { name: 'History (PT)', All: 12000, New: 4500 },
  { name: 'AI Enhance', All: 8500, New: 2800 },
  { name: 'AI Quizz', All: 5200, New: 1800 },
];

export const rollingRetentionData = [
  { label: 'Active trong 7 ngày gần nhất', count: 18500, trend: '+5.2%' },
  { label: 'Active trong 30 ngày gần nhất', count: 42000, trend: '+12.4%' },
];

export const d7RetentionData = [
  { name: 'W1 - May', All: 45, New: 32 },
  { name: 'W2 - May', All: 48, New: 35 },
  { name: 'W3 - May', All: 46, New: 33 },
  { name: 'W4 - May', All: 51, New: 38 },
];

export const d30RetentionData = [
  { name: 'April', All: 65, New: 48 },
  { name: 'May', All: 68, New: 52 },
  { name: 'June', All: 72, New: 56 },
  { name: 'July', All: 75, New: 59 },
];

export const revenueData = [
  { name: 'Week 1', revenue: 15000, renewal: 85, churn: 1.2 },
  { name: 'Week 2', revenue: 18500, renewal: 87, churn: 1.0 },
  { name: 'Week 3', revenue: 16200, renewal: 84, churn: 1.5 },
  { name: 'Week 4', revenue: 21000, renewal: 89, churn: 0.8 },
  { name: 'Week 5', revenue: 24500, renewal: 91, churn: 0.6 },
];
