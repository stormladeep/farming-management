<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $rfid = $_POST['rfid'];
    $type = $_POST['type'];
    $breed = $_POST['breed'];
    $birthdate = $_POST['birthDate'];
    $age = $_POST['age'];
    $health_status = $_POST['status'];
    $last_checkup = $_POST['lastCheckup'];
    $next_vaccine = $_POST['nextVaccine'];

    // Handle image upload
    $image = $_FILES['LivestockImage']['name'];
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($image);

    if (move_uploaded_file($_FILES['LivestockImage']['tmp_name'], $target_file)) {
        $stmt = $pdo->prepare("INSERT INTO livestock (rfid, type, breed, birthdate, age, health_status, last_checkup, next_vaccine, image) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$rfid, $type, $breed, $birthdate, $age, $health_status, $last_checkup, $next_vaccine, $image]);

        echo "Livestock added successfully!";
    } else {
        echo "Error uploading image!";
    }
}
?>
