<?php
define('SERVER_NAME', 'localhost');
define('USER_NAME', 'root');
define('PASSWORD', '');
define('DB_NAME', 'test');
$connect = new mysqli(SERVER_NAME, USER_NAME, PASSWORD, DB_NAME);

if ($connect->connect_error) {
	die("Connection failed: " . $connect->connect_error . "\n");
}
