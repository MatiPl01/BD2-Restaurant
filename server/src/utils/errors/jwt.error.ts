import AppError from './app.error';


const handleJWTError = (): AppError => {
    return new AppError(401, 'Invalid token! Please log in again.');
};

const handleTokenExpired = (): AppError => {
    return new AppError(401, 'Your token has expired! Please log in again.');
};


export default {
    handleJWTError,
    handleTokenExpired
};
