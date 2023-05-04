import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export default (error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) => {
    response.status(500).send("Something broke!");
};