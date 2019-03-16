function getHistory() {
    return document.getElementById("history-value").innerText;
}

function getDisplay() {
    return document.getElementById("display-value").innerText;
}

function viewHistory(num) {
    document.getElementById("history-value").innerText = num;
}

function viewDisplay(num) {
    if(num == "") {
        document.getElementById("display-value").innerText=num;
    } else {
        document.getElementById("display-value").innerText=formatNumber(num);
    }
}

function formatNumber(num) {
    if(num == "-") {
        return "";
    }
    var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}

function reverseFormatNumber(num){
	return Number(num.replace(/,/g,''));
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        var display = reverseFormatNumber(getDisplay());
        if(display != NaN) {
            display = display + this.id;
            viewDisplay(display);
        }
    })
}

var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if(this.id == "clear") {
            viewDisplay("");
            viewHistory("");
            var zero = document.getElementById("0");
            zero.style.backgroundColor = "rgba(37, 50, 228, 0.534)";
            zero.style.transitionDuration =  "1s";
            zero.innerHTML = "0";
        } else if(this.id == "back") {
            var display = reverseFormatNumber(getDisplay()).toString();
            if(display) {
                display = display.substr(0, display.length -1);
                viewDisplay(display);
            }
        } else {
            var zero = document.getElementById("0");
            var display = getDisplay();
            var history = getHistory();
            if(display == "" && history != "") {
                if(isNaN(history[history.length - 1])) {
                    history = history.substr(0, history.length -1);
                }
            }
            if(display != "" || history != "") {
                display = display == "" ?  display : reverseFormatNumber(display);
                history = history + display;
                if (this.id == "/") {
                    zero.style.backgroundColor = "rgba(255, 255, 255, 0.103)";
                    zero.style.pointerEvents = "none";
                    zero.style.transitionDuration =  "1s";
                    zero.innerHTML = "";
                }
                if (this.id == "=") {
                    zero.style.backgroundColor = "rgba(37, 50, 228, 0.534)";
                    zero.style.transitionDuration =  "1s";
                    zero.innerHTML = "0";
                    var result = eval(history);
                    viewDisplay(result);
                    viewHistory("");
                } else {
                    history = history + this.id;
                    viewHistory(history);
                    viewDisplay("");
                }
            }
        }
    })
}