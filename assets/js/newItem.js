const newItemForm = document.querySelector('#newItemForm')
const alertMessage = document.querySelector('#alert')

function handleNewItemSubmit(e) {
    e.preventDefault()
    let title = newItemForm.elements['title'].value
    let date = newItemForm.elements['date'].value
    let image = newItemForm.elements['image'].value
    let content = newItemForm.elements['content'].value

    if (!title || !date || !image || !content) {
        showAlert('All fields must be entered!', 'danger')
        return
    }

    handleCreate(title, date, image, content)
}

function handleCreate(title, date, image, content) {
    let item = {
        title, date, image, content
    }

    fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then(res => {
        if (res.status !== 201)
            return showAlert(res.statusText, 'danger')
        
        showAlert('Item was created!', 'success')
        newItemForm.reset()
    })
    .catch(err => showAlert('Server error', 'danger'))
}

function showAlert(message, type) {
    alertMessage.innerText = message
    alertMessage.classList = ['alert']
    alertMessage.classList.add('alert-' + type)

    setTimeout(() => {
        resetAlert()
    }, 3000);
}

function resetAlert() {
    alertMessage.innerText = ''
    alertMessage.classList = []
}

newItemForm.addEventListener('submit', e => { handleNewItemSubmit(e) })