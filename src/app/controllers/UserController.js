import User from "../models/User";
import { v4 } from "uuid";

class UserContoller {
  async store(req, res) {
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
