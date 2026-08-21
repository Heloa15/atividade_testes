const express = require("express");

const router = express.Router();

const {  
    cadastrarAgendamento,
    listarAgendamento,
    buscarAgendamento,
    atualizarAgendamento,
    excluirAgendamento} = require("../controllers/agendamento.controller");

router.post("/cadastrar", cadastrarAgendamento);
router.get("/listar", listarAgendamento);
router.get("/buscar/:id", buscarAgendamento);
router.put("/atualizar/:id", atualizarAgendamento);
router.delete("/excluir/:id", excluirAgendamento);

module.exports = router;
