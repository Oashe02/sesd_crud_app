import { ICustomer } from "../models/customer.model";
import { custrepository, queryoptions } from "../data/customer.data";

export class customerservice {
  private custrepo: custrepository;

  constructor() {
    this.custrepo = new custrepository();
  }

  async getallcust(options: queryoptions) {
    return this.custrepo.findall(options);
  }

  async getcustbyid(id: string) {
    const cust = await this.custrepo.findbyid(id);
    if (!cust) {
      throw new Error("Customer not found");
    }
    return cust;
  }

  async createcust(data: Partial<ICustomer>) {
    const existing = await this.custrepo.findbyemail(data.email!);
    if (existing) {
      throw new Error("Customer with this email already exists");
    }
    return this.custrepo.create(data);
  }

  async updatecust(id: string, data: Partial<ICustomer>) {
    if (data.email) {
      const existing = await this.custrepo.findbyemail(data.email);
      if (existing && existing._id.toString() !== id) {
        throw new Error("Another customer with this email already exists");
      }
    }
    const cust = await this.custrepo.update(id, data);
    if (!cust) {
      throw new Error("Customer not found");
    }
    return cust;
  }

  async deletecust(id: string) {
    const cust = await this.custrepo.delete(id);
    if (!cust) {
      throw new Error("Customer not found");
    }
    return cust;
  }
}
