// @ts-nocheck
export function parseCurrency(value: string): number {
    return value.split(/[^\d.,-]/)[0].lastIndexOf(',') > value.split(/[^\d.,-]/)[0].lastIndexOf('.') ?
        parseFloat(value.split(/[^\d.,-]/)[0].replace(/\./g, '').replace(',', '.')) :
        parseFloat(value.split(/[^\d.,-]/)[0].replace(/,/g, ''));
}