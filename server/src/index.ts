import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validation/validateEnv';
import App from './app';

// Controllers
import CurrencyController from '@/resources/currency/currency.controller';
import DishController from '@/resources/dish/dish.controller';
import ExchangeRateController from "@/resources/exchange-rate/exchange-rate.controller";
import OrderController from '@/resources/order/order.controller';
import ReviewController from '@/resources/review/review.controller';
import UserController from '@/resources/user/user.controller';
import ConfigController from "@/resources/config/config.controller";


validateEnv();

const app = new App(
    [
        new CurrencyController(),
        new DishController(),
        new ExchangeRateController(),
        new ConfigController(),
        new OrderController(),
        new ReviewController(),
        new UserController()
    ],
    Number(process.env.PORT)
);

app.listen();
