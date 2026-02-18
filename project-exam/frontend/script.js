const API_URL = '/api/books';

document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();

    const bookForm = document.getElementById('book-form');
    bookForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const price = document.getElementById('price').value;
        const cover_url = document.getElementById('cover_url').value;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, price, cover_url }),
            });

            if (response.ok) {
                bookForm.reset();
                fetchBooks();
            }
        } catch (error) {
            console.error('Error adding book:', error);
        }
    });
});

async function fetchBooks() {
    try {
        const response = await fetch(API_URL);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '<p class="error">Failed to connect to API. Please check if the backend is running.</p>';
    }
}

function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = '';

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.cover_url || 'https://placehold.co/300x450?text=No+Cover'}" 
                 alt="${book.title}" 
                 class="book-cover"
                 onerror="this.src='https://placehold.co/300x450?text=Image+Error'">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p class="author">By ${book.author}</p>
                <p class="price">$${parseFloat(book.price).toFixed(2)}</p>
                <button onclick="deleteBook(${book.id})" class="delete-btn">Delete</button>
            </div>
        `;
        bookList.appendChild(bookCard);
    });
}

async function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchBooks();
            }
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    }
}
