// TODO - maybe finish this later

// import { Request, Response } from 'express';
// import { ClientSession } from 'mongoose';

// import catchAsync from '@/utils/errors/catch-async';
// import AppError from '@/utils//errors/app.error';
// import response from '@/utils/response';


// // TODO - maybe replace any wth some better type
// const deleteOne = (
//     Model: any,
//     deleteKey: string = 'id',
//     session?: ClientSession
// ) => catchAsync(async (
//     req: Request,
//     res: Response
// ): Promise<void> => {
//     const deleteValue = req.params[deleteKey];
    
//     let document;
//     if (session) document = Model.deleteOne({ [deleteKey]: deleteValue }).session(session);
//     else document = Model.deleteOne({ [deleteKey]: deleteValue });

//     if (!document) throw new AppError(404, `Cannot find document with ${deleteKey} equal to ${deleteValue}`);

//     await response.json(res, 200, document);
// });


// export default {
//     deleteOne
// }
