var nameArea=document.querySelector("#name");


function init(){
    load();
}

init();

function load(){
    var name=localStorage.getItem("username");
    if(name===null){
        askForName();
    }else{
        showName(name);
    }
}

function askForName(){
    var input=document.createElement("input");
    input.type="text";
    input.placeholder="Input your name and press enter key";
    input.style.width="250px";
    input.style.height="30px";
    input.style.fontSize="15px";
    var form=document.createElement("form");
    form.setAttribute("class","submitForm");
    form.appendChild(input);
    nameArea.appendChild(form);
    form.addEventListener("submit",submitName);
}

function submitName(event){
    event.preventDefault();
    var form=event.target;
    var x=form.querySelector("input");
    var val=x.value;
    localStorage.setItem("username",val);
    showName(val);
    
}

function showName(name){
    document.querySelector("#name").innerHTML=`Welcome, ${name}!`;
}