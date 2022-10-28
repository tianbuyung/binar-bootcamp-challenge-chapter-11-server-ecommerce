const Sequelize = require("sequelize");
const Model = require("../models");
const { Order, Cart, OrderDetail, Product } = Model;
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config
	);
}

const createOrder = async (req, res) => {
	try {
		const cart = await Cart.findOne({
			where: {
				UserId: req.user.id,
				isBought: false
			}
		});

		if (cart) {
			const [order, created] = await Order.findOrCreate({
				where: {
					CartId: cart.id
				},
				defaults: {
					totalOrder: req.body.totalOrder
				}
			});

			const result = await sequelize.transaction(async (t) => {
				const [results, metadata] = await sequelize.query(
					`INSERT INTO "OrderDetails" ("OrderId", "ProductId", "qty", "price", "totalOrderDetail", "createdAt", "updatedAt") 
                    SELECT ${order.id}, "ProductId", "qty", "price", "qty"*"price",CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "CartDetails" 
                    JOIN "Products" ON "CartDetails"."ProductId" = "Products"."id" 
                    WHERE "CartId" = ${cart.id}`
				);

				await Cart.update({
					isBought: true
				}, {
					where: {
						id: cart.id
					}
				});

				return order;
			});

			res.status(200).json({
				message: "Create Order Success",
				data: result
			});
		} else {
			res.status(400).json({
				message: "Cart empty"
			});
		}
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
};

const updateOrderStatus = async (req, res) => {
	try {
		const order = await Order.findOne({
			where: {
				id: req.params.id,
				status: "waiting payment"
			},
			include: [{
				model: Cart,
				where: {
					UserId: req.user.id,
				}
			}]
		});

		if (order) {
			if (req.body.status === "done" | req.body.status === "cancelled") {
				await Order.update({
					status: req.body.status
				}, {
					where: {
						id: req.params.id
					}
				});

				res.status(200).json({
					message: "Update order success"
				});
			} else {
				res.status(400).json({
					message: "Order status not valid"
				});
			}
		} else {
			res.status(404).json({
				message: "Order not found"
			});
		}

	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
};

const getOrders = async (req, res) => {
	try {
		const orders = await Order.findAll({
			include: [{
				model: Cart,
				where: {
					UserId: req.user.id,
				}
			}, {
				model: OrderDetail,
				include: Product
			}]
		});

		res.status(200).json({
			message: "Get Orders Success",
			data: orders
		});
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
};

const getOrder = async (req, res) => {
	try {
		const order = await Order.findOne({
			where: {
				id: req.params.id
			},
			include: [{
				model: Cart,
				where: {
					UserId: req.user.id,
				}
			}, {
				model: OrderDetail,
				include: Product
			}]
		});

		res.status(200).json({
			message: "Get Order Success",
			data: order
		});
	} catch (error) {
		res.status(400).json({
			message: error.message
		});
	}
};

module.exports = {
	createOrder, updateOrderStatus, getOrder, getOrders
};
