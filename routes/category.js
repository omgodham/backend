const express = require('express');
const router = express.Router();

const {getCategoryById,createCategory,getCategory,updateCategory,removeCategory,getAllCategories} = require('../controllers/category');
const {getUserById} = require('../controllers/user');
const {isSignedIn,isAuthenticate,isAdmin} = require('../controllers/auth');

//param routers
router.param('categoryId',getCategoryById);
router.param('userId',getUserById);

//write routers
router.post('/category/create/:userId',isSignedIn,isAuthenticate,isAdmin,createCategory);


//read routers
router.get('/category/:categoryId',getCategory)
router.get('/categories',getAllCategories)

//update routers
router.put('/category/:categoryId/:userId',isSignedIn,isAuthenticate,isAdmin,updateCategory)

//delete routers
router.delete('/category/:categoryId/:userId',isSignedIn,isAuthenticate,isAdmin,removeCategory)


module.exports = router;