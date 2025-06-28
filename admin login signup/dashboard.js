// Load Google Charts
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    // Revenue & Yield Line Charts
    var revenueData = google.visualization.arrayToDataTable([
        ['Month', 'Revenue'],
        ['January', 1000],
        ['February', 1170],
        ['March', 660],
        ['April', 1030]
    ]);

    var revenueOptions = {
        title: 'Total Revenue & Revenue',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var revenueChart = new google.visualization.LineChart(document.getElementById('revenue-chart'));
    revenueChart.draw(revenueData, revenueOptions);

    var yieldData = google.visualization.arrayToDataTable([
        ['Month', 'Yield'],
        ['January', 800],
        ['February', 1230],
        ['March', 720],
        ['April', 930]
    ]);

    var yieldOptions = {
        title: 'Yield Predictions',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var yieldChart = new google.visualization.LineChart(document.getElementById('yield-chart'));
    yieldChart.draw(yieldData, yieldOptions);

    // Top Products Bar Chart
    var productData = google.visualization.arrayToDataTable([
        ['Product', 'Quantity'],
        ['Cows', 50],
        ['Chickens', 40],
        ['Goats', 30],
        ['Sheep', 20]
    ]);

    var productOptions = {
        title: 'Top Products',
        legend: { position: 'bottom' }
    };

    var productChart = new google.visualization.BarChart(document.getElementById('top-products-chart'));
    productChart.draw(productData, productOptions);

    // Soil Moisture Pie Chart
    var moistureData = google.visualization.arrayToDataTable([
        ['Level', 'Percentage'],
        ['High', 20],
        ['Medium', 40],
        ['Low', 40]
    ]);

    var moistureOptions = {
        title: 'Soil Moisture Levels',
        pieHole: 0.4,
        legend: { position: 'bottom' }
    };

    var moistureChart = new google.visualization.PieChart(document.getElementById('soil-moisture-chart'));
    moistureChart.draw(moistureData, moistureOptions);
}

// Upload profile picture functionality
document.getElementById('profile-pic-upload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
        const userProfile = document.querySelector('.user-profile i');
        userProfile.style.backgroundImage = `url(${reader.result})`;
        userProfile.style.backgroundSize = 'cover';
        userProfile.style.borderRadius = '50%';
        userProfile.style.width = '40px';
        userProfile.style.height = '40px';
    };
    reader.readAsDataURL(file);
});

// Language select functionality
document.getElementById('language-select').addEventListener('change', function () {
    const selectedLanguage = this.value;
    updateContent(selectedLanguage); // Call the function to update content based on selected language
});

// Change box colors at intervals
function changeBoxColors() {
    const boxes = document.querySelectorAll('.stat-card');
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];

    boxes.forEach(box => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        box.style.backgroundColor = randomColor;
    });
}

changeBoxColors();
setInterval(changeBoxColors, 200000); // Changes colors every 200 seconds

// Get user location and display weather information
navigator.geolocation.getCurrentPosition(success);

function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Update with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update weather information dynamically
            const weatherEl = document.getElementById('weather');
            weatherEl.innerHTML = `
               <h3><i class="fas fa-cloud-sun"></i> Weather</h3>
               <p><i class="fas fa-calendar-day"></i> ${new Date().toLocaleDateString()}</p>
               <p><i class="fas fa-thermometer-half"></i> ${data.main.temp}°C, ${data.weather[0].description}</p>
               <p><i class="fas fa-tint"></i> Precipitation: ${data.clouds.all}%</p>
               <p><i class="fas fa-water"></i> Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch(error => console.error('Error fetching weather:', error));
}

// Edit profile functionality
document.getElementById('edit-profile').addEventListener('click', function () {
    // Show profile editing modal or form
    const profileForm = `
        <form id="profile-form">
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name" value="John"><br>
            <label for="last-name">Last Name:</label>
            <input type="text" id="last-name" value="Doe"><br>
            <label for="address">Address:</label>
            <input type="text" id="address" value="123 Farm Lane"><br>
            <label for="contact">Contact:</label>
            <input type="text" id="contact" value="555-1234"><br>
            <button type="submit">Save Changes</button>
        </form>
    `;
    document.body.innerHTML += profileForm;

    document.getElementById('profile-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const address = document.getElementById('address').value;
        const contact = document.getElementById('contact').value;

        // Save user details (e.g., to local storage, or a database)
        alert('Profile updated successfully!');
    });
});

// Change profile picture functionality
document.getElementById('change-picture').addEventListener('click', function () {
    document.getElementById('profile-pic-upload').click();
});

// Prevent right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable Ctrl+U and Ctrl+S
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 's')) {
        e.preventDefault();
    }
});

// Language Translations
document.addEventListener('DOMContentLoaded', function () { 
    const translations = {
        en: {
            title: "FMS Inventory",
            dashboard: "Dashboard",
            crops: "Crops",
            livestock: "Livestock",
            fields: "Fields",
            expenses: "Expenses",
            inventory: "Inventory",
            orders: "Orders",
            labour: "Labour",
            products: "Products",
            searchPlaceholder: "Search here...",
            addNewItem: "+ Add New Item",
            export: "Export",
            generateReport: "Generate Report",
            itemName: "Item Name",
            category: "Category",
            quantity: "Quantity",
            unit: "Unit",
            lastUpdated: "Last Updated",
            status: "Status",
            action: "Action",
            previous: "Previous",
            next: "Next",
            footerText: "&copy; 2024 FMS Inventory. All Rights Reserved.",
            contactUs: "Contact us:",
            supportEmail: "support@example.com",
            notifications: "Notifications"
        },
        // Additional languages omitted for brevity...
    };

    function updateContent(language) {
        // Change the title of the page
        document.title = translations[language].title;

        // Update sidebar links
        document.querySelectorAll('nav .translate').forEach(item => {
            item.textContent = translations[language][item.dataset.translate];
        });

        // Update header inputs and buttons
        document.querySelectorAll('.translate').forEach(item => {
            if (item.tagName.toLowerCase() === 'input') {
                item.placeholder = translations[language][item.dataset.translate];
            } else {
                item.textContent = translations[language][item.dataset.translate];
            }
        });

        // Update table headers
        const tableHeaders = document.querySelectorAll("#inventory-table th");
        tableHeaders.forEach(header => {
            header.textContent = translations[language][header.dataset.translate];
        });

        // Update footer content
        const footer = document.querySelector("footer");
        footer.innerHTML = `${translations[language].footerText} <br> ${translations[language].contactUs} <a href="mailto:${translations[language].supportEmail}">${translations[language].supportEmail}</a>`;
    }

    // Initialize content with default language
    updateContent('en'); // Default to English
});

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', getWeather);
});

const getWeather = async () => {
    const city = document.getElementById('cityInput').value;
    const apiKey = "7fb67ad64f374b0a9b045815240409"; // New API key from WeatherAPI
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // Update DOM with weather data
        document.getElementById('cityName').innerText = data.location.name;
        document.getElementById('temperature').innerText = `${data.current.temp_c}°C`;
        document.getElementById('humidity').innerText = `Humidity: ${data.current.humidity}%`;
        document.getElementById('windSpeed').innerText = `Wind: ${data.current.wind_kph} km/h`;

        // Map weather condition to local icon
        const condition = data.current.condition.text.toLowerCase();
        const iconMapping = {
            'clear': 'clear.png',
            'clouds': 'clouds.png',
            'drizzle': 'drizzle.png',
            'mist': 'mist.png',
            'rain': 'rain.png',
            'snow': 'snow.png'
        };

        // Use default icon if condition is not found
        const iconFile = iconMapping[condition] || 'clear.png';
        document.getElementById('weatherIcon').src = `/images/${iconFile}`;

        document.querySelector('.weather-info').style.display = 'block';
    } catch (error) {
        alert(error.message);
    }
}
