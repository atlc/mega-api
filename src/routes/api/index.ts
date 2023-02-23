import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/wow", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.json({ message: "Nice!" });
});

export default router;
