const express = require("express");
const router = express.Router();

const {registerUser,loginUser,findSingleUser,updateUserRole,findUsers, updateUser,forgotPassword,resetPassword,logout, removeUser}=require('../funcs/UserFuncs');
const {authenticatedUser,role}=require('../middlewares/auth');

router.route('/createuser').post(registerUser);
router.route('/loginuser').post(loginUser);
router.route('/findSingleUser/:id').get(authenticatedUser,role,findSingleUser);
router.route('/updateUserRole/:id').put(authenticatedUser,role,updateUserRole);
router.route('/getUsers').get(authenticatedUser,role,findUsers);
router.route('/updateUser/:id').put(authenticatedUser,role,updateUser);
router.route('/forgotPass').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/logout').get(logout);
router.route('/removeUser/:id').delete(authenticatedUser,role,removeUser);
module.exports = router;