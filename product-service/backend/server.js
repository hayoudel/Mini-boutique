import express from "express";
import { connectionDb, sequelize } from "./Config/db.js";
import productRoute from "./Routes/productRoutes.js"


const app = express();

app.use(express.json());
app.use("/api/products",productRoute);

const PORT = process.env.PORT || 5000;

const connecte = async () => {
  try {
    await connectionDb();
    await sequelize.sync({alter:true});

    app.listen(PORT, () => {
      console.log(`Serveur connecté sur le port : ${PORT}`);
    });

  } catch (error) {
    console.log("Erreur de démarrage :", error.message);
  }
};

connecte();