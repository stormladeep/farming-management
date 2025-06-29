<?php
include 'db.php';

$sql = "SELECT * FROM inventory ORDER BY last_updated DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $inventory = array();
    while ($row = $result->fetch_assoc()) {
        $inventory[] = $row;
    }
    echo json_encode($inventory);
} else {
    echo json_encode([]);
}

$conn->close();
?>
