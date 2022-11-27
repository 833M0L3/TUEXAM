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
const dt1 = document.getElementById("dt1");
const dt2 = document.getElementById("dt2");
const dt3 = document.getElementById("dt3");
const dt4 = document.getElementById("dt4");
const dt5 = document.getElementById("dt5");
const st = document.getElementById("particles-js")

//Utility for ISO formating
const formatBirthday = (year) => {
  return `${year}-12-25T12:00:00`;
};

let year = new Date().getFullYear();
let birthday = formatBirthday(year);

//Utility for time formating
const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
};

const countdown = () => {
  const currentDate = new Date();
  let targetDate = new Date(birthday);
  let remainingTime = targetDate - currentDate;

  //Reset year if birthday passed and check if party time
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

  //Total remaining time in seconds;
  const totalSeconds = Math.floor(remainingTime / 1000);

  //Get remaining days
  const days = Math.floor(totalSeconds / 3600 / 24);
  //Get remaining hours
  const minutes = Math.floor((totalSeconds / 60) % 60);
  //Get remaining minutes
  const hours = Math.floor((totalSeconds / 3600) % 24);
  //Get remaining seconds
  const seconds = Math.floor(totalSeconds % 60);

  daysElement.innerHTML = formatTime(days);
  hoursElement.innerHTML = formatTime(hours);
  minutesElement.innerHTML = formatTime(minutes);
  secondsElement.innerHTML = formatTime(seconds);

  
};




//Initial countdown
countdown();

//Call countdown every second
setInterval(countdown, 1000);


// Data Structure and Algorithm //


const formatExamdate = (year) => {
  return `${year}-12-25T12:00:00`;
};

let year1 = new Date().getFullYear();
let examdate1 = formatExamdate(year);


const formatTime1 = (time) => {
  return time < 10 ? `0${time}` : time;
};

const countdown1 = () => {
  const currentDate = new Date();
  let targetDate = new Date(examdate1);
  let remainingTime = targetDate - currentDate;

 

  //Total remaining time in seconds;
  const totalSeconds = Math.floor(remainingTime / 1000);

  //Get remaining days
  const days = Math.floor(totalSeconds / 3600 / 24);
  //Get remaining hours
  const minutes = Math.floor((totalSeconds / 60) % 60);
  //Get remaining minutes
  const hours = Math.floor((totalSeconds / 3600) % 24);
  //Get remaining seconds
  const seconds = Math.floor(totalSeconds % 60);

  daysElement1.innerHTML = formatTime1(days) + " Days ";

  
  if (formatTime1(days) <= 2) {
    daysElement1.innerHTML = formatTime1(days) + " Days";
    dt1.classList.add("tester");
    
  }

  if (formatTime1(days) <= 0 ) {
    daysElement1.innerHTML = formatTime1(hours) + " Hr " + formatTime1(minutes) + " Min " + formatTime1(seconds) + " Sec";
    dt1.classList.add("tester2");
  }

  if (formatTime1(days) <= 0 && formatTime1(hours) <= 0){
    daysElement1.innerHTML = formatTime1(minutes) + " Min " + formatTime1(seconds) + " Sec";
    dt1.classList.add("tester2");
  }


  

   //Reset year if birthday passed and check if party time
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



// Numerical Method ///


const formatExamdate1 = (year) => {
  return `${year}-12-29T12:00:00`;
};

let year2 = new Date().getFullYear();
let examdate2 = formatExamdate1(year);


const formatTime2 = (time) => {
  return time < 10 ? `0${time}` : time;
};

const countdown2 = () => {
  const currentDate = new Date();
  let targetDate = new Date(examdate2);
  let remainingTime = targetDate - currentDate;

  

  //Total remaining time in seconds;
  const totalSeconds = Math.floor(remainingTime / 1000);

  //Get remaining days
  const days = Math.floor(totalSeconds / 3600 / 24);
  //Get remaining hours
  const minutes = Math.floor((totalSeconds / 60) % 60);
  //Get remaining minutes
  const hours = Math.floor((totalSeconds / 3600) % 24);
  //Get remaining seconds
  const seconds = Math.floor(totalSeconds % 60);

  daysElement2.innerHTML = formatTime2(days) + " Days";

  
  if (formatTime2(days) <= 2) {
    daysElement2.innerHTML = formatTime2(days) + " Days";
    dt2.classList.add("tester");
    
  }

  if (formatTime2(days) <= 0 ) {
    daysElement2.innerHTML = formatTime2(hours) + " Hr " + formatTime2(minutes) + " Min " + formatTime2(seconds) + " Sec";
    dt2.classList.add("tester2");
  }

  if (formatTime2(days) <= 0 && formatTime2(hours) <= 0){
    daysElement2.innerHTML = formatTime2(minutes) + " Min " + formatTime2(seconds) + " Sec";
    dt2.classList.add("tester2");
  }

  

  //Reset year if birthday passed and check if party time
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


// Computer Architecture ///

const formatExamdate2 = (year) => {
  return `${year}-01-01T12:00:00`;
};

let year3 = new Date().getFullYear();
let examdate3 = formatExamdate2(year);


const formatTime3 = (time) => {
  return time < 10 ? `0${time}` : time;
};

const countdown3 = () => {
  const currentDate = new Date();
  let targetDate = new Date(examdate3);
  let remainingTime = targetDate - currentDate;

  

  //Total remaining time in seconds;
  const totalSeconds = Math.floor(remainingTime / 1000);

  //Get remaining days
  const days = Math.floor(totalSeconds / 3600 / 24);
  //Get remaining hours
  const minutes = Math.floor((totalSeconds / 60) % 60);
  //Get remaining minutes
  const hours = Math.floor((totalSeconds / 3600) % 24);
  //Get remaining seconds
  const seconds = Math.floor(totalSeconds % 60);

  daysElement3.innerHTML = formatTime3(days) + " Days";

  
  if (formatTime3(days) <= 2) {
    daysElement3.innerHTML = formatTime3(days) + " Days";
    dt3.classList.add("tester");
    
  }

  if (formatTime3(days) <= 0 ) {
    daysElement3.innerHTML = formatTime3(hours) + " Hr " + formatTime3(minutes) + " Min " + formatTime3(seconds) + " Sec";
    dt3.classList.add("tester2");
  }

  if (formatTime3(days) <= 0 && formatTime3(hours) <= 0){
    daysElement3.innerHTML = formatTime3(minutes) + " Min " + formatTime3(seconds) + " Sec";
    dt3.classList.add("tester2");
  }

  

  //Reset year if birthday passed and check if party time
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


// Computer Graphics //

const formatExamdate3 = (year) => {
  return `${year}-01-04T12:00:00`;
};

let year4 = new Date().getFullYear();
let examdate4 = formatExamdate3(year);


const formatTime4 = (time) => {
  return time < 10 ? `0${time}` : time;
};

const countdown4 = () => {
  const currentDate = new Date();
  let targetDate = new Date(examdate4);
  let remainingTime = targetDate - currentDate;

  

  //Total remaining time in seconds;
  const totalSeconds = Math.floor(remainingTime / 1000);

  //Get remaining days
  const days = Math.floor(totalSeconds / 3600 / 24);
  //Get remaining hours
  const minutes = Math.floor((totalSeconds / 60) % 60);
  //Get remaining minutes
  const hours = Math.floor((totalSeconds / 3600) % 24);
  //Get remaining seconds
  const seconds = Math.floor(totalSeconds % 60);

  daysElement4.innerHTML = formatTime4(days) + " Days";

  
  if (formatTime4(days) <= 2) {
    daysElement4.innerHTML = formatTime4(days) + " Days";
    dt4.classList.add("tester");
    
  }

  if (formatTime4(days) <= 0 ) {
    daysElement4.innerHTML = formatTime4(hours) + " Hr " + formatTime4(minutes) + " Min " + formatTime4(seconds) + " Sec";
    dt4.classList.add("tester2");
  }

  if (formatTime4(days) <= 0 && formatTime4(hours) <= 0){
    daysElement4.innerHTML = formatTime4(minutes) + " Min " + formatTime4(seconds) + " Sec";
    dt4.classList.add("tester2");
  }

  

  //Reset year if birthday passed and check if party time
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


// Statistics II //

const formatExamdate4 = (year) => {
  return `${year}-01-08T12:00:00`;
};

let year5 = new Date().getFullYear();
let examdate5 = formatExamdate4(year);


const formatTime5 = (time) => {
  return time < 10 ? `0${time}` : time;
};

const countdown5 = () => {
  const currentDate = new Date();
  let targetDate = new Date(examdate5);
  let remainingTime = targetDate - currentDate;

  

  //Total remaining time in seconds;
  const totalSeconds = Math.floor(remainingTime / 1000);

  //Get remaining days
  const days = Math.floor(totalSeconds / 3600 / 24);
  //Get remaining hours
  const minutes = Math.floor((totalSeconds / 60) % 60);
  //Get remaining minutes
  const hours = Math.floor((totalSeconds / 3600) % 24);
  //Get remaining seconds
  const seconds = Math.floor(totalSeconds % 60);

  daysElement5.innerHTML = formatTime5(days) + " Days";


  if (formatTime5(days) <= 2) {
    daysElement5.innerHTML = formatTime5(days) + " Days";
    dt5.classList.add("tester");
    
  }

  if (formatTime5(days) <= 0 ) {
    daysElement5.innerHTML = formatTime5(hours) + " Hr " + formatTime5(minutes) + " Min " + formatTime5(seconds) + " Sec";
    dt5.classList.add("tester2");
    
  }

  if (formatTime5(days) <= 0 && formatTime5(hours) <= 0){
    daysElement5.innerHTML = formatTime5(minutes) + " Min " + formatTime5(seconds) + " Sec";
    dt5.classList.add("tester2");
    
  }

  //Reset year if birthday passed and check if party time
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
