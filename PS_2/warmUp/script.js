const
    MILISECONDS_IN_SECONDS = 1000,
    SECONDS_IN_MINUTE = 60,
    SECONDS_IN_HOUR = 3600,
    MINUTES_IN_HOUR = 60,
    HOURS_IN_DAY = 24,
    DAYS_IN_MONTH = 30,
    MONTHS_IN_YEAR = 12;

document.addEventListener("DOMContentLoaded", () => {

    function validField(field, valid) {
        if (valid) {
            field.style.border = "";
        } else {
            alert(`The field is not filled according to the template`);
            field.style.border = "solid 2px red";
        }
    };

    document.getElementById("calcResult").addEventListener('click', () => {
        let value1 = Number(document.getElementById("firstNumber").value);
        let value2 = Number(document.getElementById("secondNumber").value);
        if (value1 > value2) {
            [value1, value2] = [value2, value1];
        }
        let result = 0;
        for (value1; value1 <= value2; value1++) {
            let lastDigit = String(value1)[String(value1).length - 1];
            if (lastDigit == 2 || lastDigit == 3 || lastDigit == 7) {
                result += Number(value1);
            }
        }

        document.getElementById("result").innerHTML = "Result = " + result;
    });



    document.getElementById("formatTime").addEventListener('click', () => {
        let seconds = Math.abs(Number(document.getElementById("timeSeconds").value));

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
        document.getElementById("timeResultFormat").innerHTML = 'Time in the format "hh:mm:ss" : ' + timeformat;
    });


    document.getElementById("formatTimeSeconds").addEventListener('click', () => {
        const timeInput = document.getElementById("timeFormat");
        const time = timeInput.value;
        const regexp = /[0-9]{2}:[0-5][0-9]:[0-5][0-9]/;
        if (!regexp.test(time)) {
            validField(timeInput, false);
        } else {
            validField(timeInput, true);
            const arr = time.split(':');
            const seconds = Number(arr[0]) * SECONDS_IN_HOUR + Number(arr[1]) * SECONDS_IN_MINUTE + Number(arr[2]);
            document.getElementById("resultTimeSeconds").innerHTML = 'Time in seconds : ' + seconds + "s.";
        }
    });



    document.getElementById("difference").addEventListener('click', () => {
        const date1Input = document.getElementById("datetimeStart");
        const date2Input = document.getElementById("datetimeFinish");
        let date1 = date1Input.value;
        let date2 = date2Input.value;

        if (date1 == '') {
            validField(date1Input, false);
        } else if (date2 == '') {
            validField(date2Input, false);
        } else {

            date1 = new Date(date1);
            date2 = new Date(date2);

            if (date1 > date2) {
                [date1, date2] = [date2, date1];
            }

            if (date1 - date2 == 0) {
                document.getElementById("resultDatatime").innerHTML = 'Same time.';
            } else {

                let second = date2.getSeconds() - date1.getSeconds();
                let minute = date2.getMinutes() - date1.getMinutes();
                let hour = date2.getHours() - date1.getHours();
                let day = date2.getDate() - date1.getDate();
                let month = date2.getMonth() - date1.getMonth();
                let year = date2.getFullYear() - date1.getFullYear();

                if (second < 0) {
                    second = SECONDS_IN_MINUTE + second;
                    minute--;
                }
                if (minute < 0) {
                    minute = MINUTES_IN_HOUR + minute;
                    hour--;
                }
                if (hour < 0) {
                    hour = HOURS_IN_DAY + hour;
                    day--;
                }
                if (day < 0) {
                    day = DAYS_IN_MONTH + day;
                    month--;
                }
                if (month < 0) {
                    month = MONTHS_IN_YEAR + month;
                    year--;
                }

                let result = (year ? year + " year(s), " : '') +
                    (month ? month + " month(s), " : '') +
                    (day ? day + " day(s), " : '') + (hour ? hour + " hour(s), " : '') +
                    (minute ? minute + " minute(s), " : '') + (second ? second + " second(s)," : '');

                result = result.substring(0, result.length - 2) + '.';

                validField(date1Input, true);
                validField(date2Input, true);
                document.getElementById("resultDatatime").innerHTML = 'Time has passed: ' + result;
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
        const sizeCheckerboardInput = document.getElementById("sizeCheckerboard");
        const sizeCheckerboard = sizeCheckerboardInput.value;
        const regexp = /\d+[xX]\d+/;
        if (!regexp.test(sizeCheckerboard)) {
            validField(sizeCheckerboardInput, false);
        } else {
            validField(sizeCheckerboardInput, true);
            const width = sizeCheckerboard.split("x")[1];
            const height = sizeCheckerboard.split("x")[0];
            draw(width, height);
        }
    });


    document.getElementById("ipAndUrl").addEventListener('blur', () => {
        const text = document.getElementById("ipAndUrl").value;
        let arr = text.split(',');
        const regexpUrl = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/;
        const regexpIP4 = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.:](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.:](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.:](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;
        const regexpIP6 = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.:](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.:](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.:](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.:](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)[\.:](25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g;

        let ipValidation = [];
        let urlValidation = [];

        arr.forEach(link => {
            link = link.trim();

            let trueLink = link.match(regexpIP4);
            if (trueLink) {
                ipValidation.push(trueLink);
            }
            trueLink = link.match(regexpIP6);
            if (trueLink) {
                ipValidation.push(trueLink);
            }

            trueLink = link.match(regexpUrl);
            if (trueLink) {
                link = trueLink[2] + '//' + trueLink[1];
                urlValidation.push(link);
            }
        });

        let ipLink = (ipValidation.sort()).map(ip => {
            return '<a href="http://' + ip + '" target="blank">' + ip + '</a>';
        });

        let urlLink = (urlValidation.sort()).map(url => {
            return '<a href="' + url.split('//')[1] + '//' + url.split('//')[0] + '" target="blank">' + url.split('//')[0] + '</a>';
        });
        console.log(ipLink.toString().replace(",", ""));
        const result = ipLink.join("<br>") + "<br>" + urlLink.join("<br>");

        document.getElementById("ipAndUrlRes").innerHTML = result;

    });

    document.getElementById("resultregexp").addEventListener('click', () => {
        const reg = document.getElementById("regexp").value;
        const flag = document.getElementById("regexpFlag").value;
        const regexp = new RegExp(reg, (flag) ? flag : '');
        const text = document.getElementById("regexpText").value;


        const newText = text.replace(regexp, (x) => {
            return '<mark>' + x + '</mark>';
        });

        document.getElementById("resultregexpText").innerHTML = newText;
    });
});