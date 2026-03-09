const Order = require("../models/orderModel");

exports.createOrder = async (req, res) => {
    try {

        const data = req.body;

        // MAPPING solicitado no desafio
        const mappedOrder = {
            orderId: data.numeroPedido,
            value: data.valorTotal,
            creationDate: new Date(data.dataCriacao),
            items: data.items.map(item => ({
                productId: Number(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };

        const order = await Order.create(mappedOrder);

        res.status(201).json(order);

    } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar pedido", details: error.message });
}
};

exports.getOrder = async (req, res) => {

    try {

        const { id } = req.params;

        const order = await Order.findOne({ orderId: id });

        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado" });
        }

        res.json(order);

    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar pedido" });
    }

};

exports.listOrders = async (req, res) => {

    try {

        const orders = await Order.find().select("-_id -_v");

        res.json(orders);

    } catch (error) {

        res.status(500).json({ error: "Erro ao listar pedidos" });

    }

};

exports.updateOrder = async (req, res) => {

    try {

        const { id } = req.params;

        const updated = await Order.findOneAndUpdate(
            { orderId: id },
            req.body,
            { new: true }
        );

        res.json(updated);

    } catch (error) {

        res.status(500).json({ error: "Erro ao atualizar pedido" });

    }

};
exports.deleteOrder = async (req, res) => {

    try {

        const { id } = req.params;

        await Order.deleteOne({ orderId: id });

        res.json({ message: "Pedido deletado com sucesso" });

    } catch (error) {

        res.status(500).json({ error: "Erro ao deletar pedido" });

    }

};