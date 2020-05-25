var imageLocation='0';
var 가위바위보={
    가위:'-250px',
    바위:'-10px',
    보:'-538px',
};


function choiceofcomputer(imageLocation){
    return Object.entries(가위바위보).find(function(x){
        return x[1]===imageLocation;
    })[0];
}


//가위바위보 그림이 움직이는 함수
var xinterval;
function makeInterval(){
    xinterval=setInterval(function(){
        if(imageLocation === 가위바위보.가위){
            imageLocation=가위바위보.바위;
        }else if(imageLocation===가위바위보.바위){
            imageLocation=가위바위보.보;
        }else{
            imageLocation=가위바위보.가위;
        }

        document.querySelector('#picture').style.background=
        'url(https://data.ac-illust.com/data/thumbnails/4f/4f63b32d7d43ea2cb231c0724200cf8e_t.jpeg) ' + imageLocation +' 0';
    },80);
}

makeInterval();

//이기고 비기고 지는 공식을 단순화하려고 가위바위보에 숫자를 부여
var point={ 가위:1, 바위:0, 보:-1,}

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click',function(){
        clearInterval(xinterval); //suspend the function setInterval
        setTimeout(function(){
            makeInterval();
        },1000);

        var mychoice=this.textContent;
        var mypoint = point[mychoice];
        var pointofcomputer=point[choiceofcomputer(imageLocation)];
        var differenceofpoint = mypoint - pointofcomputer;

        if(differenceofpoint===0){
            console.log('비겼습니다');
            document.querySelector('#result').textContent='비겼습니다';
        }else if([-1,2].includes(differenceofpoint)){
            console.log('이겼습니다');
            document.querySelector('#result').textContent='이겼습니다';
        }else{
            console.log('졌습니다');
            document.querySelector('#result').textContent='졌습니다';
        }
    });
});