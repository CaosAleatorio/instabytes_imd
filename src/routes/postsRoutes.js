import express from "express";
import { listarPosts } from "../../controllers/postsController.js";


const routes = (app) => {
    // Habilita o middleware para analisar corpos de requisições JSON
    app.use(express.json());

    // Rota GET para obter todos os posts
    app.get("/posts", listarPosts);
};

export default routes;
