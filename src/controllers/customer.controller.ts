import { Request, Response } from "express";
import { customerservice } from "../services/customer.service";

export class custcontroller {
  private custservice: customerservice;

  constructor() {
    this.custservice = new customerservice();
  }

  getallcust = async (req: Request, res: Response) => {
    try {
      const { search, sortby, order, page, limit } = req.query;

      const options = {
        search: search as string,
        sortby: sortby as string,
        order: order as "asc" | "desc",
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 10,
      };

      const { customers, total } = await this.custservice.getallcust(options);

      res.status(200).json({
        data: customers,
        pagination: {
          page: options.page,
          limit: options.limit,
          total,
          totalpages: Math.ceil(total / options.limit),
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  getcustbyid = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const cust = await this.custservice.getcustbyid(id);
      res.status(200).json({ data: cust });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  };

  createcust = async (req: Request, res: Response) => {
    try {
      const cust = await this.custservice.createcust(req.body);
      res.status(201).json({ data: cust });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  updatecust = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const cust = await this.custservice.updatecust(id, req.body);
      res.status(200).json({ data: cust });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  deletecust = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      await this.custservice.deletecust(id);
      res.status(200).json({ message: "Customer deleted" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };
}
