import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";

const Order = sequelize.define("order",
  {
    id: {
      type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },

    statut: {
      type: DataTypes.ENUM(
        "En attente",
        "En cours",
        "Expédiée",
        "Livrée",
        "Annulée"
      ),
      allowNull: false,
      defaultValue: "En attente",
    },
  },
  
);

export default Order;