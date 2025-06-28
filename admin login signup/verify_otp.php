<?php
// verify_otp.php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $entered_otp = $_POST['otp'];

    // Retrieve OTP for the user
    $sql = "SELECT otp FROM users WHERE email = ? AND is_verified = 0";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $stored_otp = $row['otp'];

        if ($entered_otp == $stored_otp) {
            // Update user to set is_verified to true
            $updateSql = "UPDATE users SET is_verified = 1 WHERE email = ?";
            $updateStmt = $conn->prepare($updateSql);
            $updateStmt->bind_param("s", $email);

            if ($updateStmt->execute()) {
                echo "<script>alert('Account verified successfully. You can now log in.'); window.location.href='login.php';</script>";
            } else {
                echo "<script>alert('Error verifying account. Please try again.'); window.location.href='verify_otp.php?email=$email';</script>";
            }
        } else {
            echo "<script>alert('Incorrect OTP. Please try again.'); window.location.href='verify_otp.php?email=$email';</script>";
        }
    } else {
        echo "<script>alert('No pending verification for this email.'); window.location.href='signup.php';</script>";
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
    <title>Verify OTP</title>
    <style>
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
</head>
<body>
    <h2>Verify OTP</h2>
    <form method="POST" action="verify_otp.php">
        <input type="hidden" name="email" value="<?php echo $_GET['email']; ?>">
        <label for="otp">Enter OTP:</label>
        <input type="text" name="otp" id="otp" required>
        <button type="submit">Verify</button>
    </form>
</body>
</html>
