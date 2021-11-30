var time = document.getElementById("clock");
var aud = document.getElementById("audio");
var btnStop = document.getElementById("stop")
var btnSnooze = document.getElementById("snooze");
var message = document.getElementById("message");
var alarmhr;
var alarmmin;
var alarmpm;
var stopped = false;
var soken = false;
var player;

var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError
        }      
    });
  }

function onPlayerStateChange(event)
{
    if (event.data == 0)
        player.playVideo(); //restart if player finished playing
    else if(event.data == 2)
        player.stopVideo();
}

function onError(event)
{
    message.textContent = "Nothing wrong here, kupo! But maybe you should refresh the page...just in case."
}

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
    var strtime = Hour + ":" + Minute;
    strtime = pm ? strtime.concat(" PM") : strtime.concat(" AM");
    time.textContent = strtime;
}

function play()
{
    var prob = Math.floor((Math.random() * 100) + 1);
    if(prob >= 85)
        aud.play();
    else
    {
        document.getElementById('player').width = 300;
        document.getElementById('player').height = 300;
        player.playVideo();
    }
    stopped = true;
}

function stop()
{
    player.stopVideo();
    document.getElementById('player').width = 0;
    document.getElementById('player').height = 0;
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

setInterval(clock, 500);