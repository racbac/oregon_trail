var Game = {
  gameCaravan: new Caravan(),
  date: new Date(),
  scenes: {
    startScreen: function(){
      document.getElementById("game").innerHTML=
        '<div class=\"centered_content\">'+
          '<h1>The Oregon Trail</h1>'+
          '<div class="white_black">'+
          '<p>You may:</p>'+
          '<ol>'+
            '<li>Travel the trail</li>'+
            '<li>Learn about the trail</li>'+
            '<li>See the Oregon Top Ten</li>'+
          '</ol>'+
          '<p>What is your choice? <span id="input"></span></p>'+
        '</div>';
        var validationFunc=function(input){
          return input.length<2 && Number.isInteger(Number(input)) && Number(input)>0 &&Number(input)<4;
        }
      Game.waitForInput(null,validationFunc,function(input){
        if(input == 1){
          Game.scenes.chooseOccupation();
        }
        else if(input ==2){
          document.getElementById("game").innerHTML="<div>I will do this later. Enter to continue.</div>"
          Game.waitForInput(null,null,Game.scenes.startScreen);
        }
        else if(input == 3){
          document.getElementById("game").innerHTML="<div> I will do this later. Enter to continue.</div>"
          Game.waitForInput(null,null,Game.scenes.startScreen);
        }
        else if(input == 4){
          document.getElementById("game").innerHTML="<div>I will do this later. Enter to continue.</div>"
          Game.waitForInput(null,null,Game.scenes.startScreen);
        }
        else{
          Game.scenes.startScreen();
        }
      });
    },
    chooseOccupation: function(){
      document.getElementById("game").innerHTML =
        `<div id="choose_occupation" class="white_black">
          <p>Many kinds of people made the trip to Oregon.</p>
          <p>You may:</p>
          <ol>
            <li>Be a banker</li>
            <li>Be a carpenter</li>
            <li>Be a farmer</li>
            <li>Find out the difference between the choices</li>
          </ol>
          <p>What is your choice? <span id="input"></span></p>
        </div>`;
      var validationFunc=function(input){
        return Number.isInteger(+input) && +input>0 && +input<5;
      }
      Game.waitForInput(null,validationFunc,function(choice){
        if(choice == 1){
          //Caravan.occupation="banker"; Game.gameCaravan.money = 1600
		  Game.gameCaravan.occupation = OCCUPATION.BANKER;
      Game.gameCaravan.money = OCCUPATION.BANKER.cash;
        }
        else if(choice ==2){
          //Caravan.occupation="carpenter"; Game.gameCaravan.money = 400;
          Game.gameCaravan.occupation = OCCUPATION.CARPENTER;
          Game.gameCaravan.money = OCCUPATION.CARPENTER.cash;
        }
        else if(choice == 3){
          //Caravan.occupation="farmer"; Game.gameCaravan.money = 400;
          Game.gameCaravan.occupation = OCCUPATION.FARMER;
          Game.gameCaravan.money = OCCUPATION.FARMER.cash;
        }
        else if(choice == 4){
          document.getElementById("game").innerHTML =
            `<div id="choose_occupation" class=\"centered_content white_black\">
              <p>Traveling to Oregon isn't easy! But if you're a banker, you'll have more money for supplies and services than a carpenter or a farmer.</p>\n
              <p>However, the harder you have to try, the more points you deserve! Therefore, the farmer earns the greatest number of points and the banker earns the least</p>\n
              <p class="prompt">Press ENTER to continue</p>\n
            </div>\n`;
          Game.waitForInput(null,null,Game.scenes.chooseOccupation);
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
        `<div id="enterNames" class="white_black">
          <p>
            What is the first name of the wagon leader?
            <span id="input"></span>
          </p>
        </div>`;

      Game.waitForInput(null,function(value) {return (value.length > 0)},function(leadername){
        
        // Add the leader to the caravan
        var leader = new Person(leadername);
        Game.gameCaravan.addPerson(leader);
        
        document.getElementById("enterNames").innerHTML =
          ` <div class="white_black">\n
              <p>What are the first names of the four other members in your party?</p>\n
              <ol>\n`
                +'<li>'+leadername+'</li>\n'+
                `<li id="mem1"><span id="input"></span></li>\n
                <li id="mem2"></li>\n
                <li id="mem3"></li>\n
                <li id="mem4"></li>\n
            </div>\n`;
            var nameFunc=function(name){
              var inputEle=document.getElementById("input");
              var index=+inputEle.parentNode.id[3];
              
              if (name == "") { // if they're done entering names, autofill
                for (var i = index; i <= 4; i++) {
                  Game.gameCaravan.addPerson(new Person(randomName()));
                  document.getElementById('mem'+(i)).innerHTML=Game.gameCaravan.family[i].name;
                }
                document.getElementById("enterNames").innerHTML += "<p class=\"prompt\">Press ENTER to continue</p>\n"
                Game.waitForInput(null, null, function() {Game.scenes.chooseDepartureMonth()});
                return;
              }
              // Add a new peron to the caravan for each input name
              var newPerson = new Person(name);
              Game.gameCaravan.addPerson(newPerson);
              
              if(index==4){ // if they've entered all the names
                Game.scenes.chooseDepartureMonth();
                return;
              } else { // they're still entering names
                index++;
                document.getElementById('mem'+index).appendChild(document.getElementById('input'));
                document.getElementById('mem'+(index-1)).innerHTML=inputEle.innerHTML;
                inputEle.innerHTML="_";

                Game.waitForInput(null,null,nameFunc);
              }
            }
            Game.waitForInput(null,null,nameFunc);
      });
    },
    chooseDepartureMonth:function(){
      document.getElementById("game").innerHTML =
      `<div id="chooseMonth" class="white_black"><div>
        <p>It is 1848. Your jumping off place for Oregon is Independence, Missouri. You must decide which month to leave Independence.</p>
        <ol>
          <li>March</li>
          <li>April</li>
          <li>May</li>
          <li>June</li>
          <li>July</li>
          <li>Ask For advice</li>
        </ol>
        <p>What is your choice?
          <span id="input"><span>
        </p></div>
      </div>
      `;
      var validationFunc=function(input){
        return Number.isInteger(+input) && +input>0 && +input<7;
      }
      Game.waitForInput(null,validationFunc,function(choice){
        if(choice==1){
          //set departure month to March
          Game.date = new Date("3-01-1848");
        }
        else if(choice==2){
          //set departure month to April
          Game.date = new Date("4-01-1848");
        }
        else if(choice ==3){
          //set departure moth to May
          Game.date = new Date("5-01-1848");
        }
        else if(choice ==4){
          //set departure month to June
          Game.date = new Date("6-01-1848");
        }
        else if(choice==5){
          //set departure month to July
          Game.date = new Date("7-01-1848");
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
      document.getElementById("game").innerHTML ="<div class='white_black'>\n<p>You attend a public meeting held for \"folks with the California - Oregon fever.\" You're told:<br><br>\nIf you leave too early, there won't be any grass for your oxen to eat. If you leave too late, you may not get to Oregon before winter comes. If you leave at just the right time, there will be green grass and the weather will still be cool.</p>\n<p class=\"prompt\">Press ENTER to continue</p>\n</div>\n";
      Game.waitForInput(null,null,Game.scenes.chooseDepartureMonth);
    },
    MattStore:function(){
      document.getElementById("game").innerHTML ="<div class='white_black'>\n<p>Before leaving Independence you should buy equipment and supplies. You have $" + Game.gameCaravan.occupation.cash + " in cash, but you don't have to spend it all now.</p>\n<p class=\"prompt\">Press ENTER to continue</p>\n</div>\n";
      Game.waitForInput(null,null,function(){
        document.getElementById("game").innerHTML =
          `<div id="matt_intro">\n
            <div id="matt_img"></div>\n
              <div class="white_black">\n
                <p>Hello, I'm Mal. So you're going to Oregon! I can fix you up with what you need:</p>\n
                <ul>\n<li>a team of oxen to pull your wagon</li>\n
                  <li>clothing for both summer and winter</li>\n
                  <li>plenty of food for the trip</li>\n
                  <li>ammunition for your rifles</li>\n
                  <li>spare parts for your wagon</li>\n
                </ul>\n
              </div>
            <p class=\"prompt\">Press ENTER to continue</p>\n
          </div>\n`;
        thestore = new Store(20, 10, 2, 10, 10, 10, 0.2);
        var storeFront = function(){
          
          document.getElementById("game").innerHTML =
          `<div id="mattstore" class="white_black">\n
              <div>
                <p>Mal's General Store<br>\n
                Independence, Missouri<br>\n` +
                MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() + `</p>\n
              </div>\n
              <div>\n
                <div id="matt_img"></div>\n
                <div>\n
                  <ol>\n
                    <li>Oxen<span id="oxen_bill" style="float: right">$`+thestore.item_bill("oxen").toFixed(2)+`</span></li>\n
                    <li>Food<span id="food_bill" style="float: right">$`+thestore.item_bill("food").toFixed(2)+`</span></li>\n
                    <li>Clothing<span id="clothing_bill" style="float: right">$`+thestore.item_bill("clothing").toFixed(2)+`</span></li>\n
                    <li>Bait<span id="bait_bill" style="float: right">$`+thestore.item_bill("bait").toFixed(2)+`</span></li>\n
                    <li>Spare Parts<span id="spare_bill" style="float: right">$`+thestore.item_bill("axles", "tongues", "wheels").toFixed(2)+`</span></li>\n
                  </ol>\n
                  <p>Total Bill: <span id="total_bill" style="float: right">$`+thestore.bill.toFixed(2)+`</span></p>\n
                  <p>Amount you have:<span id="money" style="float: right">$`+(Game.gameCaravan.money - thestore.bill).toFixed(2)+`</span></p>\n
                  <p>Which item would you like to buy? <span id="input"></span></p>\n
                  <p class=\"prompt\">Press SPACE to leave store</p>\n
                </div>\n
            </div>
          </div>\n`;
          var validationFunc=function(input){
            return input==""||(+input&&+input>0&&+input<6);
          }
          Game.waitForInput([13/*enter*/,32/*space*/],validationFunc,function(choice){
            document.getElementById("game").innerHTML=
            `<div id="mattstore" class="white_black">
              <p>
                Matt's General Store<br>
                Independence, Missouri<br>
              </p>
              <p id="matt_advice">
              </p>
              <p>

                Bill so far: $<span id="bill"></span>
              </p>
            </div>`;
            document.getElementById("bill").innerHTML="0.00";
            var mattAdvice="";
            var mattFunc=null;
            var validationFunc=null;
            if(choice == 1){
              mattAdvice=
                `There are 2 oxen in a yoke. I recommend at least 3 yoke, but you need as least one yoke. I charge $40 a yoke.<br>\n
                How many yoke do you want? `;
              validationFunc=function(input){
                return Number.isInteger(+input)&&input<=10&&input>=1;
              }
              mattFunc=function(input){
                //add yokes to bill
                thestore.adjust_bill("oxen", input * 2)
                storeFront();
              }
            }
            else if(choice == 2){
              mattAdvice="I recommend 200 pounds of food for each person. How many pounds of food do you want?";
              validationFunc=function(input){
                return input.length<5&&Number.isInteger(+input);
              }
              mattFunc=function(input){
                //add food to bill
                thestore.adjust_bill("food", input);
                storeFront();
              }
            }
            else if(choice == 3){
              mattAdvice="I recommend 2 sets of clothing for each person. How many sets of clothes do you want?";
              validationFunc=function(input){
                return input.length<3&&Number.isInteger(+input);
              }
              mattFunc=function(input){
                //add clothes to bill
                thestore.adjust_bill("clothing", input);
                storeFront();
              }
            }
            else if(choice == 4){
              mattAdvice="Each box of ammo holds 20 bullets. How many boxes do you want?";
              validationFunc=function(input){
                return input.length<3&&Number.isInteger(+input);
              }
              mattFunc=function(input){
                //add boxes to bill
                thestore.adjust_bill("bait", input);
                storeFront();
              }
            }
            else if(choice == 5){
              mattAdvice="You can carry 3 wagon wheels.<br>\nHow many wagon wheels?"
              validationFunc=function(input){
                return input.length<2&&Number.isInteger(+input)&&input<=3;
              }
              mattFunc=function(input){
                //add wagon wheels to bill
                thestore.adjust_bill("wheels", input);

                mattAdvice="You can carry 3 wagon axles.<br>\nHow many wagon axles?";
                document.getElementById("matt_advice").innerHTML=mattAdvice + '<span id="input"></span>';
                Game.waitForInput(null,validationFunc,function(input){
                  //add wagon axles to bill
                  thestore.adjust_bill("axles", input);

                  mattAdvice="You can carry three wagon tongues.<br>\nHow many wagon tongues?";
                  document.getElementById("matt_advice").innerHTML=mattAdvice + '<span id="input"></span>';
                  Game.waitForInput(null,validationFunc,function(input){
                    //add wagon tongues to bill
                    thestore.adjust_bill("tongues", input);
                    storeFront();
                    return;
                  });
                });
              }
            }
            else{
              Game.gameCaravan.purchase("oxen", thestore.oxen.price, thestore.oxen.amt);
              Game.gameCaravan.purchase("axles", thestore.axles.price, thestore.axles.amt);
              Game.gameCaravan.purchase("clothing", thestore.clothing.price, thestore.clothing.amt);
              Game.gameCaravan.purchase("wheels", thestore.wheels.price, thestore.wheels.amt);
              Game.gameCaravan.purchase("tongues", thestore.tongues.price, thestore.tongues.amt);
              Game.gameCaravan.purchase("food", thestore.food.price, thestore.food.amt);
              Game.gameCaravan.purchase("bait", thestore.bait.price, thestore.bait.amt);
              Game.scenes.Journey();
              return;
            }
            document.getElementById("matt_advice").innerHTML=mattAdvice + '<span id="input"></span>';
            Game.waitForInput(null,validationFunc,mattFunc);
          });
        };
        Game.waitForInput(null,null,storeFront);
      });
    },
    Journey:function(){
      document.getElementById("game").innerHTML =

        `<div id="journey" class="centered_content white_black">
          <div id="animation"></div>
          <div id="ground"></div>
          <div id="status">
            <p>press ENTER to size up the situation</p>
            <ul>
            <li>Date: <span id="date"></span></li>
            <li>Weather: <span id="weather"></span></li>
            <li>Health: <span id="health"></span></li>
            <li>Food: <span id="food"></span></li>
            <li>Next Landmark: <span id="next_landmark"></span></li>
            <li>Miles Traveled: <span id="miles"></span></li>
          </ul>
        </div>`;
        document.getElementById("date").innerHTML=  MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() ;
        document.getElementById("weather").innerHTML="weather";
        document.getElementById("health").innerHTML=Game.gameCaravan.health.string;
        document.getElementById("food").innerHTML=Game.gameCaravan.food;
        document.getElementById("next_landmark").innerHTML='000';
        document.getElementById("miles").innerHTML=Game.miles;
        var timeOfDay=0;
        var HoursPerDay=8;
        var MPH=3;
        var travelFunc=function(){//called once per game Hour
          timeOfDay++;

          if(timeOfDay==24){//once a day

            Game.date.setDate(Game.date.getDate()+1);
            timeOfDay=0;
            /*generate the conditions for the day*/
            var weather="warm";
            var event=null;//randomEvent();
            /*update food and health*/


            /*update html for event*/
            document.getElementById("date").innerHTML=  MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() ;
            document.getElementById("weather").innerHTML=weather;
            document.getElementById("health").innerHTML=Game.gameCaravan.health.string;
            document.getElementById("food").innerHTML=Game.gameCaravan.food;
            document.getElementById("next_landmark").innerHTML='000';

            if(event){
              clearInterval(travelLoop);
              waitForInput(null,null,game.scenes.EnterMenu);
              return;
            }
          }
          if(timeOfDay==5){//start traveling at 5am
            /*set oxen animation to running and the background to scroll*/
            document.getElementById("animation").innerHTML="<p>animation started</p>";
          }
          else if(timeOfDay== 5+HoursPerDay){
            Game.miles+=MPH*HoursPerDay;
            document.getElementById("miles").innerHTML=Game.miles;
            /*set oxen animation to stopped and the background to stopped*/
            document.getElementById("animation").innerHTML="<p>animation stopped</p>";
          }

        }
        var travelLoop=setInterval(travelFunc,3000/24); /*call travelFunc once per game hour, 3 game day per second*/
        Game.waitForInput(null,null,function(){
          clearInterval(travelLoop);
          Game.scenes.EnterMenu();
        });
    },
    EnterMenu: function(){
      document.getElementById("game").innerHTML="<p>menu will added here later. Enter to contunue.</p>";
      Game.waitForInput(null,null,Game.scenes.Journey);
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
  waitForInput: function(enterKeys,validationFunc,callback=function(){}){
    enterKeys=enterKeys||[13];
    validationFunc=validationFunc||function(){return true};
    var input="";

    element=document.getElementById("input")||{};
    element.innerHTML = "_";
    document.onkeypress=function(event){
      var x = event.charCode || event.keyCode;   // Get the Unicode value
      if(x==13){//ignore enter
        return;
      }
      var y = String.fromCharCode(x);

      if(validationFunc(input+y)){
        input=input+y;
        element.innerHTML=input+"_";
      }
    }
    document.onkeydown=function(event){
      var x = event.charCode || event.keyCode;   // Get the Unicode value
      if(x==8)//backspace pressed
      {
        input=input.slice(0,-1);
        element.innerHTML=input;
      }
      else if((x == 13||enterKeys.includes(x)) && validationFunc(input) )//enter key pressed and input valid
      {
        document.onkeydown=null;
        document.onkeypress=null;
        element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length - 1);
        callback(input);
      }else if(x==8)//backspace pressed
      {
        input=input.slice(0,-1);
        element.innerHTML=input+"_";

      }
    };
  },
  fishingGame:function(){
    var fish=["sturgeon","salmon","steelhead","trout","catfish","bass","sunfish","barracuda","flounder"];
    var weights=[50,10,27,27,40,12,1,20,26];
    var chanceToCatch=Math.floor((Math.random()*10)+1);
    var fishNum=Math.floor((Math.random()*9));
    if (chanceToCatch>5){
      document.getElementById("game").innerHTML="You got a"+fish[fishNum];
      Caravan.food+=weights[fishNum];
    }
  }
};

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
