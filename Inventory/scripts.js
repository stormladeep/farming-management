document.addEventListener('DOMContentLoaded', function () {
    const inventoryData = [
        { name: "Corn seeds", category: "Seeds", quantity: 500, unit: "kg", lastUpdated: "15/9/2024", status: "In Stock" },
        { name: "Fertilizer", category: "Supplies", quantity: 1000, unit: "kg", lastUpdated: "15/9/2024", status: "In Stock" },
        { name: "Pesticide", category: "Supplies", quantity: 1000, unit: "l", lastUpdated: "15/9/2024", status: "Low Stock" },
        { name: "Tractors", category: "Equipment", quantity: 4, unit: "-", lastUpdated: "15/9/2024", status: "Maintained" },
        { name: "Sensors", category: "Equipment", quantity: 10, unit: "-", lastUpdated: "15/9/2024", status: "Maintained" },
        { name: "Irrigation System", category: "Equipment", quantity: 8, unit: "-", lastUpdated: "17/9/2024", status: "Maintained" },
        { name: "Soil Test Kit", category: "Supplies", quantity: 20, unit: "pcs", lastUpdated: "20/9/2024", status: "In Stock" },
        { name: "Shovel", category: "Tools", quantity: 50, unit: "-", lastUpdated: "21/9/2024", status: "In Stock" },
        { name: "Sprinklers", category: "Supplies", quantity: 200, unit: "-", lastUpdated: "22/9/2024", status: "In Stock" },
        { name: "Greenhouse Cover", category: "Equipment", quantity: 5, unit: "-", lastUpdated: "23/9/2024", status: "Low Stock" }
    ];

    let currentPage = 1;
    const rowsPerPage = 5;
    const totalPages = Math.ceil(inventoryData.length / rowsPerPage);
    const tableBody = document.getElementById('inventory-data');

    // Function to render the inventory table based on the page
    function renderTable(data, page) {
        tableBody.innerHTML = ''; // Clear existing table rows
        const start = (page - 1) * rowsPerPage;
        const end = page * rowsPerPage;
        const paginatedItems = data.slice(start, end);

        paginatedItems.forEach(item => {
            const statusClass = item.status.toLowerCase().replace(" ", "");
            const row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.quantity}</td>
                    <td>${item.unit}</td>
                    <td>${item.lastUpdated}</td>
                    <td><span class="status ${statusClass}">${item.status}</span></td>
                    <td>
                        <button class="edit-btn">✏️</button>
                        <button class="delete-btn">🗑️</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        applyStatusClasses(); // Apply status classes
    }

    function updatePageNum() {
        document.getElementById('page-num').innerText = currentPage;
    }

    // Initial rendering of the table
    renderTable(inventoryData, currentPage);
    updatePageNum();

    // Pagination event listeners
    document.getElementById('next-page').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable(inventoryData, currentPage);
            updatePageNum();
        }
    });

    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(inventoryData, currentPage);
            updatePageNum();
        }
    });

    // Search functionality
    document.getElementById('search-inventory').addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredData = inventoryData.filter(item => item.name.toLowerCase().includes(searchTerm));
        renderTable(filteredData, 1);
        currentPage = 1;
        updatePageNum();
    });

    // Generate report function
    function generateReport() {
        const headers = ['Item Name', 'Category', 'Quantity', 'Unit', 'Last Updated', 'Status'];
        let csvContent = headers.join(",") + "\n";

        const start = (currentPage - 1) * rowsPerPage;
        const end = currentPage * rowsPerPage;
        const currentData = inventoryData.slice(start, end);

        currentData.forEach(item => {
            const row = [
                item.name,
                item.category,
                item.quantity,
                item.unit,
                item.lastUpdated,
                item.status
            ];
            csvContent += row.join(",") + "\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'inventory_report.csv');
        a.click();
        sendNotification("Your inventory report has been generated and downloaded.");
    }

    // Notification function
    function sendNotification(message) {
        const notificationDropdown = document.getElementById('notifications');
        const newNotification = `<p>${message}</p>`;
        notificationDropdown.innerHTML += newNotification; // Add the new message to notifications
    }

    // Report button event listener
    document.getElementById('generate-report-btn').addEventListener('click', generateReport);

    // Notification button event listener
    document.getElementById('notification-btn').addEventListener('click', function () {
        const dropdown = document.getElementById('notifications');
        dropdown.classList.toggle('show'); // Toggle the visibility of notifications
    });

    // Show the modal for adding a new item
    document.getElementById('add-new-item-btn').addEventListener('click', function () {
        const modal = document.getElementById('new-item-modal');
        modal.classList.remove('hidden'); // Show the modal
    });

    // Close the modal when the user clicks on <span> (x)
    document.querySelector('.close-btn').addEventListener('click', function () {
        const modal = document.getElementById('new-item-modal');
        modal.classList.add('hidden'); // Hide the modal
    });

    // Handle form submission for adding new items
    document.getElementById('new-item-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const newItem = {
            name: document.getElementById('item-name').value,
            category: document.getElementById('item-category').value,
            quantity: document.getElementById('item-quantity').value,
            unit: document.getElementById('item-unit').value,
            lastUpdated: document.getElementById('item-last-updated').value,
            status: document.getElementById('item-status').value
        };

        inventoryData.push(newItem); // Add new item to the inventoryData array
        renderTable(inventoryData, currentPage); // Re-render the table to include the new item
        document.getElementById('new-item-form').reset(); // Clear the form
        const modal = document.getElementById('new-item-modal');
        modal.classList.add('hidden'); // Hide the modal after adding the item
    });

    // Show the profile form when 'Profile' is clicked
    document.getElementById('profile-btn').addEventListener('click', function () {
        const form = document.getElementById('profile-form');
        form.classList.toggle('hidden'); // Toggle visibility of the form
    });

    // Handle profile form submission
    document.getElementById('profile-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const profile = {
            name: document.getElementById('profile-name').value,
            contact: document.getElementById('profile-contact').value,
            address: document.getElementById('profile-address').value,
            profilePic: document.getElementById('profile-pic').files[0] // Assuming you handle the file upload
        };

        // Simulate saving profile data or send to a backend
        console.log("Profile saved:", profile);
        alert("Profile information saved successfully!");
    });

    // Function to apply status classes based on item status
    function applyStatusClasses() {
        const rows = document.querySelectorAll('#inventory-data tr');
        rows.forEach(row => {
            const statusCell = row.querySelector('td:nth-child(6)');
            const status = statusCell.textContent;
            statusCell.classList.remove('status-maintained', 'status-instock', 'status-lowstock');

            if (status === 'Maintained') {
                statusCell.classList.add('status-maintained');
            } else if (status === 'In Stock') {
                statusCell.classList.add('status-instock');
            } else if (status === 'Low Stock') {
                statusCell.classList.add('status-lowstock');
            }
        });
    }
});




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
        fr: {
            title: "Inventaire FMS",
            dashboard: "Tableau de bord",
            crops: "Cultures",
            livestock: "Bétail",
            fields: "Champs",
            expenses: "Dépenses",
            inventory: "Inventaire",
            orders: "Commandes",
            labour: "Travail",
            products: "Produits",
            searchPlaceholder: "Rechercher ici...",
            addNewItem: "+ Ajouter un nouvel article",
            export: "Exporter",
            generateReport: "Générer un rapport",
            itemName: "Nom de l'article",
            category: "Catégorie",
            quantity: "Quantité",
            unit: "Unité",
            lastUpdated: "Dernière mise à jour",
            status: "Statut",
            action: "Action",
            previous: "Précédent",
            next: "Suivant",
            footerText: "&copy; 2024 Inventaire FMS. Tous droits réservés.",
            contactUs: "Contactez-nous:",
            supportEmail: "support@example.com",
            notifications: "Notifications"
        },
        sa: {
            title: "FMS Khabiso",
            dashboard: "Dashiboard",
            crops: "Dikgwebo",
            livestock: "Bokhuts'o",
            fields: "Masimo",
            expenses: "Ditsenyo",
            inventory: "Khabiso",
            orders: "Ditsheko",
            labour: "Mehato",
            products: "Products",
            searchPlaceholder: "Batla fa...",
            addNewItem: "+ Eketsa Ntho e Ncha",
            export: "Tlhopha",
            generateReport: "Bua Khabiso",
            itemName: "Lebitso la Ntho",
            category: "Kgaolo",
            quantity: "Bongata",
            unit: "Yuniti",
            lastUpdated: "Qetello e Ncha",
            status: "Boemo",
            action: "Ts'ebetso",
            previous: "E fetileng",
            next: "E latelang",
            footerText: "&copy; 2024 FMS Khabiso. Mehlala eohle e bolokilwe.",
            contactUs: "Ikopanye le rona:",
            supportEmail: "support@example.com",
            notifications: "Diphetho"
        },
        ja: {
            title: "FMS在庫",
            dashboard: "ダッシュボード",
            crops: "作物",
            livestock: "家畜",
            fields: "フィールド",
            expenses: "経費",
            inventory: "在庫",
            orders: "注文",
            labour: "労働",
            products: "製品",
            searchPlaceholder: "ここで検索...",
            addNewItem: "+ 新しいアイテムを追加",
            export: "エクスポート",
            generateReport: "レポートを生成",
            itemName: "アイテム名",
            category: "カテゴリ",
            quantity: "数量",
            unit: "単位",
            lastUpdated: "最終更新日",
            status: "ステータス",
            action: "アクション",
            previous: "前",
            next: "次",
            footerText: "&copy; 2024 FMS在庫。全著作権所有。",
            contactUs: "お問い合わせ:",
            supportEmail: "support@example.com",
            notifications: "通知"
        },
        el: {
            title: "FMS Απογραφή",
            dashboard: "Πίνακας Ελέγχου",
            crops: "Καλλιέργειες",
            livestock: "Ζώα",
            fields: "Πεδία",
            expenses: "Έξοδα",
            inventory: "Απογραφή",
            orders: "Παραγγελίες",
            labour: "Εργασία",
            products: "Προϊόντα",
            searchPlaceholder: "Αναζητήστε εδώ...",
            addNewItem: "+ Προσθήκη Νέου Στοιχείου",
            export: "Εξαγωγή",
            generateReport: "Δημιουργία Αναφοράς",
            itemName: "Όνομα Στοιχείου",
            category: "Κατηγορία",
            quantity: "Ποσότητα",
            unit: "Μονάδα",
            lastUpdated: "Τελευταία Ενημέρωση",
            status: "Κατάσταση",
            action: "Ενέργεια",
            previous: "Προηγούμενος",
            next: "Επόμενος",
            footerText: "&copy; 2024 FMS Απογραφή. Όλα τα δικαιώματα διατηρούνται.",
            contactUs: "Επικοινωνήστε μαζί μας:",
            supportEmail: "support@example.com",
            notifications: "Ειδοποιήσεις"
        },
        de: {
            title: "FMS Inventar",
            dashboard: "Dashboard",
            crops: "Pflanzen",
            livestock: "Vieh",
            fields: "Felder",
            expenses: "Ausgaben",
            inventory: "Inventar",
            orders: "Bestellungen",
            labour: "Arbeit",
            products: "Produkte",
            searchPlaceholder: "Hier suchen...",
            addNewItem: "+ Neues Element hinzufügen",
            export: "Exportieren",
            generateReport: "Bericht erstellen",
            itemName: "Artikelname",
            category: "Kategorie",
            quantity: "Menge",
            unit: "Einheit",
            lastUpdated: "Zuletzt aktualisiert",
            status: "Status",
            action: "Aktion",
            previous: "Vorherige",
            next: "Nächste",
            footerText: "&copy; 2024 FMS Inventar. Alle Rechte vorbehalten.",
            contactUs: "Kontaktieren Sie uns:",
            supportEmail: "support@example.com",
            notifications: "Benachrichtigungen"
        },
        zh: {
            title: "FMS 库存",
            dashboard: "仪表板",
            crops: "农作物",
            livestock: "牲畜",
            fields: "田地",
            expenses: "开支",
            inventory: "库存",
            orders: "订单",
            labour: "劳动",
            products: "产品",
            searchPlaceholder: "在这里搜索...",
            addNewItem: "+ 添加新项目",
            export: "导出",
            generateReport: "生成报告",
            itemName: "项目名称",
            category: "类别",
            quantity: "数量",
            unit: "单位",
            lastUpdated: "最后更新",
            status: "状态",
            action: "操作",
            previous: "上一个",
            next: "下一个",
            footerText: "&copy; 2024 FMS 库存。保留所有权利。",
            contactUs: "联系我们：",
            supportEmail: "support@example.com",
            notifications: "通知"
        },
        ta: {
            title: "FMS கையிருப்பு",
            dashboard: "கட்டுப்படுத்தல்",
            crops: "செயின்கள்",
            livestock: "மட்டிகள்",
            fields: "புலங்கள்",
            expenses: "செலவுகள்",
            inventory: "கையிருப்பு",
            orders: "ஆர்டர்கள்",
            labour: "தொழிலாளர்கள்",
            products: "தயாரிப்புகள்",
            searchPlaceholder: "இங்கே தேடவும்...",
            addNewItem: "+ புதிய உருப்படியைச் சேர்க்கவும்",
            export: "ஏற்றுமதி",
            generateReport: "அறிக்கையை உருவாக்கவும்",
            itemName: "உருப்படியின் பெயர்",
            category: "வகை",
            quantity: "அளவு",
            unit: "அலகு",
            lastUpdated: "கடைசி புதுப்பிப்பு",
            status: "நிலை",
            action: "செயல்",
            previous: "முந்தைய",
            next: "அடுத்த",
            footerText: "&copy; 2024 FMS கையிருப்பு. அனைத்து உரிமைகளும் காப்பு.",
            contactUs: "எங்களுடன் தொடர்புகொள்ளவும்:",
            supportEmail: "support@example.com",
            notifications: "அறிக்கைகள்"
        },
        // Additional languages can be added here...
        
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

    // Event listener for language selection change
    document.getElementById("source-languages").addEventListener("change", function () {
        const selectedLanguage = this.value;
        updateContent(selectedLanguage);
    });

    // Initial content update for the default language (English)
    updateContent("en");

    // Other existing script code for managing notifications, generating reports, etc. goes here...
});

document.addEventListener('DOMContentLoaded', function () {
    // Your inventory data and other logic remain the same...

    // Handle form submission for adding new items
    document.getElementById('new-item-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const itemName = document.getElementById('item-name').value;
        const itemCategory = document.getElementById('item-category').value;
        const itemQuantity = parseInt(document.getElementById('item-quantity').value, 10);
        const itemUnit = document.getElementById('item-unit').value;
        const itemLastUpdated = document.getElementById('item-last-updated').value;
        const itemStatus = document.getElementById('item-status').value;

        // Simple validation
        if (itemName && itemCategory && !isNaN(itemQuantity) && itemLastUpdated) {
            const newItem = {
                name: itemName,
                category: itemCategory,
                quantity: itemQuantity,
                unit: itemUnit,
                lastUpdated: itemLastUpdated,
                status: itemStatus
            };

            // Add new item to the inventoryData array
            inventoryData.push(newItem);
            
            // Re-render the table to include the new item
            renderTable(inventoryData, currentPage);
            updatePageNum();

            // Clear the form
            document.getElementById('new-item-form').reset();

            // Hide the modal
            document.getElementById('new-item-modal').classList.add('hidden');
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    // Rest of your script (pagination, report generation, etc.) remains the same...
});
 

//ajax call add inventory item
document.getElementById('add-item-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch('add_item.php', {
        method: 'POST',
        body: formData
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert('Item added successfully');
              // Refresh inventory table
              loadInventory();
          } else {
              alert('Error adding item: ' + data.error);
          }
      });
});

//ajax fetch
function loadInventory() {
    fetch('fetch_inventory.php')
        .then(response => response.json())
        .then(data => {
            const inventoryTable = document.getElementById('inventory-data');
            inventoryTable.innerHTML = ''; // Clear existing data
            data.forEach(item => {
                inventoryTable.innerHTML += `
                    <tr>
                        <td>${item.item_name}</td>
                        <td>${item.category}</td>
                        <td>${item.quantity}</td>
                        <td>${item.unit}</td>
                        <td>${item.last_updated}</td>
                        <td>${item.status}</td>
                        <td><button class="btn btn-danger" onclick="deleteItem(${item.id})">Delete</button></td>
                    </tr>
                `;
            });
        });
}

document.addEventListener('DOMContentLoaded', loadInventory);

//ajax delete
function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        fetch('delete_item.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${id}`
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Item deleted successfully');
                  loadInventory();
              } else {
                  alert('Error deleting item: ' + data.error);
              }
          });
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const addItemForm = document.getElementById('add-item-form');
    const inventoryTableBody = document.getElementById('inventory-data');

    addItemForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get the form values
        const itemName = document.getElementById('item-name').value;
        const itemCategory = document.getElementById('item-category').value;
        const itemQuantity = document.getElementById('item-quantity').value;
        const itemUnit = document.getElementById('item-unit').value;
        const itemStatus = document.getElementById('item-status').value;

        // Create a new row for the table
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${itemName}</td>
            <td>${itemCategory}</td>
            <td>${itemQuantity}</td>
            <td>${itemUnit}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td>${itemStatus}</td>
            <td>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </td>
        `;

        // Append the new row to the table body
        inventoryTableBody.appendChild(newRow);

        // Reset the form fields
        addItemForm.reset();

        // Close the modal
        $('#add-item-modal').modal('hide');

        // Add delete functionality to the new delete button
        addDeleteFunctionality();
    });

    // Function to handle delete button functionality
    function addDeleteFunctionality() {
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                this.closest('tr').remove();
            });
        });
    }

    // Initialize delete functionality for any pre-existing rows
    addDeleteFunctionality();
});

