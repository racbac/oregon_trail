var Game = {
  gameCaravan: new Caravan(),
  date: new Date(),

  miles: 0,

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

  scenes: {
    startScreen: function(){
      Game.gameDiv.innerHTML=
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
          Game.gameDiv.innerHTML="<div>I will do this later. Enter to continue.</div>"
          Game.waitForInput(null,null,Game.scenes.startScreen);
        }
        else if(input == 3){
          Game.gameDiv.innerHTML="<div> I will do this later. Enter to continue.</div>"
          Game.waitForInput(null,null,Game.scenes.startScreen);
        }
        else if(input == 4){
          Game.gameDiv.innerHTML="<div>I will do this later. Enter to continue.</div>"
          Game.waitForInput(null,null,Game.scenes.startScreen);
        }
        else{
          Game.scenes.startScreen();
        }
      });
    },
    chooseOccupation: function(){
      Game.gameDiv.innerHTML =
        `<div id="choose_occupation" class="white_black">\n
          <p>Many kinds of people made the trip to Oregon.</p>\n
          <p>You may:</p>\n
          <ol>\n
            <li>Be a banker</li>\n
            <li>Be a carpenter</li>\n
            <li>Be a farmer</li>\n
            <li>Find out the difference between the choices</li>\n
          </ol>\n
          <p>What is your choice? <span id="input"></span></p>\n
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
          Game.gameDiv.innerHTML =
            `<div id="choose_occupation" class=\"centered_content white_black\">\n
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

      Game.gameDiv.innerHTML =
        `<div id="enterNames" class="white_black">\n
          <p>\n
            What is the first name of the wagon leader?
            <span id="input"></span>\n
          </p>\n
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
      Game.gameDiv.innerHTML =
      `<div id="chooseMonth" class="white_black"><div>\n
        <p>It is 1848. Your jumping off place for Oregon is Independence, Missouri. You must decide which month to leave Independence.</p>\n
        <ol>\n
          <li>March</li>\n
          <li>April</li>\n
          <li>May</li>\n
          <li>June</li>\n
          <li>July</li>\n
          <li>Ask For advice</li>\n
        </ol>\n
        <p>What is your choice?
          <span id="input"><span>\n
        </p></div>\n
      </div>\n
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
      Game.gameDiv.innerHTML ="<div class='white_black'>\n<p>You attend a public meeting held for \"folks with the California - Oregon fever.\" You're told:<br><br>\nIf you leave too early, there won't be any grass for your oxen to eat. If you leave too late, you may not get to Oregon before winter comes. If you leave at just the right time, there will be green grass and the weather will still be cool.</p>\n<p class=\"prompt\">Press ENTER to continue</p>\n</div>\n";
      Game.waitForInput(null,null,Game.scenes.chooseDepartureMonth);
    },
    MattStore:function(){
      Game.gameDiv.innerHTML ="<div class='white_black'>\n<p>Before leaving Independence you should buy equipment and supplies. You have $" + Game.gameCaravan.occupation.cash + " in cash, but you don't have to spend it all now.</p>\n<p class=\"prompt\">Press ENTER to continue</p>\n</div>\n";
      Game.waitForInput(null,null,function(){
        Game.gameDiv.innerHTML =
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
              </div>\n
            <p class=\"prompt\">Press ENTER to continue</p>\n
          </div>\n`;
        thestore = new Store(20, 10, 2, 10, 10, 10, 0.2);
        var storeFront = function(){

          document.getElementById("game").innerHTML =
          `<div id="mattstore" class="white_black">\n
              <div>\n
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
            </div>\n
          </div>\n`;
          var validationFunc=function(input){
            return input==""||(+input&&+input>0&&+input<6);
          }
          Game.waitForInput([13/*enter*/,32/*space*/],validationFunc,function(choice){
            Game.gameDiv.innerHTML=
            `<div id="mattstore" class="white_black">\n
              <p>\n
                Matt's General Store<br>\n
                Independence, Missouri<br>\n
              </p>\n
              <p id="matt_advice">\n
              </p>\n
              <p>\n

                Bill so far: $<span id="bill"></span>\n
              </p>\n
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
              mattAdvice="I recommend 200 pounds of food for each person. How many pounds of food do you want? ";
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
              mattAdvice="I recommend 2 sets of clothing for each person. How many sets of clothes do you want? ";
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
              mattAdvice="Each box of bait holds 20 bait. How many boxes do you want? ";
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
              mattAdvice="You can carry 3 wagon wheels.<br>\nHow many wagon wheels? "
              validationFunc=function(input){
                return input.length<2&&Number.isInteger(+input)&&input<=3;
              }
              mattFunc=function(input){
                //add wagon wheels to bill
                thestore.adjust_bill("wheels", input);

                mattAdvice="You can carry 3 wagon axles.<br>\nHow many wagon axles? ";
                document.getElementById("matt_advice").innerHTML=mattAdvice + '<span id="input"></span>';
                Game.waitForInput(null,validationFunc,function(input){
                  //add wagon axles to bill
                  thestore.adjust_bill("axles", input);

                  mattAdvice="You can carry three wagon tongues.<br>\nHow many wagon tongues? ";
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

    BuySupply:function(){

    },
	CrossRiver:function(width, depth) {

		var message = "You must cross the river in order to continue. The river at this point is currently " + width +
			" feet wide and " + depth + " feet deep in the middle."

		document.getElementById("game").innerHTML =
        `<div id="cross_river_message">
          <p>' + message + '</p>
          <p class="prompt">Press ENTER to continue</p>\n
        </div>`;

		Game.waitForInput(null, null, null);

		document.getElementById("game").innerHTML =
      `<div id="cross_river">
        <p>Weather: </p>
        <p>River width: ' + width + '</p>
        <p>River depth: ' + depth + '</p>
        <p>You may:</p>
        <ol>
          <li>attempt to ford the river</li>
          <li>caulk the wagon and float it accross</li>
          <li>take a ferry accross</li>
          <li>wait to see if conditions improve</li>
          <li>get more information</li>
        </ol>
        <p>What is your choice? <span id="input"></span></p>
      </div>`;
    var validationFunc=function(input){
      return Number.isInteger(+input) && +input>0 && +input<5;
    }
    Game.waitForInput(null,validationFunc,function(choice){

      // Ford the river
      if(choice == 1){

        // A depth of more than 2.5 feet is where risk starts
        if (depth > 2.5) {

          // Every 10th of a foot adds a 5% chance of disaster
          var accidentChance = (depth - 2.5) * 50;
          var chance = randRange(1, 100);
          if (chance < accidentChance) {

            // TODO: Display the message to the screen, showing what was lost
            Game.alertBox(wagonTipOver(gameCaravan));
            }
        }
      }

      //Float accross the river
      else if(choice ==2){
        //play an animation?
        var chance = randRange(1, 100);
        if (chance < 10) {

        }

      }
      else if(choice == 3){
        //take the ferry
      }
      else if(choice == 4) {
        //let a day pass and change the width/depth slightly
      }
      else if(choice == 5) {
        //show information
      }
    });
  },


    Journey:function(){
      Game.gameDiv.innerHTML =

        `<div id="journey" class="centered_content white_black">\n
          <div id="animation">\n
            <img id="bg" src="./img/bg_grass.png">\n
            <img id="oxen" src="./img/oxen_standing.png">\n
          </div>\n
          <div id="ground"></div>\n
          <div id="status">\n
            <p>press ENTER to size up the situation</p>\n
            <ul>\n
            <li>Date: <span id="date"></span></li>\n
            <li>Weather: <span id="weather"></span></li>\n
            <li>Health: <span id="health"></span></li>\n
            <li>Food: <span id="food"></span></li>\n
            <li>Next Landmark: <span id="next_landmark"></span></li>\n
            <li>Miles Traveled: <span id="miles"></span></li>\n
          </ul>\n
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
              waitForInput(null,null,game.scenes.TrailMenu);
              return;
            }
          }
          if(timeOfDay==5){//start traveling at 5am
            /*set oxen animation to running and the background to scroll*/
            document.getElementById("oxen").src="./img/oxen_walking.gif";
          }
          else if(timeOfDay== 5+HoursPerDay){
            Game.miles+=MPH*HoursPerDay;
            document.getElementById("miles").innerHTML=Game.miles;
            /*set oxen animation to stopped and the background to stopped*/
            document.getElementById("oxen").src = "./img/oxen_standing.png";
          }

        }
        var travelLoop=setInterval(travelFunc,3000/24); /*call travelFunc once per game hour, 3 seconds per game day*/
        Game.waitForInput(null,null,function(){
          clearInterval(travelLoop);
          Game.scenes.TrailMenu();
        });
    },

    TrailMenu: function(){
      document.getElementById("game").innerHTML=`
        <div id=trail_menu class="centered_content white_black">
          <div id="date">date/date/date</div>
          <div id="conditions">
            Weather:<br>
            Health:<br>
            Pace:<br>
            Rations:<br>
          </div>
          <div id="options">
            You May:
            <ol>
              <li>Contunue on trail</li>
              <li>Check supplies (not yet implemented)</li>
              <li>Look at map</li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ol>
          </div>
          What is your choice?<span id="input"></span>
        </div>`;
      var validationFunc=function(input){
        console.log(input)
        return  +input>0 && +input<9;
      }
      Game.waitForInput(null,validationFunc,function(input){
        if(input==1)
          Game.scenes.Journey();
        else if(input==3)
          Game.scenes.ShowMap();
        else
          Game.scenes.TrailMenu();
      });
    },
    CheckSupply: function(){

    },
    ShowMap: function(){
      Map.display(Game.miles);
      Game.waitForInput(null,null,Game.scenes.TrailMenu);
    },
    Fishing: function(){

    },


    LandMark: function(landmarkname){



   },



  crossRiver: function(method, success) {
    // setup
    Game.gameDiv.innerHTML = `<div id="river_crossing" class="ratio-wrapper ratio5-4">\n<canvas id="river_animation" class="ratio-content"></canvas>\n</div>`;
    var canvas = document.getElementById("river_animation");
    var ctx = canvas.getContext("2d");
    var grd; var bank1 = -40; var bank2 = 60;
    // draw the river at different stages in crossing
    var drawRiver = function(pct1, pct2) {
      grd = ctx.createLinearGradient(0,0,canvas.clientWidth / 2,canvas.clientWidth);
      grd.addColorStop(0, TAN);
      grd.addColorStop(pct1 < 0? pct1 = 0 : pct1/=100, TAN); grd.addColorStop(pct1, BLUE);
      grd.addColorStop(pct2 > 100 ? pct2 = 1 : pct2/=100, BLUE); grd.addColorStop(pct2, TAN);
      grd.addColorStop(1, TAN);
      ctx.fillStyle = grd; ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
    };

    // set graphic for method of travel
    if (method == "ford") {

    } else if (method == "caulk") {

    } else if (method == "ferry") {

    }

    drawRiver(bank1, bank2);
    setTimeout(function() { // wait a second before moving
      var progress = setInterval(function() { // go across the river until mostly across
        if (bank1 == 25) {
            clearInterval(progress);
        } else {
            drawRiver(bank1, bank2);
            bank1++, bank2++;
        }
      }, 60);
    }, 1000);
  },

  alertBox : function(message) {

	if (message == undefined) {
		message = "Oh my god everybody is dead! Even the oxen and the children are dead! This was a terrible idea! "+
		"I think I just broke my leg and caught Ebola!";
	}

    var alertBox = document.createElement("alertBox");
	alertBox.setAttribute('id', 'AlertBox');
	alertBox.innerHTML = message;
    document.getElementById("game").appendChild(alertBox);

	Game.waitForInput(null,null,Game.removeAlertBox);
  },

  removeAlertBox : function() {

    document.getElementById("AlertBox").remove();
  },
  fishingGame:function(){
    var fish=["sturgeon","salmon","steelhead","trout","catfish","bass","sunfish","barracuda","flounder"];
    var weights=[50,10,27,27,40,12,1,20,26];
    var chanceToCatch=Math.floor((Math.random()*10)+1);
    var fishNum=Math.floor((Math.random()*9));

      Game.gameDiv.innerHTML="You got a"+fish[fishNum];
      Game.gameCaravan.food+=weights[fishNum];

    }
  }
};

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
