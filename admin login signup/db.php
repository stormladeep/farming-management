<?php
$servername = "localhost";
$username = "root"; // Remove "@localhost" from the username
$password = "Password2024";
$dbname = "csdba01";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
