import Products from "../Models/productModels.js";

export const createProducts = async (productData) => {
    
    const products = await Products.create(
        productData
    );
    return products

};
export const getAllProducts = async (page = 1, limit = 10) => {

    const offset = (page - 1) * limit;

    const { count, rows } = await Products.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]]
    });

    return {
        products: rows,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        itemsPerPage: limit
    };
};

export const getByIdProducts = async (id) => {
    const products = await Products.findByPk(id);

  if (!products) {
    return null;
  }
  return products;
};


export const updateProducts = async (id,productData) => {
    const products = await Products.findByPk(id);

    if (!products) {
    return null;
  }
  const allowedFields = [
  "nom",
  "description",
  "prix",
  "stock",
  "photo"
];

const data = {};

for (const field of allowedFields) {
  if (productData[field] !== undefined) {
    data[field] = productData[field];
  }
}

  await products.update(data);
  return products;
};


export const deleteProducts = async (id) => {
    const products = await Products.findByPk(id);
    
    if (!products) {
    return null;
  }
  await products.destroy();
  return products;
};

export const decreaseStock = async (productId, quantity) => {

  if (!quantity || quantity <= 0) {
    throw new Error("La quantité doit être supérieure à 0");
  }


  const product = await Products.findByPk(productId);

  if (!product) {
    return null;
  }


  if (product.stock < quantity) {
    throw new Error(
      `Stock insuffisant pour le produit ${product.nom}`
    );
  }
  product.stock = product.stock - quantity;

  await product.save();

  return product;
};