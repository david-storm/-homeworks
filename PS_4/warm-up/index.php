<?php
session_start();
require 'logic.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="./style.css" type="text/css" rel="stylesheet">
    <title>Warm Up</title>
</head>
<body>
    <h1>Warm up</h1>
    <!-- TASK_1 -->
    <section class="task">
        <div class="description">
            <p>Calculate the sum of numbers from -1000 to 1000</p>
        </div>
        <form action="logic.php" method="POST">
            <input type="submit" name="task1" value="Submit">            
        </form>
        <div class="result">
            <p>Result: </p>
            <?php result(1);?>
        </div>
    </section>
    <!-- TASK_2 -->
    <section class="task">
        <div class="description">
            <p>Calculate the sum of numbers from -1000 to 1000, summing only numbers that end in 2,3, and 7</p>
        </div>
        <form action="logic.php" method="POST">
            <input type="submit" name="task2" value="Submit">            
        </form>
        <div class="result">
            <p>Result: </p>
            <?php result(2);?>
        </div>
    </section>
    <!-- TASK_3 -->
    <section class="task">
        <div class="description">
            <p>Make file upload to a separate folder. 
                All files from the folder should be displayed in a list containing only the name 
                and file size in a human-readable size (1kB, 3mb, 1.5gb) in brackets. Files can be downloaded. 
                Make a small preview for image files.</p>
        </div>
        <form action="logic.php" method="POST"  enctype="multipart/form-data">
            <input type="file" name="loadFile">
            <input type="submit" name="task3" value="Submit">           
        </form>
        <div class="result">
            <?php
                result(3);
                viewsFiles();
            ?>
        </div>
    </section>
    <!-- TASK_4 -->
    <section class="task">
        <div class="description">
            <p>Chess board</p>
        </div>
        <form action="logic.php" method="POST">
            <input type="text" name="size" placeholder="8x8" pattern="\d{1,2}x\d{1,2}">
            <input type="submit" name="task4" value="Submit">           
        </form>
        <div class="result">
            <p>You chess board</p>
            <div class="chess">
            <?php result(4);?>
        </div>
    </section>
    <!-- TASK_5 -->
    <section class="task">
        <div class="description">
            <p>Find the sum of the digits of the entered number.</p>
        </div>
        <form action="logic.php" method="POST">
            <input type="number" name="number" min="0" step="1">
            <input type="submit" name="task5" value="Submit">           
        </form>
        <div class="result">
            <?php result(5);?>
        </div>
    </section>
    <!-- TASK_6 -->
    <section class="task">
        <div class="description">
            <p>Generate an array of random integers from 1 to 10, the length of the array is 100.
                Remove repeats from the array, sort, reverse and multiply each element by two.</p>
        </div>
         <form action="logic.php" method="POST">
            <input type="submit" name="task6" value="Submit">            
        </form>
        <div class="result">
            <?php result(6);?>
        </div>
    </section>
    <!-- TASK_7 -->
    <section class="task">
        <div class="description">
            <p>The page should have a counter for counting page visits through the php session.</p>
            <span>Redrawing the page when submitting is not considered a visit, since in fact this is one visit.</span>
        </div>
        <div class="result">
            <?php countVisits(); ?>
        </div>
    </section>
    <!-- TASK_8 -->
    <section class="task">
        <div class="description">
            <p>Count the number of lines, letters and spaces in the entered text. 
                Consider the Cyrillic alphabet, emoji and special characters. 
                Check with any online counter</p>
        </div>
         <form action="logic.php" method="POST">
            <textarea name="text" minlength="1" rows="10" cols="60"><?php echo isset($_SESSION['res']['text']) ?  $_SESSION['res']['text'] : '' ?></textarea>
            <input type="submit" name="task8" value="Submit">            
        </form>
        <div class="result">
            <?php result(8);?>
        </div>
    </section> 
    <?php unset($_SESSION['res']); ?>      
</body>
</html>