import {cleanEnv, num, port, str} from 'envalid';


const validateEnv = () => {
    cleanEnv(process.env, {
        // Server settings
        API_VERSION: str(),
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        PORT: port({default: 3000}),

        // Mongo database settings
        MONGO_PATH: str(),
        MONGO_USER: str(),
        MONGO_PASSWORD: str(),

        // JWT token settings
        JWT_SECRET: str(),
        JWT_EXPIRES_IN: num(),
        JWT_COOKIE_EXPIRES_IN: num(),

        // Reset password settings
        PASSWORD_RESET_TOKEN_EXPIRES_IN: num(), // seconds
        EMAIL_USERNAME: str(),
        EMAIL_PASSWORD: str(),
        EMAIL_HOST: str(),
        EMAIL_PORT: num()
    });
}


export default validateEnv;
