import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import CurrenciesController from '@/resources/currencies/currencies.controller';
import UserController from '@/resources/user/user.controller';
import ExchangeRateController from "@/resources/exchangeRates/exchangeRate.controller";

validateEnv();

const app = new App(
    [new CurrenciesController(), new UserController(),new ExchangeRateController()],
    Number(process.env.PORT)
);

app.listen();
