import {createOrderItem,getAllOrderItems,getOrderItemById,updateOrderItem,deleteOrderItem} from "../Services/orderItemServices.js";



export const createOrderItemController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { productId, quantity } = req.body;


    if (!productId) {
      return res.status(400).json({
        message: "productId est obligatoire"
      });
    }


    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        message: "La quantité doit être supérieure à 0"
      });
    }

    const orderItem = await createOrderItem(
      orderId,
      productId,
      quantity
    );

    return res.status(201).json({
      message: "Produit ajouté à la commande avec succès",
      orderItem
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};



export const getAllOrderItemsController = async (req, res) => {
  try {
    const { orderId } = req.params;

    const orderItems = await getAllOrderItems(orderId);

    return res.status(200).json({
      message: "Produits de la commande récupérés avec succès",
      orderItems
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};


export const getOrderItemByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const orderItem = await getOrderItemById(id);

    if (!orderItem) {
      return res.status(404).json({
        message: "Ligne de commande non trouvée"
      });
    }

    return res.status(200).json({
      message: "Ligne de commande récupérée avec succès",
      orderItem
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};



export const updateOrderItemController = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;


    if (quantity === undefined) {
      return res.status(400).json({
        message: "La quantité est obligatoire"
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        message: "La quantité doit être supérieure à 0"
      });
    }

    const orderItem = await updateOrderItem(
      id,
      { quantity }
    );

    if (!orderItem) {
      return res.status(404).json({
        message: "Ligne de commande non trouvée"
      });
    }

    return res.status(200).json({
      message: "Quantité modifiée avec succès",
      orderItem
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};



export const deleteOrderItemController = async (req, res) => {
  try {
    const { id } = req.params;

    const orderItem = await deleteOrderItem(id);

    if (!orderItem) {
      return res.status(404).json({
        message: "Ligne de commande non trouvée"
      });
    }

    return res.status(200).json({
      message: "Produit supprimé de la commande avec succès",
      orderItem
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};