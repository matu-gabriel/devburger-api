import User from "../models/User";
import { v4 } from "uuid";
import * as Yup from "yup";

class UserContoller {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password_hash: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(401).json({ error: err.errors });
    }

    const { name, email, password_hash, admin } = req.body;

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

    return res.json({
      id: user.id,
      name,
      email,
      password_hash,
    });
  }
}

export default new UserContoller();
