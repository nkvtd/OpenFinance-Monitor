import type { TreasuryTransactionRaw } from '../shared/types';
import { parseName, getCodeValue } from '../shared/utils';

export function parseTransactions(rawData: any[]): TreasuryTransactionRaw[] {
    let parsedData: TreasuryTransactionRaw[] = [];

    rawData.forEach((item) => {
        parsedData.push(<TreasuryTransactionRaw>{
            date: new Date(item.data_valuta),
            recipient: parseName(item.naziv_primac),
            payer: parseName(item.naziv_davac),
            payerAccount: item.smetka_davac,
            payerCode: item.ec_code_davac,
            payerCodeValue: getCodeValue(item.ec_code_davac),
            payerProgram: item.bu_program_davac,
            amount: parseFloat(item.iznos)
        });
    });

    return parsedData;
}
