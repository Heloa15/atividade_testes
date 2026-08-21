const express = require("express");

const router = express.Router();

const {
    listarAgendamentos,
    buscarAgendamento,
    criarAgendamento,
    atualizarAgendamento,
    deletarAgendamento
} = require("../controllers/agendamento.controller");


router.get("/agendamentos", listarAgendamentos);
router.get("/agendamento/:id", buscarAgendamento);
router.post("/agendamento", criarAgendamento);
router.put("/agendamento/:id", atualizarAgendamento);
router.delete("/agendamento/:id", deletarAgendamento);


module.exports = router;