<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];
    $rfid = $_POST['rfid'];
    $type = $_POST['type'];
    $breed = $_POST['breed'];
    $birthdate = $_POST['birthDate'];
    $age = $_POST['age'];
    $health_status = $_POST['status'];
    $last_checkup = $_POST['lastCheckup'];
    $next_vaccine = $_POST['nextVaccine'];
    
    $stmt = $pdo->prepare("UPDATE livestock SET rfid = ?, type = ?, breed = ?, birthdate = ?, age = ?, health_status = ?, last_checkup = ?, next_vaccine = ? WHERE id = ?");
    $stmt->execute([$rfid, $type, $breed, $birthdate, $age, $health_status, $last_checkup, $next_vaccine, $id]);

    echo "Livestock updated successfully!";
}
?>
