import type {AwardedContractRaw} from '../../shared/types';
import { scrapeAwardedContracts } from './scraper';
import { parseAwardedContracts } from './parser';
import { logger } from '../../shared/logger/logger';

export async function getAwardedContracts(): Promise<void> {
    try {
        const rawData: any[] = await scrapeAwardedContracts();
        const parsedData: AwardedContractRaw[] = parseAwardedContracts(rawData);

        logger.info(`Scraped ${parsedData.length} awarded contracts`);
    } catch (error) {
         throw new Error('Error @ awarded contracts: ' + error);
    }
}