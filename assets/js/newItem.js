const newItemForm = document.querySelector('#newItemForm');
const alertMessage = document.querySelector('#alert');

const { title, date, image, content, submitButton } = newItemForm.elements;

const itemsUrl = 'http://localhost:3000/items';

function handleNewItemSubmit(e) {
    e.preventDefault();

    if (!title.value || !date.value || !image.value || !content.value) {
        showAlert('All fields must be entered!', 'danger');
        return;
    }

    handleCreate(title.value, date.value, image.value, content.value);
}

function handleCreate(title, date, image, content) {
    let item = {
        title, date, image, content
    };

    submitButton.disabled = true;

    fetch(itemsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(res => {
        if (res.status !== 201) {
            submitButton.disabled = false;
            return showAlert(res.statusText, 'danger');
        }
        
        submitButton.disabled = false;
        showAlert('Item was created!', 'success');
        newItemForm.reset();
    })
    .catch(() => {
        submitButton.disabled = false;
        showAlert('Server error', 'danger');
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

newItemForm.addEventListener('submit', e => { handleNewItemSubmit(e); });