import { createProducts,getAllProducts,getByIdProducts,updateProducts,deleteProducts,decreaseStock } from "../Services/productServices.js";

export const creatProductsControllers = async (req,res) => {
      try {
    const product = await createProducts(req.body);

    res.status(201).json({
      message: "produit créé avec succès",
      product: {
        id: product.id,
        nom: product.nom,
        description: product.description,
        prix: product.prix,
        stock:product.stock,
        photo: product.photo
      }
    });

  } catch (error) {
    res.status(500).json({
     message: error.message,
    });
  }
}

export const getAllProductsControllers = async (req, res) => {

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

        const result = await getAllProducts(page, limit);

        res.status(200).json({
            message: "Produits récupérés avec succès",

            products: result.products,

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

export const getByIdProductsControllers = async (req,res) =>{
  try {
    const product = await getByIdProducts (req.params.id);

     if (!product) {
      return res.status(404).json({
        message: "Produit non trouvé"
      });
    }
     res.status(200).json({
      message: "produit recuperer avec succès",
      product
    });
    
  } catch (error) {
    res.status(500).json({
     message: error.message,
    });
  }
};

export const updateProductsControllers = async (req,res) => {
  try {
      const productUpdate = await updateProducts(
        req.params.id,
        req.body
      );

        if (!productUpdate) {
      return res.status(404).json({
        message: "Produits non trouvé"
      });
    }
      res.status(200).json({
        message: "Produit modifié",
        Product: productUpdate,

      })
    }catch (error) {
        res.status (500).json({
            message: error.message,
        });

    }
};

export const deleteProductsControllers = async(req,res) => {
  try {
    const productDelete = await deleteProducts (req.params.id);

      if (!productDelete) {
      return res.status(404).json({
        message: "Produits non trouvé"
      });
    }
       res.status(200).json({
        message: "Produit supprimé avec succès",
        Product: productDelete,

      })
    
  } catch (error) {
        res.status (500).json({
            messsage: error.message,
        });

    }
};
export const decreaseStockController = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        message: "La quantité doit être supérieure à 0"
      });
    }

    const product = await decreaseStock(id, quantity);

    if (!product) {
      return res.status(404).json({
        message: "Produit non trouvé"
      });
    }

    return res.status(200).json({
      message: "Stock diminué avec succès",
      product
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};