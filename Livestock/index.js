// Get elements
const addLivestockBtn = document.getElementById("addLivestockBtn");
const addLivestockPopup = document.getElementById("addLivestockPopup");
const cancelBtn = document.getElementById("cancelBtn");
const addLivestockForm = document.getElementById("addLivestockForm");
const LivestockTableBody = document.querySelector(".Livestock-table tbody");
const searchBar = document.getElementById("searchBar");

// Show the popup when the "Add New Livestock" button is clicked
addLivestockBtn.addEventListener("click", function () {
  addLivestockPopup.style.display = "flex";
});

// Hide the popup when the "Cancel" button is clicked
cancelBtn.addEventListener("click", function () {
  addLivestockPopup.style.display = "none";
});

// Close popup when clicking outside the content
window.addEventListener("click", function (event) {
  if (event.target === addLivestockPopup) {
    addLivestockPopup.style.display = "none";
  }
});

// Load livestock data from localStorage
function loadLivestockData() {
  const livestockData = JSON.parse(localStorage.getItem("livestockData")) || [];
  LivestockTableBody.innerHTML = '';
  livestockData.forEach(addRowToTable);
}

// Add a new row to the table
function addRowToTable(livestock) {
  const newRow = document.createElement("tr");
  newRow.setAttribute("data-id", livestock.id);

  newRow.innerHTML = `
        <td>${livestock.RFID}</td>
        <td>${livestock.type}</td>
        <td>${livestock.breed}</td>
        <td>${livestock.birthDate}</td>
        <td>${livestock.age}</td>
        <td><span class="status ${livestock.status}">${livestock.status}</span></td>
        <td>${livestock.lastCheckup}</td>
        <td>${livestock.nextVaccine}</td>
        <td><img src="${livestock.imageUrl}" alt="${livestock.RFID}" class="livestock-image"></td>
        <td>
            <button onclick="editLivestock('${livestock.id}')">Edit</button>
            <button onclick="deleteLivestock('${livestock.id}')">Delete</button>
        </td>
    `;

  LivestockTableBody.appendChild(newRow);
}

// Add Livestock form submission
addLivestockForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const RFID = document.getElementById("RFID").value;
  const type = document.getElementById("type").value;
  const breed = document.getElementById("breed").value;
  const birthDate = document.getElementById("birthDate").value;
  const age = document.getElementById("age").value;
  const status = document.getElementById("status").value;
  const lastCheckup = document.getElementById("lastCheckup").value;
  const nextVaccine = document.getElementById("nextVaccine").value;
  const LivestockImage = document.getElementById("LivestockImage").files[0];
  const imageUrl = LivestockImage ? URL.createObjectURL(LivestockImage) : '';

  const livestock = {
    id: Date.now().toString(),
    RFID,
    type,
    breed,
    birthDate,
    age,
    status,
    lastCheckup,
    nextVaccine,
    imageUrl
  };

  const livestockData = JSON.parse(localStorage.getItem("livestockData")) || [];
  livestockData.push(livestock);
  localStorage.setItem("livestockData", JSON.stringify(livestockData));

  addRowToTable(livestock);
  addLivestockForm.reset();
  addLivestockPopup.style.display = "none";
});

// Delete livestock
function deleteLivestock(id) {
  const livestockData = JSON.parse(localStorage.getItem("livestockData")) || [];
  const updatedData = livestockData.filter((livestock) => livestock.id !== id);
  localStorage.setItem("livestockData", JSON.stringify(updatedData));
  loadLivestockData();
}

// Edit livestock
function editLivestock(id) {
  const livestockData = JSON.parse(localStorage.getItem("livestockData")) || [];
  const livestock = livestockData.find((livestock) => livestock.id === id);

  if (livestock) {
    document.getElementById("RFID").value = livestock.RFID;
    document.getElementById("type").value = livestock.type;
    document.getElementById("breed").value = livestock.breed;
    document.getElementById("birthDate").value = livestock.birthDate;
    document.getElementById("age").value = livestock.age;
    document.getElementById("status").value = livestock.status;
    document.getElementById("lastCheckup").value = livestock.lastCheckup;
    document.getElementById("nextVaccine").value = livestock.nextVaccine;
    addLivestockPopup.style.display = "flex";

    addLivestockForm.onsubmit = function (e) {
      e.preventDefault();

      livestock.RFID = document.getElementById("RFID").value;
      livestock.type = document.getElementById("type").value;
      livestock.breed = document.getElementById("breed").value;
      livestock.birthDate = document.getElementById("birthDate").value;
      livestock.age = document.getElementById("age").value;
      livestock.status = document.getElementById("status").value;
      livestock.lastCheckup = document.getElementById("lastCheckup").value;
      livestock.nextVaccine = document.getElementById("nextVaccine").value;

      const updatedData = livestockData.map((item) => (item.id === id ? livestock : item));
      localStorage.setItem("livestockData", JSON.stringify(updatedData));

      loadLivestockData();
      addLivestockForm.reset();
      addLivestockPopup.style.display = "none";
      addLivestockForm.onsubmit = null;
    };
  }
}

// Search livestock function
searchBar.addEventListener("input", function () {
  const filter = searchBar.value.toLowerCase();
  const rows = LivestockTableBody.getElementsByTagName("tr");

  Array.from(rows).forEach((row) => {
    const RFID = row.cells[0].textContent.toLowerCase();
    const type = row.cells[1].textContent.toLowerCase();

    if (RFID.includes(filter) || type.includes(filter)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});

// Load livestock data on page load
document.addEventListener("DOMContentLoaded", loadLivestockData);
