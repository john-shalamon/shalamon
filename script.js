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
            <p class="description" style="display:none;">${book.description}</p>
            <button onclick="showOrderForm(${book.id})">Order</button>
        `;

        // Add event listeners for each book entry
        bookEntry.addEventListener('mouseover', () => {
            bookEntry.querySelector('.description').style.display = 'block';
        });

        bookEntry.addEventListener('mouseout', () => {
            bookEntry.querySelector('.description').style.display = 'none';
        });

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
}

// Call displayBooks to show books on page load
displayBooks();
