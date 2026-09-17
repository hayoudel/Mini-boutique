import { DataTypes } from "sequelize";
import { sequelize } from "../Config/db.js";

const User = sequelize.define("user", {
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

  prenom: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Le prénom est obligatoire.",
      },
    },
  },

  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "L'email doit être valide.",
      },
    },
  },

  motDePasse: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },


});

export default User;