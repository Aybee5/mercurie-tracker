require("dotenv").config();
const axios = require("axios").default;
axios.defaults.baseURL =
  "https://private-anon-e8069cd652-gokada2.apiary-mock.com/api/developer";
const db = require("../settings/firebase");
const gokadaApi = process.env.GOKADA_API_KEY;
axios.defaults.data = {
  api_key: gokadaApi,
};

/**
 * @method POST /api/rate
 * 
 * This endpoint takes pickup_location and delivery_location and return the delivery rate information
 * 
 * @param {Number} pickup_latitude - Latitude of the pickup location
 * @param {Number} pickup_longitude - Longitude of the pickup location
 * @param {Number} delivery_latitude - Latitude of the delivery location
 * @param {Number} delivery_longitude - Longitude of the delivery location
 *
 * @returns {Object} Object containing the following details
 * @var {Boolean} status - The status of the request
 * @var {Number} distance - distance in KM, 
 * @var {Number} time - time in minutes, 
 * @var {Number} price - price in Naira
 */
module.exports.getQuoteRate = async (req, res) => {
  const orderDetails = ({
    pickup_latitude,
    pickup_longitude,
    delivery_latitude,
    delivery_longitude,
  } = req.body);
  try {
    const orderRate = await axios.post(`/order_estimate`, orderDetails);
    res.status(200).json({ status: true, orderdetails: orderRate.data });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: "Error fetching order estimate",
      error: error?.message,
    });
  }
};

/**
 * @method POST /api/order
 * 
 * This endpoint takes an order details and creates a delivery order
 * 
 * @param {string} pickup_address - Address of the pickup location
 * @param {string} delivery_address - Address of the delivery location
 * @param {Number} pickup_latitude - Latitude of the pickup location
 * @param {Number} pickup_longitude - Longitude of the pickup location
 * @param {Number} delivery_latitude - Latitude of the delivery location
 * @param {Number} delivery_longitude - Longitude of the delivery location
 * @param {string} pickup_name - The Name of the person to pick up the order
 * @param {string} delivery_name - The Name of the person to deliver the order
 * @param {string} pickup_phone - The phone number of the person to pick up the order
 * @param {string} delivery_phone - The phone number of the person to deliver the order
 * @param {string} pickup_email - The email of the person to pick up the order
 * @param {string} delivery_email - The email of the person to deliver the order
 * @param {string} description - The description of the order
 *
 * @return {Object} - The order details
 *
 */
module.exports.postOrder = async (req, res) => {
  const orderDetails = ({
    pickup_address,
    pickup_latitude,
    pickup_longitude,
    delivery_address,
    delivery_latitude,
    delivery_longitude,
    pickup_name,
    pickup_phone,
    pickup_email,
    delivery_name,
    delivery_phone,
    delivery_email,
    description,
  } = req.body);
  try {
    const order = await axios.post(`/order_create`, orderDetails);
    const { api_key, ...toSave } = { ...orderDetails, ...order.data };
    db.push(toSave);
    res.status(201).json({ status: true, order: toSave, msg: "Order has been created successfully" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error posting order",
      error: error?.message,
    });
  }
};

/**
 * @method POST /api/order/:id
 * 
 * This endpoint returns the order status of a specific order
 * 
 * @param {string} order_id - The id of the order to inqury
 *
 * @returns {Object} - The order details
 */
module.exports.getOrderStatus = async (req, res) => {
  const { id } = req.params;
  const order = {
    order_id: id,
  };
  try {
    const result = await axios.post("/order_status", order);
    res.status(200).json({status: true, orderStatus:result.data});
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching order status",
      error: error?.message,
    });
  }
};

/**
 * @method GET /api/all_orders
 * 
 * This endpont returns all the orders in the database
 * 
 * 
 */
module.exports.allOrders = async (req, res) => {
  try {
    const orders = await db.getAll();
    res.status(200).json({ status: true, orders });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error fetching orders",
      error: error?.message,
    });
  }
};
