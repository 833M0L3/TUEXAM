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

if (currentsem === null) {
  currentsem = '4';
  setCookie('currentsem', currentsem, 365);
}

if (currentsemname === null) {
  currentsemname = '5th';
  setCookie('currentsemname', currentsemname, 365);
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
      appendRow(item.subject,item.date);
    };
    for (let i = 0; i < dataschedules[currentsem].schedules.length; i++) {
      demo = `demo${i + 1}`;
      rowid = `dt${i + 1}`;
      date = dataschedules[currentsem].schedules[i].date;
      initial = dataschedules[currentsem].initial;
      subject = dataschedules[currentsem].subject;
     
      if (i === 0) {
       demo = "demo1";
       rowid = "dt1";
       }
      if (i === dataschedules[0].schedules.length - 1){
       finalday(date);
      };
     
      runloop(subject,date, rowid, demo);
    };
    for (const item of dataschedules[currentsem].schedules) {
      let targetDate = new Date(item.date);
      let subjectname = item.subject;
      let currentDate = new Date();
      let remainingTime = targetDate - currentDate;
      console.log(subjectname);
      if (remainingTime > 0) {
       labelElement.innerHTML = `Upcoming Exam : <br>${subjectname}`;
       if (rowcount == 0) {
        rowid = "dt1"
       }
       else{
        rowid = `dt${rowcount + 1}`;
       }
       changealert(targetDate,rowid);
       runloopfront(targetDate);
       console.log(rowcount);
       break;
      }
      rowcount = rowcount + 1;
    };
  } catch (error) {
    console.error('Error loading the schedule:', error);
  }
};

schedule();

let year = new Date().getFullYear();


function appendRow(subject,date) {

 var tbody = document.getElementById('tableBody');

 var newRow = document.createElement('tr');

 const rowid = 'dt' + (tbody.rows.length + 1);

 newRow.id = rowid;

 newRow.innerHTML = `
  <th scope="row">${tbody.rows.length + 1}</th>
  <td id="sub${tbody.rows.length + 1}">${subject}</td>
  <td id="sub${tbody.rows.length + 1}-date">${nepali_data(date)}</td>
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

const currentDate = new Date();


// Countdown updates of the subject days remaining tables 
function countdown (subject,date,rowid,demo,intervalId) {
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
  daysElement1.innerHTML = "Finished";
  clearInterval(intervalId);
  };
};


function changealert(date,rowid) {
  const dt1 = document.getElementById(rowid);
  let targetDate = new Date(date);
  let remainingTime = targetDate - currentDate;
  const totalSeconds = Math.floor(remainingTime / 1000);
  if (formatTime(daysData(totalSeconds)) <= 2) {
    dt1.classList.add("tester");
     };
  
  if (formatTime(daysData(totalSeconds)) <= 0 ) {
    dt1.classList.add("tester2");
    };
  
  if (formatTime(daysData(totalSeconds)) <= 0 && formatTime(hoursData(totalSeconds)) <= 0){
   dt1.classList.add("tester2");
    };
};

function runloop(subject,date, rowid, demo) {
 const intervalId = setInterval(function () {
  countdown(subject,date, rowid, demo, intervalId);
 }, 1000);
};

function runloopfront(initialDataValue) {
 setInterval(function () {
  frontcountdown(initialDataValue);
 }, 1000);
};

function stopLoop(intervalId) {
 clearInterval(intervalId);
};

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
 console.log(initialDataValue)

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

fetch('https://results.bimal1412.com.np/tunotice')
      .then(response => response.json())
      .then(data => {
        var sidebarList = document.getElementById("sidebar-list");
        sidebarList.innerHTML = "";
        data.forEach(item => {
          var listItem = document.createElement("li");
          var link = document.createElement("a");
          link.href = item.pdf_link;
          link.textContent = item.pdf_title;
          listItem.appendChild(link);
          sidebarList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.log('Error fetching JSON:', error);
      });


// YEAH ! I SKIPPED THE OOP CLASS. SORRY FOR THE MESSY CODE :D