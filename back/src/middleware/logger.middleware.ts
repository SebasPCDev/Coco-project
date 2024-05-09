import { NextFunction, Request, Response } from 'express';
import * as moment from 'moment';

//Logger Global
export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const date = moment().format('dddd, D MMMM YYYY, h:mm:ss a');
  console.log(
    `[Global Middleware Logger] \nHTTP Request: ${req.method}\nPath: ${req.url}\nDate: ${date} \n--------------------`,
  );
  next();
}
