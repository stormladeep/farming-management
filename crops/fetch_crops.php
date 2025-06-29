<?php
$servername = "localhost";
$username = "root";
$password = "Met@thombetesting12";
$dbname = "2024fmsdb01";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch crops data
$sql = "SELECT * FROM crops";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
            <td>" . $row["crop_name"] . "</td>
            <td>" . $row["field"] . "</td>
            <td>" . $row["seeds"] . "</td>
            <td>" . $row["start_date"] . "</td>
            <td>" . $row["end_date"] . "</td>
            <td><span class='status " . strtolower($row["status"]) . "'>" . $row["status"] . "</span></td>
            <td><img src='" . $row["image_path"] . "' alt='" . $row["crop_name"] . "' class='crop-image'></td>
            <td>
                <button class='btn btn-warning btn-sm'>Edit</button>
                <button class='btn btn-danger btn-sm'>Delete</button>
            </td>
        </tr>";
    }
} else {
    echo "<tr><td colspan='8'>No crops found</td></tr>";
}

$conn->close();
?>
