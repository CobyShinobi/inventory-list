const deleteBtn = document.querySelectorAll(".del")
const inventoryItem = document.querySelectorAll("span.not")
const itemComplete = document.querySelectorAll("span.completed")

Array.from(deleteBtn).forEach((el) => {
    el.addEventListener("click", deleteItem)
})

Array.from(inventoryItem).forEach((el) => {
    el.addEventListener("click", completeItem)
})

Array.from(itemComplete).forEach((el) => {
    el.addEventListener("click", undo)
})

async function deleteItem() {
    const itemId = this.parentNode.dataset.id
    try{
        const response = await fetch("inventory/deleteItem", {
            method: "delete",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "itemIdFromJSFile": itemId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function completeItem() {
    const itemId = this.parentNode.dataset.id
    try{
        const response = await fetch("inventory/completeItem", {
            method: "put",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "itemIdFromJSFile": itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function undo() {
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch("inventory/undo", {
            method: "put",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "itemIdFromJSFile": itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}