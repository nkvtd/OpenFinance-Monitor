import cron from 'node-cron';
import { getTransactions } from "./index";

export async function runTransactions(): Promise<void> {
    try {
        await getTransactions();
    } catch (error) {
        console.error(error);
    }
}

cron.schedule('*/30 9-16 * * 1-5', runTransactions);
cron.schedule('0 * * * *', runTransactions);
runTransactions();