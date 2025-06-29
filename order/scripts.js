document.addEventListener('DOMContentLoaded', () => {
    const addItemButton = document.getElementById('add-item');
    const itemsTable = document.getElementById('items-table');
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const ordersTable = document.getElementById('orders-table');
    const payNowButton = document.getElementById('pay-now');
    const updateNotesButton = document.getElementById('update-notes-button');
    const orderId = 12345; // Example order ID

    // Fetch orders on page load
    fetchOrders();

    // Event listener to add new item
    addItemButton.addEventListener('click', () => {
        const itemName = document.getElementById('item-name').value;
        const itemDescription = document.getElementById('item-description').value;
        const quantity = document.getElementById('quantity').value;
        const unitPrice = document.getElementById('unit-price').value;

        if (itemName && itemDescription && quantity && unitPrice) {
            const totalPrice = (quantity * unitPrice).toFixed(2);
            const newRow = `
                <tr>
                    <td>${itemName}</td>
                    <td>${itemDescription}</td>
                    <td>${quantity}</td>
                    <td>${parseFloat(unitPrice).toFixed(2)}</td>
                    <td>${totalPrice}</td>
                </tr>
            `;
            itemsTable.insertAdjacentHTML('beforeend', newRow);
            clearInputFields();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Event listener to search orders
    searchButton.addEventListener('click', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const rows = ordersTable.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) { // Start from 1 to skip the header
            const orderId = rows[i].cells[0].textContent.toLowerCase();
            if (orderId.includes(searchTerm)) {
                rows[i].style.display = ''; // Show the row
            } else {
                rows[i].style.display = 'none'; // Hide the row
            }
        }
    });

    // Event listener to generate invoice
    payNowButton.addEventListener('click', () => {
        generateInvoice();
    });

    // Event listener to update notes
    updateNotesButton.addEventListener('click', () => {
        const newNotes = document.getElementById('update-order-notes').value;
        if (newNotes) {
            document.getElementById('order-notes').textContent = newNotes;
            document.getElementById('update-order-notes').value = ''; // Clear input field
            addOrderHistory(`Notes updated: ${newNotes}`);
        } else {
            alert('Please enter notes to update.');
        }
    });

    // Function to generate invoice
    function generateInvoice() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Invoice details
        const customerName = document.querySelector('#customer-supplier-info p strong').nextSibling.textContent.trim();
        const orderDate = new Date().toLocaleDateString();
        const orderTime = new Date().toLocaleTimeString();
        const paymentMethod = document.getElementById('payment-method').textContent;
        const totalCost = document.getElementById('total-cost').textContent;
        const vat = document.getElementById('vat').textContent;

        // Get items from the table
        const items = Array.from(itemsTable.querySelectorAll('tr')).slice(1).map(row => {
            const cells = row.querySelectorAll('td');
            return {
                name: cells[0].textContent,
                description: cells[1].textContent,
                quantity: cells[2].textContent,
                unitPrice: cells[3].textContent,
                totalPrice: cells[4].textContent,
            };
        });

        // Check if there are items to include
        if (items.length === 0) {
            alert('No items to include in the invoice.');
            return;
        }

        // Add content to PDF
        doc.text(`Invoice for ${customerName}`, 20, 20);
        doc.text(`Date: ${orderDate}`, 20, 30);
        doc.text(`Time: ${orderTime}`, 20, 40);
        doc.text(`Payment Method: ${paymentMethod}`, 20, 50);
        doc.text(`Total Cost: ${totalCost}`, 20, 60);
        doc.text(`VAT: ${vat}`, 20, 70);

        doc.text('Items:', 20, 90);
        let yPosition = 100;
        items.forEach(item => {
            doc.text(`${item.name} - ${item.description} (Qty: ${item.quantity}, Price: ${item.unitPrice}, Total: ${item.totalPrice})`, 20, yPosition);
            yPosition += 10;
        });

        // Save the PDF
        doc.save('invoice.pdf');
        updatePaymentStatus();
    }

    // Function to update payment status
    function updatePaymentStatus() {
        document.getElementById('payment-status').textContent = 'Paid';
        alert('Payment successful! Invoice has been generated.');
    }

    // Function to clear input fields
    function clearInputFields() {
        document.getElementById('item-name').value = '';
        document.getElementById('item-description').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('unit-price').value = '';
    }

    // Function to add order history
    function addOrderHistory(entry) {
        const historyList = document.getElementById('order-history');
        const newEntry = document.createElement('li');
        newEntry.textContent = `${new Date().toLocaleDateString()}: ${entry}`;
        historyList.appendChild(newEntry);
    }

    // Function to fetch orders
    function fetchOrders() {
        fetch('backend.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'action=fetchOrders'
        })
        .then(response => response.json())
        .then(orders => {
            const table = document.getElementById('orders-table');
            table.innerHTML = '<tr><th>Order ID</th><th>Order Date</th><th>Order Status</th><th>Order Type</th></tr>'; // Reset table
            orders.forEach(order => {
                const row = table.insertRow();
                row.insertCell(0).innerText = order.id;
                row.insertCell(1).innerText = order.order_date;
                row.insertCell(2).innerText = order.order_status;
                row.insertCell(3).innerText = order.order_type;
            });
        });
    }

    // Function to fetch order items
    function fetchOrderItems(orderId) {
        fetch('order.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `action=fetchOrderItems&orderId=${orderId}`
        })
        .then(response => response.json())
        .then(items => {
            const table = document.getElementById('items-table');
            table.innerHTML = '<tr><th>Item Name</th><th>Item Description</th><th>Quantity</th><th>Unit Price</th><th>Total Price</th></tr>'; // Reset table
            items.forEach(item => {
                const row = table.insertRow();
                row.insertCell(0).innerText = item.item_name;
                row.insertCell(1).innerText = item.item_description;
                row.insertCell(2).innerText = item.quantity;
                row.insertCell(3).innerText = item.unit_price;
                row.insertCell(4).innerText = item.total_price;
            });
        });
    }
});
