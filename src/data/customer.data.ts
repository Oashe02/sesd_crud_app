import { customermodel, ICustomer } from "../models/customer.model";

export interface queryoptions {
  search?: string;
  sortby?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export class custrepository {

  async findall(options: queryoptions = {}): Promise<{ customers: ICustomer[]; total: number }> {
    const { search, sortby = "createdAt", order = "desc", page = 1, limit = 10 } = options;

    let query: Record<string, any> = {};

    if (search) {
      query.email = search;
    }

    const total = await customermodel.countDocuments(query);

    const customers = await customermodel.find(query)
      .sort({ [sortby]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return { customers, total };
  }

  async findbyid(id: string): Promise<ICustomer | null> {
    return customermodel.findById(id);
  }

  async findbyemail(email: string): Promise<ICustomer | null> {
    return customermodel.findOne({ email });
  }

  async create(data: Partial<ICustomer>): Promise<ICustomer> {
    const cust = new customermodel(data);
    return cust.save();
  }

  async update(id: string, data: Partial<ICustomer>): Promise<ICustomer | null> {
    return customermodel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<ICustomer | null> {
    return customermodel.findByIdAndDelete(id);
  }
}
