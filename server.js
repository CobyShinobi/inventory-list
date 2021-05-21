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

app.listen(PORT, () => {
    console.log("Server is running, better catch it!")
})