<?php
session_start();

if(empty($_SESSION['user'])){
    $form = file_get_contents('./templates/login.html');
} else {
    $form = file_get_contents('./templates/chat.html');
}

include './templates/tmpl.php';