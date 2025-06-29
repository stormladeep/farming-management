<?php
session_start();
if (!isset($_SESSION['username']) || $_SESSION['role'] != 'admin') {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <style>
        body {
            background-color: #f2a365; /* Persistent background for admin */
        }
        h1 {
            color: #fff;
        }
    </style>
</head>
<body>
    <h1>Welcome, Admin <?php echo $_SESSION['username']; ?>!</h1>
    <p><a href='logout.php'>Logout</a></p>
</body>
</html>
