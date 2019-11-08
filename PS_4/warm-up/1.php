<?php

session_start();
header("Location: index.php");
//task1

if (isset($_POST['task1'])) {

    $firstNumber = -1000;
    $secondNumber = 1000;
    $result = 0;
    for ($i = $firstNumber; $i <= $secondNumber; $i++) {
        $result += $i;
    }
    if (isset($_SESSION['res']['task1'])) {
        unset($_SESSION['res']['task1']);
    }
    else {
        $_SESSION['res']['task1'] = $result;
    }
}

//task2
if (isset($_POST['task2'])) {
    $firstNumber = -1000;
    $secondNumber = 1000;
    $result = 0;
    for ($i = $firstNumber; $i <= $secondNumber; $i++) {
        if (preg_match('/[237]$/', $i)) {
            $result += $i;
        }
    }
    if (isset($_SESSION['res']['task2'])) {
        unset($_SESSION['res']['task2']);
    }
    else {
        $_SESSION['res']['task2'] = $result;
    }
}

//task3
if (isset($_POST['task3'])) {

    $target_dir = "upload/";
    $target_file = $target_dir . basename($_FILES["loadFile"]["name"]);
   
    $res = move_uploaded_file($_FILES['loadFile']['tmp_name'] ,$target_file);
    
    
    $_SESSION['res']['task3'] =  ($res ? "File load sucsess " : "Error") . '</br>';
    
}

//task4
if (isset($_POST['task4'])) {
 $res='';
       $block1='<div class="item" style="width:50px;height:50px;background-color:red;display:inline-block;"></div>';
       $block2='<div class="item" style="width:50px;height:50px;background-color:green;display:inline-block;"></div>';
     list($width, $height) = explode("x", $_POST['size']);
     
     for($i = 1; $i <= $width; $i++){
         for($j = 1; $j <= $height; $j++){
             $res .= $i % 2 == 0 ? ($j % 2 == 0 ? $block1 : $block2) : ($j % 2 == 0 ? $block2 : $block1); 
         }
         $res .= '</br>';
     }
    
    $_SESSION['res']['task4'] = $res;
    
}

//task5
if (isset($_POST['task5'])) {

    $number = $_POST['number'];
    $arrayNumbers = str_split($number);
    if(!$arrayNumbers){
        $_SESSION['res']['task5'] =  0;
    } else{
        $res = 0;
     foreach ($arrayNumbers as $num){
         $res += $num;
     }
     $_SESSION['res']['task5'] =  $res;
    }
 
}

//task6
if (isset($_POST['task6'])) {

     function multiplay($number){
        return $number * 2;
    }
    
    $array = array();
    for($i = 0; $i <100; $i++){
       $array[] = rand(1, 10);
    }
    $array =  array_unique($array);
    sort($array);
    $array = array_reverse($array);
    $res = array_map('multiplay', $array); 
    
    $_SESSION['res']['task6'] =  $res;

}

//task8
if (isset($_POST['task8'])) {

   $text = $_POST['text'];
   $length = strlen($text);
   preg_match_all('/\R/', $text, $rows);
   preg_match_all('/ /', $text, $space);
   
   $countLineTranslation = count($rows[0]);
   $countRows = $countLineTranslation + 1;
   $countSpaces = count($space[0]);
   $countSymbols = $length - $countSpaces - $countLineTranslation * 2;
  
   $_SESSION['res']['text'] = $text;
   $_SESSION['res']['task8'] =  "Count rows - " . $countRows . '.</br>' . 
                                'Count space - ' . $countSpaces .'.</br>' .
                                'Count symbols - ' . $countSymbols .'.</br>';

}
