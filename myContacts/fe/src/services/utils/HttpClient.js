import APIError from "../../errors/APIError";
import { delay } from "../../utils/helpers";

class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(path, options) {
        return this.makeRequest(path, {
            method: "GET",
            headers: options?.headers
        });
    }

    async post(path, options = {}) {
        return this.makeRequest(path, {
            method: "POST",
            body: options?.body,
            headers: options?.headers
        });
    }

    async makeRequest(path, options) {
        await delay();

        const headers = new Headers();

        if (options.body) {
            headers.append({
                "Content-Type": "application/json"
            });
        }

        if (options.headers) {
            /* Object.keys(options.headers).forEach((name) => {
                headers.append(name, options.headers[name]);
            }); */

            Object.entries(options.headers).forEach(([name, value]) => {
                headers.append(name, value);
            });
        }

        const response = await fetch(`${this.baseURL}${path}`, {
            method: options.method,
            body: options.body,
            headers
        });

        let responseBody = null;
        const contentType = response.headers.get("Content-Type");

        if (contentType.includes("application/json")) {
            responseBody = await response.json();
        }

        if (response.ok) {
            return responseBody;
        }

        throw new APIError(response, responseBody);
    }
}

export default HttpClient;