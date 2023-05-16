import { Request, Response } from "express";

import ContactRepository from "../repositories/ContactRepository";
import isValidUUID from "../utils/isValidUUID";

class ContactController {
    async index(request: Request, response: Response) {
        const { orderBy } = request.query;

        const contacts = await ContactRepository.findAll(String(orderBy));

        response.json(contacts);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: "Invalid user id!" });
        }

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

        if (categoryId && !isValidUUID(categoryId)) {
            return response.status(400).json({ error: "Invalid category id!" });
        }

        if (email) {
            const contactExists = await ContactRepository.findByEmail(email);

            if (contactExists) {
                return response.status(400).json({ error: "This e-mail is already been taken" });
            }
        }

        const contact = await ContactRepository.create({
            name,
            email: email || null,
            phone,
            categoryId: categoryId || null
        });

        response.json(contact);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name, email, phone, categoryId } = request.body;

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: "Invalid user id!" });
        }

        if (categoryId && !isValidUUID(categoryId)) {
            return response.status(400).json({ error: "Invalid category id!" });
        }

        if (email) {
            const contactExists = await ContactRepository.findById(id);

            if (!contactExists) {
                return response.status(404).json({ error: "User not found" });
            }
        }

        const contactByEmail = await ContactRepository.findByEmail(email);

        if (contactByEmail) {
            return response.status(400).json({ error: "This e-mail is already been taken" });
        }

        const contact = await ContactRepository.upadte(id, {
            name,
            email: email || null,
            phone,
            categoryId: categoryId || null
        });

        response.json(contact);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: "Invalid user id!" });
        }

        const contact = await ContactRepository.findById(id);

        if (!contact) {
            return response.status(404).json({ error: "User not found!" });
        }

        await ContactRepository.delete(id);

        response.sendStatus(204);

    }
}

export default new ContactController();