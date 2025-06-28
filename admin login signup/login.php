<?php
// login.php
session_start();
include 'db.php'; // Include the database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Fetch user from the database
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verify password
        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $user['username'];
            $_SESSION['role'] = $user['role'];

            // Redirect based on role
            if ($user['role'] === 'admin') {
                header("Location: admin_dashboard.html");
            } else {
                header("Location: ../E-commrce/products.html");
            }
            exit();
        } else {
            $error = "Invalid password.";
        }
    } else {
        $error = "No user found with that username.";
    }

    $stmt->close();
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        /* Your existing styles */
        body {
        transition: background-color 0.5s ease;
        background: linear-gradient(135deg, #6fb98f, #f2a365);
        font-family: 'Arial', sans-serif;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
    }

    /* Container */
    .container {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 100%;
        text-align: center;
    }

    /* Title Styling */
    h2 {
        margin-bottom: 1.5rem;
        font-size: 1.8rem;
        font-weight: bold;
        color: #333;
    }

    /* Form Inputs Styling */
    .form-group {
        margin-bottom: 1.2rem;
    }

    .form-control {
        width: 100%;
        padding: 10px;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
        margin-bottom: 1rem;
        transition: all 0.3s;
    }

    .form-control:focus {
        border-color: #6fb98f;
        box-shadow: 0 0 8px rgba(111, 185, 143, 0.3);
        outline: none;
    }

    /* Buttons Styling */
    .btn-primary {
        background-color: #6fb98f;
        border: none;
        padding: 10px 15px;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s;
    }

    .btn-primary:hover {
        background-color: #5a9a7a;
    }

    /* Links Styling */
    a {
        color: #6fb98f;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    /* Error and Success Message Styling */
    .alert {
        padding: 10px;
        background-color: #f8d7da;
        color: #721c24;
        margin-bottom: 15px;
        border-radius: 4px;
    }

    /* OTP Form Styling */
    .otp-form {
        margin-top: 20px;
        text-align: center;
    }
    </style>
</head>
<body>
    <div class="container mt-5">
        <h2>Login</h2>
        <?php if (!empty($error)): ?>
            <div class="alert alert-danger"><?php echo $error; ?></div>
        <?php endif; ?>
        <form action="login.php" method="POST">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary" name="login">Login</button>
        </form>
        <p>Don't have an account? <a href="signup.html">Sign up here</a></p>
    </div>
</body>
</html>
