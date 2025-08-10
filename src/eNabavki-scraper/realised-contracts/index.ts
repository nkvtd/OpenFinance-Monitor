import type {RealisedContractRaw} from '../../shared/types';
import { scrapeRealisedContracts } from './scraper';
import { parseRealisedContracts } from './parser';

export async function getRealisedContracts(): Promise<void> {
    try {
        const rawData: any[] = await scrapeRealisedContracts();
        const parsedData: RealisedContractRaw[] = parseRealisedContracts(rawData);

        console.log(parsedData);
    } catch (error) {
        throw new Error('Error @ realised contracts: ' + error);
    }
}