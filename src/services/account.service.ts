import { IAccount } from "../models/account.model";
import { accountdata, queryoptions } from "../data/account.data";

export class accountservice {
    private accdata: accountdata;

    constructor() {
        this.accdata = new accountdata();
    }

    async getallaccounts(options: queryoptions): Promise<{ accounts: IAccount[]; total: number }> {
        return this.accdata.findall(options);
    }

    async getaccountbyid(id: string): Promise<IAccount> {
        const acc = await this.accdata.findbyid(id);
        if (!acc) {
            throw new Error("Account nahi mila");
        }
        return acc;
    }

    async createaccount(data: Partial<IAccount>): Promise<IAccount> {
        const existing = await this.accdata.findbyaccountnumber(data.accountnumber as string);
        if (existing) {
            throw new Error("Account number already exists");
        }
        return this.accdata.create(data);
    }

    async updateaccount(id: string, data: Partial<IAccount>): Promise<IAccount> {
        const acc = await this.accdata.update(id, data);
        if (!acc) {
            throw new Error("Account nahi mila");
        }
        return acc;
    }

    async deleteaccount(id: string): Promise<void> {
        const acc = await this.accdata.delete(id);
        if (!acc) {
            throw new Error("Account nahi mila");
        }
    }
}
