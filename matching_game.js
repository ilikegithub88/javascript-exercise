var width=4;
var length=3;
var colors=['red','red','orange','orange','green','green',
'yellow','yellow','pink','pink','purple','purple'];
var colorCandidates = colors.slice();
var color=[];
var flag=true;
var click=[];
var finish=[];
var startingTime;


function shuffle(){
    for(var i=0; colorCandidates.length>0; i+=1){
        color=color.concat(colorCandidates.splice(Math.floor(Math.random()*colorCandidates.length),1));
    }
}

function setting(width,length){
    flag=false;
    for(var i=0; i<width*length; i+=1){
        var card=document.createElement('div');
        card.className='card';
        var cardInner=document.createElement('div');
        cardInner.className='card-inner';
        var cardFront=document.createElement('div');
        cardFront.className='card-front';
        var cardBack=document.createElement('div');
        cardBack.className='card-back';
        cardBack.style.backgroundColor=color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        (function(x){
            card.addEventListener('click',function(){
                if(flag && !finish.includes(x)) {
                    x.classList.toggle('flipped');
                    click.push(x);
                    if(click.length===2){
                        if(click[0].querySelector('.card-back').style.backgroundColor ===
                        click[1].querySelector('.card-back').style.backgroundColor){
                        finish.push(click[0]);
                        finish.push(click[1]);
                        click=[];
                        if(finish.length===12){
                            var endingTime=new Date();
                            alert((endingTime-startingTime)/1000+'초 걸렸어요');
                            
                            document.querySelector('#pack').innerHTML='';
                            colorCandidates=colors.slice();
                            color=[]; 
                            finish=[]; 
                            startingTime=null;
                            shuffle(); 
                            setting(width,length);
                        }
                    }else{
                        flag=false;
                        setTimeout(function(){
                            click[0].classList.remove('flipped');
                            click[1].classList.remove('flipped');
                            flag=true;
                            click=[];
                        },1000);
                    }
                }
            }
            });
        })(card);
        document.querySelector('#pack').appendChild(card);
    }

    document.querySelectorAll('.card').forEach(function (card, index){
        setTimeout(function(){
            card.classList.add('flipped');
        },1000+100*index);
    });

    setTimeout(function(){
        document.querySelectorAll('.card').forEach(function(card){
            card.classList.remove('flipped');
        });
        flag=true;
        startingTime=new Date();
    },5000);
}



function init(){
    shuffle();
    setting(width,length);
}

init();


