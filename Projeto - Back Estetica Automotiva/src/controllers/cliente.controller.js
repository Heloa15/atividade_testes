const prisma = require("../data/prisma");


const listarClientes = async (req, res) => {
    try {
        const clientes = await prisma.cliente.findMany({
            include: {
                agendamentos: true
            }
        });

        res.status(200).json(clientes);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar clientes.",
            detalhes: error.message
        });
    }
};



const buscarCliente = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const cliente = await prisma.cliente.findUnique({
            where: {
                id: id
            },
            include: {
                agendamentos: true
            }
        });

        if (!cliente) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        res.status(200).json(cliente);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar cliente.",
            detalhes: error.message
        });
    }
};



const criarCliente = async (req, res) => {
    try {
        const { nome, telefone, email, senha } = req.body;

        if (!nome || !telefone || !email || !senha) {
            return res.status(400).json({
                erro: "Preencha todos os campos."
            });
        }

        const cliente = await prisma.cliente.create({
            data: {
                nome,
                telefone,
                email,
                senha
            }
        });

        res.status(201).json(cliente);

    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({
                erro: "Este e-mail já está cadastrado."
            });
        }

        res.status(500).json({
            erro: "Erro ao cadastrar cliente.",
            detalhes: error.message
        });
    }
};



const atualizarCliente = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { nome, telefone, email, senha } = req.body;

        const cliente = await prisma.cliente.update({
            where: {
                id: id
            },
            data: {
                nome,
                telefone,
                email,
                senha
            }
        });

        res.status(200).json(cliente);

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        if (error.code === "P2002") {
            return res.status(409).json({
                erro: "Este e-mail já está cadastrado."
            });
        }

        res.status(500).json({
            erro: "Erro ao atualizar cliente.",
            detalhes: error.message
        });
    }
};



const deletarCliente = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.cliente.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            mensagem: "Cliente deletado com sucesso."
        });

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        res.status(500).json({
            erro: "Erro ao deletar cliente.",
            detalhes: error.message
        });
    }
};


module.exports = {
    listarClientes,
    buscarCliente,
    criarCliente,
    atualizarCliente,
    deletarCliente
};