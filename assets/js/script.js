const api = 'https://northwind.vercel.app/api/products' // My API
const tbody = document.querySelector('tbody')
const thead = document.querySelector('thead')
const loader = document.querySelector('.loader')
const searchInput = document.querySelector('#search')

loader.style.display = 'flex'

thead.style.display = 'none'
fetch(api).then(response => {
    loader.style.display = 'none'
    thead.style.display = 'table-header-group'
    return response.json()
}).then(data => {
    data.forEach(item => {
        tbody.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td onclick="goToInfo(${item.id})">${item.name}</td>
            <td>${item.unitPrice}</td>
            <td>${item.unitsInStock}</td>
            <td>
                <a href="update.html?id=${item.id}">Update</a>
                <button onclick="deleteProduct(${item.id})">Delete</button>
            </td>
        </tr>`
    });

    searchInput.oninput = () => {
        let searchValue = searchInput.value.trim().toUpperCase()
        tbody.innerHTML = ''
        data.forEach(item => {
            if (item.name.toUpperCase().includes(searchValue)) {
                tbody.innerHTML += `
                <tr>
                    <td>${item.id}</td>
                    <td onclick="goToInfo(${item.id})">${item.name}</td>
                    <td>${item.unitPrice}</td>
                    <td>${item.unitsInStock}</td>
                    <td>
                        <a href="update.html?id=${item.id}">Update</a>
                        <button onclick="deleteProduct(${item.id})">Delete</button>
                    </td>
                </tr>`
            }
        })
    }
})


const deleteProduct = (id) => {
    alert('success', `${id} ID-li məhsul silindi.`)
    axios.delete(`${api}/${id}`).then(response => {
        window.location.reload()
    })
}

const alert = (type, message) => {
    document.querySelector(`.${type}Message`).classList.add('active')
    document.querySelector(`.${type}Message`).textContent = message
    setTimeout(() => {
        document.querySelector(`.${type}Message`).classList.remove('active')
    }, 3000);
}

const goToInfo = (id) => {
    window.location = `info.html?id=${id}`
}