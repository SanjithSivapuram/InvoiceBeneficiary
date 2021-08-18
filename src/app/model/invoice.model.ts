import { Beneficiary } from "./beneficiary.model";

export class Invoice {
    id?: number;
    amount: number;
    applyDate: string;
    beneficiary?: Beneficiary;
}