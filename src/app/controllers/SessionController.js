import * as Yup from "yup";
import User from "../models/User";

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const emailOrPasswordInvalid = () => {
      res.status(401).json({ error: "Email ou senha inválidos" });
    };

    const isValid = await schema.isValid(req.body);

    if (!isValid) {
      return emailOrPasswordInvalid();
    }
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return emailOrPasswordInvalid();
    }

    const isPassworValid = await user.comparePassword(password);

    if (!isPassworValid) {
      return emailOrPasswordInvalid();
    }

    return res
      .status(201)
      .json({ id: user.id, name: user.name, email, admin: user.admin });
  }
}

export default new SessionController();
