const labelElement = document.getElementById("party");
const countdownElement = document.getElementById("counter");
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const st = document.getElementById("particles-js")
const textContainer = document.getElementById('textContainer');
rowcount = 0;

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
let currentsem = getCookie('currentsem');
let currentsemname = getCookie('currentsemname');
let dateLang = getCookie('datelang');

if (currentsem === null) {
  currentsem = '5';
  setCookie('currentsem', currentsem, 365);
}

if (currentsemname === null) {
  currentsemname = '6th';
  setCookie('currentsemname', currentsemname, 365);
}

if (dateLang === null) {
  dateLang = 'np';
  setCookie('datelang', dateLang, 365);
}

function setCookie(name, value, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = `${name}=${value}`+ ";" + expires;
}

document.querySelector('.dropdown-toggle').textContent = currentsemname;

document.addEventListener('DOMContentLoaded', function() {
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const dropdownButton = document.querySelector('.dropdown-toggle');

  dropdownItems.forEach(function(item) {
    item.addEventListener('click', function() {
      const value = this.getAttribute('data-value');
      const name = this.textContent;
      currentsem = value;
      currentsemname = name;
      setCookie('currentsem', value, 365);
      setCookie('currentsemname', name, 365);
      dropdownButton.textContent = name;
      schedule();
      location.reload();
    });
  });
});


let dataschedules;

async function schedule() {
  try {
    const response = await fetch('schedule.json');
    const data = await response.json();
    dataschedules = data;
    for (const item of dataschedules[currentsem].schedules) {
      appendRow(item.subject,item.date,item.code);
    };
    for (let i = 0; i < dataschedules[currentsem].schedules.length; i++) {
      demo = `demo${i + 1}`;
      rowid = `dt${i + 1}`;
      date = dataschedules[currentsem].schedules[i].date;
      initial = dataschedules[currentsem].initial;
      subject = dataschedules[currentsem].schedules[i];
     
      if (i === 0) {
       demo = "demo1";
       rowid = "dt1";
       };
    
      runloop(date, rowid, demo, subject);
    };
    for (const item of dataschedules[currentsem].schedules) {
      let targetDate = new Date(item.date);
      let subjectname = item.subject;
      let currentDate = new Date();
      let remainingTime = targetDate - currentDate;
      if (remainingTime > 0) {
       labelElement.innerHTML = `<div class="upexam">Upcoming Exam :</div>${subjectname}`;
       if (rowcount == 0) {
        rowid = "dt1"
       }
       else{
        rowid = `dt${rowcount + 1}`;
       }
       
       changealert(targetDate,rowid,rowcount);
       runloopfront(targetDate);
       break;
      }
      rowcount = rowcount + 1;
    };
  } catch (error) {
    console.error('Error loading the schedule:', error);
  }
};

schedule();

function changedate() {

  for (let i = 0; i < dataschedules[currentsem].schedules.length; i++) {
    dateid = `sub${i + 1}-date`;
    if (i === 0) {
      dateid = "sub1-date";
      }
    date = dataschedules[currentsem].schedules[i].date;
    cellloc = document.getElementById(dateid);

    if (dateLang === "np") {
      celldate = nepali_data(date)
    } else {
      celldate = eng_date(date)
    }

    cellloc.innerHTML = celldate       
  };
}

function setNP () {
  dateLang = 'np';
  setCookie('datelang', dateLang, 365);
  changedate();
}

function setEng () {
  dateLang = 'eng';
  setCookie('datelang', dateLang, 365);
  changedate();
}

function lastcheck(position) {
  cord = dataschedules[currentsem].schedules
  return cord.indexOf(position) === cord.length - 1;
}




let year = new Date().getFullYear();


function appendRow(subject,date,subcode) {

 var tbody = document.getElementById('tableBody');

 var newRow = document.createElement('tr');

 const rowid = 'dt' + (tbody.rows.length + 1);

 newRow.id = rowid;

 if ( dateLang === "np" ) {
  celldate = nepali_data(date)
 } else {
  celldate = eng_date(date)
 }

 newRow.innerHTML = `
  <th scope="row">${subcode}</th>
  <td id="sub${tbody.rows.length + 1}">${subject}</td>
  <td id="sub${tbody.rows.length + 1}-date">${celldate}</td>
  <td id="demo${tbody.rows.length + 1}"></td>
  `;
 tableBody.appendChild(newRow);
};

function formatDateData(dateString) {
 const date = new Date(dateString);
 const year = date.getFullYear();
 const month = String(date.getMonth() + 1).padStart(2, '0');
 const day = String(date.getDate()).padStart(2, '0');

 return `${year}, ${month}, ${day}`;
};


function eng_date(inputDateString) {
  const inputDate = new Date(inputDateString);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };

  const formattedDate = inputDate.toLocaleDateString('en-US', options);

  return formattedDate;
}

function top_nepali() {
  const formattedDAte = formatDateData(new Date());
  const nepalidata = new NepaliDate(new Date(formattedDAte));
  const formatnepali = nepalidata.format('YYYY MMMM DD, ddd', 'np');
  return `वि.सं ${formatnepali}`
}

textContainer.textContent = top_nepali();

function nepali_data(sub) {
 const formattedDate = formatDateData(sub);
 const nepalidata = new NepaliDate(new Date(formattedDate));
 const formatnepali = nepalidata.format('YYYY MMMM DD , ddd');
 return formatnepali;
};

// The messiness begins

const formatTime = (time) => {
 return time < 10 ? `0${time}` : time;
};

const daysData = (totalSeconds) => {
 return Math.floor(totalSeconds / 3600 / 24);
};

const minutesData = (totalSeconds) => {
 return Math.floor((totalSeconds / 60) % 60);
};

const hoursData = (totalSeconds) => {
 return Math.floor((totalSeconds / 3600) % 24);
};

const secondsData = (totalSeconds) => {
 return Math.floor(totalSeconds % 60);
};

// Countdown updates of the subject days remaining tables 
function countdown (subject,date,rowid,demo,intervalId) {
 const currentDate = new Date();
 const daysElement1 = document.getElementById(demo);
 const dt1 = document.getElementById(rowid);
 let targetDate = new Date(date);
 let remainingTime = targetDate - currentDate;

 const totalSeconds = Math.floor(remainingTime / 1000);

 daysElement1.innerHTML = formatTime(daysData(totalSeconds)) + " Days ";


 if (formatTime(daysData(totalSeconds)) <= 2) {
  daysElement1.innerHTML = formatTime(daysData(totalSeconds)) + " Days";
   };

 if (formatTime(daysData(totalSeconds)) <= 0 ) {
  daysElement1.innerHTML = formatTime(hoursData(totalSeconds)) + " Hr " + formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
  };

 if (formatTime(daysData(totalSeconds)) <= 0 && formatTime(hoursData(totalSeconds)) <= 0){
 daysElement1.innerHTML = formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
  };

 if (remainingTime <= 0) {
  daysElement1.innerHTML = "Ongoing ⏰";
  dt1.classList.add("tester2");
  if (new Date() > new Date(date) && lastcheck(subject)) {
    labelElement.innerHTML = "Final day is here ! Keta haru exam didai xan";
    countdownElement.style.display = "none";
}
  };
  if (remainingTime <= -10800000) {
    daysElement1.innerHTML = "Finished ✅";
    dt1.classList.remove("tester2");
    if (new Date() > new Date(date) && lastcheck(subject)) {
      labelElement.innerHTML = "WHY ARE WE STILL HERE? JUST TO SUFFER?";
      countdownElement.style.display = "none";
    }
    clearInterval(intervalId);
 }
};

function checkTruth(rowcount) {
  rowid = `dt${rowcount}`
  cellid = document.getElementById(rowid);
  if(cellid.classList.contains("tester2")) {
    return true
  } else {
    return false
  }
}

function changealert(date,rowid,rowcount) {
  const currentDate = new Date();
  const dt1 = document.getElementById(rowid);
  let targetDate = new Date(date);
  let remainingTime = targetDate - currentDate;
  const totalSeconds = Math.floor(remainingTime / 1000);
  if (formatTime(daysData(totalSeconds)) <= 2) {
    if (rowcount == 0) {
      dt1.classList.add("tester")
    }
    else {
      loopAlert(rowcount,"tester",dt1)
    };
  };
  
  if (formatTime(daysData(totalSeconds)) <= 0 ) {
    if (rowcount == 0) {
      dt1.classList.add("tester2");
    }
    else {
      loopAlert(rowcount,"tester2",dt1)
    };
  };
  
  if (formatTime(daysData(totalSeconds)) <= 0 && formatTime(hoursData(totalSeconds)) <= 0){
    if (rowcount == 0) {
      dt1.classList.add("tester2")
    }
    else {
      loopAlert(rowcount,"tester2",dt1)
    };
  };
};

function runloop(date, rowid, demo, subject) {
 const intervalId = setInterval(function () {
  countdown(subject, date, rowid, demo, intervalId);
 }, 1000);
};

function runloopfront(initialDataValue) {
 setInterval(function () {
  frontcountdown(initialDataValue);
 }, 1000);
};

function loopAlert(rowcount,className,dt1) {
  let intervalId = setInterval(function () {
    if (checkTruth(rowcount)) {
      dt1.classList.remove(className);
      clearInterval(intervalId);
    } else {
      dt1.classList.add(className);
    }
  }, 100);
}


function finalday(finaldate) {
 if (new Date() >= new Date(finaldate)) {
 labelElement.innerHTML = "WHY ARE WE STILL HERE? JUST TO SUFFER?";
 countdownElement.style.display = "none";
 };
};

function frontcountdown (initialDataValue) {
 const currentDate = new Date();
 let targetDate = new Date(initialDataValue);
 let remainingTime = targetDate - currentDate;

 const totalSeconds = Math.floor(remainingTime / 1000);
 daysElement.innerHTML = formatTime(daysData(totalSeconds));
 hoursElement.innerHTML = formatTime(hoursData(totalSeconds));
 minutesElement.innerHTML = formatTime(minutesData(totalSeconds));
 secondsElement.innerHTML = formatTime(secondsData(totalSeconds));
};


var now = new Date();
var hours = now.getHours();
var ft = now.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
});


    if (hours < 17) {//Morning
        st.style.backgroundImage = "linear-gradient(rgba(6, 5, 5, 0.667), rgba(255, 255, 255, 0.591)), url('./assets/day.gif')";
    }
    
    if (hours > 17) {//Night
      st.style.backgroundImage = "linear-gradient(rgba(6, 5, 5, 0.804), rgba(0, 0, 0, 0.311)), url('./assets/night.gif')";
    }


function w3_open() {
  var div = document.getElementById("sidebarhero");
  if (div.classList.contains("visible")) {
    div.classList.add("hidden");
    div.classList.remove("visible");
  } else {
    div.classList.remove("hidden");
    div.classList.add("visible");
  }
}

function w3_close() {
  var div = document.getElementById("sidebarhero");
  div.classList.add("hidden");
  div.classList.remove("visible");
}

fetch('notices.json')
      .then(response => response.json())
      .then(data => {
        var sidebarList = document.getElementById("sidebar-list");
        sidebarList.innerHTML = "";
        data.forEach(item => {
          var listItem = document.createElement("li");
          var link = document.createElement("a");
          link.href = item.link;
          link.textContent = item.title;
          listItem.appendChild(link);
          sidebarList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.log('Error fetching JSON:', error);
      });

// Dropdown arrow Animation
let scrollDownElement = document.querySelector('.scrollDown');
let originalPosition = window.scrollY;

window.addEventListener('scroll', function() {
  if (window.scrollY > originalPosition + 100) { //
    scrollDownElement.classList.add('hidden');
  } else {
    scrollDownElement.classList.remove('hidden');
  }
});



// YEAH ! I SKIPPED THE OOP CLASS. SORRY FOR THE MESSY CODE :D