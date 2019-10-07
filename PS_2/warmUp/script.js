const 
MILISECONDS_IN_SECONDS = 1000,
SECONDS_IN_MINUTE = 60,
SECONDS_IN_HOUR = 3600,
MINUTES_IN_HOUR = 60,
HOURS_IN_DAY = 24,
DAYS_IN_MONTH = 30,
MONTHS_IN_YEAR = 12;

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("result").addEventListener('click', () => {
        let value1 = Number(document.getElementById("value1").value);
        let value2 = Number(document.getElementById("value2").value);
        let result = 0;
        for (value1; value1 <= value2; value1++) {
            let lastDigit = String(value1)[String(value1).length - 1];
            if (lastDigit == 2 || lastDigit == 3 || lastDigit == 7) {
                result += Number(value1);
            }
        }
        
        document.getElementById("result1").innerHTML = "Result = " + result;
    });



    document.getElementById("formatTime").addEventListener('click', () => {
        let seconds = Number(document.getElementById("timesec").value);

        let hour = 0;
        while (seconds >= SECONDS_IN_HOUR) {
            seconds -= SECONDS_IN_HOUR;
            hour++;
        }

        let minutes = 0;
        while (seconds >= SECONDS_IN_MINUTE) {
            seconds -= SECONDS_IN_MINUTE;
            minutes++;
        }

        let timeformat = '';
        if (hour > 9) {
            timeformat = hour + ':';
        } else {
            timeformat = '0' + hour + ':';
        }
        if (minutes > 9) {
            timeformat += minutes + ':';
        } else {
            timeformat += '0' + minutes + ':';
        }
        if (seconds > 9) {
            timeformat += seconds;
        } else {
            timeformat += '0' + seconds;
        }
        document.getElementById("formatTimeResult").innerHTML = 'Time in the format "hh:mm:ss" : ' + timeformat;
    });


    document.getElementById("resultSeconds").addEventListener('click', () => {
        let time = document.getElementById("timeformat").value;
        let arr = time.split(':');
        let seconds = Number(arr[0]) * SECONDS_IN_MINUTE + Number(arr[1]) * SECONDS_IN_MINUTE + Number(arr[2]);
        document.getElementById("resultSeconds1").innerHTML = 'Time in seconds : '+ seconds + "s.";
    });



    document.getElementById("difference").addEventListener('click', () => {
        const date1 = document.getElementById("datetime1").value;
        const date2 = document.getElementById("datetime2").value;

        if (date1 == '' || date2 == '') {
            if (date1 == '') {
                document.getElementById("datetime1").style.border = "solid 2px red";
            }
            if (date2 == '') {
                document.getElementById("datetime2").style.border = "solid 2px red";
            }
            alert("field 'datatime' is empty");

        } else {
            let seconds1 = Date.parse(date1);
            let seconds2 = Date.parse(date2);
            let diff = Math.abs(seconds1 - seconds2);
            if (diff == 0) {
                const result = "ravno";
            } else {
                diff /= MILISECONDS_IN_SECONDS; // convert in second
                const sec = diff % SECONDS_IN_MINUTE;
                diff = (diff - sec) / SECONDS_IN_MINUTE; //convert in minutes
                const min = diff % MINUTES_IN_HOUR;
                diff = (diff - min) / MINUTES_IN_HOUR; // convert in hour
                const hour = diff % HOURS_IN_DAY;
                diff = (diff - hour) / HOURS_IN_DAY; //convert in day
                const day = diff % DAYS_IN_MONTH;
                diff = (diff - day) / DAYS_IN_MONTH; //convert in month
                const month = diff % MONTHS_IN_YEAR;
                const year = (diff - month) / MONTHS_IN_YEAR; // convert in year

                const result = (year ? year + " year(s), " : '') +
                    (month ? month + " month(s), " : '') +
                    (day ? day + " day(s), " : '') + (hour ? hour + " hour(s), " : '') +
                    (min ? min + " minute(s), " : '') + (sec ? sec + " second(s), " : '');

                document.getElementById("datetime1").style.border = "";
                document.getElementById("datetime2").style.border = "";
                document.getElementById("resultDatatime").innerHTML = 'Time has passed: '+result;

            }

        }

    });


    draw(); // draw checkerboard default

    function draw(row = 8, col = 8) {
        const widthCanvas = 300;
        const heightCanvas = 300;
        let canvas = document.getElementById('tutorial');
        if (canvas.getContext) {
            let ctx = canvas.getContext('2d');

            width = widthCanvas / col;
            height = heightCanvas / row;

            for (let i = 0; i < col; i++) {
                for (let j = 0; j < row; j++) {
                    let color = (i + 1) % 2 == 0 ?
                        (j + 1) % 2 == 0 ? "#8b2010" : "#e5a343" :
                        (j + 1) % 2 == 0 ? "#e5a343" : "#8b2010";
                    drawSquare(ctx, i * width, j * height, width, height, color);
                }
            }

            function drawSquare(ctx, x, y, width, height, color) {
                ctx.fillStyle = color;
                ctx.fillRect(x, y, width, height);
            }
        }
    }
    

    document.getElementById("drawCheckerboard").addEventListener('click', () => {
        const sizeCheckerboard = document.getElementById("sizeCheckerboard").value;
        const width = sizeCheckerboard.split("x")[1];
        const height = sizeCheckerboard.split("x")[0];
        draw(width, height);
    });


    document.getElementById("ipAndUrl").addEventListener('blur', () =>{
        const text =  document.getElementById("ipAndUrl").value;
        let arr = text.split(',');
        const regexpUrl = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/;
        const regexpIP = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;

        let ipValidation = [];
        let urlValidation = [];

        arr.forEach(link => {
            link = link.trim();

            let trueLink = link.match(regexpIP);
            if(trueLink){
                ipValidation.push(link);
            }

             trueLink = link.match(regexpUrl);
            if(trueLink){
                arr = link.split("//");
                link = arr[1] + '//' + arr[0];
                urlValidation.push(link);
            }
        });

        let ipLink = (ipValidation.sort()).map( ip => {
            return '<a href="http://' + ip + '" target="blank">' + ip + '</a><br>';
        }); 

        let urlLink = (urlValidation.sort()).map( url => {
            return '<a href="'+url.split('//')[1] +'//' + url.split('//')[0] + '" target="blank">' + url.split('//')[0] + '</a><br>';
        });

        const result =  ipLink.toString().replace(",", "") +  urlLink.toString().replace(",", "");

        document.getElementById("ipAndUrlRes").innerHTML = result;
 
    });

    document.getElementById("resultregexp").addEventListener('click', () =>{
        const reg =  document.getElementById("regexp").value;
        const flag = document.getElementById("regexpFlag").value;
        const regexp = new RegExp(reg, (flag)? flag : '');
        const text =  document.getElementById("regexpText").value;
       
        
        const newText = text.replace(regexp, (x) =>{
            return '<mark>' + x + '</mark>';
        });

        document.getElementById("resultregexpText").innerHTML = newText;
    });
});