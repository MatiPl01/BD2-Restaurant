export default interface IError {
    // Default error properties
    status: number;
    message: string;
    stack?: string;

    // AppError properties
    statusMessage?: string;
    isOperational?: boolean;

    // MongoDB error properties
    name?: string;
    path?: string;
    value?: string;
    code?: number;
    keyPattern?: { [key: string]: number };
    keyValue?: { [key: string]: number };
    errors?: IError[];
};
