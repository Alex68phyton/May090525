export function getCurrentDate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}
