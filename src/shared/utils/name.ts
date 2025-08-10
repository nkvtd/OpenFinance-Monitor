export function parseName(value: string): string {
    return value.trim().replaceAll('&quot;', '"');
}