const labelElement = document.getElementById("party");
const countdownElement = document.getElementById("counter");
const daysElement = document.getElementById("days");
const daysElement1 = document.getElementById("demo");
const daysElement2 = document.getElementById("demo1");
const daysElement3 = document.getElementById("demo2");
const daysElement4 = document.getElementById("demo3");
const daysElement5 = document.getElementById("demo4");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const subjectname1 = document.getElementById("sub1");
const subjectname2 = document.getElementById("sub2");
const subjectname3 = document.getElementById("sub3");
const subjectname4 = document.getElementById("sub4");
const subjectname5 = document.getElementById("sub5");
const subjectdate1 = document.getElementById("sub1-date");
const subjectdate2 = document.getElementById("sub2-date");
const subjectdate3 = document.getElementById("sub3-date");
const subjectdate4 = document.getElementById("sub4-date");
const subjectdate5 = document.getElementById("sub5-date");
const dt1 = document.getElementById("dt1");
const dt2 = document.getElementById("dt2");
const dt3 = document.getElementById("dt3");
const dt4 = document.getElementById("dt4");
const dt5 = document.getElementById("dt5");
const st = document.getElementById("particles-js")

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
  currentsem = '3';
  setCookie('currentsem', currentsem);
}

if (currentsemname === null) {
  currentsemname = '4th';
  setCookie('currentsemname', currentsemname);
}

function setCookie(name, value) {
  document.cookie = `${name}=${value}`;
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
      setCookie('currentsem', value);
      setCookie('currentsemname', name);
      dropdownButton.textContent = name;
      location.reload();
    });
  });
});



const formatDateData = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}, ${month}, ${day}`;
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

let initialDataValue;
let sub1;
let sub2;
let sub3;
let sub4;
let sub5;
let sub1name;
let sub2name;
let sub3name;
let sub4name;
let sub5name;

function schedule() {
  fetch('schedule.json')
    .then(response => response.json())
    .then(data => {
      initialDataValue = data[currentsem].initial;
      sub1 = data[currentsem].schedules[0].date;
      sub1name = data[currentsem].schedules[0].subject;
      sub2 = data[currentsem].schedules[1].date;
      sub2name = data[currentsem].schedules[1].subject;
      sub3 = data[currentsem].schedules[2].date;
      sub3name = data[currentsem].schedules[2].subject;
      sub4 = data[currentsem].schedules[3].date;
      sub4name = data[currentsem].schedules[3].subject;
      sub5 = data[currentsem].schedules[4].date;
      sub5name = data[currentsem].schedules[4].subject;
    })
    .catch(error => {
      console.error('Error loading the schedule:', error);
    });
}
setInterval(schedule, 1000);

let year = new Date().getFullYear();

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

const countdown = () => {
  const currentDate = new Date();
  let targetDate = new Date(initialDataValue);
  let remainingTime = targetDate - currentDate;

  if (remainingTime <= 0) {
    if (currentDate.getDay() === targetDate.getDay()) {
      labelElement.innerHTML = "PLEASE BE CAUTION ! EXAM IS UNDERWAY";
      countdownElement.style.display = "none";
      st.style.paddingTop = '25vh';
      st.style.paddingBottom = '10vh';


      return;
    } else {
      labelElement.innerHTML = "PLEASE BE CAUTION ! EXAM IS UNDERWAY";
      countdownElement.style.display = "none";
      st.style.paddingTop = '25vh';
      st.style.paddingBottom = '10vh';
    }
  }

  const totalSeconds = Math.floor(remainingTime / 1000);
  daysElement.innerHTML = formatTime(daysData(totalSeconds));
  hoursElement.innerHTML = formatTime(hoursData(totalSeconds));
  minutesElement.innerHTML = formatTime(minutesData(totalSeconds));
  secondsElement.innerHTML = formatTime(secondsData(totalSeconds));
};

countdown();
setInterval(countdown, 1000);


// Subject 1 //

const countdown1 = () => {
  const currentDate = new Date();
  let targetDate = new Date(sub1);
  let remainingTime = targetDate - currentDate;

  const totalSeconds = Math.floor(remainingTime / 1000);

  daysElement1.innerHTML = formatTime(daysData(totalSeconds)) + " Days ";

  
  if (formatTime(daysData(totalSeconds)) <= 2) {
    daysElement1.innerHTML = formatTime(daysData(totalSeconds)) + " Days";
    dt1.classList.add("tester");
    
  }

  if (formatTime(daysData(totalSeconds)) <= 0 ) {
    daysElement1.innerHTML = formatTime(hoursData(totalSeconds)) + " Hr " + formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
    dt1.classList.add("tester2");
  }

  if (formatTime(daysData(totalSeconds)) <= 0 && formatTime(hoursData(totalSeconds)) <= 0){
    daysElement1.innerHTML = formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
    dt1.classList.add("tester2");
  }

   if (remainingTime <= 0) {
    if (currentDate.getDay() === targetDate.getDay()) {
      daysElement1.innerHTML = "Finished";
      

      return;
    } else {
      daysElement1.innerHTML = "Finished";
      
    }
  }
};

//Initial countdown
countdown1();

//Call countdown every second
setInterval(countdown1, 1000);



// Subject 2 ///

const countdown2 = () => {
  const currentDate = new Date();
  let targetDate = new Date(sub2);
  let remainingTime = targetDate - currentDate;
  const totalSeconds = Math.floor(remainingTime / 1000);

  daysElement2.innerHTML = formatTime(daysData(totalSeconds)) + " Days";

  
  if (formatTime(daysData(totalSeconds)) <= 2) {
    daysElement2.innerHTML = formatTime(daysData(totalSeconds)) + " Days";
    dt2.classList.add("tester");
    
  }

  if (formatTime(daysData(totalSeconds)) <= 0 ) {
    daysElement2.innerHTML = formatTime(hoursData(totalSeconds)) + " Hr " + formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
    dt2.classList.add("tester2");
  }

  if (formatTime(daysData(totalSeconds)) <= 0 && formatTime(hoursData(totalSeconds)) <= 0){
    daysElement2.innerHTML = formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
    dt2.classList.add("tester2");
  }

  if (remainingTime <= 0) {
    if (currentDate.getDay() === targetDate.getDay()) {
      daysElement2.innerHTML = "Finished";
      

      return;
    } else {
      daysElement2.innerHTML = "Finished";
      
    }
  }
};

//Initial countdown
countdown2();

//Call countdown every second
setInterval(countdown2, 1000);


// Subject 3 ///


const countdown3 = () => {
  const currentDate = new Date();
  let targetDate = new Date(sub3);
  let remainingTime = targetDate - currentDate;

  const totalSeconds = Math.floor(remainingTime / 1000);

  daysElement3.innerHTML = formatTime(daysData(totalSeconds)) + " Days";

  
  if (formatTime(daysData(totalSeconds)) <= 2) {
    daysElement3.innerHTML = formatTime(daysData(totalSeconds)) + " Days";
    dt3.classList.add("tester");
    
  }

  if (formatTime(daysData(totalSeconds)) <= 0 ) {
    daysElement3.innerHTML = formatTime(hoursData(totalSeconds)) + " Hr " + formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
    dt3.classList.add("tester2");
  }

  if (formatTime(daysData(totalSeconds)) <= 0 && formatTime(hoursData(totalSeconds)) <= 0){
    daysElement3.innerHTML = formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
    dt3.classList.add("tester2");
  }

  if (remainingTime <= 0) {
    if (currentDate.getDay() === targetDate.getDay()) {
      daysElement3.innerHTML = "Finished";
      

      return;
    } else {
      daysElement3.innerHTML = "Finished";
      
    }
  }
};

//Initial countdown
countdown3();

//Call countdown every second
setInterval(countdown3, 1000);


// Subject 4 //

const countdown4 = () => {
  const currentDate = new Date();
  let targetDate = new Date(sub4);
  let remainingTime = targetDate - currentDate;

  const totalSeconds = Math.floor(remainingTime / 1000);

  daysElement4.innerHTML = formatTime(daysData(totalSeconds)) + " Days";

  
  if (formatTime(daysData(totalSeconds)) <= 2) {
    daysElement4.innerHTML = formatTime(daysData(totalSeconds)) + " Days";
    dt4.classList.add("tester");
    
  }

  if (formatTime(daysData(totalSeconds)) <= 0 ) {
    daysElement4.innerHTML = formatTime(hoursData(totalSeconds)) + " Hr " + formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
    dt4.classList.add("tester2");
  }

  if (formatTime(daysData(totalSeconds)) <= 0 && formatTime(hoursData(totalSeconds)) <= 0){
    daysElement4.innerHTML = formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
    dt4.classList.add("tester2");
  }

  if (remainingTime <= 0) {
    if (currentDate.getDay() === targetDate.getDay()) {
      daysElement4.innerHTML = "Finished";
      

      return;
    } else {
      daysElement4.innerHTML = "Finished";
      
    }
  }
};

//Initial countdown
countdown4();

//Call countdown every second
setInterval(countdown4, 1000);


// Subject 5 //

const countdown5 = () => {
  const currentDate = new Date();
  let targetDate = new Date(sub5);
  let remainingTime = targetDate - currentDate;

  const totalSeconds = Math.floor(remainingTime / 1000);

  daysElement5.innerHTML = formatTime(daysData(totalSeconds)) + " Days";


  if (formatTime(daysData(totalSeconds)) <= 2) {
    daysElement5.innerHTML = formatTime(daysData(totalSeconds)) + " Days";
    dt5.classList.add("tester");
    
  }

  if (formatTime(daysData(totalSeconds)) <= 0 ) {
    daysElement5.innerHTML = formatTime(hoursData(totalSeconds)) + " Hr " + formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
    dt5.classList.add("tester2");
    
  }

  if (formatTime(daysData(totalSeconds)) <= 0 && formatTime(hoursData(totalSeconds)) <= 0){
    daysElement5.innerHTML = formatTime(minutesData(totalSeconds)) + " Min " + formatTime(secondsData(totalSeconds)) + " Sec";
    dt5.classList.add("tester2");
    
  }

  if (remainingTime <= 0) {
    if (currentDate.getDay() === targetDate.getDay()) {
      daysElement5.innerHTML = "Finished";
      labelElement.innerHTML = "WHY ARE WE STILL HERE? JUST TO SUFFER?";
      return;
    } else {
      daysElement5.innerHTML = "Finished";
      labelElement.innerHTML = "WHY ARE WE STILL HERE? JUST TO SUFFER?";    
    }
  } 
};

//Initial countdown
countdown5();

//Call countdown every second
setInterval(countdown5, 1000);

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

fetch('https://results.bimal1412.com.np/nepalidate/')
  .then(response => response.json())
  .then(data => {
    const textContainer = document.getElementById('textContainer');
    if (data.date !== null) {
      textContainer.textContent = data.date;
      console.log('Fetched Date:', data.date);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


fetch('https://results.bimal1412.com.np/nepalidate/')
.then(response => response.json())
.then(data => {
  const textContainer = document.getElementById('textContainer');
  if (data.date !== null) {
    textContainer.textContent = data.date;
    console.log('Fetched Date:', data.date);
  }
})
.catch(error => {
  console.error('Error:', error);
});

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

const nepali_data = (sub) => {
  const formattedDate = formatDateData(sub);
  const nepalidata = new NepaliDate(new Date(formattedDate));
  const formatnepali = nepalidata.format('YYYY MMMM DD , ddd');
  return formatnepali;
};

function fill_data() {
  subjectname1.innerHTML = sub1name;
  subjectdate1.innerHTML = nepali_data(sub1);
  subjectname2.innerHTML = sub2name;
  subjectdate2.innerHTML = nepali_data(sub2);
  subjectname3.innerHTML = sub3name;
  subjectdate3.innerHTML = nepali_data(sub3);
  subjectname4.innerHTML = sub4name;
  subjectdate4.innerHTML = nepali_data(sub4);
  subjectname5.innerHTML = sub5name;
  subjectdate5.innerHTML = nepali_data(sub5);
}

setInterval(fill_data, 1000);

// YEAH ! I SKIPPED THE OOP CLASS. SORRY FOR THE MESSY CODE :D