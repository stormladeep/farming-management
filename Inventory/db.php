<?php
$host = 'localhost';
$user = 'root';  // Default for XAMPP/WAMP
$password = 'Met@thombetesting12';  // Leave blank for XAMPP/WAMP
$dbname = '2024fmsdb01';

// Create connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
