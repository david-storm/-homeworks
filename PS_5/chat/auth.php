<?php
define("FILENAME", "data_base/users.json");
session_start();

if (!empty($_POST) && !empty($_POST['submit'])) {

    $data = validation();
    print_r($data);
    if (isset($data['message'])) {
        messageView($data['message']);
  }
    else {
        $resultLogin = authentication($data);
        messageView($resultLogin['message']);
        if ($resultLogin['auth']) {
            $_SESSION['user'] = $data['login'];
            echo file_get_contents("./chat.html");
        }
    }
}

function validation() {
    $result = array();

    foreach ($_POST as $key => $value) {
        if (!($key == 'login' || $key == 'password')) {
            continue;
        }

        if (!empty($_POST[$key])) {
            $value = strval($_POST[$key]);

            if (strlen($value) < 4) {
                $result['message'][$key] = $key . ' short';
            }
            else if (strlen($value) > 25) {
                $result['message'][$key] = $key . ' long';
            }
            else {
                $result[$key] = $value;
            }
        }
        else {
            $result['message'][$key] = "Field $key empty!";
        }
    }
    return $result;
}

function authentication($data) {
    $login = $data['login'];
    $filename = FILENAME;
    $handle = fopen($filename, 'r+');
    $filesize = filesize($filename);
    $users = array();

    if ($filesize) {
        $users = json_decode(fread($handle, $filesize), TRUE);
    }

    if (!empty($users) && array_key_exists($login, $users)) {
        $passwordDB = $users[$login];
        if ($passwordDB == $data['password']) {
            $result = array('auth' => TRUE, 'message' => array('auth' => 'Login success'));
        }
        else {
            $result = array('auth' => FALSE, 'message' => array('password' => 'Password wrong'));
        }
    }
    else {
        $users[$login] = $data['password'];
        rewind($handle);
        fwrite($handle, json_encode($users));
        $result = array('auth' => TRUE, 'message' => array('auth' => 'Register success'));
    }
    fclose($handle);
    return $result;
}

function messageView($message) {
    foreach ($message as $key => $value) {
        $GLOBALS[$key] = $value;
    }
}
