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

app.get("/", (req, res) => {
    db.collection("inventory").find().toArray()
    .then(data => {
        res.render("index.ejs", {unicorn: data})
    })
})

app.post("/createItem", (req, res) => {
    db.collection("inventory").insertOne({item: req.body.inventoryItem, completed: false})
    .then(result => {
        console.log("An item has been added!")
        res.redirect("/")
    })
})

app.delete("/deleteItem", (req, res) => {
    db.collection("inventory").deleteOne({item: req.body.rainbow})
    .then(result => {
        console.log("Deleted dat item")
        res.json("Deleted It")
    })
    .catch(err => console.log(err))
})

app.listen(PORT, () => {
    console.log("Server is running, better catch it!")
})