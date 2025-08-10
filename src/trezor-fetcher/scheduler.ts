import cron from 'node-cron';
import { getTransactions } from "./index";
import { logger } from '../shared/logger/logger';

export async function runTransactions(): Promise<void> {
    try {
        await getTransactions();
    } catch (error) {
        logger.error(error);
    }
}

cron.schedule('*/30 9-16 * * 1-5', runTransactions);
cron.schedule('0 * * * *', runTransactions);
runTransactions();