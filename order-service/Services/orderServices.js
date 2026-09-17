import { Order, OrderItem } from "../Models/index.js";

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

export const createOrder = async (userId, items) => {
  let total = 0;
  const orderItems = [];

   const userResponse = await fetch(
    `${USER_SERVICE_URL}/users/${userId}`
  );

  if (!userResponse.ok) {
    throw new Error(
      `L'utilisateur ${userId} n'existe pas`
    );
  }

  for (const item of items) {   
    const response = await fetch(
      `${PRODUCT_SERVICE_URL}/products/${item.productId}`
    );

    if (!response.ok) {
      throw new Error(
        `Le produit ${item.productId} n'existe pas`
      );
    }

    const data = await response.json();

    const product = data.product;


    if (product.stock < item.quantity) {
      throw new Error(
        `Stock insuffisant pour le produit ${product.nom}`
      );
    }

    const prix = Number(product.prix);
               
    const sousTotal = prix * item.quantity;

    total += sousTotal;

    orderItems.push({
      productId: product.id,
      quantity: item.quantity,
      prix: prix
    });
  }


  const order = await Order.create({
    userId,
    total,
    statut: "En attente"
  });


  for (const item of orderItems) {
    await OrderItem.create({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      prix: item.prix
    });
  }

  for (const item of orderItems) {

    const stockResponse = await fetch(
      `${PRODUCT_SERVICE_URL}/products/stock/${item.productId}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          quantity: item.quantity
        })
      }
    );


    if (!stockResponse.ok) {

      throw new Error(
        `Impossible de diminuer le stock du produit ${item.productId}`
      );
    }
  }

  return order;
};

export const getAllOrder =async (page = 1, limit = 10) => {

   const offset = (page - 1) * limit;

    const { count, rows } = await Order.findAndCountAll({
        limit,
        offset,
        order: [["createdAt", "DESC"]]
    });

    return {
        order: rows,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        itemsPerPage: limit
    };

};

export const getOrderById = async (id) => {
  const order = await Order.findByPk(id,{
    include: [
    {
      model: OrderItem,
      as: "items"
    }
  ]
  });
 
  if (!order) {
    return null;
  }
  return order;
};


export const updateOrder = async (id,productData) => {
    const order = await Order.findByPk(id);

    if (!order) {
    return null;
  }
  const allowedFields = [
  "statut",
];

const data = {};

for (const field of allowedFields) {
  if (productData[field] !== undefined) {
    data[field] = productData[field];
  }
}

  await order.update(data);
  return order;
};


export const deleteOrder= async (id) => {
    const order = await Order.findByPk(id);
    
    if (!order) {
    return null;
  }
  await order.destroy();
  return order;
};

