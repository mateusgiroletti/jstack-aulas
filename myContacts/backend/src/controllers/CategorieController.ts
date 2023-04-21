import { Request, Response } from "express";

import CategorieRepository from "../repositories/CategorieRepository";

class CategorieController {
    async index(request: Request, response: Response) {
        const { orderBy } = request.query;

        const categories = await CategorieRepository.findAll(String(orderBy));

        response.json(categories);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const categorie = await CategorieRepository.findById(id);

        if (!categorie) {
            return response.status(404).json({ error: "Categorie not found!" });
        }

        return response.json(categorie);
    }

    async store(request: Request, response: Response) {
        const { name } = request.body;

        if (!name) {
            return response.status(400).json({ error: "Name is required!" });
        }

        const categorie = await CategorieRepository.create({
            name
        });

        response.json(categorie);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { name } = request.body;

        const categorieExists = await CategorieRepository.findById(id);

        if (!categorieExists) {
            return response.status(404).json({ error: "Categorie not found" });
        }

        const categorie = await CategorieRepository.upadte(id, {
            name
        });

        response.json(categorie);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;

        const categorie = await CategorieRepository.findById(id);

        if (!categorie) {
            return response.status(404).json({ error: "Categorie not found!" });
        }

        await CategorieRepository.delete(id);

        response.sendStatus(204);

    }
}


export default new CategorieController();