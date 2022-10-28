const Model = require("../models");
const { Cart, CartDetail, Product } = Model;

const getCart = async (req, res) => {
	try {
		const cart = await Cart.findOne({
			where: {
				UserId: req.user.id,
				isBought: false,
			},
			include: {
				model: CartDetail,
				include: Product,
			},
			order: [[CartDetail, "id", "ASC"]],
		});

		res.status(200).json({
			message: "Get Cart Success",
			data: cart,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

module.exports = {
	getCart,
};
