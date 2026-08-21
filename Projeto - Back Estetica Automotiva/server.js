const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const clienteRoutes = require("./src/routes/cliente.routes");
const planoRoutes = require("./src/routes/plano.routes");
const produtoRoutes = require("./src/routes/produto.routes");
const agendamentoRoutes = require("./src/routes/agendamento.routes");

app.use("/clientes", clienteRoutes);
app.use("/planos", planoRoutes);
app.use("/produtos", produtoRoutes);
app.use("/agendamentos", agendamentoRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});