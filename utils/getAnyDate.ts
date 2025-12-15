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

export function getCurrentDatePlus8Days(date: Date = new Date()): string {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 8);
  return newDate.toISOString();
}

export function getCurrentDatePlusOneHour(date: Date = new Date()): string {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + 1);
  return newDate.toISOString();
}

export function getDatePlus7DaysAnd1Hour(date: Date = new Date()): string {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 7);
  newDate.setHours(newDate.getHours() + 1);
  return newDate.toISOString();
}

export function formatPayDate(isoString: Date): string {
    const date = new Date(isoString);
    const correctedDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));
    const hours = correctedDate.getHours().toString().padStart(2, '0');
    const minutes = correctedDate.getMinutes().toString().padStart(2, '0');
    const day = correctedDate.getDate().toString().padStart(2, '0');
    const month = (correctedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = correctedDate.getFullYear();
    
    return `${hours}:${minutes} ${day}.${month}.${year}`;
}