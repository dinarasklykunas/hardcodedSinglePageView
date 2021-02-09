const id = new URLSearchParams(location.search).get('id');
const editItemForm = document.querySelector('#editItemForm');
const alertMessage = document.querySelector('#alert');

const { title, date, image, content, submitButton, deleteButton } = editItemForm.elements;

const itemsUrl = 'http://localhost:3000/items';

function fillInFormFields() {
    if (!id)
        return;

    fetch(`http://localhost:3000/items/${id}`)
    .then(res => {
        return res.status !== 200 ? showAlert(res.statusText, 'danger') : res.json();
    })
    .then(data => {
        if (!data)
            return;

        title.value = data.title || '';
        date.value = data.date || '';
        image.value = data.image || '';
        content.value = data.content || '';
    })
    .catch(err => showAlert(err, 'danger'));
}

function handleEditSubmit(e) {
    e.preventDefault();

    if (!id)
        return;

    if (!title.value || !date.value || !image.value || !content.value) {
        showAlert('All fields must be entered!', 'danger');
        return;
    }

    let item = {
        title: title.value,
        date: date.value,
        image: image.value,
        content: content.value
    };

    submitButton.disabled = true;

    fetch(`${itemsUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(res => {
        submitButton.disabled = false;
        return res.status !== 200 ?
            showAlert(res.statusText, 'danger') : showAlert('Item was updated!', 'success');
    })
    .catch(err => {
        submitButton.disabled = false;
        showAlert(err, 'danger');
    });
}

function handleDelete() {
    if (!id)
        return;
    
    if (!confirm('Do you really want to delete this item?'))
        return;
    
    deleteButton.disabled = true;

    fetch(`${itemsUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        if (res.status !== 200) {
            deleteButton.disabled = false;
            return showAlert(res.statusText, 'danger');
        }

        deleteButton.disabled = false;
        showAlert('Item was deleted!', 'success');
        id = 0;
        editItemForm.reset();
        setTimeout(() => {
            location.href = 'index.html';
        }, 1000);
    })
    .catch(err => {
        deleteButton.disabled = false;
        showAlert(err, 'danger');
    });
}

function showAlert(message, type) {
    alertMessage.innerText = message;
    alertMessage.classList = ['alert'];
    alertMessage.classList.add('alert-' + type);

    setTimeout(() => {
        resetAlert();
    }, 3000);
}

function resetAlert() {
    alertMessage.innerText = '';
    alertMessage.classList = [];
}

document.addEventListener('DOMContentLoaded', fillInFormFields);
editItemForm.addEventListener('submit', e => { handleEditSubmit(e); });
deleteButton.addEventListener('click', handleDelete);