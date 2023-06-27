import ContactMapper from "./mappers/ContactMapper";
import HttpClient from "./utils/HttpClient";

class ContactsService {
    constructor() {
        this.httpClient = new HttpClient("http://localhost:3001");
    }

    async listContacts(orderBy = "asc", signal) {
        const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`, { signal });

        return contacts.map((contact) => ContactMapper.toDomain(contact));
    }

    async getContactById(id, signal) {
        const contact = await this.httpClient.get(`/contacts/${id}`, { signal });

        return ContactMapper.toDomain(contact);
    }

    createContacts(contact) {
        const body = ContactMapper.toPersistence(contact);

        return this.httpClient.post("/contacts", {
            body
        });
    }

    updateContacts(id, contact) {
        const body = ContactMapper.toPersistence(contact);

        return this.httpClient.put(`/contacts/${id}`, {
            body
        });
    }

    deleteContact(id) {
        return this.httpClient.delete(`/contacts/${id}`);
    }
}

export default new ContactsService();