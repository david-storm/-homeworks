<?php
require('connectSql.php');
session_start();

if (!empty($_POST) && !empty($_POST['submit'])) {

	$data = validation();
	if (isset($data['message'])) {
		echo json_encode(['message' => $data['message']]);
	} else {
		$resultLogin = authentication($data);

		if ($resultLogin['auth']) {
			$_SESSION['user'] = $data['login'];
			echo json_encode(['login' => file_get_contents('templates/chat.html'), 'message' => $resultLogin['message']]);
		} else {
			echo json_encode(['message' => $resultLogin['message']]);
		}
	}
}

if (!empty($_POST) && !empty($_POST['logout'])) {
	$login = $_SESSION['user'];
	unset($_SESSION['user']);
	echo json_encode(['form' => file_get_contents("templates/login.html"), 'message' => "Good bye $login"]);
}

function validation() {
	$result = [];

	foreach ($_POST as $key => $value) {
		if (!($key == 'login' || $key == 'password')) {
			continue;
		}

		if (!empty($_POST[$key])) {
			$value = strval($_POST[$key]);

			if (strlen($value) < 4) {
				$result['message'][$key] = "$key short";
			} else if (strlen($value) > 25) {
				$result['message'][$key] = "$key long";
			} else {
				$result[$key] = $value;
			}
		} else {
			$result['message'][$key] = "Field $key empty!";
		}
	}
	return $result;
}

function authentication($data) {
	global $connect;
	$login = $data['login'];

	$sql = sprintf("SELECT * FROM `users` WHERE `name`='%s' LIMIT 1", $connect->real_escape_string($login));
	$result = $connect->query($sql);

	/* create new user */
	if ($result->num_rows == 0) {
		$sql = sprintf("INSERT INTO `users` (`name`, `password`) VALUES ('%s', '%s')", $connect->real_escape_string($login), password_hash($data['password'], PASSWORD_DEFAULT));
		$connect->query($sql);
		return ['auth' => TRUE, 'message' => ['auth' => "Register success. Hi $login"]];
	}

	/* verify password */
	$user = $result->fetch_assoc();
	if (password_verify($data['password'], $user['password'])) {
		return ['auth' => TRUE, 'message' => ['auth' => "Login success. Hello $login"]];
	}
	return ['auth' => FALSE, 'message' => ['password' => 'Password wrong']];
}
