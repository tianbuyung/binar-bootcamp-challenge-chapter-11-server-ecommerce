const Model = require("../models");
const { Cart, CartDetail } = Model;

const createCartDetail = async (req, res) => {
	try {
		const [cart] = await Cart.findOrCreate({
			where: {
				UserId: req.user.id,
				isBought: false
			}
		});

		const [cartDetail, createdCartDetail] = await CartDetail.findOrCreate({
			where: {
				CartId: cart.id,
				ProductId: req.body.ProductId
			},
			defaults: {
				qty: req.body.qty
			}
		});

		if (createdCartDetail) {
			res.status(200).json({
				message: "Create cart Success",
				data: cartDetail
			});
		} else {
			if (req.body.isIncrement) {
				await cartDetail.increment("qty");
			} else {
				await CartDetail.update({
					qty: req.body.qty
				}, {
					where: {
						id: cartDetail.id
					}
				});
			}

			res.status(200).json({
				message: "Update cart detail's qty success"
			});
		}
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
};

const deleteCartDetail = async (req, res) => {
	try {
		const cart = await Cart.findOne({
			where: {
				UserId: req.user.id,
				isBought: false
			}
		});

		if (cart) {
			const cartDetail = await CartDetail.findOne({
				where: {
					CartId: cart.id,
					id: req.params.id
				}
			});

			if (cartDetail) {
				await CartDetail.destroy({
					where: {
						id: req.params.id
					}
				});

				res.status(200).json({
					message: "Delete cart detail success"
				});
			} else {
				res.status(404).json({
					message: "Cart detail not found"
				});
			}
		} else {
			res.status(404).json({
				message: "Cart not found"
			});
		}
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
};

module.exports = {
	createCartDetail, deleteCartDetail
};