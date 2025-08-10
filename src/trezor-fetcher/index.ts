import type { TreasuryTransactionRaw } from '../shared/types';
import { fetchTransactions } from './fetcher';
import { parseTransactions } from './parser';

export async function getTransactions(): Promise<void> {
    try {
        const rawData: any[] = await fetchTransactions();
        const parsedData: TreasuryTransactionRaw[] = parseTransactions(rawData);

        console.log(parsedData);
    } catch (error) {
        throw new Error("Error @ transactions: " + error);
    }
}