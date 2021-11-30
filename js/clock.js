var canvas = document.getElementById("clock");
var ctx = canvas.getContext("2d");
var aud = document.getElementById("audio");
var btnStop = document.getElementById("stop")
var btnSnooze = document.getElementById("snooze");
var message = document.getElementById("message");
var alarmhr;
var alarmmin;
var alarmpm;
var stopped = false;
ctx.font = "30px Arial";
ctx.fillStyle = "white";
ctx.textAlign = 'center';



function padTime(time)
{
    return ('0' + time).slice(-2);
}

function clock()
{
    var date = new Date();
    var pm = false;
    var Hour = date.getHours();
    if(Hour == 0)
        Hour = 12;
    var Minute = date.getMinutes();
    if(Hour > 12)
        pm = true;
    if(alarmhr == Hour%24 && Minute == alarmmin && pm == alarmpm && !stopped)
    {
        play();
        btnStop.disabled = false;
        btnSnooze.disabled = false;
        message.textContent = "It is time to La-Hee"
    }
    Hour = ('0' + Hour%24).slice(-2)
    Minute = ('0' + date.getMinutes()).slice(-2);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    var time = Hour + ":" + Minute;
    time = pm ? time.concat(" PM") : time.concat(" AM");
    ctx.strokeText(time,canvas.width/2,canvas.height/2,canvas.width);
    ctx.fillText(time,canvas.width/2,canvas.height/2,canvas.width);
}

function play()
{
    aud.play();
}

function stop()
{
    aud.pause();
    aud.load();
    btnSnooze.disabled = true;
    btnStop.disabled = true;
    stopped = true; //stop until they set again
    message.textContent = "Alarm stopped."
    
}

function snooze()
{
    stop()
    btnStop.disabled = true;
    alarmmin += 10;
    if(alarmmin > 59)
    {
        alarmhr += 1;
        if(alarmhr > 12)
           pm = pm ? false : true
    }
    alarmmin %= 60
    alarmhr %= 24
    document.getElementById('hour').value = alarmhr;
    document.getElementById('min').value = alarmmin;
    stopped = false;
    message.textContent = "Snoozing for 10 minutes."
}

function set(hour, min)
{
    alarmhr = parseInt(hour);
    alarmmin = parseInt(min);
    alarmpm = document.getElementById("ampm").value == "PM" ? true: false
    var str = "Alarm set for " + padTime(alarmhr) + ":" + padTime(alarmmin);
    str = alarmpm? str.concat(" PM") : str.concat(" AM");
    message.textContent = str;
    stopped = false;
}

setInterval(clock, 250);