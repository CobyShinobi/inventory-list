const express = require("express")
const router = express.Router()
const inventoryController = require("../controllers/inventory")

router.get("/", inventoryController.getInventory)

router.post("/createItem", inventoryController.createItem)

router.put("/completeItem", inventoryController.completeItem)

router.put("/undo", inventoryController.undo)

router.delete("/deleteItem", inventoryController.deleteItem)

module.export = router