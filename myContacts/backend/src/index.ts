import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import router from "./routes";

const app = express();

app.use(express.json());
app.use(router);
app.use((error: ErrorRequestHandler, request: Request, response: Response, next: NextFunction) => {
    console.error(error);
    response.status(500).send("Something broke!");
});

app.listen(3000);