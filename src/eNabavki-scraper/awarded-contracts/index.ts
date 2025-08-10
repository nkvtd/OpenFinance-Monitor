import type {AwardedContractRaw} from '../../shared/types';
import { scrapeAwardedContracts } from './scraper';
import { parseAwardedContracts } from './parser';

export async function getAwardedContracts(): Promise<void> {
    try {
        const rawData: any[] = await scrapeAwardedContracts();
        const parsedData: AwardedContractRaw[] = parseAwardedContracts(rawData);

        console.log(parsedData);
    } catch (error) {
         throw new Error('Error @ awarded contracts: ' + error);
    }
}