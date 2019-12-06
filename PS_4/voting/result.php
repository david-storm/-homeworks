<?php
if(isset($_POST['submit']) && $_POST['submit'] == 'Submit'){

    $file = 'resultVoting.json';
    $handle = fopen($file, 'c+');
    $size  = filesize($file); 

    //data is not empty
    if($size != 0){
        $text =  fread($handle, $size);
        $data = json_decode($text, true);

    } else {
        $data = array(
            'cat' => 0,
            'dog' => 0,
            'fish' => 0
        );
    }
    fclose($handle);
    $vot = (isset($_POST['animal']) && $_POST['animal'] != 'none' && isset($data[$_POST['animal']])) ? $_POST['animal'] : false;

    if($vot){
        $data[$vot]++;
    }
    
    $dataJson =  json_encode($data);
    
    $handle = fopen($file, 'w');
    fwrite($handle, $dataJson);
    fclose($handle);
}
?>


<html>
  <head>
    <link href="./style.css" type="text/css" rel="stylesheet">
    <title>Anonim voting</title>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
          
        let dataJson = JSON.parse('<?=$dataJson;?>');
        let myData = [['Task', 'Hours per Day']];
    
        for(let prop in dataJson){
            myData.push([prop, dataJson[prop]]);
        }
        
        const data = google.visualization.arrayToDataTable(myData);
        const options = {
          title: 'Preferred animals'
        };

        const chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="piechart"></div>
  </body>
</html>