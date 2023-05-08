import { delay } from "../../utils/helpers";

class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(path) {
        await delay();

        const response = await fetch(`${this.baseURL}${path}`);

        if(response.ok){
            return response.json();
        }

        throw new Error(`${response.status} - ${response.statusText}`);
    }
}

export default HttpClient;