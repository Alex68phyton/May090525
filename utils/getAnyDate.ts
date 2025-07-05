export function getCurrentSplitDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

export function getCurrentSplitDatePlus7Days(): string {
  const currentDateStr = getCurrentSplitDate(); 
  const date = new Date(currentDateStr + "T00:00:00Z");
  date.setDate(date.getDate() + 7);
  return getCurrentSplitDate(date);
}

export function getCurrentDate(date: Date = new Date()): string {
  return date.toISOString();
}

export function getCurrentDatePlus7Days(): string {
  const currentDateStr = getCurrentSplitDate(); 
  const date = new Date(currentDateStr + "T00:00:00Z");
  date.setDate(date.getDate() + 7);
  return getCurrentDate(date);
}