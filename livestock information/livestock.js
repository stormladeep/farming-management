document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

    document.addEventListener('keydown',function(e) 
{
if (e.ctrlkey && (e.key === 'u' || e.key === 's' )) {
    e.preventDefault();
}
});