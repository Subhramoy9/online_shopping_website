const express = require("express");
const router = express.Router()
const {createProduct, getProducts,getProductDetails,updateProduct,deleteProduct,createReview,deleteReview}=require('../funcs/ProductFuncs');
const {authenticatedUser,role}=require('../middlewares/auth');

router.route('/admin/createproduct').post(authenticatedUser,role,createProduct);
router.route('/getProducts').get(getProducts);
router.route('/getProductDetails/:id').get(getProductDetails);
router.route('/admin/updateProduct/:id').put(authenticatedUser,role,updateProduct);
router.route('/admin/deleteProduct/:id').delete(authenticatedUser,role,deleteProduct);
router.route('/createReview').put(authenticatedUser,createReview);
router.route('/deleteReview').delete(authenticatedUser,deleteReview);

module.exports = router;

