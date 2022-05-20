import User from '@/resources/user/user.interface';


declare global {
    namespace Express {
        export interface Request {
            user: User;
            filters: { [key: string]: number },
            fields: { [key: string]: number }
        }
    }
}
