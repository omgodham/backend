const express =require('express');
const router = express.Router();


const {getUserById,pushOrderInUserPurchaseList} = require('../controllers/user');
const {isSignedIn,isAuthenticate,isAdmin} = require('../controllers/auth');
const {updateStock} = require('../controllers/product');
const {getOrderById , createOrder , listOrders ,getOrderStatus,updateOrderStatus} = require('../controllers/order');

//params
router.param('userId',getUserById);
router.param('orderId',getOrderById);

//write routers 
router.post('/order/create/:userId',isSignedIn,isAuthenticate,pushOrderInUserPurchaseList,updateStock,createOrder);


//read routers
router.get('/order/list/:userId',isSignedIn,isAuthenticate,isAdmin,listOrders);
router.get('/order/status/:orderId',isSignedIn,isAuthenticate,isAdmin,getOrderStatus);

//update routers
router.put('/order/:orderId/status/:userId',isSignedIn,isAuthenticate,isAdmin,updateOrderStatus)
module.exports = router;