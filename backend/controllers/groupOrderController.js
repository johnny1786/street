import GroupOrder from "../models/GroupOrder.js";
import Product from "../models/Product.js";

// @desc    Create a group order
// @route   POST /api/group-orders
// @access  Private
export const createGroupOrder = async (req, res) => {
    try {
        const { productId, quantity, targetQuantity, expiresAt } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const groupOrder = await GroupOrder.create({
            product: productId,
            vendor: product.vendorId,
            creator: req.user.id,
            participants: [{ user: req.user.id, quantity }],
            currentQuantity: quantity,
            targetQuantity,
            expiresAt,
        });

        res.status(201).json(groupOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Join a group order
// @route   POST /api/group-orders/:id/join
// @access  Private
export const joinGroupOrder = async (req, res) => {
    try {
        const { quantity } = req.body;
        const groupOrder = await GroupOrder.findById(req.params.id);

        if (!groupOrder) {
            return res.status(404).json({ message: "Group order not found" });
        }
        if (groupOrder.status !== 'open') {
            return res.status(400).json({ message: "This group order is closed." });
        }

        groupOrder.participants.push({ user: req.user.id, quantity });
        groupOrder.currentQuantity += quantity;

        if (groupOrder.currentQuantity >= groupOrder.targetQuantity) {
            groupOrder.status = 'closed';
        }

        await groupOrder.save();
        res.json(groupOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    List all open group orders
// @route   GET /api/group-orders
// @access  Public
export const listGroupOrders = async (req, res) => {
    try {
        const groupOrders = await GroupOrder.find({ status: 'open' })
            .populate('product', 'name price bulkPrice image')
            .populate('vendor', 'shopName');
        res.json(groupOrders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};