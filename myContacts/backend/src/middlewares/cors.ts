import { Request, Response, NextFunction } from "express";

export default (request: Request, response: Response, next: NextFunction) => {
    response.setHeader("Access-Control-Allow-Origin", "http://localhostL3000");
    next();
};