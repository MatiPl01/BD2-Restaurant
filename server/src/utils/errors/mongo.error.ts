import AppError from "./app.error";
import IError from "./error.interface";


type WithRequiredProperty<Type, Key extends keyof Type> = Type & {
    [Property in Key]-?: Type[Property];
};

const handleCastError = (error: IError): AppError => {
    return new AppError(400, `Invalid ${error.path}: ${error.value}`);
}

const handleDuplicateField = (error: IError): AppError => {
    const err = error as WithRequiredProperty<IError, 'keyPattern'>;
    const value = Object.keys(err.keyPattern)[0];
    return new AppError(400, `Duplicate value for field: ${value}. Pleas use another value!`);
}


export default {
    handleCastError,
    handleDuplicateField
};
