import HttpException from "@/utils/exceptions/http.exception";

const createException = (status: number, error: unknown): HttpException => {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    return new HttpException(status, message);
}

export default createException;
