const api = 'https://northwind.vercel.app/api/products' // My API
const tbody = document.querySelector('tbody')
const thead = document.querySelector('thead')
const loader = document.querySelector('.loader')
const searchInput = document.querySelector('#search')

fetch(api).then(response => {
    loader.style.display = 'none'
    thead.style.display = 'table-header-group'
    return response.json()
}).then(data => {
    console.log(data);
    data.forEach(item => {
        tbody.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.unitPrice}</td>
            <td>${item.unitsInStock}</td>
            <td>
                <button>Update</button>
                <button>Delete</button>
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
                    <td>${item.name}</td>
                    <td>${item.unitPrice}</td>
                    <td>${item.unitsInStock}</td>
                    <td>
                        <button>Update</button>
                        <button>Delete</button>
                    </td>
                </tr>`
            }
        })
    }
})