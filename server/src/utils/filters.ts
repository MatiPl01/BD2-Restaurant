import { ClientSession } from 'mongoose';
import AppError from './errors/app.error';
import currency from '@/utils/currency';


type Filters = { [key: string]: any };

export const updatePriceFilters = async (
    filters: Filters,
    targetCurrency?: string,
    session?: ClientSession
): Promise<Filters> => {
    if (filters.unitPrice) {
        if (!targetCurrency) {
            throw new AppError(400, 'Unit price filtering is not allowed without specified currency');
        }

        const mainUnitPrice: { [key: string]: number } = {};

        if (filters.unitPrice) {
            for (const [key, value] of Object.entries(filters.unitPrice)) {
                mainUnitPrice[key] = await currency.exchangeToMainCurrency(
                    value as number, 
                    targetCurrency, 
                    session
                );
            }
        }

        const updatedFilters: { [key: string]: object } = {
            ...filters,
            mainUnitPrice
        }
        delete updatedFilters.unitPrice;

        return updatedFilters;
    }

    return { ...filters };
};
