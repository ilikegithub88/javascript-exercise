var apiKey="7539a35f076b4bedf0f1bf6d3d569106";

function init(){
    load();
}

init();

function load(){
    var location=localStorage.getItem("location");
    if(location===null){
        alert("We would like to let you know weather forecast after you agree to give me your geolocation");
        askForLocation();
    }else{
        var parsed=JSON.parse(location);
        getWeather(parsed.latitude, parsed.longitude);
    } 

}


function askForLocation(){
    navigator.geolocation.getCurrentPosition(success,failure);
}

function success(position){
    var latitude=position.coords.latitude;
    var longitude=position.coords.longitude;
    var obj={ 
        latitude:latitude, 
        longitude:longitude
    }
    var stringfiedObj=JSON.stringify(obj);
    localStorage.setItem("location",stringfiedObj);
}

function failure(){
    alert("I cannot access to your location information");
}

function getWeather(latitude, longitude){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        var city=json.name;
        var weather=json.weather[0].description;
        var currentTemperature=json.main.temp;
        var min_temp=json.main.temp_min;
        var max_temp=json.main.temp_max;
        
        document.querySelector("#location").innerHTML=`Your place : ${city} `;
        document.querySelector("#weather").innerHTML=`Weather : ${weather} `;
        document.querySelector("#temp").innerHTML=`The current temperature : ${currentTemperature}'C`;
        document.querySelector("#maxmin").innerHTML=`The minimum and maximum temperature : ${min_temp}'C ~ ${max_temp}'C`;

    });

}