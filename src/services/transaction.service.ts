import { ITransaction } from "../models/transaction.model";
import { transactiondata, queryoptions } from "../data/transaction.data";

export class transactionservice {
    private txndata: transactiondata;

    constructor() {
        this.txndata = new transactiondata();
    }

    async getalltransactions(options: queryoptions): Promise<{ transactions: ITransaction[]; total: number }> {
        return this.txndata.findall(options);
    }

    async gettransactionbyid(id: string): Promise<ITransaction> {
        const txn = await this.txndata.findbyid(id);
        if (!txn) {
            throw new Error("Transaction nahi mila");
        }
        return txn;
    }

    async createtransaction(data: Partial<ITransaction>): Promise<ITransaction> {
        return this.txndata.create(data);
    }

    async deletetransaction(id: string): Promise<void> {
        const txn = await this.txndata.delete(id);
        if (!txn) {
            throw new Error("Transaction nahi mila");
        }
    }
}
