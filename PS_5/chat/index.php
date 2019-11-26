<?php
session_start();

//$doc_root = $_SERVER['DOCUMENT_ROOT'];
//$project_puth = '/PS_5/chat/';
//$filename =$doc_root . $project_puth . 'login.html';
//readfile($filename);
//print_r($_SESSION);
if(empty($_SESSION['user'])){
    $form = file_get_contents("./login.html");
} else {
    $form = file_get_contents("./chat.html");
}

include 'tmpl.php';
