const form = document.getElementById('form');
const input = document.getElementById('input');
const itemsList = document.getElementById('items');
const btn = document.getElementById('btn');

//LOCAL STORAGE
const item = JSON.parse(localStorage.getItem('items'));

if (item) {
    item.forEach(el => addItem(el));
}

// EVENT LISTENERS
form.addEventListener('submit', (e) => {
    e.preventDefault();

    addItem()
})

btn.addEventListener('click', () => {
    clearList();
})

// ADD ITEM FUNCTION
function addItem(items) {
    let itemText = input.value;

    if (items) {
        itemText = items.text 
    }
    //Creates new li items and appends to DOM
    if(itemText) {
        const itemEl = document.createElement('li');
        if(items && items.completed) {
            itemEl.classList.add('completed');
        }

        itemEl.innerText = itemText;

        // Implements completed class (line-through for checked off items)
        itemEl.addEventListener('click', () => {
            itemEl.classList.toggle('completed')
            updateLocalStorage();
        });

        // Implements item deletion with right click
        itemEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            itemEl.remove()

            updateLocalStorage();
        });

        itemsList.appendChild(itemEl);

        input.value = '';

        updateLocalStorage()
    }
}


// Appends items to local storage 
function updateLocalStorage() {
    let itemsEl = document.querySelectorAll('li');

    const items = [];

    itemsEl.forEach(el => {
        items.push({
            text: el.innerText,
            completed: el.classList.contains('completed')
        })
    })

    localStorage.setItem('items', JSON.stringify(items))
}

// clears list
function clearList() {
    let clrItem = document.querySelectorAll('li');
    for (var i = 0; i< clrItem.length; i++) {
        clrItem[i].remove();
    }
    updateLocalStorage();
}