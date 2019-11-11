<?php
if(isset($_POST['submit']) && $_POST['submit'] == 'Submit'){

    $file = 'resultVoting.json';
    $handle = fopen($file, "c+");
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
    $vot = (isset($_POST['animal']) && $_POST['animal'] != 'none') ? substr($_POST['animal'], 0, 10) : false;

    if($vot){
        $data[$vot]++;
    }
    
    $GLOBALS["data"] = $dataJson =  json_encode($data);
    
    //rename file
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
          
        let date = JSON.parse('<?php echo $GLOBALS["data"]; ?>');
        let myData = [['Task', 'Hours per Day']];
    
        for(let prop in date){
            myData.push([prop, date[prop]]);
        }
        
        const data = google.visualization.arrayToDataTable(myData);
        console.log(data);
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