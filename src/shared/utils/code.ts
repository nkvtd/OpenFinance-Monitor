import codes from '../data/treasuryCodes.json' assert { type: 'json' };

export function getCodeValue(code: string): string | unknown {
    return (codes as Record<string, string | unknown>)[code];
}