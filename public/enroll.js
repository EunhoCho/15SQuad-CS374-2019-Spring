$(document).ready(function() {

    // Section for Worktime
    function initializeWorkTime(){
        let worktimes = document.getElementById('worktime');

        let newtime = document.createElement('div');
        newtime.className = "inline fields";

        let blankField = document.createElement('div');
        blankField.className = "two wide field";
        newtime.appendChild(blankField);

        let daySelection = document.createElement('div');
        daySelection.className = "one field";
        daySelection.innerHTML = "<select class=\"ui fluid dropdown\">\n" +
            "\t<option value=\"\">Day</option>\n" +
            "\t<option value=\"mon\">Mon</option>\n" +
            "\t<option value=\"tue\">Tue</option>\n" +
            "\t<option value=\"wed\">Wed</option>\n" +
            "\t<option value=\"thur\">Thur</option>\n" +
            "\t<option value=\"fri\">Fri</option>\n" +
            "\t<option value=\"sat\">Sat</option>\n" +
            "\t<option value=\"sun\">Sun</option></select>";
        newtime.appendChild(daySelection);

        let startTimeSelection = document.createElement('div');
        startTimeSelection.className = "three wide field";
        startTimeSelection.innerHTML = "<input type=\"time\">";
        newtime.appendChild(startTimeSelection);

        let timeUntil = document.createElement('div');
        timeUntil.className = "one field";
        timeUntil.innerHTML = "<strong>~</strong>";
        newtime.appendChild(timeUntil);

        let endTimeSelection = document.createElement('div');
        endTimeSelection.className = "three wide field";
        endTimeSelection.innerHTML = "<input type=\"time\">";
        newtime.appendChild(endTimeSelection);

        let plusButton = document.createElement('div');
        plusButton.className = "one field";
        plusButton.innerHTML = "<button id=\"more_time\" class=\"yellow circular ui icon button\"><i class=\"icon plus\"></i></button>";
        newtime.appendChild(plusButton);

        worktimes.appendChild(newtime);
    }

    $(document).on('click', '.delete_time', function(){
        let worktimes = document.getElementById('worktime');
        let lastTime = worktimes.lastChild;
        let plusButton = lastTime.lastChild;
        let isLast = false;
        let isSingle = false;

        let targetTime = $(this).closest('div').parent();

        if(lastTime === targetTime[0]){
            isLast = true;
        }
        if(worktimes.childNodes.length === 2){
            isSingle = true;
        }
        targetTime.remove();

        if(isSingle){
            if(isLast){
                lastTime = worktimes.lastChild;
                lastTime.removeChild(lastTime.lastChild);
                lastTime.appendChild(plusButton);
            }
            else{
                lastTime = worktimes.lastChild;
                lastTime.removeChild(lastTime.lastChild);
                lastTime.removeChild(lastTime.lastChild);
                lastTime.appendChild(plusButton);
            }
        }
        else if(isLast){
            lastTime = worktimes.lastChild;
            lastTime.appendChild(plusButton);
        }
    });

    $(document).on('click', "#more_time", function(){
        let worktimes = document.getElementById('worktime');
        let lastTime = worktimes.lastChild;
        let plusButton = lastTime.lastChild;
        lastTime.removeChild(plusButton);

        if (worktimes.childNodes.length === 1){
            let minusButton2 = document.createElement('div');
            minusButton2.className = "one field";
            minusButton2.innerHTML = "<button class=\"yellow circular ui icon button delete_time\"><i class=\"icon minus\"></i></button>";
            lastTime.appendChild(minusButton2);
        }

        let newtime = document.createElement('div');
        newtime.className = "inline fields";

        let blankField = document.createElement('div');
        blankField.className = "two wide field";
        newtime.appendChild(blankField);

        let daySelection = document.createElement('div');
        daySelection.className = "one field";
        daySelection.innerHTML = "<select class=\"ui fluid dropdown\">\n" +
            "\t<option value=\"\">Day</option>\n" +
            "\t<option value=\"mon\">Mon</option>\n" +
            "\t<option value=\"tue\">Tue</option>\n" +
            "\t<option value=\"wed\">Wed</option>\n" +
            "\t<option value=\"thur\">Thur</option>\n" +
            "\t<option value=\"fri\">Fri</option>\n" +
            "\t<option value=\"sat\">Sat</option>\n" +
            "\t<option value=\"sun\">Sun</option></select>";
        newtime.appendChild(daySelection);

        let startTimeSelection = document.createElement('div');
        startTimeSelection.className = "three wide field";
        startTimeSelection.innerHTML = "<input type=\"time\">";
        newtime.appendChild(startTimeSelection);

        let timeUntil = document.createElement('div');
        timeUntil.className = "one field";
        timeUntil.innerHTML = "<strong>~</strong>";
        newtime.appendChild(timeUntil);

        let endTimeSelection = document.createElement('div');
        endTimeSelection.className = "three wide field";
        endTimeSelection.innerHTML = "<input type=\"time\">";
        newtime.appendChild(endTimeSelection);

        let minusButton = document.createElement('div');
        minusButton.className = "one field";
        minusButton.innerHTML = "<button class=\"yellow circular ui icon button delete_time\"><i class=\"icon minus\"></i></button>";
        newtime.appendChild(minusButton);
        newtime.appendChild(plusButton);

        worktimes.appendChild(newtime);
    });

    initializeWorkTime();

    // Section for submit
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    $(document).on('click', "#submit", function(){
        let worktimes = document.getElementById('worktime');
        let startDate = document.getElementById('start_date').value;
        let endDate = document.getElementById('end_date').value;
        let isNego = true;
        if (document.getElementById('isNegoFalse').checked){
            isNego = false;
        }
        let enrollKey = database.ref('Offers').push();
        enrollKey.set({
            start: startDate,
            end: endDate,
            negotiation: isNego,
            user: 'sampleuserid1',
        });

        for(let i = 0; i < worktimes.childNodes.length; i++){
            let targetTime = worktimes.childNodes.item(i);
            let timeKey = database.ref('Offers/' + enrollKey.key + '/time').push();
            timeKey.set({
                day: targetTime.childNodes.item(1).lastChild.value,
                start: targetTime.childNodes.item(2).lastChild.value,
                end: targetTime.childNodes.item(4).lastChild.value
            })
        }
    });
});