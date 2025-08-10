export interface AwardedContractRaw {
    numRequest: string,
    ContractingAuthority: string,
    matterContract: string,
    typeContract: string,
    typeProcedure: string,
    dateContracting: Date,
    Contractor: string,
    estimatedValue: number,
    assignedValue: number,
    datePublication: Date
}

export interface RealisedContractRaw {
    numRequest: string,
    ContractingAuthority: string,
    matterContract: string,
    typeContract: string,
    typeProcedure: string,
    Contractor: string,
    assignedValue: number,
    realisedValue: number,
    paidValue: number,
    datePublication: Date
}

export interface TreasuryTransactionRaw {
    date: Date,
    recipient: string,
    payer: string,
    payerAccount: string,
    payerCode: string,
    payerCodeValue: string,
    payerProgram: string,
    amount: number
}