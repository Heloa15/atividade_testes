const prisma = require("../data/prisma");



const listarProdutos = async (req, res) => {
    try {
        const produtos = await prisma.produto.findMany({
            orderBy: {
                nome: "asc"
            }
        });

        res.status(200).json(produtos);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar produtos.",
            detalhes: error.message
        });
    }
};



const buscarProduto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const produto = await prisma.produto.findUnique({
            where: {
                id: id
            }
        });

        if (!produto) {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        res.status(200).json(produto);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar produto.",
            detalhes: error.message
        });
    }
};



const criarProduto = async (req, res) => {
    try {
        const {
            nome,
            descricao,
            preco,
            estoque,
            imagem
        } = req.body;

        if (
            !nome ||
            !descricao ||
            preco === undefined ||
            estoque === undefined ||
            !imagem
        ) {
            return res.status(400).json({
                erro: "Preencha todos os campos."
            });
        }

        const produto = await prisma.produto.create({
            data: {
                nome,
                descricao,
                preco: Number(preco),
                estoque: Number(estoque),
                imagem
            }
        });

        res.status(201).json(produto);

    } catch (error) {
        res.status(500).json({
            erro: "Erro ao cadastrar produto.",
            detalhes: error.message
        });
    }
};



const atualizarProduto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const {
            nome,
            descricao,
            preco,
            estoque,
            imagem
        } = req.body;

        const produto = await prisma.produto.update({
            where: {
                id: id
            },
            data: {
                nome,
                descricao,
                preco: Number(preco),
                estoque: Number(estoque),
                imagem
            }
        });

        res.status(200).json(produto);

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        res.status(500).json({
            erro: "Erro ao atualizar produto.",
            detalhes: error.message
        });
    }
};



const deletarProduto = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.produto.delete({
            where: {
                id: id
            }
        });

        res.status(200).json({
            mensagem: "Produto deletado com sucesso."
        });

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                erro: "Produto não encontrado."
            });
        }

        res.status(500).json({
            erro: "Erro ao deletar produto.",
            detalhes: error.message
        });
    }
};


module.exports = {
    listarProdutos,
    buscarProduto,
    criarProduto,
    atualizarProduto,
    deletarProduto
};