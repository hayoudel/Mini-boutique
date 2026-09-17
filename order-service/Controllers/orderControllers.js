import { createOrder,getAllOrder,getOrderById,updateOrder,deleteOrder } from "../Services/orderServices.js";

export const createOrderController = async (req, res) => {
  try {
    const { userId, items } = req.body;

   
    if (!userId) {
      return res.status(400).json({
        message: "userId est obligatoire"
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "La commande doit contenir au moins un produit"
      });
    }


    const order = await createOrder(userId, items);

    return res.status(201).json({
      message: "Commande créée avec succès",
      order
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
export const getAllOrderControllers = async (req, res) => {
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

    const result = await getAllOrder(page, limit);

    res.status(200).json({
      message: "Commandes récupérées avec succès",

      order: result.order,

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


export const getByIdOrderControllers = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Commande non trouvée"
      });
    }

    res.status(200).json({
      message: "Commande récupérée avec succès",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateOrderControllers = async (req,res) => {
  try {
      const orderUpdate = await updateOrder(
        req.params.id,
        req.body
      );

        if (!orderUpdate) {
      return res.status(404).json({
        message: "Commande non trouvé"
      });
    }
      res.status(200).json({
        message: "Commande modifié",
        order: orderUpdate,

      })
    }catch (error) {
        res.status (500).json({
            message: error.message,
        });

    }
};

export const deleteOrderControllers = async(req,res) => {
  try {
    const orderDelete = await deleteOrder (req.params.id);

      if (!orderDelete) {
      return res.status(404).json({
        message: "Commande non trouvé"
      });
    }
       res.status(200).json({
        message: "Commande supprimé avec succès",
        order: orderDelete,

      })
    
  } catch (error) {
        res.status (500).json({
            messsage: error.message,
        });

    }
};
