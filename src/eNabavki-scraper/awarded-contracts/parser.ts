import type {AwardedContractRaw} from '../../shared/types';
import { parseDate, parseCurrency } from '../../shared/utils';

export function parseAwardedContracts(rawData: any[]): AwardedContractRaw[] {
    return rawData.map((item) => {
        return {
            numRequest: item[0],
            ContractingAuthority: item[1],
            matterContract: item[2],
            typeContract: item[3],
            typeProcedure: item[4],
            dateContracting: parseDate(item[5]),
            Contractor: item[6],
            estimatedValue: parseCurrency(item[7]),
            assignedValue: parseCurrency(item[8]),
            datePublication: parseDate(item[9]),
        };
    });
}