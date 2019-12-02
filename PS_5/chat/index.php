<?php
session_start();

if(empty($_SESSION['user'])){
    $form = file_get_contents("./login.html");
} else {
    $form = file_get_contents("./chat.html");
}

include 'tmpl.php';