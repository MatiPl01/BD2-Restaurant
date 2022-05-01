import AppError from "./app.error";
import IError from "./error.interface";


const handleCastError = (error: IError): AppError => {
    return new AppError(500, error.message);
}


export default {
    handleCastError
};
