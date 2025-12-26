export const calculateScore = (tasks) => {
  if (!tasks || tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const partial = tasks.filter(t => t.status === 'partial').length;
  // Full = 1.0, Partial = 0.5
  return ((completed * 1.0) + (partial * 0.5)) / tasks.length * 100;
};

export const getBadge = (score) => {
  if (score === 100) return { label: "GOLD", icon: "🎖️", color: "text-amber-500", bg: "bg-amber-50" };
  if (score >= 67) return { label: "SILVER", icon: "🥈", color: "text-slate-400", bg: "bg-slate-50" };
  if (score >= 50) return { label: "BRONZE", icon: "🥉", color: "text-orange-400", bg: "bg-orange-50" };
  return null;
};