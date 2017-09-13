var minDiv = document.getElementById('min');
var secDiv = document.getElementById('sec');
var dots = document.getElementById('dots');
var startPanel = document.getElementsByClassName('button')[0];
var controlPanel = document.getElementById('controlPanel');
var pauseBut = document.getElementById('pause');
var stopBut = document.getElementById('stop');
var isPause = false;

var timer;


minDiv.onmousedown = secDiv.onmousedown = dots.onmousedown
    = startPanel.onmousedown = controlPanel.onmousedown = function () {
    return false;
};

onControl();

stopBut.onclick = function () {
    resetTimer();
    onControl();
    swithPanels(startPanel, controlPanel);
    breakPause();
    dropTimingStyle();
};

pauseBut.onclick = function () {
    if (isPause) {
        breakPause();
        timer = setInterval(startTimer, 1000);
    } else {
        isPause = true;
        clearInterval(timer);
        pauseStyle();
    }
};



function offControl() {
    minDiv.onmouseover = secDiv.onmouseover = minDiv.onmouseout = secDiv.onmouseout = minDiv.ondblclick = secDiv.ondblclick = startPanel.onclick = '';
}

function onControl() {
    minDiv.onmouseover = function () {
        if (this.textContent == '00') {
            this.textContent = '';
        }
        document.onkeypress = function (event) {
            if (event.keyCode == 8) {
                minDiv.textContent = minDiv.textContent.slice(0, minDiv.textContent.length - 1);
            }
            if (!isNaN(event.key)) {
                minDiv.textContent = validateTime(minDiv.textContent, event.key);
            }
        };
    };

    secDiv.onmouseover = function () {
        if (this.textContent == '00') {
            this.textContent = '';
        }
        document.onkeypress = function (event) {
            if (event.keyCode == 8) {
                secDiv.textContent = secDiv.textContent.slice(0, secDiv.textContent.length - 1);
            }
            if (!isNaN(event.key)) {
                secDiv.textContent = validateTime(secDiv.textContent, event.key);
            }
        };
    };

    minDiv.onmouseout = secDiv.onmouseout = function () {
        document.onkeypress = '';
        if (this.textContent == '') {
            this.textContent = '00';
        }
        this.textContent = corectTime(this.textContent);
        autoSoonStyle();
    };

    minDiv.ondblclick = secDiv.ondblclick = function () {
        this.textContent = '00';
    };

    startPanel.onclick = startTimingInterval;
}

function validateTime(oldValue, newValue) {
    if ((parseInt(oldValue + newValue) < 60) && oldValue.length != 2) {
        return '' + oldValue + newValue;
    } else {
        return oldValue;
    }
}

function corectTime(value) {
    if (value.length < 2) {
        return '0' + value;
    } else {
        return value;
    }
}



function breakPause() {
    isPause = false;
    dropPauseStyle();
}

function swithPanels(panel1, panel2) {
    if (panel1.style.display == 'none') {
        panel1.style.display = 'inline-block';
        panel2.style.display = 'none';
    } else {
        panel2.style.display = 'inline-block';
        panel1.style.display = 'none';
    }
}
// -------------------------- TIMERS-------------------------//

function startTimingInterval() {
    if ((minDiv.textContent != '00') || (secDiv.textContent != '00')) {
        timer = setInterval(startTimer, 1000);
        offControl();
        swithPanels(startPanel, controlPanel);
        timingStyle();
    }
}

function startTimer() {
    var min = parseInt(minDiv.textContent),
        sec = parseInt(secDiv.textContent);

    sec--;
    autoSoonStyle();
    if (sec == 0) {
        if (min == 0) {
            finishTimer();
        }
    }
    if (sec < 0) {
        min--;
        sec = 59;
    }
    secDiv.textContent = sec >= 10 ? sec : '0' + sec;
    minDiv.textContent = min >= 10 ? min : '0' + min;
}

function finishTimer() {
    clearInterval(timer);
    onControl();
    swithPanels(startPanel, controlPanel);
    dropSoonStyle();
    finishStyle();
    setTimeout(dropFinishStyle,2500);
}

function resetTimer() {
    clearInterval(timer);
    minDiv.textContent = '00';
    secDiv.textContent = '00';
    dropSoonStyle();
}

// -------------------------- SOON STYLE-------------------------//
function autoSoonStyle() {
    var min = minDiv.textContent, sec = secDiv.textContent;
    if ((min == 0) && (sec <= 10) && (sec > 0)) {
        soonStyle();
    } else {
        dropSoonStyle();
    }
}

function soonStyle() {
   secDiv.className = 'soon';
}

function dropSoonStyle() {
    secDiv.className = '';
}

// -------------------------- PAUSE STYLE-------------------------//

function pauseStyle() {
    pauseBut.className = pauseBut.className + ' pauseBgColor';
    document.getElementById('timerDisplay').style.borderColor = 'rgba(252, 228, 82, 0.85)';
    document.getElementById('timerDisplay').style.borderStyle = 'dotted';
}

function dropPauseStyle() {
    pauseBut.className = 'controlButton';
    timingStyle();
}

// -------------------------- TIMING STYLE-------------------------//

function timingStyle() {
    document.getElementById('timerDisplay').style.borderStyle = 'solid';
    document.getElementById('timerDisplay').style.borderColor = 'rgba(217, 0, 0, 0.55)';
}

function dropTimingStyle() {
    document.getElementById('timerDisplay').style.borderColor = 'rgba(255, 216, 0, 0.4)';
}

// -------------------------- FINISH STYLE-------------------------//

function finishStyle() {
    document.getElementById('timerDisplay').style.borderColor = '#068a04';
}

function dropFinishStyle() {
    document.getElementById('timerDisplay').style.borderColor = 'rgba(255, 216, 0, 0.4)';
}


