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
    private static readonly API_VERSION = 'v1';
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        App.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeUnhandledRoute();
        this.initializeErrorHandling();
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
            console.log('Database was successfully connected')
        }).catch(err => {
            console.error(err);
            // TODO - handle connection error (e.g. send error message to the front-end app)
        });
    }

    private initializeUnhandledRoute(): void {
        this.express.all('*', (req: Request, res: Response, next: NextFunction) => {
            next(new AppError(404, `Cannot find ${req.url} on this server`));
        });
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}


export default App;
