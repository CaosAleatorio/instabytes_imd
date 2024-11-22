import { getTodosPosts, criarPost } from "../models/postsModel.js"; // Importa as funções para obter e criar posts do modelo de dados
import fs from "fs"; // Importa o módulo fs para manipulação de arquivos

// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Chama a função do modelo para obter todos os posts do banco de dados
  const posts = await getTodosPosts();
  // Envia os posts como resposta em formato JSON com status 200 (sucesso)
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição
  const novoPost = req.body;
  try {
    // Chama a função do modelo para criar o novo post
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Em caso de erro, loga o erro no console e envia uma resposta com status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}

// Função assíncrona para fazer upload de imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome do arquivo
  const novoPost = {
    descricao: "",
    imUrl: req.file.originalname,
    alt: ""
  };
  try {
    // Chama a função do modelo para criar o novo post
    const postCriado = await criarPost(novoPost);
    // Gera o novo nome do arquivo com o ID do post
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia o post criado como resposta com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Em caso de erro, loga o erro no console e envia uma resposta com status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}