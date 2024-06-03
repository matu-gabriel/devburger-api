import * as Yup from "yup";
import Category from "../models/Category";

class CategoryController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(401).json({ error: err.errors });
    }

    const { name } = req.body;

    const isValid = await Category.findOne({
      where: {
        name,
      },
    });

    if (isValid) {
      return res.status(401).json({ error: "Categoria já criada" });
    }

    const { id } = await Category.create({
      name,
    });

    return res.status(201).json({ id, name });
  }

  async index(req, res) {
    const categories = await Category.findAll();

    return res.json(categories);
  }
}

export default new CategoryController();
