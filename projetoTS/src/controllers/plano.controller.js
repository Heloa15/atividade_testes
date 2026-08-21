const prisma = require("../data/prisma");



const listarPlanos = async (req, res) => {
    try {
        const planos = await prisma.plano.findMany({
            orderBy: {
                valor: "asc"
            }
        });

        res.status(200).json(planos);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar planos.",
            detalhes: error.message
        });
    }
};



const buscarPlano = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const plano = await prisma.plano.findUnique({
            where: {
                id: id
            }
        });

        if (!plano) {
            return res.status(404).json({
                erro: "Plano não encontrado."
            });
        }

        res.status(200).json(plano);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar plano.",
            detalhes: error.message
        });
    }
};



const criarPlano = async (req, res) => {
    try {
        const {
            nome,
            descricao,
            valor,
            lavagensMes
        } = req.body;

        if (
            !nome ||
            !descricao ||
            valor === undefined ||
            lavagensMes === undefined
        ) {
            return res.status(400).json({
                erro: "Preencha todos os campos."
            });
        }

        const plano = await prisma.plano.create({
            data: {
                nome,
                descricao,
                valor: Number(valor),
                lavagensMes: Number(lavagensMes)
            }
        });

        res.status(201).json(plano);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao cadastrar plano.",
            detalhes: error.message
        });
    }
};



const atualizarPlano = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const {
            nome,
            descricao,
            valor,
            lavagensMes
        } = req.body;

        const plano = await prisma.plano.update({
            where: {
                id: id
            },
            data: {
                nome,
                descricao,
                valor: Number(valor),
                lavagensMes: Number(lavagensMes)
            }
        });

        res.status(200).json(plano);

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                erro: "Plano não encontrado."
            });
        }

        res.status(500).json({
            erro: "Erro ao atualizar plano.",
            detalhes: error.message
        });
    }
};



const deletarPlano = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.plano.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            mensagem: "Plano deletado com sucesso."
        });

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                erro: "Plano não encontrado."
            });
        }

        res.status(500).json({
            erro: "Erro ao deletar plano.",
            detalhes: error.message
        });
    }
};


module.exports = {
    listarPlanos,
    buscarPlano,
    criarPlano,
    atualizarPlano,
    deletarPlano
};