export function getCurrentSplitDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

export function getCurrentSplitDatePlus7Days(date: Date = new Date()): string {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 7);
  return newDate.toISOString().split('T')[0];
}

export function getCurrentDate(date: Date = new Date()): string {
  return date.toISOString();
}

export function getCurrentDatePlus7Days(date: Date = new Date()): string {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 7);
  return newDate.toISOString();
}