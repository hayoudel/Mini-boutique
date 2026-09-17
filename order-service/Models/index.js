import Order from "./orderModels.js";
import OrderItem from "./orderItemModels.js";

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "items",
  onDelete: "CASCADE",
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order",
});

export {
  Order,
  OrderItem
};