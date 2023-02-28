import express from "express";
import { v4 } from "uuid";
import Notes from "../../database/queries/notes";
import { has_missing_data } from "../../utils/validators";

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate user" });

    try {
        const notes = await Notes.all(req.user.id);
        res.json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred!" });
    }
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate user" });

    try {
        const [note] = await Notes.one(req.user.id, id);

        if (!note) {
            res.status(404).json({ message: "Sorry Mario, but the note is in another castle!" });
        } else {
            res.json(note);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred!" });
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate user" });

    try {
        await Notes.remove(req.user.id, id);
        res.json({ message: "Deleted successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred!" });
    }
});

router.post("/", async (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate user" });

    const { content } = req.body;
    if (has_missing_data({ content }, res)) return;

    try {
        const id = v4();
        const newNote = { id, userid: req.user.id, content };

        await Notes.create(newNote);
        res.status(201).json({ message: "Note successfully created!", id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred!" });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    if (!req.user) return res.status(401).json({ message: "Unable to authenticate user" });

    const { content } = req.body;
    if (has_missing_data({ content }, res)) return;

    try {
        await Notes.update(content, id, req.user.id);
        res.status(201).json({ message: "Note successfully updated!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred!" });
    }
});

export default router;
