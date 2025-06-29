<?php
$host = 'localhost';
$user = 'root';  // Change to your MySQL username
$password = 'Password@2024';  // Change to your MySQL password
$dbname = 'PTA4DB01';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Could not connect to the database $dbname :" . $e->getMessage());
}
?>
