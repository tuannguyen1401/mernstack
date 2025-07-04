import express from "express";

import { create, getAll, getById, update, deleteUser } from "../controller/UserController.js";

const router = express.Router();

router.post("/create", create);
router.get("/get-all", getAll);
router.get("/user/:id", getById);
router.put("/update/user/:id", update);
router.delete("/delete/user/:id", deleteUser);


export default router;