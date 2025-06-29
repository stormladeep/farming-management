document.getElementById("accept").addEventListener("click", function() {
    alert("You have accepted the privacy policy.");
    window.location.href = "../home/home.html";  // Redirect to the homepage
});

document.getElementById("decline").addEventListener("click", function() {
    alert("You have declined the privacy policy.");
    window.location.href = "../home/home.html";  // Redirect to a page explaining consequences
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