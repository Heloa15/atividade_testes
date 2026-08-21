const prisma = require("../data/prisma");

const cadastrarAgendamento = async (req, res) => {
    try {
        const { nome, telefone, servico, data, hora, status } = req.body;

        const item = await prisma.agendamento.create({
            data: {
                nome,
                telefone,
                servico,
                data: new Date(`${data}T${hora}`),
                hora,
                status
            }
        });

        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar agendamento." });
    }
};

const listarAgendamento = async (req, res) => {
    try {
        const lista = await prisma.agendamento.findMany();
        res.status(200).json(lista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao listar agendamentos." });
    }
};

const buscarAgendamento = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.agendamento.findUnique({
            where: { id: Number(id) }
        });

        if (!item) {
            return res.status(404).json({ erro: "Agendamento não encontrado." });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar agendamento." });
    }
};

const atualizarAgendamento = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, telefone, servico, data, hora, status } = req.body;

        const item = await prisma.agendamento.update({
            where: { id: Number(id) },
            data: {
                nome,
                telefone,
                servico,
                data: data && hora ? new Date(`${data}T${hora}`) : undefined,
                hora,
                status
            }
        });

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar agendamento." });
    }
};

const excluirAgendamento = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await prisma.agendamento.delete({
            where: { id: Number(id) }
        });

        res.status(200).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao excluir agendamento." });
    }
};

module.exports = {
    cadastrarAgendamento,
    listarAgendamento,
    buscarAgendamento,
    atualizarAgendamento,
    excluirAgendamento
};