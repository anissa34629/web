function submitForm(event) {
    event.preventDefault();

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('contactForm').addEventListener('submit', function (event) {
            submitForm(event);
        });
    });}
    function submitForm(event) {
        event.preventDefault();    

    // Validation and form submission logic
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const email = document.getElementById('email').value;
    const robotCheck = document.getElementById('robotCheck').checked;

    // Validate form fields
    if (!subject || !message || !email || !robotCheck) {
        alert('Please fill out all fields and check the "I\'m not a robot" box.');
        return;
    }

    // Additional validation or AJAX request can be added here

    // Dummy success message (replace with actual submission logic)
    alert('Form submitted successfully!');
    // Clear the form
    document.getElementById('contactForm').reset();
}
