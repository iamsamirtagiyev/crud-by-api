const api = 'https://northwind.vercel.app/api/products'
const addName = document.querySelector('.add-name')
const addPrice = document.querySelector('.add-price')
const addStock = document.querySelector('.add-stock')
const addBtn = document.querySelector('.add-btn')
const container = document.querySelector('.container')
const loader = document.querySelector('.loader')

addBtn.onclick = () => {
    if (addName.value != '' && addPrice.value != '' && addStock.value != '') {
        loader.style.display = 'flex'
        axios.post(api, {
            name: addName.value.trim(),
            unitPrice: addPrice.value.trim(),
            unitsInStock: addStock.value.trim()
        }).then(res => {
            setTimeout(() => {
                window.location = 'index.html'
            }, 3000);
            loader.style.display = 'none'
            alert('success', `${res.data.id} ID-li məhsul uğurla əlavə olundu. Ana səhifəyə yönləndirilirsiniz...`)

        })
    }
    else {
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