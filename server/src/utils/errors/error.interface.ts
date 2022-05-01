export default interface IError {
    status: number,
    message: string,
    statusMessage?: string,
    isOperational?: boolean,
    stack?: string
    name?: string
}
