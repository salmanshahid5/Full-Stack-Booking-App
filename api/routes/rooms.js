import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("this is rooms endpoint");
});

export default router;
