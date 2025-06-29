<?php
$servername = "localhost";
$username = "root"; // Replace with your DB username
$password = ""; // Replace with your DB password
$dbname = "labor_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch Total Employees Data
$employeesResult = $conn->query("SELECT * FROM employees");
$employeesData = [];
while ($row = $employeesResult->fetch_assoc()) {
    $employeesData[] = $row;
}

// Fetch Employees on Leave Data
$employeesOnLeaveResult = $conn->query("SELECT * FROM employees_on_leave");
$employeesOnLeaveData = [];
while ($row = $employeesOnLeaveResult->fetch_assoc()) {
    $employeesOnLeaveData[] = $row;
}

// Fetch Employee Performance Data
$performanceResult = $conn->query("SELECT * FROM employee_performance");
$performanceData = [];
while ($row = $performanceResult->fetch_assoc()) {
    $performanceData[] = $row;
}

// Fetch Best Employees of the Month
$bestEmployeesResult = $conn->query("SELECT * FROM best_employees");
$bestEmployeesData = [];
while ($row = $bestEmployeesResult->fetch_assoc()) {
    $bestEmployeesData[] = $row;
}

// Close the connection
$conn->close();

// Return JSON data for JavaScript
header('Content-Type: application/json');
echo json_encode([
    "employees" => $employeesData,
    "employeesOnLeave" => $employeesOnLeaveData,
    "performance" => $performanceData,
    "bestEmployees" => $bestEmployeesData
]);
?>
