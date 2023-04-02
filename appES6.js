class Book{
    constructor(bookname, author, isbn){
        this.bookname = bookname;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    addBook(book){  
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.bookname}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>`
    tableBody.appendChild(row);
    
    }

    deleteBook(target){
        if(target.className === "delete")
    {
        target.parentElement.parentElement.remove();
        ui.showAlert("Book Deleted!","error");
    }
    }

    showAlert(message, classname){
        
    const container = document.querySelector('.container');
    const msgDiv = document.createElement('div');
    msgDiv.className = classname;
    msgDiv.textContent = message;
    container.insertBefore(msgDiv, document.querySelector('.book-list'));
    setTimeout(() => {
        container.children[1].remove();
    }, 2000);
    }
}

class Store{
    static getBooks()
    {
        let books;
        if(localStorage.getItem('books') === null)
        {
            books = [];
        }
        else
        {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static displayBooks(){
        const books = Store.getBooks();
        const ui = new UI();
        books.forEach(function(book){
            ui.addBook(book);
        });
    }
    static addbooks(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static deleteBooks(ISBN){
        const books = Store.getBooks();
        const bookIndex = books.forEach(function(bk, index){
            if(bk.isbn === ISBN)
            return index;
        });
        books.splice(bookIndex, 1);
        localStorage.setItem('books', JSON.stringify(books));
    }
}

const ui = new UI();
const tableBody = document.querySelector('tbody');

document.querySelector('body').addEventListener('DOMContentLoaded', Store.displayBooks());

const addBtn = document.querySelector('.btn');
addBtn.addEventListener('click', function(e){
    e.preventDefault();
    const bookname = document.querySelector('#bookname');
    const author = document.querySelector('#author');
    const isbn = document.querySelector('#isbn');
    if(bookname.value != '' && author.value != '' && isbn.value != '')
    {
        const book = new Book(bookname.value, author.value, isbn.value);
        ui.addBook(book);
        // storting it to LS
        Store.addbooks(book);
        ui.showAlert("Book Added!","success");
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
    Store.deleteBooks(e.target.parentElement.previousElementSibling);
})