<?php
// Database connection
$servername = "localhost";
$username = "root";  // Your MySQL username
$password = "Met@thombetesting12";  // Your MySQL password
$dbname = "2024fmsdb01";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $crop_name = $_POST['cropName'];
    $field = $_POST['field'];
    $seeds = $_POST['seeds'];
    $start_date = $_POST['startDate'];
    $end_date = $_POST['endDate'];
    $status = $_POST['status'];
    $notes = $_POST['notes'];
    $image_path = '';

    // Handle image upload
    if (isset($_FILES['cropImage']) && $_FILES['cropImage']['error'] == 0) {
        $image_name = $_FILES['cropImage']['name'];
        $image_tmp = $_FILES['cropImage']['tmp_name'];
        $image_path = "uploads/" . $image_name;

        // Move the uploaded file to the 'uploads' directory
        move_uploaded_file($image_tmp, $image_path);
    }

    // Insert data into the database
    $sql = "INSERT INTO crops (crop_name, field, seeds, start_date, end_date, status, image_path, notes)
            VALUES ('$crop_name', '$field', '$seeds', '$start_date', '$end_date', '$status', '$image_path', '$notes')";

    if ($conn->query($sql) === TRUE) {
        echo "New crop added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close the connection
    $conn->close();
}
?>
