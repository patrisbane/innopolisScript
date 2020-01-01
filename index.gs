function getTimeDiff(time) {
  var time1 =  time.slice(0,5);
  var time2 = time.slice(6);
  var timeDif = (stringToMinutes(time2) - stringToMinutes(time1)) / 45;
  return timeDif;
}

function stringToMinutes(str) {
  var time = str.split(':');
  var timeDiff = +time[0]*60 + +time[1];
  return timeDiff;
}
  
function getTimes() {
  var teachersListSheet = SpreadsheetApp.openById('1BcWyqSJuv1yWb4aWFB1kOXp8ESYF5N2vekh3gk-dREc').getSheets()[0].getDataRange().getValues();
  var teachers = teachersListSheet.map(function(el) {return el[0]});
  var schedule = SpreadsheetApp.openById('1LRDMMR5UoAKHaYpX2UpCwGoxzcXicz7pOiRNJ-__Ljw').getSheets()[0].getDataRange().getValues()
 
  var wholeHours = 0;
  var doctorHours = 0;
  var candidateHours = 0;
  var standHours = 0;
  var undefinedHours = 0;
  var sumHours;
  
  
  for (var i = 1; i &lt; schedule.length; i++) {
    var index = teachers.indexOf(schedule[i][6]);
    var timeDif = getTimeDiff(schedule[i][3]);
    wholeHours += timeDif;
    if (index === -1) undefinedHours += timeDif;
    else {
    switch (teachersListSheet[index][1]) {
      case 2: 
        doctorHours += timeDif;
        break;
      case 1:
        candidateHours += timeDif;
        break;
      case 0:
        standHours += timeDif;
        break;
      default:
        break;
      }
    } 
  }
  
  sumHours = [wholeHours, doctorHours, candidateHours, standHours, undefinedHours];
  return sumHours;
}

function changeSheet() {
  var ss = SpreadsheetApp.getActiveSheet();
  ss.setColumnWidths(1,2,300);
  var sumHours = getTimes();
  ss.clear();
  ss.appendRow(['','Ak. hours']);
  ss.appendRow(['The amount of hours', sumHours[0]]);
  ss.appendRow(['Doctor Degree', sumHours[1]]);
  ss.appendRow(['Candidate Degree', sumHours[2]]);
  ss.appendRow(['No Degree', sumHours[3]]);
  ss.appendRow(['Teacher not specified', sumHours[4]]);
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Меню Скриптов").addItem("Подсчёт академических часов", "changeSheet").addToUi();
}
