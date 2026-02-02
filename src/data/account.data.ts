import { accountmodel, IAccount } from "../models/account.model";

export interface queryoptions {
    customerid?: string;
    accounttype?: string;
    sortby?: string;
    order?: "asc" | "desc";
    page?: number;
    limit?: number;
}

export class accountdata {
    async findall(options: queryoptions = {}): Promise<{ accounts: IAccount[]; total: number }> {
        const { customerid, accounttype, sortby = "createdAt", order = "desc", page = 1, limit = 10 } = options;

        let query: Record<string, any> = {};

        if (customerid) {
            query.customerid = customerid;
        }

        if (accounttype) {
            query.accounttype = accounttype;
        }

        const total = await accountmodel.countDocuments(query);

        const accounts = await accountmodel
            .find(query)
            .populate("customerid")
            .sort({ [sortby]: order === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return { accounts, total };
    }

    async findbyid(id: string): Promise<IAccount | null> {
        return accountmodel.findById(id).populate("customerid");
    }

    async findbyaccountnumber(accountnumber: string): Promise<IAccount | null> {
        return accountmodel.findOne({ accountnumber });
    }

    async create(data: Partial<IAccount>): Promise<IAccount> {
        const acc = new accountmodel(data);
        return acc.save();
    }

    async update(id: string, data: Partial<IAccount>): Promise<IAccount | null> {
        return accountmodel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<IAccount | null> {
        return accountmodel.findByIdAndDelete(id);
    }
}
