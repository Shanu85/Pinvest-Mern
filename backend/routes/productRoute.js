const express=require('express')
const { createProduct, getProducts,getProduct,deleteProduct, updateProduct} = require('../controllers/productController')
const protect = require("../middlewares/authMiddleWare");
const {upload} = require('../utils/fileupload');
const router=express.Router()

router.post('/',protect,upload.single("image"),createProduct)
router.patch('/:id',protect,upload.single("image"),updateProduct)
router.get('/',protect,getProducts)
router.get('/:id',protect,getProduct)
router.delete('/:id',protect,deleteProduct)

module.exports=router;  