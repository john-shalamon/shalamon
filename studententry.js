document.addEventListener('DOMContentLoaded', function () {
    const studentForm = document.getElementById('studentForm');
    const infoModal = document.getElementById('infoModal');
    const modalContent = document.getElementById('modalContent');

    // Extract bookId from the URL query parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    const bookId = urlSearchParams.get('bookId');

    studentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const department = document.getElementById('department').value;
        const academicYear = document.getElementById('academicYear').value;

        // Update modal content including the book ID
        modalContent.innerHTML = `Student Information:
            <br>Name: ${name}
            <br>Phone Number: ${phone}
            <br>Department: ${department}
            <br>Academic Year: ${academicYear}
            <br>Book ID: ${bookId}`;

        // Display modal
        infoModal.style.display = 'block';

        // Close modal after 3 seconds (3000 milliseconds)
        setTimeout(closeModal, 3000);
    });

    // Close modal function
    window.closeModal = function () {
        infoModal.style.display = 'none';
    };
});
