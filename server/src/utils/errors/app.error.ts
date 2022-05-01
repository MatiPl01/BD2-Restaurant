import IError from "@/utils/errors/error.interface";


class AppError extends Error implements IError {
    public readonly statusMessage: string;
    public readonly status: number;
    private _isOperational: boolean;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.statusMessage = String(status).startsWith('4') ? 'fail' : 'error';
        this._isOperational = true;

        Error.captureStackTrace(this);
    }

    get isOperational(): boolean {
        return this._isOperational;
    }

    /* public static fromError(error: AppError | unknown): AppError {
        if ((error as AppError)._isOperational) return error as AppError;
        
        const err = (error as IError);
        const appError = new AppError(
            err.status || 500,
            err.message || 'Something unexpected has happened'
        )
        appError.stack = err.stack;
        appError._isOperational = false;
        return appError;
    } */
}


export default AppError;
