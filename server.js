import express from "express";

const app = express();

app.listen(3000, () => {
    console.log("Servidor Escutando");
});

app.get("/api", (req, res) => {
    res.status(200).send("Bem vindo ao Servidor e API");
});