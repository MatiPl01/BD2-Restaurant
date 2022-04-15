import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import CurrenciesController from '@/resources/currency/currency.controller';
import UserController from '@/resources/user/user.controller';


validateEnv();

const app = new App(
    [
        new CurrenciesController(), 
        new UserController()
    ],
    Number(process.env.PORT)
);

app.listen();
