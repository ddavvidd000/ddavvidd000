<?php

function create_board($size) {
    $total_pairs = ($size * $size) / 2;
    $numbers = range(1, $total_pairs);
    $numbers = array_merge($numbers, $numbers);
    shuffle($numbers);

    $board = array();
    for ($i = 0; $i < $size; $i++) {
        $board[$i] = array();
        for ($j = 0; $j < $size; $j++) {
            $board[$i][$j] = array_pop($numbers);
        }
    }

    $_SESSION['board'] = $board;
}

session_start();

if (isset($_GET['size']) && is_numeric($_GET['size'])) {
    $size = intval($_GET['size']);
    if ($size >= 2 && $size <= 8 && $size % 2 == 0) {
        create_board($size);
        $response = array("success" => 1);
    } else {
        $response = array("success" => 0);
    }
} else {
    $response = array("success" => 0);
}

header('Content-Type: application/json');
echo json_encode($response);

?>
