<?php
$servername = "localhost";
$username = "root"; // change if different
$password = ""; // change if set
$dbname = "farming_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
