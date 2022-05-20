import { ClientSession } from 'mongoose';

import currency from '@/utils/currency';

import AppError from './errors/app.error';


type Filters = { [key: string]: any };

export const asyncFilter = async <T>(
    arr: T[], predicate: (value: T) => Promise<boolean>
): Promise<T[]> => {
    const filterMask = await Promise.all(arr.map(predicate));
    return arr.filter((_: T, idx: number) => filterMask[idx]);
};

export const updatePriceFilters = async (
    filters: Filters,
    fromCurrency?: string,
    session?: ClientSession
): Promise<Filters> => {
    if (filters.unitPrice || filters.totalPrice) {
        if (!fromCurrency) {
            throw new AppError(400, 'Price filtering is not allowed without specified currency');
        }

        const updatedFilters: { [key: string]: number } = { ...filters };

        if (filters.unitPrice) {
            const mainUnitPrice = await getUpdatedPriceFilters(filters.unitPrice, fromCurrency, session);
            delete updatedFilters.unitPrice;
            Object.assign(updatedFilters, { mainUnitPrice });
        }

        if (filters.totalPrice) {
            const mainTotalPrice = await getUpdatedPriceFilters(filters.totalPrice, fromCurrency, session);
            delete updatedFilters.totalPrice;
            Object.assign(updatedFilters, { mainTotalPrice });
        }

        return updatedFilters;
    }

    return { ...filters };
};

const getUpdatedPriceFilters = async (
    priceFilters: { [key: string]: number },
    fromCurrency: string,
    session?: ClientSession
): Promise<{ [key: string]: number }> => {
    const updatedFilters: { [key: string]: number } = {};

    for (const [key, value] of Object.entries(priceFilters)) {
        updatedFilters[key] = await currency.exchangeToMainCurrency(
            value as number,
            fromCurrency,
            session
        );
    }

    return updatedFilters;
};
