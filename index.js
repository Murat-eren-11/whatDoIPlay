const express = require("express");
const { startdiscordBot } = require("./bot");

startdiscordBot();

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Serveur started paaaaaaaaaaaals");
});

app.listen(port, () => {
  console.log(`serveur start on ${port}`);
});
