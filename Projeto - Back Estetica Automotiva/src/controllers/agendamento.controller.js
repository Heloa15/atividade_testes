const prisma = require("../prisma");


const listarAgendamentos = async (req, res) => {
    try {
        const agendamentos = await prisma.agendamento.findMany({
            include: {
                cliente: true
            },
            orderBy: [
                {
                    data: "asc"
                },
                {
                    hora: "asc"
                }
            ]
        });

        res.status(200).json(agendamentos);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar agendamentos.",
            detalhes: error.message
        });
    }
};


const buscarAgendamento = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const agendamento = await prisma.agendamento.findUnique({
            where: {
                id: id
            },
            include: {
                cliente: true
            }
        });

        if (!agendamento) {
            return res.status(404).json({
                erro: "Agendamento não encontrado."
            });
        }

        res.status(200).json(agendamento);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar agendamento.",
            detalhes: error.message
        });
    }
};


const criarAgendamento = async (req, res) => {
    try {
        const {
            clienteId,
            servico,
            data,
            hora,
            status
        } = req.body;

        if (
            clienteId === undefined ||
            !servico ||
            !data ||
            !hora
        ) {
            return res.status(400).json({
                erro: "Preencha todos os campos obrigatórios."
            });
        }

        const cliente = await prisma.cliente.findUnique({
            where: {
                id: Number(clienteId)
            }
        });

        if (!cliente) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        const horarioExistente = await prisma.agendamento.findFirst({
            where: {
                data,
                hora,
                status: {
                    not: "Cancelado"
                }
            }
        });

        if (horarioExistente) {
            return res.status(409).json({
                erro: "Este horário já está agendado."
            });
        }

        const agendamento = await prisma.agendamento.create({
            data: {
                clienteId: Number(clienteId),
                servico,
                data,
                hora,
                status: status || "Pendente"
            },
            include: {
                cliente: true
            }
        });

        res.status(201).json(agendamento);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao criar agendamento.",
            detalhes: error.message
        });
    }
};


const atualizarAgendamento = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const {
            clienteId,
            servico,
            data,
            hora,
            status
        } = req.body;

        const agendamento = await prisma.agendamento.update({
            where: {
                id: id
            },
            data: {
                clienteId: Number(clienteId),
                servico,
                data,
                hora,
                status
            },
            include: {
                cliente: true
            }
        });

        res.status(200).json(agendamento);

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                erro: "Agendamento não encontrado."
            });
        }

        res.status(500).json({
            erro: "Erro ao atualizar agendamento.",
            detalhes: error.message
        });
    }
};


const deletarAgendamento = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.agendamento.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            mensagem: "Agendamento deletado com sucesso."
        });

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                erro: "Agendamento não encontrado."
            });
        }

        res.status(500).json({
            erro: "Erro ao deletar agendamento.",
            detalhes: error.message
        });
    }
};


module.exports = {
    listarAgendamentos,
    buscarAgendamento,
    criarAgendamento,
    atualizarAgendamento,
    deletarAgendamento
};