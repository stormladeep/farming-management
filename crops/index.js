// Get elements
const addCropBtn = document.getElementById('addCropBtn');
const addCropPopup = document.getElementById('addCropPopup');
const cancelBtn = document.getElementById('cancelBtn');
const addCropForm = document.getElementById('addCropForm');
const cropsTableBody = document.querySelector('.crops-table tbody');
const searchBar = document.getElementById('searchBar');

// Show the popup when the "Add New Crop" button is clicked
addCropBtn.addEventListener('click', () => {
    addCropForm.reset();
    addCropPopup.style.display = 'flex';
    addCropForm.onsubmit = addCrop; // Set the form submission to addCrop function
});

// Hide the popup when the "Cancel" button is clicked
cancelBtn.addEventListener('click', () => {
    addCropPopup.style.display = 'none';
});

// Close popup when clicking outside the content
window.addEventListener('click', (event) => {
    if (event.target === addCropPopup) {
        addCropPopup.style.display = 'none';
    }
});

// Load crops from localStorage
function loadCrops() {
    const crops = JSON.parse(localStorage.getItem('crops')) || [];
    cropsTableBody.innerHTML = ''; // Clear the table

    // Loop through the crop data and append to the table
    crops.forEach(crop => {
        addCropToTable(crop);
    });
}

// Add crop to table and localStorage
function addCrop(e) {
    e.preventDefault();

    const crop = {
        id: Date.now(), // Unique ID
        crop_name: document.getElementById('cropName').value,
        field_name: document.getElementById('field').value,
        seeds: document.getElementById('seeds').value,
        start_date: document.getElementById('startDate').value,
        checkDate: document.getElementById('checkDate').value,
        status: document.getElementById('status').value,
    };

    // Store in localStorage
    const crops = JSON.parse(localStorage.getItem('crops')) || [];
    crops.push(crop);
    localStorage.setItem('crops', JSON.stringify(crops));

    addCropToTable(crop);
    addCropPopup.style.display = 'none';
}

// Add crop row to the table
function addCropToTable(crop) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${crop.crop_name}</td>
        <td>${crop.field_name}</td>
        <td>${crop.seeds}</td>
        <td>${crop.start_date}</td>
        <td>${crop.checkDate}</td>
        <td><span class="status ${crop.status.toLowerCase()}">${crop.status}</span></td>
        <td>
            <button class="btn btn-warning btn-sm" onclick="editCrop(${crop.id})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteCrop(${crop.id})">Delete</button>
        </td>
    `;
    cropsTableBody.appendChild(row);
}

// Edit crop function
function editCrop(id) {
    const crops = JSON.parse(localStorage.getItem('crops')) || [];
    const crop = crops.find(crop => crop.id === id);

    if (crop) {
        // Populate form fields with the crop data
        document.getElementById('cropName').value = crop.crop_name;
        document.getElementById('field').value = crop.field_name;
        document.getElementById('seeds').value = crop.seeds;
        document.getElementById('startDate').value = crop.start_date;
        document.getElementById('checkDate').value = crop.checkDate;
        document.getElementById('status').value = crop.status;

        // Show popup for editing
        addCropPopup.style.display = 'flex';

        // Update the form submission to update the crop
        addCropForm.onsubmit = (e) => {
            e.preventDefault();
            updateCrop(id);
        };
    }
}

// Update crop in localStorage and table
function updateCrop(id) {
    const crops = JSON.parse(localStorage.getItem('crops')) || [];
    const cropIndex = crops.findIndex(crop => crop.id === id);

    if (cropIndex > -1) {
        crops[cropIndex] = {
            ...crops[cropIndex],
            crop_name: document.getElementById('cropName').value,
            field_name: document.getElementById('field').value,
            seeds: document.getElementById('seeds').value,
            start_date: document.getElementById('startDate').value,
            checkDate: document.getElementById('checkDate').value,
            status: document.getElementById('status').value,
        };

        // Save to localStorage
        localStorage.setItem('crops', JSON.stringify(crops));

        // Refresh the crops table
        loadCrops();
        addCropPopup.style.display = 'none';
    }
}

// Delete crop
function deleteCrop(id) {
    const crops = JSON.parse(localStorage.getItem('crops')) || [];
    const updatedCrops = crops.filter(crop => crop.id !== id);

    localStorage.setItem('crops', JSON.stringify(updatedCrops));

    // Refresh the crops table after deletion
    loadCrops();
}

// Search crops function
function searchCrops() {
    const filter = searchBar.value.toLowerCase();
    const rows = cropsTableBody.getElementsByTagName('tr');

    Array.from(rows).forEach(row => {
        const cropName = row.cells[0].textContent.toLowerCase();
        const cropField = row.cells[1].textContent.toLowerCase();

        row.style.display = cropName.includes(filter) || cropField.includes(filter) ? '' : 'none';
    });
}

// Event listener for search bar
searchBar.addEventListener('keyup', searchCrops);

// Fetch crops data on page load
window.addEventListener('DOMContentLoaded', loadCrops);
