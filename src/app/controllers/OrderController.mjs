import * as Yup from "yup";
import Order from "../schemas/Order.mjs";
import Product from "../models/Product.mjs";
import Category from "../models/Category";
import User from "../models/User.mjs";

class OrderController {
  async store(req, res) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        ),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(401).json({ error: err.errors });
    }

    const { products } = req.body;

    const productsId = products.map((product) => product.id);

    const findProducts = await Product.findAll({
      where: {
        id: productsId,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const formattedProducts = findProducts.map((product) => {
      const productIndex = products.findIndex((item) => item.id === product.id);

      const newProduct = {
        id: product.id,
        name: product.name,
        category: product.category.name,
        price: product.price,
        url: product.url,
        quantity: products[productIndex].quantity,
      };

      return newProduct;
    });

    const order = {
      user: {
        id: req.userId,
        name: req.userName,
      },
      products: formattedProducts,
      status: "Em preparação",
    };

    const createdOrder = await Order.create(order);

    return res.json(createdOrder);
  }

  async index(req, res) {
    const order = await Order.find();

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(401).json({ error: err.errors });
    }

    const { admin: isAdmin } = await User.findByPk(req.userId);
    if (!isAdmin) {
      return res.status(400).json();
    }

    const { id } = req.params;
    const { status } = req.body;

    try {
      await Order.updateOne({ _id: id }, { status });
    } catch (err) {
      return res.status(401).json({ error: err.messege });
    }

    return res.json({ messege: "Status atualizado" });
  }
}

export default new OrderController();
