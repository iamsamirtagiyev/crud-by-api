let id  = new URLSearchParams(window.location.search).get('id')
const loader = document.querySelector('.loader')
const container = document.querySelector('.container')

loader.style.display = 'flex'

fetch(`https://northwind.vercel.app/api/products/${id}`).then(response => response.json())
.then(data => {
    loader.style.display = 'none'
    container.innerHTML += `
        <h1>${data.name}</h1>
        <div class="product-wrapper">
            <span>Məhsulun Qiyməti: ${data.unitPrice}</span>
            <span>Stock: ${data.unitsInStock}</span>
            <span>Qbalaşdırma: ${data.quantityPerUnit
            }</span>
        </div>`
})