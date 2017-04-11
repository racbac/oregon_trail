var Game={
  scenes: {
    startScreen: function(){
      document.getElementById("game").innerHTML=
        '<div id="startscreen">'+
          '<h1>The Oregon Trail</h1>'+
          '</p>You may:'+
          '<ol>'+
            '<li>Travel the trail</li>'+
            '<li>Learn about the trail</li>'+
            '<li>See the Oregon Top Ten</li>'+
          '</ol>'+
          '</p>'+
          '<div>What is you choice?<span id="input"></span></div>'+
        '</div>';
      Game.waitForInput(document.getElementById("input"),function(input){
        if(input == 1){
          Game.scenes.chooseOccupation();
        }
        else if(input ==2){
          
        }
        else if(input == 3){

        }
        else if(input == 4){

        }
        else{
          Game.scenes.startScreen();
        }
      });
    },
    chooseOccupation: function(){
      document.getElementById("game").innerHTML =
        `<div id="choose_occupation">
          <h1>Choose Occupation</h1>
          <ol>
            <li>banker</li>
            <li>carpenter</li>
            <li>farmer</li>
            <li>find out the difference</li>
          </ol>
          <div>What is your choice?<span id="input"></span></div>
        </div>`;
      Game.waitForInput(document.getElementById("input"),function(choice){
        if(choice == 1){
          //Caravan.occupation="banker";
        }
        else if(choice ==2){
          //Caravan.occupation="carpenter";
        }
        else if(choice == 3){
          //Caravan.occupation="farmer";
        }
        else if(choice == 4){
          document.getElementById("game").innerHTML =
            `<div id="choose_occupation">
              <p>insert helpful hint about choosing occupations here</p>
            </div>`;
          Game.waitForInput(document.getElementById("input"),Game.scenes.chooseOccupation);
          return;
        }
        else{
          Game.scenes.chooseOccupation();
          return;
        }
        Game.scenes.enterNames();
      });
    },
    enterNames: function(){
      //Caravan.family=[null,null,null,null,null];
      document.getElementById("game").innerHTML =
        `<div id="enterNames">
          <div>
            What is the first name of the wagon leader?
            <span id="input"></span>
          </div>
        </div>`;
      Game.waitForInput(document.getElementById("input"),function(leadername){
        //Caravan.family[0].name=leadername;
        document.getElementById("enterNames").innerHTML =
          ` <div>
              What are the first names of the four other members in your party?
              <ol>`
                +'<li>'+leadername+'</li>'+
                `<li id="mem1"><span id="input">_</span></li>
                <li id="mem2"></li>
                <li id="mem3"></li>
                <li id="mem4"></li>
            </div>`;
            var nameFunc=function(name){
              var inputEle=document.getElementById("input");
              var index=+inputEle.parentNode.id[3];
              //Caravan.family[index].name=name;
              if(index==4){
                Game.scenes.chooseDepartureMonth();
                return;
              };
              index++;
              document.getElementById('mem'+index).appendChild(document.getElementById('input'));
              document.getElementById('mem'+(index-1)).innerHTML=inputEle.innerHTML;
              inputEle.innerHTML="_";

              Game.waitForInput(inputEle,nameFunc);
            }
            Game.waitForInput(document.getElementById("input"),nameFunc);
      });
    },
    chooseDepartureMonth:function(){
      document.getElementById("game").innerHTML =
      `<div id="chooseMonth">
        <h3> It is 1848. Your jumping off place for Oregon is Independence, Missouri.
        <br>
        You must decide which month to leave Independence.</h3>
        <ol>
          <li>March</li>
          <li>April</li>
          <li>May</li>
          <li>June</li>
          <li>July</li>
          <li>Ask For advice</li>
        </ol>
        <div>What is your choice?
          <span id="input"><span>
        </div>
      </div>
      `;
      Game.waitForInput(document.getElementById("input"),function(choice){
        if(choice==1){
          //set departure month to March
        }
        else if(choice==2){
          //set departure month to April
        }
        else if(choice ==3){
          //set departure moth to May
        }
        else if(choice ==4){
          //set departure month to June
        }
        else if(choice==5){
          //set departure month to July
        }
        else if(choice ==6){
          Game.scenes.adviceDepartureMonth();
          return;
        }
        else{
          Game.scenes.chooseDepartureMonth();
        }
        Game.scenes.MattStore();
      });
    },
    adviceDepartureMonth:function(){
      document.getElementById("game").innerHTML ="advice for departure month will be placed here...later. Enter to continue.";
      Game.waitForInput(null,Game.scenes.chooseDepartureMonth);
    },
    MattStore:function(){
      document.getElementById("game").innerHTML ="Matt store not done yet"
    },
    BuySupply:function(){

    },
    Journey:function(){

    }
  },
  gameDiv: document.getElementById("game"),
  start: function(){
    Game.scenes.startScreen();
  },
  waitForInput: function(element,callback=function(){}){
    var input="";
    element=element||{};
    document.onkeypress=function(event){
      var x = event.charCode || event.keyCode;   // Get the Unicode value
      if(x==13){//ignore enter
        return;
      }
      var y = String.fromCharCode(x);
      input=input+y;
      element.innerHTML=input;

    }
    document.onkeydown=function(event){
      var x = event.charCode || event.keyCode;   // Get the Unicode value
      if(x == 13)//enter key pressed
      {
        document.onkeydown=null;
        document.onkeypress=null;
        callback(input);
      }else if(x==8)//backspace pressed
      {
        input=input.slice(0,-1);
        element.innerHTML=input;
      }
    };
  }
};
