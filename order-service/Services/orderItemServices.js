import { Order, OrderItem } from "../Models/index.js";

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

export const createOrderItem = async (orderId,productId,quantity) => {
 
  const order = await Order.findByPk(orderId);

  if (!order) {
    throw new Error(`La commande ${orderId} n'existe pas`);
  }

  const response = await fetch(
    `${PRODUCT_SERVICE_URL}/products/${productId}`
  );

  if (!response.ok) {
    throw new Error(`Le produit ${productId} n'existe pas`);
  }

  const data = await response.json();
  const product = data.product;

  
  if (!quantity || quantity <= 0) {
    throw new Error("La quantité doit être supérieure à 0");
  }

 
  if (product.stock < quantity) {
    throw new Error(
      `Stock insuffisant pour le produit ${product.nom}`
    );
  }

  
  const prix = Number(product.prix);


  const orderItem = await OrderItem.create({
    orderId,
    productId: product.id,
    quantity,
    prix
  });


  const sousTotal = prix * quantity;

  const nouveauTotal =
    Number(order.total) + sousTotal;

  await order.update({
    total: nouveauTotal
  });

  return orderItem;
};



export const getAllOrderItems = async (orderId) => {

  const order = await Order.findByPk(orderId);

  if (!order) {
    throw new Error(`La commande ${orderId} n'existe pas`);
  }


  const orderItems = await OrderItem.findAll({
    where: {
      orderId
    }
  });

  return orderItems;
};



export const getOrderItemById = async (id) => {
  const orderItem = await OrderItem.findByPk(id);

  if (!orderItem) {
    return null;
  }

  return orderItem;
};



export const updateOrderItem = async (id, itemData) => {

  const orderItem = await OrderItem.findByPk(id);

  if (!orderItem) {
    return null;
  }

  if (itemData.quantity === undefined) {
    throw new Error("La quantité est obligatoire");
  }

  if (itemData.quantity <= 0) {
    throw new Error(
      "La quantité doit être supérieure à 0"
    );
  }


  const order = await Order.findByPk(orderItem.orderId);

  if (!order) {
    throw new Error(
      `La commande ${orderItem.orderId} n'existe pas`
    );
  }


  const ancienSousTotal =
    Number(orderItem.prix) * orderItem.quantity;


  const nouveauSousTotal =
    Number(orderItem.prix) * itemData.quantity;


  const difference =
    nouveauSousTotal - ancienSousTotal;


  orderItem.quantity = itemData.quantity;

  await orderItem.save();

  const nouveauTotal =
    Number(order.total) + difference;

  await order.update({
    total: nouveauTotal
  });

  return orderItem;
};



export const deleteOrderItem = async (id) => {

  const orderItem = await OrderItem.findByPk(id);

  if (!orderItem) {
    return null;
  }

  const order = await Order.findByPk(orderItem.orderId);

  if (!order) {
    throw new Error(
      `La commande ${orderItem.orderId} n'existe pas`
    );
  }

  const sousTotal =
    Number(orderItem.prix) * orderItem.quantity;


  await orderItem.destroy();

  const nouveauTotal =
    Number(order.total) - sousTotal;

  await order.update({
    total: nouveauTotal
  });

  return orderItem;
};