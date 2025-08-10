export function parseDate(value: string): Date {
    const formatted = value.split('.').reverse().join('-');
    return new Date(formatted);
}