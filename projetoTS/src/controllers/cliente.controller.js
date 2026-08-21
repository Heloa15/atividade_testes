const prisma = require("../data/prisma");

const cadastrarCliente = async (req, res) => {
    const data = req.body;

    const item = await prisma.cliente.create({
        data
    });

    res.json(item).status(201).end();
};

const listarCliente = async (req, res) => {
    const lista = await prisma.cliente.findMany();

    res.json(lista).status(200).end();
};

const buscarCliente = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.cliente.findUnique({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

const atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const dados = req.body;
    
    const item = await prisma.cliente.update({
        where: { id : Number(id) },
        data: dados
    });

    res.json(item).status(200).end();
};

const excluirCliente = async (req, res) => {
    const { id } = req.params;
    
    const item = await prisma.cliente.delete({
        where: { id : Number(id) }
    });

    res.json(item).status(200).end();
};

module.exports = {
    cadastrarCliente,
    listarCliente,
    buscarCliente,
    atualizarCliente,
    excluirCliente
}
