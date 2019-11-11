<?php
session_start();

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
        <form action="1.php" method="POST">
            <input type="submit" name="task1" value="Submit">            
        </form>
        <div class="result">
            <p>Result: </p>
            <?php echo isset($_SESSION['res']['task1']) ? $_SESSION['res']['task1'] : '' ?>
        </div>
    </section>
    <!-- TASK_2 -->
    <section class="task">
        <div class="description">
            <p>Calculate the sum of numbers from -1000 to 1000, summing only numbers that end in 2,3, and 7</p>
        </div>
        <form action="1.php" method="POST">
            <input type="submit" name="task2" value="Submit">            
        </form>
        <div class="result">
            <p>Result: </p>
            <?php echo isset($_SESSION['res']['task2']) ? $_SESSION['res']['task2'] : '' ?>
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
        <form action="1.php" method="POST"  enctype="multipart/form-data">
            <input type="file" name="loadFile">
            <input type="submit" name="task3" value="Submit">           
        </form>
        <div class="result">
            <?php
                echo isset($_SESSION['res']['task3']) ? $_SESSION['res']['task3'] : '';
                $files1 = array_diff(scandir('upload'), array('..', '.')); 
                foreach ($files1 as $file){
                    
                    $size = filesize('upload/'.$file);
                    if(explode("/",mime_content_type('upload/'.$file))[0] == 'image'){
                        echo '<img src="upload/'.$file.'" alt="'.$file.'" width="150">';
                    }
                    $i=0;
                    while($size > 1024){
                        $size /= 1024;
                        $i++;
                    }
                    switch($i){
                        case 0:
                            $byteSize = 'bytes';
                            break;
                        case 1:
                            $byteSize = 'KB';
                            break;
                        case 2:
                            $byteSize = 'MB';
                            break;
                        case 3:
                            $byteSize = 'GB';
                            break;
                        case 4:
                            $byteSize = 'TB';
                            break;
                    }
                    $size = number_format($size,2);
                    echo "$file size = $size $byteSize. </br>";
                }
            ?>
        </div>
    </section>
    <!-- TASK_4 -->
    <section class="task">
        <div class="description">
            <p>Chess board</p>
        </div>
        <form action="1.php" method="POST">
            <input type="text" name="size" placeholder="8x8" pattern="\d{1,2}x\d{1,2}">
            <input type="submit" name="task4" value="Submit">           
        </form>
        <div class="result">
            <p>You chess board</p>
            <div class="che">
              <?php echo isset($_SESSION['res']['task4']) ? $_SESSION['res']['task4'] : '' ?>
        </div>
    </section>
    <!-- TASK_5 -->
    <section class="task">
        <div class="description">
            <p>Find the sum of the digits of the entered number.</p>
        </div>
        <form action="1.php" method="POST">
            <input type="number" name="number" min="0" step="1">
            <input type="submit" name="task5" value="Submit">           
        </form>
        <div class="result">
              <?php echo isset($_SESSION['res']['task5']) ? $_SESSION['res']['task5'] : '' ?>
        </div>
    </section>
    <!-- TASK_6 -->
    <section class="task">
        <div class="description">
            <p>Generate an array of random integers from 1 to 10, the length of the array is 100.
                Remove repeats from the array, sort, reverse and multiply each element by two.</p>
        </div>
         <form action="1.php" method="POST">
            <input type="submit" name="task6" value="Submit">            
        </form>
        <div class="result">
              <?php print_r(isset($_SESSION['res']['task6']) ? $_SESSION['res']['task6'] : '' );?>
        </div>
    </section>
    <!-- TASK_7 -->
    <section class="task">
        <div class="description">
            <p>The page should have a counter for counting page visits through the php session.</p>
            <span>Redrawing the page when submitting is not considered a visit, since in fact this is one visit.</span>
        </div>
        <div class="result">
            <?php
                if(empty($_SESSION['res'])){
                    $_SESSION['countVisited'] = isset($_SESSION['countVisited']) ? $_SESSION['countVisited']+1 : 1; 
                }
                echo $_SESSION['countVisited'] . "visits";
            ?>
        </div>
    </section>
    <!-- TASK_8 -->
    <section class="task">
        <div class="description">
            <p>Count the number of lines, letters and spaces in the entered text. 
                Consider the Cyrillic alphabet, emoji and special characters. 
                Check with any online counter</p>
        </div>
         <form action="1.php" method="POST">
            <textarea name="text" minlength="1" rows="10" cols="60"><?php echo isset($_SESSION['res']['text']) ?  $_SESSION['res']['text'] : '' ?></textarea>
            <input type="submit" name="task8" value="Submit">            
        </form>
        <div class="result">
              <?php echo isset($_SESSION['res']['task8']) ? $_SESSION['res']['task8'] : '' ;?>
        </div>
    </section> 
    <?php unset($_SESSION['res']); ?>      
</body>
</html>