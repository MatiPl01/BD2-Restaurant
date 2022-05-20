import IError from '@/utils/interfaces/error.interface';

import WithProperty from './with-property.type';
import AppError from './app.error';


const handleCastError = (error: IError): AppError => {
    return new AppError(400, `Invalid ${error.path}: ${error.value}`);
}

const handleDuplicateField = (error: IError): AppError => {
    const err = error as WithProperty<IError, 'keyPattern'>;
    const value = Object.keys(err.keyPattern)[0];
    return new AppError(400, `Duplicate value for field: ${value}. Pleas use another value!`);
}

const handleValidationError = (error: IError): AppError => {
    const err = error as WithProperty<IError, 'errors'>;
    const errors = Object.values(err.errors).map((err: IError) => err.message);
    const message = `Invalid input data:\n${errors.join('\n')}`;
    return new AppError(400, message);
}


export default {
    handleCastError,
    handleDuplicateField,
    handleValidationError
};
