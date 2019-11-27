<?php
session_start();
define("FILENAME", "data_base/messahes.json");

if(!empty($_POST['submit']) && $_POST['submit'] == 'send'){
   $mes; 
    $message = $_POST['message']; 
    $time = $_POST['time'];
    
    $file = fopen(FILENAME, 'a');
    
    fwrite($file, json_encode(array('message' => $message, 'time' => $time, 'user' => $_SESSION['user'])));
    fclose($file);
    echo "message send";
}

