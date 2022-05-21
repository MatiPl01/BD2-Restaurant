import jwt from 'jsonwebtoken';

import Token from '@/utils/interfaces/token.interface';

import User from '@/resources/user/interfaces/user.interface';


const create = (user: User): string => {
    const {JWT_SECRET, JWT_EXPIRES_IN} = process.env;

    return jwt.sign({id: user._id}, JWT_SECRET as jwt.Secret, {
        expiresIn: JWT_EXPIRES_IN
    });
};

const verify = async (
    token: string
): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);

                resolve(payload as Token);
            }
        );
    });
};


export default {
    create,
    verify
};
