import {scrape} from '../scraper';

export async function scrapeAwardedContracts(): Promise<any[]> {
    const typeContract = 'notifications-for-acpp';

    return await scrape(typeContract);
}