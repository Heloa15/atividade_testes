require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/agendamento', require('./src/routes/agendamento.routes'));
app.use('/produto', require('./src/routes/produto.routes'));
app.use('/plano', require('./src/routes/plano.routes'));
app.use('/cliente', require('./src/routes/cliente.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));