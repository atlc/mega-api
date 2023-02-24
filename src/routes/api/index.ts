import express from "express";
import passport from "passport";
import todoRouter from "./todo";

const router = express.Router();

router.use("/todo", passport.authenticate("jwt", { session: false }), todoRouter);

router.get("/wow", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ message: "Nice!" });
});

export default router;
