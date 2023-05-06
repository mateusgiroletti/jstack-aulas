import { delay } from "../utils/helpers";

class ContactsService {
    async listContacts(orderBy = "asc") {
        const response = await fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`);
        await delay();

        return await response.json();
    }
}

export default new ContactsService();