
<?php

if(isset($_POST['submit']) && $_POST['submit'] == 'Submit'){

$file = 'resultVoting.json';

$handle = fopen($file, "c+");

$size  = filesize($file); 


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

$vot = $_POST['animal'];

$data[$vot]++;

$dataJson =  json_encode($data);
$GLOBALS["data"] =$dataJson;
fclose($handle);


$handle = fopen($file, 'w');

fwrite($handle, $dataJson);

fclose($handle);

}
?>


<html>
  <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
          
        let date = JSON.parse('<?php echo $GLOBALS["data"]; ?>');
        
      
       

        let data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
//          ['Work',     11],
//          ['Eat',      2],
//          ['Commute',  2],
//          ['Watch TV', 2],
//          ['Sleep',    7]
        ]);
        
         for(let prop in date){
             let arr = [prop, date[prop]];
             console.log(arr);
            data.push(arr);
        }

        console.log(data);
        const options = {
          title: 'My Daily Activities'
        };

        const chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="piechart" style="width: 900px; height: 500px;"></div>
  </body>
</html>