const express = require("express");

const router = express.Router();

const {
    listarClientes,
    buscarCliente,
    criarCliente,
    atualizarCliente,
    deletarCliente
} = require("../controllers/cliente.controller");


router.get("/clientes", listarClientes);
router.get("/cliente/:id", buscarCliente);
router.post("/cliente", criarCliente);
router.put("/cliente/:id", atualizarCliente);
router.delete("/cliente/:id", deletarCliente);


module.exports = router;