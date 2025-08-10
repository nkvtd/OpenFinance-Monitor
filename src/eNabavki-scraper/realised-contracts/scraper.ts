import {scrape} from '../scraper';

export async function scrapeRealisedContracts(): Promise<any[]> {
    const typeContract = 'realized-contract';

    return await scrape(typeContract);
}