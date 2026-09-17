import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";

const OrderItem = sequelize.define("orderItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    prix: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
);

export default OrderItem;