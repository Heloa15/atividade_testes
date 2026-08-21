const express = require("express");

const router = express.Router();

const { 
     listarPlanos,
    buscarPlano,
    criarPlano,
    atualizarPlano,
    deletarPlano} = require("../controllers/plano.controller");

router.post("/cadastrar", criarPlano);
router.get("/listar", listarPlanos);
router.get("/buscar/:id", buscarPlano);
router.put("/atualizar/:id", atualizarPlano);
router.delete("/excluir/:id", deletarPlano);

module.exports = router;
