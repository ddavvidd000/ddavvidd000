<?php

session_start();

header('Content-Type: application/json');

if (isset($_GET['x']) && isset($_GET['y'])) {
    $x = intval($_GET['x']);
    $y = intval($_GET['y']);
    if (isset($_SESSION['board'])) {
        $board = $_SESSION['board'];
        $rows = count($board);
        $cols = count($board[0]);

        if ($x >= 0 && $x < $rows && $y >= 0 && $y < $cols) {
            echo json_encode(array("value" => $board[$x][$y]));
        exit;
        } else {
            echo json_encode(array("error" => "Coordinates [$x, $y] out of bounds."));
            exit;
        }
    } else {
        echo json_encode(array("error" => "Board not found in session."));
        exit;
    }
} else {
    echo json_encode(array("error" => "Coordinates not provided."));
}


?>
