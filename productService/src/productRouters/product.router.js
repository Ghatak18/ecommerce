const express = require("express")
const { getAllProducts, getProduct, deleteProduct,addProduct } = require("../productControllers/product.controller")
const router = express.Router()
const verify = require('../authMiddleware/product.auth.js')


router.get("/allproducts", getAllProducts)
router.get("/getproduct/:id", getProduct)
router.delete("/deleteproduct/:id",verify, deleteProduct)
router.post('/addproduct',verify, addProduct)



module.exports = router
    