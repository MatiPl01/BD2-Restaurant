import express, { Application, Request, Response, NextFunction } from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

import ErrorMiddleware from '@/middleware/error.middleware';
import Controller from '@/utils/interfaces/controller.interface';
import AppError from '@/utils/errors/app.error';


class App {
    private static readonly API_VERSION = process.env.API_VERSION || 'v1';
    public readonly express: Application;
    public readonly port: number;
    private server: any;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeUnhandledRejection();
        this.initializeUncaughtException();
        App.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeUnhandledRoute();
        this.initializeErrorHandling();
    }

    public listen(): void {
        this.server = this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use(`/api/${App.API_VERSION}/${controller.PATH}`, controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private static initializeDatabaseConnection(): void {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

        mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`
        ).then(() => {
            console.log('🚀 Database was successfully connected')
        });
    }

    private initializeUnhandledRoute(): void {
        this.express.all('*', (req: Request, res: Response, next: NextFunction) => {
            next(new AppError(404, `Cannot find ${req.url} on this server`));
        });
    }

    private initializeUnhandledRejection(): void {
        process.on('unhandledRejection', (error: Error) => {
            this.exitWithError(error, '⚠️ UNHANDLED REJECTION!');
        });
    }

    private initializeUncaughtException(): void {
        process.on('uncaughtException', (error: Error) => {
            this.exitWithError(error, '⚠️ UNCAUGHT EXCEPTION!');
        });
    }

    private exitWithError(error: Error, message: string): void {
        console.log(`${message} Shutting down the server...`);
        console.error(error.name, error.message);

        if (this.server) this.server.close(App.exit);
        else App.exit();
    }

    private static exit(): void {
        console.log('👋 The server has been shut down. Goodbye!');
        process.exit(1);
    }
}


export default App;
