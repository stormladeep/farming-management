<?php
include 'db_connect.php';

$sql = "SELECT * FROM orders";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Your HTML head content here -->
</head>
<body>
    <!-- Your HTML structure here -->
    <section id="order-overview" class="section active-section">
        <h3>Order Overview</h3>
        <div class="input-group mb-3">
            <input type="text" id="search-bar" class="form-control" placeholder="Search by Order ID">
            <div class="input-group-append">
                <button id="search-button" class="btn btn-primary">Search</button>
            </div>
        </div>
        <table id="orders-table" class="table table-striped">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Date</th>
                    <th>Order Status</th>
                    <th>Order Type</th>
                </tr>
            </thead>
            <tbody>
                <?php
                if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                        echo "<tr>";
                        echo "<td>" . $row["order_id"] . "</td>";
                        echo "<td>" . $row["order_date"] . "</td>";
                        echo "<td>" . $row["order_status"] . "</td>";
                        echo "<td>" . $row["order_type"] . "</td>";
                        echo "</tr>";
                    }
                } else {
                    echo "<tr><td colspan='4'>No orders found</td></tr>";
                }
                $conn->close();
                ?>
            </tbody>
        </table>
    </section>

    <!-- Your footer and other content -->
</body>
</html>
