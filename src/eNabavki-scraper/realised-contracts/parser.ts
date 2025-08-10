import type {RealisedContractRaw} from '../../shared/types';
import { parseDate, parseCurrency } from '../../shared/utils';

export function parseRealisedContracts(rawData: any[]): RealisedContractRaw[] {
    return rawData.map((item) => {
        return {
            numRequest: item[0],
            ContractingAuthority: item[1],
            matterContract: item[2],
            typeContract: item[3],
            typeProcedure: item[4],
            Contractor: item[5],
            assignedValue: parseCurrency(item[6]),
            realisedValue: parseCurrency(item[7]),
            paidValue: parseCurrency(item[8]),
            datePublication: parseDate(item[9]),
        };
    });
}