const mongoose = require("mongoose");
const { ProductCart, Order } = require("../models/order");

//get order by id param
exports.getOrderById = (req, res, id, next) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "not find any order",
        });
      }
      req.order = order;
      next();
    });
};

//create order
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  // console.log(order);
  order.save((err, order) => {
    if (err) {
      res.status(400).json({
        error: "not able to save order in db",
      });
    }
    res.json(order);
  });
};

//get all orders
exports.listOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "not able to list all orders",
        });
      }
      res.json(orders);
    });
};

//get order status
exports.getOrderStatus = (req, res) => {
  return res.json(Order.schema.path("status").ennumValues);
};

//update order
exports.updateOrderStatus = (req, res) => {
  Order.updateOne(
    { _id: req.order._id },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "order status cannot be updated",
        });
      }     
      res.json(order);
    }
  );
};
