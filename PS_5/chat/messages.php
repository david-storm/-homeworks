<?php
session_start();
define("FILENAME", "data_base/messages.json");

if(!empty($_POST['submit']) && $_POST['submit'] == 'send'){
 
    $message = $_POST['message']; 
    $time = $_POST['time'];
    
    $file = fopen(FILENAME, 'r+');
    if(!filesize(FILENAME)){
        fwrite($file, '[]');
        fseek($file, -1,SEEK_END );
        fwrite($file, json_encode(array('message' => $message, 'time' => $time, 'user' => $_SESSION['user'])).']');
    } else {
        fseek($file, -1,SEEK_END );
        fwrite($file, ','.json_encode(array('message' => $message, 'time' => $time, 'user' => $_SESSION['user'])).']');
    }
    fclose($file);
    echo json_encode("message send");
}
if(!empty($_POST['submit']) && $_POST['submit'] == 'check'){
    $lastTime = isset($_POST['lastMessage']) ? $_POST['lastMessage'] : "";
    $timeNow = $_POST['timeNow'];
    
    $file = fopen(FILENAME, 'r');
    $messageDB = json_decode(fread($file, filesize(FILENAME)), true);
    $messageDBR = array_reverse($messageDB);
    $new_messages = array();
    foreach ($messageDBR as $message){
        if(($lastTime && $lastTime >= $message['time']) || $timeNow - 3600000 > $message['time']){
            break;
        }
        $new_messages[] = $message;
    }
    
    echo json_encode(array_reverse($new_messages));
}
