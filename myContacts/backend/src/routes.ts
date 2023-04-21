import { Router } from "express";

import ContactController from "./controllers/ContactController";
import CategorieController from "./controllers/CategorieController";

const router = Router();

router.get("/contacts", ContactController.index);
router.get("/contacts/:id", ContactController.show);
router.post("/contacts", ContactController.store);
router.put("/contacts/:id", ContactController.update);
router.delete("/contacts/:id", ContactController.delete);

router.get("/categories", CategorieController.index);
router.get("/categories/:id", CategorieController.show);
router.post("/categories", CategorieController.store);
router.put("/categories/:id", CategorieController.update);
router.delete("/categories/:id", CategorieController.delete);

export default router;