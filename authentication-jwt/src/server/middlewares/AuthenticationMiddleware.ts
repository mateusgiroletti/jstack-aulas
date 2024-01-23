import { verify } from "jsonwebtoken";

import {
    IData,
    IMiddleware,
    IRequest,
    IResponse,
} from "../../application/interfaces/IMiddleware";
import { env } from "../../application/config/env";

export class AuthenticationMiddleware implements IMiddleware {
    async handle({ headers }: IRequest): Promise<IResponse | IData> {
        const { authorization } = headers;

        if (!authorization) {
            return {
                statusCode: 401,
                body: {
                    error: "Invalid access token.",
                },
            };
        }

        try {
            const [type, token] = authorization.split(" ");

            if (type !== "Bearer") {
                throw new Error();
            }

            const payload = verify(token, env.jwtSecret);

            return {
                data: {
                    accountId: payload.sub,
                },
            };
        } catch {
            return {
                statusCode: 401,
                body: {
                    error: "Invalid access token.",
                },
            };
        }
    }
}