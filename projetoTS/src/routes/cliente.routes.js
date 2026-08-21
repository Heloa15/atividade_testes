const express = require("express");

const router = express.Router();

const { 
    cadastrarCliente, 
    listarCliente, 
    buscarCliente, 
    atualizarCliente, 
    excluirCliente } = require("../controllers/cliente.controller");

router.post("/cadastrar", cadastrarCliente);
router.get("/listar", listarCliente);
router.get("/buscar/:id", buscarCliente);
router.put("/atualizar/:id", atualizarCliente);
router.delete("/excluir/:id", excluirCliente);

module.exports = router;
