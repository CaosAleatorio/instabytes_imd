import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o middleware multer para upload de arquivos

// Importa funções controladoras para posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem } from "../../controllers/postsController.js";

// Configura o armazenamento de arquivos para upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório para salvar os uploads: "uploads/"
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo
    cb(null, file.originalname);
  }
});

// Define a instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Função para definir rotas na aplicação Express
const routes = (app) => {
  // Habilita o middleware para analisar corpos de requisições JSON
  app.use(express.json());

  // Rota GET para listar todos os posts (tratada por listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (tratada por postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa middleware multer e depois 
  // é tratada por uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

// Exporta a função routes para uso em outros arquivos
export default routes;