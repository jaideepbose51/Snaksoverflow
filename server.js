import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const app = express();
const port = 3000;

const _dirname = dirname(fileURLToPath(import.meta.url));
app.set("view engine", "ejs");
app.use(express.static(_dirname));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://kodessphere-api.vercel.app/devices/2KwzXxs"
    );

    console.log(response.data);

    res.status(200).send(response.data);
  } catch (error) {
    console.error("Error:", error);

    res.status(500).send("Internal Server Error");
  }
});

app.post("/submit", async (req, res) => {
  try {
    const requestBody = {
      teamid: "2KwzXxs",
      device: req.body.device,
      value: req.body.value,
    };

    const response = await axios.post(
      "https://kodessphere-api.vercel.app/devices",
      requestBody
    );

    console.log(response.data);

    res.status(200).render("ok.ejs");
  } catch (error) {
    console.error("Error:", error);

    res.status(500).send("Internal Server Error");
  }
});

app.post("/status", (req, res) => {});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running on port ${port}`);
});
