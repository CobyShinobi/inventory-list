const Item = require("../models/item")

module.exports = {
    getInventory: async (req, res) => {
        try {
            const inventoryItems = await Item.find()
            const itemsLeft = await Item.countDocuments({completed: false})
            res.render("inventory.ejs", {items: inventoryItems, left: itemsLeft})
        } catch(err) {
            console.log(err)
        }
    },

    createItem: async (req, res) => {
        try {
            await Item.create({item: req.body.inventoryItem, completed: false})
            console.log("Added item!")
            res.redirect("/inventory")
        } catch(err) {
            console.log(err)
        }
    },

    completeItem: async (req, res) => {
        try {
            await Item.findOneAndUpdate({_id: req.body.itemIdFromJSFile}, {completed: true})
            console.log("Completed item!")
            res.json("Marked Complete")
        } catch(err) {
            console.log(err)
        }
    },

    undo: async (req, res) => {
        try {
            await Item.findOneAndUpdate({_id: req.body.itemIdFromJSFile}, {completed: false})
            console.log("Undo completion of item!")
            res.json("Marked Incomplete")
        } catch(err) {
            console.log(err)
        }
    },
    
    deleteItem: async (req, res) => {
        try {
            await Item.findOneandDelete({_id: req.body.itemIdFromJSFile})
            console.log("Deleted item!")
            res.json("Deleted Item")
        } catch(err) {
            console.log(err)
        }
    }
}