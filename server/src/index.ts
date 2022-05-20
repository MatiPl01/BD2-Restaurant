import 'dotenv/config';
import 'module-alias/register';

import validateEnv from '@/utils/validation/validateEnv';

import configController from '@/resources/config/config.controller';
import currencyController from '@/resources/currency/currency.controller';
import dishController from '@/resources/dish/dish.controller';
import exchangeRateController from '@/resources/exchange-rate/exchange-rate.controller';
import orderController from '@/resources/order/order.controller';
import reviewController from '@/resources/review/review.controller';
import userController from '@/resources/user/user.controller';

import App from './app';

validateEnv();

const app = new App(
    [
        currencyController,
        dishController,
        exchangeRateController,
        configController,
        orderController,
        reviewController,
        userController
    ],
    Number(process.env.PORT)
);

app.listen();
