import multer from "multer";
import { v4 } from "uuid";
import { resolve, extname } from "node:path";

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "uploads"),
    filename: (request, file, callback) =>
      callback(null, v4() + extname(file.originalname)),
  }),
};
