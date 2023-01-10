const productController = require("../controllers/products.controller");
const categoryController = require("../controllers/categories.controller");
const userController = require("../controllers/users.controller")
const sliderController = require("../controllers/slider.controller")
const relatedProduct = require("../controllers/related-products.controller")
const cartController = require("../controllers/cart.controller")
const orderController = require("../controllers/order.controller")
const adminController = require("../controllers/adminController")
const { authenticateToken } = require("../middleware/auth")
const express = require("express");
const router = express.Router();

router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findOne);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);

router.post("/product", productController.create);
router.get("/product", productController.findAll);
router.get("/product/:id", productController.findOne);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/login", userController.findAll);
router.delete("/login", userController.delete);


router.post("/slider", sliderController.create);
router.get("/slider", sliderController.findAll);
router.get("/slider/:id", sliderController.findOne);
router.put("/slider/:id", sliderController.update);
router.delete("/slider/:id", sliderController.delete);

router.post("/relatedProduct", relatedProduct.create);
router.delete("/relatedProduct/:id", relatedProduct.delete);

router.post("/cart", [authenticateToken], cartController.create);
router.get("/cart", [authenticateToken], cartController.findAll);
router.delete("/cart", [authenticateToken], cartController.delete);

router.post("/order", [authenticateToken], orderController.create);
router.get("/order", orderController.findAll);
router.put("/order", orderController.update)
router.get("/orderAll", orderController.findAll);
router.delete("/orderAll", orderController.delete);

module.exports = router;