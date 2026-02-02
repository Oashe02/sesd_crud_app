import { Request, Response } from "express";
import { accountservice } from "../services/account.service";

export class accountcontroller {
    private accservice: accountservice;

    constructor() {
        this.accservice = new accountservice();
    }

    getall = async (req: Request, res: Response): Promise<void> => {
        try {
            const options = {
                customerid: req.query.customerid as string,
                accounttype: req.query.accounttype as string,
                sortby: req.query.sortby as string,
                order: req.query.order as "asc" | "desc",
                page: parseInt(req.query.page as string) || 1,
                limit: parseInt(req.query.limit as string) || 10,
            };

            const { accounts, total } = await this.accservice.getallaccounts(options);

            res.status(200).json({
                data: accounts,
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

    getbyid = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const acc = await this.accservice.getaccountbyid(id);
            res.status(200).json({ data: acc });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const acc = await this.accservice.createaccount(req.body);
            res.status(201).json({ data: acc });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const acc = await this.accservice.updateaccount(id, req.body);
            res.status(200).json({ data: acc });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            await this.accservice.deleteaccount(id);
            res.status(200).json({ message: "Account deleted" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}
