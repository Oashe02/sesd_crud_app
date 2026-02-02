import { Request, Response } from "express";
import { transactionservice } from "../services/transaction.service";

export class transactioncontroller {
    private txnservice: transactionservice;

    constructor() {
        this.txnservice = new transactionservice();
    }

    getall = async (req: Request, res: Response): Promise<void> => {
        try {
            const options = {
                accountid: req.query.accountid as string,
                type: req.query.type as string,
                page: parseInt(req.query.page as string) || 1,
                limit: parseInt(req.query.limit as string) || 10,
            };

            const { transactions, total } = await this.txnservice.getalltransactions(options);

            res.status(200).json({
                data: transactions,
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
            const txn = await this.txnservice.gettransactionbyid(id);
            res.status(200).json({ data: txn });
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    };

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const txn = await this.txnservice.createtransaction(req.body);
            res.status(201).json({ data: txn });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            await this.txnservice.deletetransaction(id);
            res.status(200).json({ message: "Transaction deleted" });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}
