<?php
// Step 1: Establish database connection
$servername = "localhost";  // Typically 'localhost' if using local development
$username = "root";  // Your MySQL username
$password = "Password@2024S";  // Your MySQL password
$dbname = "PTA4DB01";  // The database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Step 2: Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $full_name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $subject = $conn->real_escape_string($_POST['subject']);
    $message = $conn->real_escape_string($_POST['message']);

    // Step 3: Insert data into the database
    $sql = "INSERT INTO contact_us (full_name, email, subject, message) 
            VALUES ('$full_name', '$email', '$subject', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "Message sent successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close the connection
    $conn->close();
}
?>
