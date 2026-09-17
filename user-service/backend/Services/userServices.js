import User from "../Models/userModels.js";
import bcrypt from "bcrypt";



export const createUser = async (userData) => {
  const { nom, prenom, email, motDePasse} = userData;

  const motDePasseHash = await bcrypt.hash(motDePasse, 10);

  const user = await User.create({
    nom,
    prenom,
    email,
    motDePasse: motDePasseHash,
  });

  return user;
};

export const getAllUsers =async (page = 1, limit = 10) => {
 
  
   const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
         attributes: {
      exclude: ["motDePasse"]
    },
        limit,
        offset,
        order: [["createdAt", "DESC"]]
    });

    return {
        users: rows,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        itemsPerPage: limit
    };

};

export const getUserById = async (id) => {
  const user = await User.findByPk(id,{
     attributes: {
      exclude: ["motDePasse"]
    },
  });
 

  if (!user) {
    return null;
  }
  return user;
};


export const updateUser = async (id,userData) => {
    const user = await User.findByPk(id);

    if (!user) {
    return null;
  }
const { nom, prenom, email,} = userData;

  await user.update({
    nom,
    prenom,
    email,
  });
  return user;
};

export const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    
    if (!user) {
    return null;
  }
  await user.destroy();
  return user;
};


