function Book(bookname, author, isbn){
    this.bookname = bookname;
    this.author = author;
    this.isbn = isbn; 
}
function UI(){
}
const ui = new UI();
const tableBody = document.querySelector('tbody');


UI.prototype.addBook = function(book){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.bookname}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`
    tableBody.appendChild(row);
    ui.showAlert("Book Added!","success");
}

UI.prototype.deleteBook = function(target){
    if(target.className === "delete")
    {
        target.parentElement.parentElement.remove();
        ui.showAlert("Book Deleted!","error");
    }
}

UI.prototype.showAlert = function(message, classname){
    const container = document.querySelector('.container');
    const msgDiv = document.createElement('div');
    msgDiv.className = classname;
    msgDiv.textContent = message;
    container.insertBefore(msgDiv, document.querySelector('.book-list'));
    setTimeout(() => {
        container.children[1].remove();
    }, 2000);
}
// adding a book
const addBtn = document.querySelector('.btn');
addBtn.addEventListener('click', function(e){
    e.preventDefault();
    const bookname = document.querySelector('#bookname').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    if(bookname.value != '' && author.value != '' && isbn.value != '')
    {
        const book = new Book(bookname.value, author.value, isbn.value);
        ui.addBook(book);
        bookname.value = '';
        author.value = '';
        isbn.value = '';
    }
    else
    {
        ui.showAlert("Please enter all the details!", "error");
    }
})
// deleting a book
const table = document.querySelector('table');
table.addEventListener('click', function(e){
    ui.deleteBook(e.target);
})