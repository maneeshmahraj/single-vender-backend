const express=require("express");
const router=express.Router();
const paymentController=require("../controllers/paymentController")

router.post("/payment",paymentController.paymentData)
router.post("/checkout",paymentController.checkOut)
router.post("/searchproduct",paymentController.searchProduct)
module.exports=router;
