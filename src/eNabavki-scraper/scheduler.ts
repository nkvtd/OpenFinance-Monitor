import cron from 'node-cron';
import { getAwardedContracts} from './awarded-contracts';
import { getRealisedContracts } from './realised-contracts';

export async function runContracts(): Promise<void> {
    try {
        await getAwardedContracts();
        await getRealisedContracts();
    } catch (error) {
        console.error(error);
    }
}

cron.schedule('*/30 9-16 * * 1-5', runContracts);
cron.schedule('0 * * * *', runContracts);
runContracts();