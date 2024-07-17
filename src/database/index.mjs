import { Sequelize } from "sequelize";
import configDatabase from "../config/database";
import User from "../app/models/User.mjs";
import Product from "../app/models/Product.mjs";
import Category from "../app/models/Category.mjs";
import mongoose from "mongoose";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(
      "postgresql://postgres:eGDCuvXUXtlymmplHkbsBotFUKjxuegY@roundhouse.proxy.rlwy.net:56816/railway"
    );
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://mongo:OnpwourOqkdzacViLKMlpokizzHCPAlD@monorail.proxy.rlwy.net:28921"
    );
  }
}

export default new Database();
