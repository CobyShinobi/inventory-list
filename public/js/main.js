const deleteBtn = document.querySelectorAll(".del")

Array.from(deleteBtn).forEach((el) => {
    el.addEventListener("click", deleteItem)
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