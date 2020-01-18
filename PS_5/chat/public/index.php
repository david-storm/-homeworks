<?php
session_start();

if(empty($_SESSION['user'])){
    $form = file_get_contents("../public/templates/login.html");
} else {
    $form = file_get_contents("../public/templates/chat.html");
}

include '../public/templates/tmpl.php';