import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";

const Product = sequelize.define("products_service", {

  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  nom: {
    type: DataTypes.STRING(100),
    allowNull: false,

    validate: {
      notEmpty: {
        msg: "Le nom est obligatoire.",
      },
    },
  },

  description: {
    type: DataTypes.STRING(500),
    allowNull: false,

    validate: {
      notEmpty: {
        msg: "La description est obligatoire.",
      },
    },
  },

  prix: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },

  photo: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

});

export default Product;