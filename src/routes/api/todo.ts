import express from "express";
import { v4 } from "uuid";
import Items from "../../database/queries/todo";

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate user" });
    try {
        const items = await Items.all(req.user.id);
        res.json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred!" });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate user" });
    try {
        const items = await Items.one(req.user.id, id);
        res.json(items);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred!" });
    }
});

router.post("/", async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate user" });

    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Missing content property" });

    const id = v4();

    try {
        const newItem = { id, userid: req.user.id, content };
        await Items.create(newItem);

        res.status(201).json({ message: "Item successfully created!", id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred!" });
    }
});

router.put("/:id/toggle", async (req, res) => {
    const id = req.params.id;
    const { current_status } = req.body;
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate user" });

    try {
        await Items.toggle_completion(current_status, id, req.user.id);
        res.status(201).json({ message: "Successfully updated item!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred!" });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate user" });
    try {
        await Items.remove(req.user.id, id);
        res.json({ message: "Sucessfully baleeted" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred!" });
    }
});

export default router;
