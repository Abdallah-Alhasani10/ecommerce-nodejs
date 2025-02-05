import express, { Request, Response, NextFunction, Application } from 'express';
import 'dotenv/config';
import appRouter from "./globals/router/appRouter";
import { CustomError, IError } from "./globals/middlware/error.middlware";

class Server {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start() {
        this.setMiddleware();
        this.setRouter();
        this.setGlobalError();
        this.startServer();
    }

    private setMiddleware() {
        this.app.use(express.json());
    }

    private setRouter() {
        appRouter(this.app);
    }

    private setGlobalError() {
        this.app.all('*', (req, res) => {
            res.status(404).json({
                message: `URL ${req.originalUrl} not found`
            });
        });
        
        this.app.use(((error: IError, req: Request, res: Response, next: NextFunction) => {
            if (error instanceof CustomError) {
                return res.status(error.statusCode).json({ message: error.message });
            }
            return res.status(500).json({ message: "Internal Server Error" });
        }) as unknown as express.ErrorRequestHandler);
    }

    private startServer() {
        const port = parseInt(process.env.PORT!) || 2000;

        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

export default Server;
