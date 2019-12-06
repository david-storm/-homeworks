<?php

if ($_POST) {
    session_start();
    header("Location: index.php");
    postProcessing();
}

function postProcessing() {
    if (isset($_POST['task1'])) {
        calculate();
    }
    if (isset($_POST['task2'])) {
        calculateV2();
    }
    if (isset($_POST['task3'])) {
        uploadFile();
    }
    if (isset($_POST['task4'])) {
        drawChessboard();
    }
    if (isset($_POST['task5'])) {
        sumNumber();
    }
    if (isset($_POST['task6'])) {
        createArray();
    }
    if (isset($_POST['task8'])) {
        infoByText();
    }
}

function result($task) {
    echo isset($_SESSION['res']['task' . $task]) ? $_SESSION['res']['task' . $task] : '';
}

function calculate() {
    $result = 0;
    for ($i = -1000; $i <= 1000; $i++) {
        $result += $i;
    }
    $_SESSION['res']['task1'] = $result;
}

function calculateV2() {
    $result = 0;
    for ($i = -1000; $i <= 1000; $i++) {
        if (preg_match('/[237]$/', $i)) {
            $result += $i;
        }
    }
    $_SESSION['res']['task2'] = $result;
}

function uploadFile() {

    $target_file = 'upload/' . basename($_FILES['loadFile']['name']);
    $res = move_uploaded_file($_FILES['loadFile']['tmp_name'], $target_file);
    $_SESSION['res']['task3'] = ($res ? 'File load sucsess ' : 'Error') . '</br>';
}

function drawChessboard() {
    $res = '';
    $color1 = '#795548';
    $color2 = '#9e9e9e';
    list($width, $height) = explode("x", $_POST['size']);

    if (intval($width) && intval($height)) {
        for ($i = 1; $i <= $width; $i++) {
            for ($j = 1; $j <= $height; $j++) {
                $res .= '<div class="item" style="width:50px;height:50px;background-color:'.
                        (($i + $j) % 2 == 0 ? $color1 : $color2) .';display:inline-block;"></div>';
            }
            $res .= '</br>';
        }
    }
    $_SESSION['res']['task4'] = $res;
}

function sumNumber() {

    $number = intval($_POST['number']);
    $arrayNumbers = str_split($number);
    if (!$arrayNumbers) {
        $_SESSION['res']['task5'] = 0;
    } else {
        $res = 0;
        foreach ($arrayNumbers as $num) {
            $res += $num;
        }
        $_SESSION['res']['task5'] = $res;
    }
}

function createArray() {

    function multiplay($number) {
        return $number * 2;
    }

    $array = array();
    for ($i = 0; $i < 100; $i++) {
        $array[] = rand(1, 10);
    }
    $array = array_unique($array);
    sort($array);
    $array = array_reverse($array);
    $res = array_map('multiplay', $array);

    $_SESSION['res']['task6'] = implode(' - ', $res);
}

function infoByText() {

    $text = strval($_POST['text']);
    $length = iconv_strlen($text);
    preg_match_all('/\R/', $text, $rows);
    preg_match_all('/ /', $text, $space);

    $countLineTranslation = count($rows[0]);
    $countRows = $countLineTranslation + 1;
    $countSpaces = count($space[0]);
    $countSymbols = $length - $countSpaces - $countLineTranslation * 2;

    $_SESSION['res']['text'] = $text;
    $_SESSION['res']['task8'] = "Count rows - $countRows </br>" .
            "Count space - $countSpaces </br>" .
            "Count symbols - $countSymbols </br>";
}

function countVisits() {

    if (empty($_SESSION['res'])) {
        $_SESSION['countVisited'] = isset($_SESSION['countVisited']) ? $_SESSION['countVisited'] + 1 : 1;
    }
    echo $_SESSION['countVisited'] . "visits";
}

function viewsFiles() {

    $files1 = array_diff(scandir('upload'), array('..', '.'));
    foreach ($files1 as $file) {

        $sizeB = filesize('upload/' . $file);
        $size = readableSize($sizeB);
        echo '<div class="flex-container"><div class="row">';
        if (explode("/", mime_content_type('upload/' . $file))[0] == 'image') {
            echo '<img src="upload/' . $file . '" alt="' . $file . '" width="150">';
        }
        echo "<a href=logic.php?file=$file>$file</a><span>$size</br></span></div></div>";
    }
}

function readableSize($size) {
    $i = 0;
    while ($size > 1024) {
        $size /= 1024;
        $i++;
    }
    switch ($i) {
        case 0:
            $byteSize = 'bytes';
            break;
        case 1:
            $byteSize = 'KB';
            break;
        case 2:
            $byteSize = 'MB';
            break;
        case 3:
            $byteSize = 'GB';
            break;
        case 4:
            $byteSize = 'TB';
            break;
    }
    $size = number_format($size, 2);
    return $size . $byteSize;
}

if (isset($_GET) && isset($_GET['file'])) {
    $file = './upload/' . $_GET['file'];
    if (file_exists($file)) {
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($file) . '"');
        exit;
    }
    header("Location: index.php");
}
