import { transactionmodel, ITransaction } from "../models/transaction.model";

export interface queryoptions {
    accountid?: string;
    type?: string;
    page?: number;
    limit?: number;
}

export class transactiondata {
    async findall(options: queryoptions = {}): Promise<{ transactions: ITransaction[]; total: number }> {
        const { accountid, type, page = 1, limit = 10 } = options;

        let query: Record<string, any> = {};

        if (accountid) {
            query.accountid = accountid;
        }

        if (type) {
            query.type = type;
        }

        const total = await transactionmodel.countDocuments(query);

        const transactions = await transactionmodel
            .find(query)
            .populate("accountid")
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return { transactions, total };
    }

    async findbyid(id: string): Promise<ITransaction | null> {
        return transactionmodel.findById(id).populate("accountid");
    }

    async create(data: Partial<ITransaction>): Promise<ITransaction> {
        const txn = new transactionmodel(data);
        return txn.save();
    }

    async delete(id: string): Promise<ITransaction | null> {
        return transactionmodel.findByIdAndDelete(id);
    }
}
