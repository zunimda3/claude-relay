import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Relay up");
});

app.post("/anthropic", async (req, res) => {
  try {
    const r = await fetch("https://api.deepseek.com/anthropic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Relay running");
});
