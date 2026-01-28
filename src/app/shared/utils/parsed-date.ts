export function parseDate(date: string): string {
    return new Date(date).toISOString().split('T')[0];
}

export function isPast(date: Date): boolean {
    return date.getTime() < Date.now();
}
