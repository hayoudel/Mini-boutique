import { createUser,getAllUsers,getUserById,updateUser,deleteUser} from "../Services/userServices.js";

export const createUserControllers = async (req,res) => {
      try {
    const user = await createUser(req.body);

    res.status(201).json({
      message: "utilisateur créé avec succès",
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
      }
    });

  } catch (error) {
    res.status(500).json({
     message: error.message,
    });
  }
}

export const getAllUsersControllers = async (req, res) => {

    try {

        const page = Math.max(
            parseInt(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                parseInt(req.query.limit) || 10,
                1
            ),
            100
        );

        const result = await getAllUsers(page, limit);

        res.status(200).json({
            message: "utilisateurs récupérés avec succès",

            users: result.users,

            pagination: {
                currentPage: result.currentPage,
                totalPages: result.totalPages,
                totalItems: result.totalItems,
                itemsPerPage: result.itemsPerPage
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

export const getUserByIdController = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);

        if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé"
      });
    }
        res.status(200).json ({
            message: "Utilisateur récupéré avec succès",
            user,

        });

    }catch (error) {
        res.status (500).json({
            message: error.message,
        });

    }
};

export const updateUserController = async (req,res) => {
    try{

      const userUpdate = await updateUser(
        req.params.id,
        req.body
      );

        if (!userUpdate) {
      return res.status(404).json({
        message: "Utilisateur non trouvé"
      });
    }


      res.status(200).json({
        message: "utilisateur modifié",
        user: userUpdate,

      })
    }catch (error) {
        res.status (500).json({
            message: error.message,
        });

    }
};

export const deleteUserController = async (req,res) => {
    try{
        const userDelete = await deleteUser(req.params.id);

         if (!userDelete) {
      return res.status(404).json({
        message: "Utilisateur non trouvé"
      });
    }

      res.status(200).json({
        message: "utilisateur suprimer",
      })

    }catch (error) {
        res.status (500).json({
            message: error.message,
        });

    }
};