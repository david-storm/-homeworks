<?php
define("FILENAME", "data_base/users.json");

session_start();
if (isset($_SESSION['login'])) {
    header("Location: http://www.example.com/");
    exit;
}
if (!empty($_POST) && !empty($_POST['submit'])) {

    $data = validation();
    if (isset($data['message'])) {
        messageView($data['message']);
    }
    else {
        $resultLogin = authentication($data);
        messageView($resultLogin['message']);
        if ($resultLogin['auth']) {
            $_SESSION['user'] = $data['login'];
            header("Location: http://www.example.com/");
            exit;
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
            else if (strlen($value) > 20) {
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
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Chat</title>
        <link href="style/style.css" type="text/css" rel="stylesheet">
    </head>
    <body>
        <div>
            <form action="auth.php" method="POST">
                <label>Enter your name
                    <input type="text" name="login"/>

                </label>
                <label>Enter your password 
                    <input type="password" name="password"/>

                </label>
                <input type="submit" name="submit" value="Submit"/>

            </form>
        </div>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="js/script.js" ></script>
    </body>		
</html>
