import express from "express";
import passport from "passport";
import todoRouter from "./todo";
import notesRouter from "./notes";

const router = express.Router();

router.use("/todo", passport.authenticate("jwt", { session: false }), todoRouter);
router.use("/notes", passport.authenticate("jwt", { session: false }), notesRouter);

export default router;
