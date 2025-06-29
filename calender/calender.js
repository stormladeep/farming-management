// Page Switching Logic
document.getElementById('crops-btn').addEventListener('click', function() {
    document.getElementById('crops-calendar').style.display = 'block';
    document.getElementById('livestock-calendar').style.display = 'none';
});

document.getElementById('livestock-btn').addEventListener('click', function() {
    document.getElementById('crops-calendar').style.display = 'none';
    document.getElementById('livestock-calendar').style.display = 'block';
});

// Tooltip Logic
const activities = document.querySelectorAll('.season');

activities.forEach(activity => {
    activity.addEventListener('mouseover', function(event) {
        const tooltipText = event.target.getAttribute('data-tooltip');
        const tooltipDiv = document.createElement('div');
        tooltipDiv.classList.add('tooltip');
        tooltipDiv.innerHTML = tooltipText;
        document.body.appendChild(tooltipDiv);

        tooltipDiv.style.left = `${event.pageX + 10}px`;
        tooltipDiv.style.top = `${event.pageY + 10}px`;
    });

    activity.addEventListener('mouseout', function() {
        const tooltipDiv = document.querySelector('.tooltip');
        if (tooltipDiv) {
            tooltipDiv.remove();
        }
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