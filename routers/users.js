import express from "express";
import { createUser, verification, login, getUser } from "../functions/users";

const router = express.Router();

router.post("/createUser", createUser);
router.put("/verification", verification);
router.put("/login", login);
router.get("/getUser", getUser);
router.get("/", function (req, res) {
  res.send("Users");
});

module.exports = router;
