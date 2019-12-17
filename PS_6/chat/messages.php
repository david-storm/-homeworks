<?php
require_once('connectSql.php');
session_start();

$connect = new mysqli(SERVER_NAME, USER_NAME, PASSWORD, DB_NAME);

if ($connect->connect_error) {
	die("Connection failed: " . $connect->connect_error . "\n");
}

if (!empty($_POST['submit']) && $_POST['submit'] == 'send') {

	$message = $connect->real_escape_string($_POST['message']);
	$time =  $connect->real_escape_string($_POST['time']);

	$sql = sprintf('INSERT INTO `message` (`text`, `time`, `user`) VALUES ("%s", %u, "%s")', $message, $time, $connect->real_escape_string($_SESSION['user']));
	$result = $connect->query($sql);

	echo json_encode( $result ? 'message send' : 'error');
}

if (!empty($_POST['submit']) && $_POST['submit'] == 'check') {

	$sql = sprintf('SELECT `text`, `time`, `user` FROM `message` WHERE `time`>%u',  isset($_POST['lastMessage']) ? $_POST['lastMessage'] : $_POST['timeNow']);
	$result = $connect->query($sql);

	$new_messages = $result->mysqli_fetch_all();
	echo json_encode($new_messages);
}
