import express from "express";
import "./env";
import bodyParser from "body-parser";
import { connectMongo } from "./db";
import users from "./routes/users";
import offers from "./routes/offers";

connectMongo();

const app = express();
app.use(express.json());

app.use("/users", bodyParser.json(), users);
app.use("/offers", bodyParser.json(), offers);

app.get("/", (req, res) => {
  res.send("OK");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
