// Load Google Charts
google.charts.load('current', { packages: ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawCharts);

// Function to draw charts
function drawCharts() {
    drawPieChart();
    drawBarChart();
}

// Pie Chart for Field Areas
function drawPieChart() {
    const data = google.visualization.arrayToDataTable([
        ['Field', 'Area in acres'],
        ['Livestock', 100],
        ['Vegetables', 50],
        ['Fruits', 50]
    ]);

    const options = {
        title: 'Field Area Distribution',
        pieHole: 0.4
    };

    const chart = new google.visualization.PieChart(document.getElementById('fieldChart'));
    chart.draw(data, options);
}

// Bar Chart for Field Stock/Crops
function drawBarChart() {
    const data = google.visualization.arrayToDataTable([
        ['Field', 'Varieties Available'],
        ['Livestock', 4],  // Cows, Goats, Sheep, Chickens
        ['Vegetables', 5],  // Spinach, Potatoes, etc.
        ['Fruits', 5]       // Mangos, Oranges, etc.
    ]);

    const options = {
        chart: {
            title: 'Field Stock/Crops Distribution',
            subtitle: 'Number of different stock/crops in each field'
        },
        bars: 'horizontal'
    };

    const chart = new google.charts.Bar(document.getElementById('barChart'));
    chart.draw(data, options);
}

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchQuery = document.querySelector('input[type="search"]').value.toLowerCase();
    
    // Get all the field sections
    const fields = document.querySelectorAll('.field');

    fields.forEach(field => {
        const fieldName = field.querySelector('h3').textContent.toLowerCase();
        if (fieldName.includes(searchQuery)) {
            field.style.display = 'block';
        } else {
            field.style.display = 'none';
        }
    });
});
