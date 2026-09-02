export function formatWeeksCount(count) {
  const n = Math.abs(parseInt(count, 10)) || 0;
  if (n === 0) return "0 أسبوع";
  if (n === 1) return "أسبوع واحد";
  if (n === 2) return "أسبوعان";
  if (n >= 3 && n <= 10) return `${n} أسابيع`;
  return `${n} أسبوع`;
}

export function formatSectionsCount(count) {
  const n = Math.abs(parseInt(count, 10)) || 0;
  if (n === 0) return "0 قسم";
  if (n === 1) return "قسم واحد";
  if (n === 2) return "قسمان";
  if (n >= 3 && n <= 10) return `${n} أقسام`;
  return `${n} قسم`;
}

export function formatHoursCount(count) {
  const n = Math.abs(parseInt(count, 10)) || 0;
  if (n === 0) return "0 ساعة";
  if (n === 1) return "ساعة واحدة";
  if (n === 2) return "ساعتان";
  if (n >= 3 && n <= 10) return `${n} ساعات`;
  return `${n} ساعة`;
}

export function formatProjectsCount(count) {
  const n = Math.abs(parseInt(count, 10)) || 0;
  if (n === 0) return "0 مشروع";
  if (n === 1) return "مشروع واحد";
  if (n === 2) return "مشروعان";
  if (n >= 3 && n <= 10) return `${n} مشاريع`;
  return `${n} مشروع`;
}
