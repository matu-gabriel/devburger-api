import * as Yup from "yup";
import Category from "../models/Category";
import User from "../models/User";

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

    const { admin: isAdmin } = await User.findByPk(req.userId);
    if (!isAdmin) {
      return res.status(400).json();
    }

    const { name } = req.body;
    const { filename: path } = req.file;

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
      path,
    });

    return res.status(201).json({ id, name });
  }

  async index(req, res) {
    const categories = await Category.findAll();

    return res.json(categories);
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
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

    const findCategory = await Category.findByPk(id);

    if (!findCategory) {
      return res.status(400).json({ messege: "Categoria não encontrada" });
    }

    let path;
    if (req.file) {
      path = req.file.filename;
    }

    const { name } = req.body;

    if (name) {
      const isValid = await Category.findOne({
        where: {
          name,
        },
      });

      if (isValid && isValid.id != id) {
        return res.status(401).json({ error: "Categoria já criada" });
      }
    }

    await Category.update(
      {
        name,
        path,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(201).json();
  }
}

export default new CategoryController();
