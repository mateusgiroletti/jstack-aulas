import { AuthenticationMiddleware } from "../server/middlewares/AuthenticationMiddleware";

export function makeAuthenticationMiddleware() {
    return new AuthenticationMiddleware();
}