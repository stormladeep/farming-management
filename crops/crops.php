<?php
$host = 'localhost';
$db = 'csdba01';
$user = 'root';  // Adjust accordingly
$pass = 'Password2024';      // Adjust accordingly

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Function to fetch all crops
function fetchCrops($conn) {
    $sql = "SELECT * FROM crops";
    $result = $conn->query($sql);
    return $result->fetch_all(MYSQLI_ASSOC);
}

// Function to add a new crop
function addCrop($conn, $cropName, $field, $seeds, $startDate, $endDate, $status, $imagePath, $notes) {
    $sql = "INSERT INTO crops (crop_name, field_name, seeds, start_date, end_date, status, image_path, notes) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssiissss", $cropName, $field, $seeds, $startDate, $endDate, $status, $imagePath, $notes);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}

// Function to delete a crop
function deleteCrop($conn, $id) {
    $sql = "DELETE FROM crops WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}

// Function to update a crop
function updateCrop($conn, $id, $cropName, $field, $seeds, $startDate, $endDate, $status, $imagePath, $notes) {
    $sql = "UPDATE crops 
            SET crop_name = ?, field_name = ?, seeds = ?, start_date = ?, end_date = ?, status = ?, image_path = ?, notes = ? 
            WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssiissss", $cropName, $field, $seeds, $startDate, $endDate, $status, $imagePath, $notes, $id);
    $result = $stmt->execute();
    $stmt->close();
    return $result;
}

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    switch ($action) {
        case 'fetchCrops':
            $crops = fetchCrops($conn);
            echo json_encode($crops);
            break;

        case 'addCrop':
            $cropName = $_POST['cropName'];
            $field = $_POST['field'];
            $seeds = $_POST['seeds'];
            $startDate = $_POST['startDate'];
            $endDate = $_POST['endDate'];
            $status = $_POST['status'];
            $notes = $_POST['notes'] ?? ''; // Optional field if needed
            
            // Handle image upload
            $imagePath = '';
            if (isset($_FILES['cropImage'])) {
                $targetDir = "uploads/";
                // Check if the upload directory exists, if not create it
                if (!is_dir($targetDir)) {
                    mkdir($targetDir, 0755, true);
                }
                
                // Validate image type and size
                $fileType = strtolower(pathinfo($_FILES["cropImage"]["name"], PATHINFO_EXTENSION));
                if (in_array($fileType, ['jpg', 'jpeg', 'png', 'gif']) && $_FILES["cropImage"]["size"] <= 5000000) { // 5MB limit
                    $imagePath = $targetDir . basename($_FILES["cropImage"]["name"]);
                    if (!move_uploaded_file($_FILES["cropImage"]["tmp_name"], $imagePath)) {
                        echo json_encode(['status' => 'error', 'message' => 'Image upload failed']);
                        exit();
                    }
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Invalid image type or size exceeded']);
                    exit();
                }
            }
            
            if (addCrop($conn, $cropName, $field, $seeds, $startDate, $endDate, $status, $imagePath, $notes)) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Database insertion failed']);
            }
            break;

        case 'deleteCrop':
            $id = $_POST['id'];
            if (deleteCrop($conn, $id)) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Database deletion failed']);
            }
            break;

        case 'updateCrop':
            $id = $_POST['id'];
            $cropName = $_POST['cropName'];
            $field = $_POST['field'];
            $seeds = $_POST['seeds'];
            $startDate = $_POST['startDate'];
            $endDate = $_POST['endDate'];
            $status = $_POST['status'];
            $notes = $_POST['notes'];

            // Handle image update
            $imagePath = '';
            if (isset($_FILES['cropImage'])) {
                $targetDir = "uploads/";
                // Check if the upload directory exists, if not create it
                if (!is_dir($targetDir)) {
                    mkdir($targetDir, 0755, true);
                }

                // Validate image type and size
                $fileType = strtolower(pathinfo($_FILES["cropImage"]["name"], PATHINFO_EXTENSION));
                if (in_array($fileType, ['jpg', 'jpeg', 'png', 'gif']) && $_FILES["cropImage"]["size"] <= 5000000) { // 5MB limit
                    $imagePath = $targetDir . basename($_FILES["cropImage"]["name"]);
                    move_uploaded_file($_FILES["cropImage"]["tmp_name"], $imagePath);
                }
            }

            if (updateCrop($conn, $id, $cropName, $field, $seeds, $startDate, $endDate, $status, $imagePath, $notes)) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Database update failed']);
            }
            break;

        default:
            echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
            break;
    }
}

$conn->close();
?>
