const express = require("express");

const router = express.Router();

const { 
    criarProduto,
    listarProdutos,
    buscarProduto,
    atualizarProduto,
    deletarProduto} = require("../controllers/produto.controller");

router.post("/cadastrar", criarProduto);
router.get("/listar", listarProdutos);
router.get("/buscar/:id", buscarProduto);
router.put("/atualizar/:id", atualizarProduto);
router.delete("/excluir/:id", deletarProduto);

module.exports = router;
