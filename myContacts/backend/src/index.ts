import express from "express";
import router from "./routes";
import cors from "./middlewares/cors";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(cors);
app.use(router);
app.use(errorHandler);

app.listen(3001);