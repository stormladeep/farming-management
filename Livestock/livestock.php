<?php
$host = 'localhost';
$db = 'PTA4DB01';
$user = 'root'; // Adjust accordingly
$pass = 'Password@2024'; // Adjust accordingly

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to fetch all livestock
function fetchLivestock($conn) {
    $sql = "SELECT * FROM livestock";
    return $conn->query($sql);
}

// Function to add new livestock
function addLivestock($conn, $rfid, $type, $breed, $birthDate, $age, $healthStatus, $lastCheckup, $nextVaccination, $imagePath) {
    $sql = "INSERT INTO livestock (rfid, type, breed, birth_date, age, health_status, last_checkup, next_vaccination, image_path) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssisssss", $rfid, $type, $breed, $birthDate, $age, $healthStatus, $lastCheckup, $nextVaccination, $imagePath);
    return $stmt->execute();
}

// Function to delete livestock
function deleteLivestock($conn, $id) {
    $sql = "DELETE FROM livestock WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    return $stmt->execute();
}

// Function to update livestock
function updateLivestock($conn, $id, $rfid, $type, $breed, $birthDate, $age, $healthStatus, $lastCheckup, $nextVaccination, $imagePath) {
    $sql = "UPDATE livestock 
            SET rfid = ?, type = ?, breed = ?, birth_date = ?, age = ?, health_status = ?, last_checkup = ?, next_vaccination = ?, image_path = ? 
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssisssssi", $rfid, $type, $breed, $birthDate, $age, $healthStatus, $lastCheckup, $nextVaccination, $imagePath, $id);
    return $stmt->execute();
}

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    switch ($action) {
        case 'fetchLivestock':
            $livestock = fetchLivestock($conn);
            echo json_encode($livestock->fetch_all(MYSQLI_ASSOC));
            break;

        case 'addLivestock':
            $rfid = $_POST['rfid'];
            $type = $_POST['type'];
            $breed = $_POST['breed'];
            $birthDate = $_POST['birthDate'];
            $age = $_POST['age'];
            $healthStatus = $_POST['healthStatus'];
            $lastCheckup = $_POST['lastCheckup'];
            $nextVaccination = $_POST['nextVaccination'];

            // Handle image upload
            if (isset($_FILES['image'])) {
                $targetDir = "uploads/";
                $imagePath = $targetDir . basename($_FILES["image"]["name"]);
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $imagePath)) {
                    if (addLivestock($conn, $rfid, $type, $breed, $birthDate, $age, $healthStatus, $lastCheckup, $nextVaccination, $imagePath)) {
                        echo json_encode(['status' => 'success']);
                    } else {
                        echo json_encode(['status' => 'error']);
                    }
                } else {
                    echo json_encode(['status' => 'image_error']);
                }
            }
            break;

        case 'deleteLivestock':
            $id = $_POST['id'];
            if (deleteLivestock($conn, $id)) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error']);
            }
            break;

        case 'updateLivestock':
            $id = $_POST['id'];
            $rfid = $_POST['rfid'];
            $type = $_POST['type'];
            $breed = $_POST['breed'];
            $birthDate = $_POST['birthDate'];
            $age = $_POST['age'];
            $healthStatus = $_POST['healthStatus'];
            $lastCheckup = $_POST['lastCheckup'];
            $nextVaccination = $_POST['nextVaccination'];

            // Handle image update
            if (isset($_FILES['image'])) {
                $targetDir = "uploads/";
                $imagePath = $targetDir . basename($_FILES["image"]["name"]);
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $imagePath)) {
                    if (updateLivestock($conn, $id, $rfid, $type, $breed, $birthDate, $age, $healthStatus, $lastCheckup, $nextVaccination, $imagePath)) {
                        echo json_encode(['status' => 'success']);
                    } else {
                        echo json_encode(['status' => 'error']);
                    }
                } else {
                    echo json_encode(['status' => 'image_error']);
                }
            }
            break;
    }
}

$conn->close();
?>
