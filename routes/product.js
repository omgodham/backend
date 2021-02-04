const express = require('express');
const router = express.Router();

const {isSignedIn,isAuthenticate,isAdmin} = require('../controllers/auth')
const {getUserById} = require('../controllers/user')
const {getProductById , createProduct ,getProduct , deleteProduct , updateProduct , getAllProducts, getAllUniqueCategories ,photo} = require('../controllers/product')
//all params
router.param('userId',getUserById);
router.param('productId',getProductById);


//post 
router.post('/product/create/:userId',isSignedIn,isAuthenticate,isAdmin,createProduct);

//get 
router.get('/product/:productId',getProduct);
router.get('/products',getAllProducts);
router.get('/products/categories',getAllUniqueCategories);
router.get("/product/photo/:productId", photo);

//delete 
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticate,isAdmin,deleteProduct);

//update
router.put('/product/:productId/:userId',isSignedIn,isAuthenticate,isAdmin,updateProduct);


module.exports = router;