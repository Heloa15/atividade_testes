const express = require("express");

const router = express.Router();

const {
    listarPlanos,
    buscarPlano,
    criarPlano,
    atualizarPlano,
    deletarPlano
} = require("../controllers/plano.controller");


router.get("/planos", listarPlanos);
router.get("/plano/:id", buscarPlano);
router.post("/plano", criarPlano);
router.put("/plano/:id", atualizarPlano);
router.delete("/plano/:id", deletarPlano);


module.exports = router;