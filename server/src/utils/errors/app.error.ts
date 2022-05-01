import IError from "@/utils/interfaces/error.interface";


class AppError extends Error implements IError {
    public readonly statusMessage: string;
    public readonly status: number;
    public readonly isOperational: boolean;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.statusMessage = String(status).startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this);
    }
}


export default AppError;
