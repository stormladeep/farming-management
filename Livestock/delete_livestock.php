<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['id'];

    $stmt = $pdo->prepare("DELETE FROM livestock WHERE id = ?");
    $stmt->execute([$id]);

    echo "Livestock deleted successfully!";
}
?>
