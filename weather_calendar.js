var calendar=document.querySelector("#calendar");
var time=document.querySelector("#clock");



function getCalendar(){
    var date = new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    calendar.innerHTML=`Today's date: ${year}/${month}/${day}`;
}

getCalendar();  


setInterval(function(){
    var date=new Date();
    var hours=date.getHours();
    var minutes=date.getMinutes();
    var seconds=date.getSeconds();
    time.innerHTML=`Current time : ${hours<10 ? `0${hours}`: hours}:${minutes<10 ? `0${minutes}` : minutes}:${seconds<10? `0${seconds}`:seconds}`;
},1000);
