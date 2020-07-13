document.body;
var table=document.createElement('table');
var records=[];
var atts=[];
var turn='O';
var result=document.createElement('div');

function check(whatrecord, whatatt){
    //Is the three-att-row completed?
    var done=false;
    //width check
    if(
        atts[whatrecord][0].textContent===turn &&
        atts[whatrecord][1].textContent===turn &&
        atts[whatrecord][2].textContent===turn
    ){
        done=true;
    }
    // length check
    if(
        atts[0][whatatt].textContent===turn &&
        atts[1][whatatt].textContent===turn &&
        atts[2][whatatt].textContent===turn
    ){
        done=true;
    }

    // / check
    if(
        atts[0][0].textContent===turn &&
        atts[1][1].textContent===turn &&
        atts[2][2].textContent===turn
    ){
        done=true;
    }
    
    if(
        atts[0][2].textContent===turn &&
        atts[1][1].textContent===turn &&
        atts[2][0].textContent===turn
    ){
        done=true;
    }
    return done;
}

function game(draw){
    if(draw){
        result.textContent='비겼어요';
    }else {
        result.textContent=turn+' 이겼어요!';
    }

    setTimeout(function(){
        result.textContent='';
        atts.forEach(function(record){
            record.forEach(function (att){
                att.textContent='';
            });
        });
        turn='O';
    },2000);
}

//When it's a computer's turn, I shouldn't click one of atts
var async = function(event){
    if(turn==='X'){
        return;
    }

    var whatrecord=records.indexOf(event.target.parentNode);
    var whatatt=atts[whatrecord].indexOf(event.target);

    if(atts[whatrecord][whatatt].textContent !==''){
        //console.log('it has been occupied');
    }else{ 
        //console.log('it is empty');
        atts[whatrecord][whatatt].textContent=turn;
        var whether=check(whatrecord,whatatt);
        
        var candidate=[];
        atts.forEach(function(record){
            record.forEach(function (att){
                candidate.push(att);
            });
        });

        candidate=candidate.filter(function(att){
            return !att.textContent
        });


        if(whether){
            game();
        }else if(candidate.length===0){
            game(true);
        }else{
            if(turn==='O'){
                turn='X';
            }
            setTimeout(function(){
                var selectedatt=candidate[Math.floor(Math.random()*
                    candidate.length)];
                selectedatt.textContent=turn;
                //whether computer wins or not
                var whatrecord=records.indexOf(selectedatt.parentNode);
                var whatatt=atts[whatrecord].indexOf(selectedatt);
                var whether=check(whatrecord,whatatt);
                //when every att is full
                if(whether){
                    game();
                }
                //give me the next turn
                turn='O';
            },1000);
        }
    }
};

//create a table
for(var i=1; i<=3; i+=1){
    var record=document.createElement('tr');
    records.push(record);
    atts.push([]);

    for(var j=1; j<=3; j+=1){
        var att=document.createElement('td');
        att.addEventListener('click',async);
        att.style="align:center"

        atts[i-1].push(att);
        record.appendChild(att);
    }
    table.appendChild(record);
    table.style.textAlign="center";
    table.style.margin="0 auto";
}
document.body.appendChild(table);
var div=document.createElement("div");
div.style.margin="40px";
document.body.appendChild(div);
document.body.appendChild(div);
document.body.appendChild(result);

result.style.margin="0 auto";
result.style.textAlign="center";
result.style.fontSize="15pt";

