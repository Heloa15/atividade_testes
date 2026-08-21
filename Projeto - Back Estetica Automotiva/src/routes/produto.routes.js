const express = require("express");

const router = express.Router();

const {
    listarProdutos,
    buscarProduto,
    criarProduto,
    atualizarProduto,
    deletarProduto
} = require("../controllers/produto.controller");


router.get("/produtos", listarProdutos);
router.get("/produto/:id", buscarProduto);
router.post("/produto", criarProduto);
router.put("/produto/:id", atualizarProduto);
router.delete("/produto/:id", deletarProduto);


module.exports = router;