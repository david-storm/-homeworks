<?php
require_once('connectSql.php');

$connect = new mysqli(SERVER_NAME, USER_NAME, PASSWORD);

if ($connect->connect_error) {
    die("Connection failed: " . $connect->connect_error . "\n");
}

$sql = "CREATE DATABASE ".DB_NAME;
$connect->query($sql);
$connect->close();

$connectDB = new mysqli(SERVER_NAME, USER_NAME, PASSWORD, DB_NAME);

if ($connectDB->connect_error) {
    die("Connection failed: " . $connectDB->connect_error . "\n");
}
$sql = file_get_contents('./users.sql') . file_get_contents('./message.sql');

$result = $connectDB->multi_query($sql);
if($result){
    echo 'Data Base seccuess create';
}
 
        
       