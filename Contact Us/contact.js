document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting normally
    
    // Retrieve form values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    // Simple validation to ensure all fields are filled
    if (name === "" || email === "" || subject === "" || message === "") {
        alert("All fields are required.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // If everything is correct, simulate form submission
    alert("Thank you, " + name + ". Your message has been submitted.");
    document.getElementById("contactForm").reset();  // Reset the form
});

// Function to validate the email format
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

    document.addEventListener('keydown',function(e) 
{
if (e.ctrlkey && (e.key === 'u' || e.key === 's' )) {
    e.preventDefault();
}
});