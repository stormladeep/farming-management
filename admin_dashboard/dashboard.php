<?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: login.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Farming Management System</title>
</head>
<body>
    <h1>Welcome to the Dashboard, <?php echo htmlspecialchars($_SESSION['username']); ?>!</h1>
    <p>This is the dashboard page.</p>
    <a href="logout.php">Logout</a>
</body>
</html>
