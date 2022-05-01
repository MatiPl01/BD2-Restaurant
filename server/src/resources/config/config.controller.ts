import { Request, Router } from "express";
import ConfigService from "./config.service";
import Controller from "@/utils/interfaces/controller.interface";
import catchAsync from "@/utils/errors/catch-async";


class ConfigController implements Controller {
    public readonly PATH = 'orders';
    public readonly router = Router();
    private readonly configService = new ConfigService();

    constructor() {

    }

    private initializeRoutes(): void {

    }
}


export default ConfigController;
