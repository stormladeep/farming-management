<?php
// signup.php
include 'db.php'; // Include database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash password
    $role = $_POST['role'];

    // Handle the terms checkbox
    $terms = isset($_POST['terms']) ? 1 : 0; // 1 if checked, 0 if not

    // Check if the user already exists
    $checkUserSql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($checkUserSql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "<script>alert('User already exists with this email.'); window.location.href='signup.php';</script>";
    } else {
        // Insert user into the database, including terms_accepted
        $sql = "INSERT INTO users (username, email, password, role, terms_accepted) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssi", $username, $email, $password, $role, $terms);

        if ($stmt->execute()) {
            echo "<script>alert('Registration successful. You can now log in.'); window.location.href='login.php';</script>";
        } else {
            echo "<script>alert('Error: " . $stmt->error . "'); window.location.href='signup.php';</script>";
        }
    }

    $stmt->close();
    $conn->close();
}
?>
