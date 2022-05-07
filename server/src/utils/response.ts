import { CookieOptions, Response } from 'express';


const getStatus = (
  statusCode: number
): string => {
  switch (Math.floor(statusCode / 100)) {
    case 1:
      return 'information';
    case 2:
      return 'success';
    case 3:
      return 'redirection';
    case 4:
      return 'client error';
    case 5:
      return 'server error';
    default:
      return 'unrecognized';
  }
}

const json = async (
  res: Response,
  statusCode: number,
  data: any
): Promise<Response> => {
  return res.status(statusCode).json({
    status: getStatus(statusCode),
    data
  })
}

const cookie = async (
  res: Response,
  name: string,
  val: string,
  options: CookieOptions
): Promise<Response> => {
  return res.cookie(name, val, options);
}


export default {
  json,
  cookie
};
