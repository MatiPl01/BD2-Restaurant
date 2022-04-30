import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';

// Controllers
import CurrencyController from '@/resources/currency/currency.controller';
import ExchangeRateController from "@/resources/exchange-rate/exchange-rate.controller";
import UserController from '@/resources/user/user.controller';


validateEnv();

const app = new App(
    [
        new CurrencyController(),
        new ExchangeRateController(),
        new UserController()
    ],
    Number(process.env.PORT)
);

app.listen();
