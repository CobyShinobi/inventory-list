const deleteBtn = document.querySelectorAll(".del")
const inventoryItem = document.querySelectorAll(".inventoryItem span")
const itemComplete = document.querySelectorAll(".inventoryItem span.completed")

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
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch("deleteItem", {
            method: "delete",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "rainbow": itemText
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
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch("completeItem", {
            method: "put",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "rainbow": itemText
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
        const response = await fetch("undo", {
            method: "put",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "rainbow": itemText
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}