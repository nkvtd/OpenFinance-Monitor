import type {RealisedContractRaw} from '../../shared/types';
import { scrapeRealisedContracts } from './scraper';
import { parseRealisedContracts } from './parser';
import { logger } from '../../shared/logger/logger';


export async function getRealisedContracts(): Promise<void> {
    try {
        const rawData: any[] = await scrapeRealisedContracts();
        const parsedData: RealisedContractRaw[] = parseRealisedContracts(rawData);

        logger.info(`Scraped ${parsedData.length} realised contracts`);
    } catch (error) {
        throw new Error('Error @ realised contracts: ' + error);
    }
}