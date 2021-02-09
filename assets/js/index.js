const itemsDisplayPlace = document.querySelector('#itemsDisplayPlace');
const itemsUrl = 'http://localhost:3000/items';

function displayItemsFetch() {
    fetch(itemsUrl)
    .then(res => res.json())
    .then(data => {
        data.forEach(item => createArticle(item));
    })
    .catch(err => console.error(`Error: ${err}`));
}

async function displayItemsAsync() {
    let res = null;
    let data = [];

    try {
        res = await fetch(itemsUrl);
        data = await res.json();
    } catch (err) {
        return console.error(`Error: ${err}`);
    }
    
    if (res.status !== 200)
        return console.error('Error: Server returned status was not 200 (OK)');

    data.forEach(item => createArticle(item));
}

function createArticle(item) {
    const article = document.createElement('article');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');

    article.classList = 'd-flex justify-content-center align-items-center';
    a.href = `edit.html?id=${item.id}`;
    img.src = item.image;
    img.alt = item.title;
    h4.innerText = item.title;
    p.innerText = item.content;

    article.append(a);
    a.append(img, h4, p);
    
    itemsDisplayPlace.append(article);
}

document.addEventListener('DOMContentLoaded', displayItemsFetch);
// document.addEventListener('DOMContentLoaded', displayItemsAsync);