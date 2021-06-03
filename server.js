const express = require("express")
const app = express()
const MongoClient = require("mongodb").MongoClient
const PORT = 1337

let db,
    dbConnectionStr = "mongodb+srv://shinobi:katana@cluster0.lp7t3.mongodb.net/inventory?retryWrites=true&w=majority",
    dbName = "inventory"

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Hey, connected to ${dbName} database!`)
        db = client.db(dbName)
    })
    .catch(err => {
        console.log(err)
    })

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/", async (req, res) => {
    const todoItems = await db.collection("inventory").find().toArray()
    const itemsLeft = await db.collection("inventory").countDocuments({completed: false})
    res.render("index.ejs", {unicorn: todoItems, left: itemsLeft})
})

app.post("/createItem", (req, res) => {
    db.collection("inventory").insertOne({item: req.body.inventoryItem, completed: false})
    .then(result => {
        console.log("Added item!")
        res.redirect("/")
    })
})

app.put("/completeItem", (req, res) => {
    db.collection("inventory").updateOne({item: req.body.rainbow}, {
        $set: {
            completed: true
        }
    })
    .then(result => {
        console.log("Completed item!")
        res.json("Marked Complete")
    })
})

app.put("/undo", (req, res) => {
    db.collection("inventory").updateOne({item: req.body.rainbow}, {
        $set: {
            completed: false
        }
    })
    .then(result => {
        console.log("Undo completion of item!")
        res.json("Marked Incomplete")
    })
})

app.delete("/deleteItem", (req, res) => {
    db.collection("inventory").deleteOne({item: req.body.rainbow})
    .then(result => {
        console.log("Deleted item!")
        res.json("Deleted Item")
    })
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
    console.log("Server is running, better catch it!")
})