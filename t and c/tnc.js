document.addEventListener('DOMContentLoaded', () => {
    const termsModal = document.getElementById('terms-modal');
    const acceptBtn = document.getElementById('accept-btn');
    const declineBtn = document.getElementById('decline-btn');
    const closeBtn = document.getElementById('close-btn');
    const content = document.getElementById('content');
    
    // Show the modal on page load
    termsModal.style.display = 'flex';
    
    // Accept button click event
    acceptBtn.addEventListener('click', () => {
        window.location.href = "../signup/signup.html";
        termsModal.style.display = 'none';
        content.classList.remove('hidden');
    });
    
    // Decline button click event
    declineBtn.addEventListener('click', () => {
        window.location.href = "../signup/signup.html"; // Redirect to another page or exit
    });
    
    // Close button click event
    closeBtn.addEventListener('click', () => {
        termsModal.style.display = 'none';
        content.classList.remove('hidden');
    });
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

    document.addEventListener('keydown',function(e) 
{
if (e.ctrlkey && (e.key === 'u' || e.key === 's' )) {
    e.preventDefault();
}
});