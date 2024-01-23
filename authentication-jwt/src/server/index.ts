import express from "express";

import { routeAdapter } from "./adapters/routeAdapter";

import { makeSignUpController } from "../factories/makeSignUpController";
import { makeSignInController } from "../factories/makeSignInController";
import { makeListLeadsController } from "../factories/makeListLeadsController";
import { middlewareAdapter } from "./adapters/middlewareAdapter";
import { makeAuthenticationMiddleware } from "../factories/makeAuthenticationMiddleware";

const app = express();

app.use(express.json());

const PORT = 3003;

app.post("/sign-up", routeAdapter(makeSignUpController()));
app.post("/sign-in", routeAdapter(makeSignInController()));

app.get(
    "/leads",
    middlewareAdapter(makeAuthenticationMiddleware()),
    routeAdapter(makeListLeadsController())
);

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
});