
google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Revenue'],
        ['January', 1000],
        ['February', 1170],
        ['March', 660],
        ['April', 1030]
    ]);

    var options = {
        title: 'Total Revenue',
        curveType: 'function',
        legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('revenue-chart'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ['Month', 'Yield'],
        ['January', 800],
        ['February', 1230],
        ['March', 720],
        ['April', 930]
    ]);
    options.title = 'Yield Predictions';
    chart = new google.visualization.LineChart(document.getElementById('yield-chart'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ['Product', 'Quantity'],
        ['Cows', 50],
        ['Chickens', 40],
        ['Goats', 30],
        ['Sheep', 20]
    ]);
    options = {
        title: 'Top Products',
        legend: { position: 'bottom' }
    };
    chart = new google.visualization.BarChart(document.getElementById('top-products-chart'));
    chart.draw(data, options);

    data = google.visualization.arrayToDataTable([
        ['Level', 'Percentage'],
        ['High', 20],
        ['Medium', 40],
        ['Low', 40]
    ]);
    options = {
        title: 'Soil Moisture Levels',
        pieHole: 0.4,
        legend: { position: 'bottom' }
    };
    chart = new google.visualization.PieChart(document.getElementById('soil-moisture-chart'));
    chart.draw(data, options);
}

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

document.getElementById('language-select').addEventListener('change', function () {
    const selectedLanguage = this.value;
    alert(`Selected Language: ${selectedLanguage}`);
});

function changeBoxColors() {
    const boxes = document.querySelectorAll('.stat-card');
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
    boxes.forEach(box => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        box.style.backgroundColor = randomColor;
    });
}

changeBoxColors();
setInterval(changeBoxColors, 200000);

// Get user location and weather data
navigator.geolocation.getCurrentPosition(success);
function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = '7fb67ad64f374b0a9b045815240409'; // Replace with your actual API key
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
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

// Profile editing functionality
document.getElementById('edit-profile').addEventListener('click', function () {
    const profileForm = document.createElement('div');
    profileForm.innerHTML = `
        <div id="edit-profile-form" style="display: block;">
            <h3>Edit Personal Data</h3>
            <label for="first-name">First Name:</label>
            <input type="text" id="first-name"><br>
            <label for="surname">Surname:</label>
            <input type="text" id="surname"><br>
            <label for="contact">Contact:</label>
            <input type="text" id="contact"><br>
            <label for="address">Address:</label>
            <input type="text" id="address"><br>
            <label for="account-number">Account Number:</label>
            <input type="text" id="account-number"><br>
            <button id="save-profile">Save Changes</button>
            <button class="close">Close</button>
        </div>
    `;
    document.body.appendChild(profileForm);

    document.getElementById('save-profile').addEventListener('click', function (e) {
        e.preventDefault();
        const firstName = document.getElementById('first-name').value;
        const surname = document.getElementById('surname').value;
        const contact = document.getElementById('contact').value;
        const address = document.getElementById('address').value;
        const accountNumber = document.getElementById('account-number').value;

        console.log('Updated Profile:', { firstName, surname, contact, address, accountNumber });
        alert("Profile updated successfully!");
        document.body.removeChild(profileForm);
    });

    document.querySelector('.close').addEventListener('click', function() {
        document.body.removeChild(profileForm);
    });
});

// Change picture functionality
document.getElementById('change-picture').addEventListener('click', function () {
    document.getElementById('profile-pic-upload').click();
});

// Prevent right-click and specific keyboard shortcuts
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && (e.key === 'u' || e.key === 's')) {
        e.preventDefault();
    }
});

// Search functionality
document.getElementById('search-btn').addEventListener('click', function() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const tasks = document.querySelectorAll('#tasks ul li');
    tasks.forEach(task => {
        task.style.display = task.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
});

// Dropdown functionality
function toggleDropdown() {
    const dropdownContent = document.getElementById('dropdown-content');
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
};

