import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validation/validateEnv';
import App from './app';

// Controllers
import CurrencyController from '@/resources/currency/currency.controller';
import ExchangeRateController from "@/resources/exchange-rate/exchange-rate.controller";
import UserController from '@/resources/user/user.controller';
import DishController from '@/resources/dish/dish.controller';
import OrderController from '@/resources/order/order.controller';
import ReviewController from '@/resources/review/review.controller';


validateEnv();

const app = new App(
    [
        new CurrencyController(),
        new ExchangeRateController(),
        new UserController(),
        new DishController(),
        new OrderController(),
        new ReviewController()
    ],
    Number(process.env.PORT)
);

app.listen();
