import { Request, Response } from "express";

import ContactRepository from "../repositories/ContactRepository";

class ContactController {
    async index(request: Request, response: Response) {
        const { orderBy } = request.query;

        const contacts = await ContactRepository.findAll(String(orderBy));

        response.json(contacts);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const contact = await ContactRepository.findById(id);

        if (!contact) {
            return response.status(404).json({ error: "User not found!" });
        }

        return response.json(contact);
    }

    async store(request: Request, response: Response) {
        const { name, email, phone, categoryId } = request.body;

        if (!name) {
            return response.status(400).json({ error: "Name is required!" });
        }

        const contactExists = await ContactRepository.findByEmail(email);

        if (contactExists) {
            return response.status(400).json({ error: "This e-mail is already been taken" });
        }

        const contact = await ContactRepository.create({
            name, email, phone, categoryId
        });

        response.json(contact);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email, phone, categoryId } = request.body;

        const contactExists = await ContactRepository.findById(id);

        if (!contactExists) {
            return response.status(404).json({ error: "User not found" });
        }

        const contactByEmail = await ContactRepository.findByEmail(email);

        if (contactByEmail) {
            return response.status(400).json({ error: "This e-mail is already been taken" });
        }

        const contact = await ContactRepository.upadte(id, {
            name, email, phone, categoryId
        });

        response.json(contact);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const contact = await ContactRepository.findById(id);

        if (!contact) {
            return response.status(404).json({ error: "User not found!" });
        }

        await ContactRepository.delete(id);

        response.sendStatus(204);

    }
}

export default new ContactController();