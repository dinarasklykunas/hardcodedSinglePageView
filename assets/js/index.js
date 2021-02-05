let itemsDisplayPlace = document.querySelector('#itemsDisplayPlace');

function displayItems() {
    fetch('http://localhost:3000/items')
    .then(res => res.json())
    .then(data => {
        data.forEach(item => {
            itemsDisplayPlace.innerHTML += `
                <article class="d-flex justify-content-center align-items-center">
                    <a href="edit.html?id=${item.id}">
                        <img src="${item.image}" alt="${item.title}">
                        <h4>${item.title}</h4>
                        <p>${item.content}</p>
                    </a>
                </article>
            `;
        });
    })
    .catch(err => console.error(`Error: ${err}`));
}

document.addEventListener('DOMContentLoaded', displayItems);