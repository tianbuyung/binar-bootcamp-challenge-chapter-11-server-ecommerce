const Model = require("../models");
const { Category, Product } = Model;

const getCategories = async (req, res) => {
	try {
		const options = {
			include: [
				{
					model: Product,
				},
			],
		};
		const categories = await Category.findAll(options);
		res.status(200).json({
			message: "Successfully get all categories",
			categories,
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

const getCategoryProduct = async (req, res) => {
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(404).json({
				message: "id not being provided",
			});
		}
		const { query } = req;
		const page = query?.page || 1;
		const size = query?.size || 15;
		let offset = page == 1 ? 0 : (page - 1) * size;
		const result = await Product.findAndCountAll({
			offset,
			limit: size,
			include: Category,
			where: {
				CategoryId: id
			}
		});
		if (!result) {
			if (!id) {
				return res.status(404).json({
					message: "not found",
				});
			}
		}
		return res.status(200).json({
			data: { totalPage: Math.ceil(result.count / size), ...result },
		});
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};

module.exports = {
	getCategories,
	getCategoryProduct,
};
