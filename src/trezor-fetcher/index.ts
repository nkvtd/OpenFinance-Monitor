import type { TreasuryTransactionRaw } from '../shared/types';
import { fetchTransactions } from './fetcher';
import { parseTransactions } from './parser';
import { logger } from '../shared/logger/logger';

export async function getTransactions(): Promise<void> {
    try {
        const rawData: any[] = await fetchTransactions();
        const parsedData: TreasuryTransactionRaw[] = parseTransactions(rawData);

        logger.info(`Fetched ${parsedData.length} transactions`);
    } catch (error) {
        throw new Error("Error @ transactions: " + error);
    }
}