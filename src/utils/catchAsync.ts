import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

export const catchAsync = (fn: RequestHandler) => {
  return async <T>(req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      // res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      //   success: false,
      //   statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      //   message: `Failed to ${name} user`,
      //   error: (error as Error).message,
      // });
      next(error);
    }
  };
};
