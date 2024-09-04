document.getElementById('addBookForm').addEventListener('submit', addBook);
document.getElementById('getAllBooks').addEventListener('click', fetchBooks);
document.getElementById('fetchBookById').addEventListener('click', fetchBookById);
document.getElementById('updateBookForm').addEventListener('submit', updateBook);
document.getElementById('deleteBookById').addEventListener('click', deleteBookById);

// Add a new book
function addBook(e) {
    e.preventDefault();

    const book = {
        id: document.getElementById('addCustomId').value,
        title: document.getElementById('addTitle').value,
        author: document.getElementById('addAuthor').value,
    };

    fetch('http://127.0.0.1:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
    })
    .then(response => response.json())
    .then(data => {
        alert('Book added successfully');
        document.getElementById('addBookForm').reset();
    })
    .catch(error => console.error('Error adding book:', error));
}

// Fetch all books
function fetchBooks() {
    fetch('http://127.0.0.1:3000/books')
        .then(response => response.json())
        .then(data => {
            const booksList = document.getElementById('booksList');
            booksList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `ID: ${book.id} - ${book.title} by ${book.author}`;
                booksList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
}

// Fetch a book by ID
function fetchBookById() {
    const customId = document.getElementById('getBookId').value;

    fetch(`http://127.0.0.1:3000/books/${customId}`)
        .then(response => {
            if (!response.ok) { // Check if the response status is not OK (e.g., 404)
                if (response.status === 404) {
                    throw new Error('Book not found'); // Explicitly throw an error for 404
                } else {
                    throw new Error('Failed to fetch the book');
                }
            }
            return response.json();
        })
        .then(book => {
            // Display book details if found
            document.getElementById('bookDetails').textContent = 
                `ID: ${book.id} - ${book.title} by ${book.author}`;
        })
        .catch(error => {
            // Display error message if the book is not found or another error occurs
            console.error('Error fetching book:', error);
            document.getElementById('bookDetails').textContent = error.message;
        });
}

// Update a book by ID
function updateBook(e) {

    const customId = document.getElementById('updateCustomId').value;

    const book = {
        title: document.getElementById('updateTitle').value,
        author: document.getElementById('updateAuthor').value,
    };
   

    fetch(`http://127.0.0.1:3000/books/${customId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
    })
    .then(response => response.json())
    .then(data => {
        alert('Book updated successfully');
        document.getElementById('updateBookForm').reset();
    })
    .catch(error => console.error('Error updating book:', error));
}

// Delete a book by ID
function deleteBookById() {
    const customId = document.getElementById('deleteBookId').value;

    fetch(`http://127.0.0.1:3000/books/${customId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 200) {
            alert('Book deleted successfully');
        } else {
            alert('Book not found');
        }
    })
    .catch(error => console.error('Error deleting book:', error));
}
