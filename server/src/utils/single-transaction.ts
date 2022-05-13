import { connection, ClientSession } from 'mongoose';


const singleTransaction = (
    fn: (session: ClientSession, ...args: any[]) => any
) => {
    return async (...args: any[]) => {
        const session = await connection.startSession();
        
        try {
            await session.startTransaction();
            const result = await fn(session, ...args);
            await session.commitTransaction();
            return result;
        } catch (err) {
            await session.abortTransaction();
            throw err;
        } finally {
            await session.endSession();
        }
    }
};

export default singleTransaction;
