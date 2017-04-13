var gameCaravan = new Caravan();

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
          document.getElementById("game").innerHTML="I will do this later. Enter to continue."
          Game.waitForInput(null,Game.scenes.startScreen);
        }
        else if(input == 3){
          document.getElementById("game").innerHTML="I will do this later. Enter to continue."
          Game.waitForInput(null,Game.scenes.startScreen);
        }
        else if(input == 4){
          document.getElementById("game").innerHTML="I will do this later. Enter to continue."
          Game.waitForInput(null,Game.scenes.startScreen);
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
		  gameCaravan.money = 1600;
        }
        else if(choice ==2){
          //Caravan.occupation="carpenter";
		  gameCaravan.money = 400;
        }
        else if(choice == 3){
          //Caravan.occupation="farmer";
		  gameCaravan.money = 400;
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

      document.getElementById("game").innerHTML =
        `<div id="enterNames">
          <div>
            What is the first name of the wagon leader?
            <span id="input"></span>
          </div>
        </div>`;
      Game.waitForInput(document.getElementById("input"),function(leadername){
		  
        // Add the leader to the caravan
		var leader = new Person(leadername);
		gameCaravan.addPerson(leader);
		
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
              
			  // Add a new peron to the caravan for each input name
			  var newPerson = new Person(name);
			  gameCaravan.addPerson(newPerson);
			  
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
      document.getElementById("game").innerHTML ="This is Matt's store. It will show a few pages with information about the products. Press Enter to read through them.";
      Game.waitForInput(null,function(){
        document.getElementById("game").innerHTML ="store information page 1. press enter for next."
        Game.waitForInput(null,function(){
          document.getElementById("game").innerHTML ="store information page2. press enter to shop."
          Game.waitForInput(null,function(){
            document.getElementById("game").innerHTML =
            `<div id="mattstore">
              <div>
                Matt's General Store<br>
                Independence, Missouri<br>
                date/data/date
              </div>
              <ol style="width: 500px">
                <li>Oxen<span id="oxen_bill" style="float: right">$0.00</span></li>
                <li>Food<span id="food_bill" style="float: right">$0.00</span></li>
                <li>Clothing<span id="clothing_bill" style="float: right">$0.00</span></li>
                <li>Ammo<span id="ammo_bill" style="float: right">$0.00</span></li>
                <li>Spare Parts<span id="spare_bill" style="float: right">$0.00</span></li>
              </ol>
              <div>Total Bill: <span id="total_bill" style="float: right">$0.00</span></div>
              <br>
              <div>Amount you have:<span id="money" style="float: right">$0.00</span></div>
              <p>Which item would you like to buy?<span id="input"></span></p>
              <p>Press SPACE to leave store</p>
            </div>`;
            Game.waitForInput(document.getElementById("input"),function(choice){
              document.getElementById("game").innerHTML=
              `<div id="mattstore">
                <div>
                  Matt's General Store<br>
                  Independence, Missouri<br>
                </div>
                <div id="matt_advice">
                </div>
                <div>
                  Bill so far: $<span id="bill"></span>
                </div>
              </div>`;
              document.getElementById("bill").innerHTML="0.00";
            });
          });
        });
      });
    },
    BuySupply:function(){

    },
    Journey:function(){
      document.getElementById("game").innerHTML =
        `<div id="journey">
          <div>animation goes here</div>
          <div>press ENTER to size up the situation</div>
          <div>
            Date:<br>
            Weather:<br>
            Health:<br>
            Food:<br>
            Next Landmark:<br>
            Miles Traveled:<br>
          </div>
        </div>`;
    },
    Fishing: function(){

    },
    LandMark: function(landmarkname){

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
