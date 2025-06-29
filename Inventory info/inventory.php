<?php
// Database connection
$host = 'localhost';
$db = 'farmingmsdb01';
$user = 'root';
$pass = 'M@thombe19';  // Use your database password here

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error connecting to database: " . $e->getMessage());
}

// Handle different request methods
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        // Add a new item
        if ($_POST['action'] === 'add') {
            $item_name = $_POST['item_name'];
            $category = $_POST['category'];
            $quantity = $_POST['quantity'];
            $unit = $_POST['unit'];
            $status = $_POST['status'];

            try {
                $stmt = $pdo->prepare("INSERT INTO inventory (item_name, category, quantity, unit, status) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$item_name, $category, $quantity, $unit, $status]);
                echo json_encode(['success' => true, 'message' => 'Item added successfully']);
            } catch (Exception $e) {
                echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            }
        }

        // Delete an item
        if ($_POST['action'] === 'delete') {
            $item_id = $_POST['id'];

            try {
                $stmt = $pdo->prepare("DELETE FROM inventory WHERE id = ?");
                $stmt->execute([$item_id]);
                echo json_encode(['success' => true, 'message' => 'Item deleted successfully']);
            } catch (Exception $e) {
                echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            }
        }
    }
    exit; // Exit after processing POST requests
}

// Handle GET request to fetch inventory items
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM inventory");
        $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($items);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
    exit; // Exit after processing GET requests
}
?>
