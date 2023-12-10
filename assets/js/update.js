let id = new URLSearchParams(window.location.search).get('id')
const updateName = document.querySelector('.update-name')
const updatePrice = document.querySelector('.update-price')
const updateStock = document.querySelector('.update-stock')
const updateBtn = document.querySelector('.update-btn')
const productId = document.querySelector('tbody tr td:first-child')
const container = document.querySelector('.container')
const table = document.querySelector('.table')
const loader = document.querySelector('.loader')

table.style.display = 'none'
loader.style.display = 'flex'

fetch(`https://northwind.vercel.app/api/products/${id}`).then(response => {
    table.style.display = 'block'
    loader.style.display = 'none'
    return response.json()
}).then(data => {
    productId.innerHTML = data.id
    updateName.value = data.name
    updatePrice.value = data.unitPrice
    updateStock.value = data.unitsInStock
})

updateBtn.onclick = () => {
    if (updateName.value != '' && updatePrice.value != '' && updateStock.value != ''){
        axios.patch(`https://northwind.vercel.app/api/products/${id}`, {
            name: updateName.value.trim(),
            unitPrice: updatePrice.value.trim(),
            unitsInStock: updateStock.value.trim()
        }).then(response => {
            loader.style.display = 'flex'
            alert('success', `${response.data.id} ID-li məhsul uğurla dəyişdirildi. Ana səhifəyə yönləndirilirsiniz...`)
            setTimeout(() => {
                window.location = 'index.html'
            }, 3000);
        })
    }
    else{
        alert('error', 'Xanaları doldurmağınız şərtdir!!!')
    }
}

const alert = (type, message) => {
    document.querySelector(`.${type}Message`).classList.add('active')
    document.querySelector(`.${type}Message`).textContent = message
    setTimeout(() => {
        document.querySelector(`.${type}Message`).classList.remove('active')
    }, 3000);
}

