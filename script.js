async function fetchBooks() {
    try {
        const response = await fetch('books.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
}

async function displayBooks() {
    const books = await fetchBooks();
    const bookList = document.getElementById('book-list');

    books.forEach(book => {
        const bookEntry = document.createElement('div');
        bookEntry.classList.add('book-entry');
        bookEntry.setAttribute('data-id', book.id);

        bookEntry.innerHTML = `
            <img src="${book.image}">
            <h3>${book.title}</h3>
            <p>Rate: Rs ${book.rate}</p>
            <button onclick="showOrderForm(${book.id})">Order</button>
        `;

        bookList.appendChild(bookEntry);
    });
}

function filterBooks() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const bookEntries = document.querySelectorAll('.book-entry');

    bookEntries.forEach(bookEntry => {
        const title = bookEntry.querySelector('h3').textContent.toLowerCase();
        if (title.includes(searchInput)) {
            bookEntry.style.display = 'block';
        } else {
            bookEntry.style.display = 'none';
        }
    });
}

function showOrderForm(bookId) {
    // Placeholder function, you can redirect or display a modal as needed
    window.location.href = `studententry.html?bookId=${bookId}`;
    console.log('Order form for Book ID:', bookId);
}

// Call displayBooks to show books on page load
displayBooks();
