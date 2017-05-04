var Game = {
  gameCaravan: new Caravan(),
  date: new Date(),
  weather: "warm",
  miles: 0,
  branch:[null,null],

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

  // Use for times when the caravan gets lost or has to wait for something
  passDays: function(numDays) {

	Game.date.setDate(Game.date.getDate() + numDays);

	for (var i = 0; i < numDays; i++) {
	  Game.gameCaravan.updateFood();
	}
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

        var storeFront = function(){ // start storeFront()
          Game.gameDiv.innerHTML =

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
                    <li>Oxen<span id="oxen_bill">$`+thestore.item_bill("oxen").toFixed(2)+`</span></li>\n
                    <li>Food<span id="food_bill">$`+thestore.item_bill("food").toFixed(2)+`</span></li>\n
                    <li>Clothing<span id="clothing_bill">$`+thestore.item_bill("clothing").toFixed(2)+`</span></li>\n
                    <li>Bait<span id="bait_bill">$`+thestore.item_bill("bait").toFixed(2)+`</span></li>\n
                    <li>Spare Parts<span id="spare_bill">$`+thestore.item_bill("axles", "tongues", "wheels").toFixed(2)+`</span></li>\n
                  </ol>\n
                  <p>Total Bill: <span id="total_bill">$`+thestore.bill.toFixed(2)+`</span></p>\n
                  <p>Amount you have:<span id="money">$`+(Game.gameCaravan.money - thestore.bill).toFixed(2)+`</span></p>\n
                  <p>Which item would you like to buy? <span id="input"></span></p>\n
                  <p class=\"prompt\">Press SPACE to leave store</p>\n
                </div>\n
            </div>\n
          </div>\n`;
          var validationFunc=function(input){
            return (input==""||(+input&&+input>0&&+input<6));
          }
          Game.waitForInput([13/*enter*/,32/*space*/],validationFunc,function(choice){
            var mattAdvice="";
            var mattFunc=null;
            var validationFunc=null;
            Game.waitForInput(null,validationFunc,mattFunc);
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
            else{ // checkout
              if (thestore.oxen.quantity > 0) { // they must have purchased oxen to leave the store
                if (Game.gameCaravan.purchaseItems(thestore.generate_bill())) { // make sure they have enough money
                  Game.scenes.Landmark(landmarks.Independence);
                } else {
                  Game.alertBox("You don't have enough money to pay your bill.", storeFront); return;
                }
                return;
              } else {
                Game.alertBox("You must have at least one ox to pull your wagon.", storeFront); return;
              }
            }
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
            document.getElementById("matt_advice").innerHTML=mattAdvice + '<span id="input"></span>';
            Game.waitForInput(null,validationFunc,mattFunc);
          }); // end waitForInput(choice)
        }; // end storeFront()
        Game.waitForInput(null,null,storeFront);
      });
    },

    BuySupply:function(landmark){
      var store=landmark.store;
      Game.gameDiv.innerHTML=`<div id="buy_supply" class="centered_content white_black">\n
       <div>
         `+landmark.name+`
       </div>
        <div id="date" >\n
`+ MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() +`</div>\n
        <div class="centered_content white_black">\n
          You May Buy:
          <ol id="options">\n
            <li>Oxen</li>\n
            <li>Clothing</li>\n
            <li>Baits</li>\n
            <li>Wagon Wheels</li>\n
            <li>Wagon Axles</li>\n
            <li>Wagon Tongues</li>\n
            <li>Food</li>\n
            <li>Leave Store</li>\n
          </ol>\n
        </div>\n
        <p>You have $<span id="money"></span> to spend.</p>\n
        <p>Which number?<span id="input"></span></p>\n
      </div>\n`;
      var validationFunc=function(input){
        input=+input;
        return Number.isInteger(input)&&input>0&&input<=8;
      };
      Game.waitForInput(null,validationFunc,function(input){
        if(input==8){
          Game.scenes.LandmarkMenu(landmark);
        }
        else{
          Game.scenes.BuySupply(landmark);
        }
      })
    },

	// Arrive at the river and show the width and depth
	ArriveAtRiver: function(width, depth) {

	  var message = "You must cross the river in order to continue. The river at this point is currently " + width +
	  " feet wide and " + depth + " feet deep in the middle."

	  document.getElementById("game").innerHTML =
      `<div id="cross_river_message" class="centered_content white_black">
        <p>` + message + `</p>
        <p class="prompt">Press ENTER to continue</p>\n
      </div>`;

	  Game.waitForInput(null, null, function() {Game.scenes.CrossRiver(width, depth) });

	},

	// Select an option for crossing the river
	CrossRiver:function(width, depth) {

	console.log("Width is " + width);


		document.getElementById("game").innerHTML =
      `<div id="cross_river" class="centered_content white_black">\n
        <p>Weather: </p>\n
        <p>River width: ` + width + `</p>\n
        <p>River depth: ` + depth + `</p>\n
        <p>You may:</p>\n
        <ol>\n
          <li>attempt to ford the river</li>\n
          <li>caulk the wagon and float it accross</li>\n
          <li>take a ferry accross</li>\n
          <li>wait to see if conditions improve</li>\n
          <li>get more information</li>\n
        </ol>\n
        <p>What is your choice? <span id="input"></span></p>\n
      </div>\n`;

    var validationFunc=function(input){
      return Number.isInteger(+input) && +input>0 && +input<5;
    }

    Game.waitForInput(null,validationFunc,function(choice){

      // Ford the river
      if(choice == 1){

        // A depth of more than 1 foot is where risk starts
        if (depth > 1) {

          // Every 10th of a foot adds a 5% chance of disaster
          var accidentChance = (depth - 1) * 50;
          var chance = randrange(1, 100);
          if (chance < accidentChance) {

			var eventResult = wagonTipOver(Game.gameCaravan);

		    Game.scenes.animateRiver("ford", false);
			setTimeout(function() {Game.alertBox(eventResult, Game.scenes.Journey)}, 4000);

		  }

		  else {

		    Game.scenes.animateRiver("ford", true);
			setTimeout(function() {Game.scenes.Journey()}, 4000);

		  }
		}
      }

      //Float accross the river
      else if(choice ==2){

        var accidentChance = randrange(1, 100);

        if (accidentChance < 30) {

		  var eventResult = wagonTipOver(Game.gameCaravan);

		  if (eventResult != null) {

			Game.scenes.animateRiver("float", false);
            Game.alertBox(eventResult, Game.scenes.journey);
		  }
        }

		Game.scenes.animateRiver("float", true);
		Game.scenes.Journey();
      }

	  // Take the ferry
      else if(choice == 3){

		var ferryAvailable = randrange(1, 5);

		if (ferryAvailable <= 2) {

		  Game.passDays(1);
		  Game.alertBox("No ferry comes around today. Lose one day waiting", Game.scenes.CrossRiver);
		}

		else {

		  Game.scenes.animateRiver("ferry", true);
		  Game.gameCaravan.money -= 50;
		}
      }

	  //let a day pass and change the width/depth slightly
      else if(choice == 4) {

		// See if it gets deeper or shallower
		var deeper = randrange(1, 10);

		if (deeper > 5) {

		  // Round to 2 decimal places
		  var newDepth = depth - Math.round(Math.random()) / 100;
		}

		else {

		  var newDepth = depth + Math.round(Math.random()) / 100;
		}

		var wider = randrange(1, 10);

		if (wider > 5) {

		  var newWidth = width - Math.round(Math.random()) / 100;
		}

		else {

		  var newWidth = width + Math.round(Math.random()) / 100;
		}

		Game.passDays(1);
		Game.scenes.CrossRiver(newWidth, newDepth);
      }

	  // Show information
      else if(choice == 5) {

      }
    });
  },


    Journey:function(leavingLandmark){
      Game.gameDiv.innerHTML =

        `<div id="journey" class="centered_content white_black">\n
          <div id="animation">\n
            <img id="bg" src="./img/bg_grass.png">\n
            <img id="oxen" src="./img/oxen_standing.png">\n
          </div>\n
          <div id="ground"></div>\n
          <div id="status">\n
            <p>press ENTER to size up the situation</p>\n
            <ul class="plain_list">\n
            <li>Date: <span id="date"></span></li>\n
            <li>Weather: <span id="weather"></span></li>\n
            <li>Health: <span id="health"></span></li>\n
            <li>Food: <span id="food"></span></li>\n
            <li>Next Landmark: <span id="next_landmark"></span></li>\n
            <li>Miles Traveled: <span id="miles"></span></li>\n
          </ul>\n
        </div>`;

        var nextLandmark=landmarks.getNextLandMark(Game.miles,Game.branch[0],Game.branch[1]);
      
        document.getElementById("date").innerHTML=  MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() ;
        document.getElementById("weather").innerHTML = Game.weather = getWeather(Game.date.getMonth());
        document.getElementById("health").innerHTML=Game.gameCaravan.health.string;
        document.getElementById("food").innerHTML=Game.gameCaravan.food;
        document.getElementById("next_landmark").innerHTML=nextLandmark.milesToNext;
        document.getElementById("miles").innerHTML=Game.miles;
        var timeOfDay=0;
        var travelFunc=function(){//called once per game Hour
          timeOfDay++;

          if(timeOfDay==24){//once a day

            Game.date.setDate(Game.date.getDate()+1);
            timeOfDay=0;
            
            var deaths = Game.gameCaravan.updateHealth();

            /*update status and html*/
            document.getElementById("date").innerHTML=  MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() ;
            document.getElementById("weather").innerHTML= Game.weather = getWeather(Game.date.getMonth());
            document.getElementById("health").innerHTML=Game.gameCaravan.getHealth();
            document.getElementById("food").innerHTML=Game.gameCaravan.updateFood();
            document.getElementById("next_landmark").innerHTML='000';
            document.getElementById("miles").innerHTML =  Game.miles += Math.floor(Game.gameCaravan.getMph() * Game.gameCaravan.pace.rate);

            // see if random event happened (50% chance)
            var eventChance = (Math.random() * 10);
            if (eventChance < 5) {
              var eventResult = randomEvent(Game.gameCaravan);

              // Random event will return null if event was inapplicable
              if (eventResult != null) {
                clearInterval(travelLoop);
                Game.alertBox(eventResult, function() {
                  if (eventResult == "Took the wrong trail, lose 3 days") {
                    var losedays = setInterval(function(){
                      Game.date.setDate(Game.date.getDate()+1);
                      document.getElementById("date").innerHTML=  MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() ;
                      document.getElementById("weather").innerHTML= Game.weather = getWeather(Game.date.getMonth());
                      document.getElementById("food").innerHTML = Game.gameCaravan.updateFood();
                    }, 800);
                    setTimeout(function() {
                      clearInterval(losedays);
                      Game.scenes.Journey();
                    }, 2400);
                  } else {
                    Game.scenes.Journey();
                  }
                });
              }
			      }//eventChance

            // see if anyone died
            for (var i in deaths) {

              clearInterval(travelLoop);
              Game.alertBox(deaths[i] + " has died.", Game.scenes.Journey);
            }
            // see if everyone's dead
            if (Game.gameCaravan.family.length == 0) {
              Game.alertBox("Everyone is dead.", Game.scenes.startScreen);
            }
          }//timeofday24
          else if(timeOfDay==5){//start traveling at 5am
            /*set oxen animation to running*/
            document.getElementById("oxen").src="./img/oxen_walking.gif";
          }
          else if(timeOfDay== 5+Game.gameCaravan.pace.rate){
            var nextLandmark=landmarks.getNextLandMark(Game.miles,Game.branch[0],Game.branch[1],leavingLandmark);

            Game.miles+= Math.min(Game.gameCaravan.getMph()*Game.gameCaravan.pace.rate,nextLandmark.milesToNext);
            document.getElementById("miles").innerHTML=Game.miles;
            var nextLandmark=landmarks.getNextLandMark(Game.miles,Game.branch[0],Game.branch[1]);

            document.getElementById("next_landmark").innerHTML=nextLandmark.milesToNext;
            if(nextLandmark.milesToNext==0){
              Game.alertBox("You are now at "+landmarks[nextLandmark.nextLandmark].name+". Would you like to look around?");
              clearInterval(travelLoop);
              Game.waitForInput(null,null,function(){Game.scenes.Landmark(landmarks[nextLandmark.nextLandmark])});
              return;
            }
            /*set oxen animation to stopped*/
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
        <div id="trail_menu" class="centered_content white_black">\n
          <div id="date" >`+ MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() +`</div>\n
          <div id="conditions" class="white_black centered_content">\n
            Weather: `+ Game.weather +`<br>\n
            Health: `+ Game.gameCaravan.health.string +`<br>\n
            Pace: `+ Game.gameCaravan.pace.string +`<br>\n
            Rations: `+ Game.gameCaravan.rations.string +`<br>\n
          </div>\n
          <div id="options">\n
            You May:
            <ol>\n
              <li>Continue on trail</li>\n
              <li>Check supplies</li>\n
              <li>Look at map</li>\n
              <li>Change Pace</li>\n
              <li>Change Food Rations</li>\n
              <li>Stop to Rest</li>\n
              <li>Attempt to Trade</li>\n
              <li></li>\n
            </ol>\n
          </div>\n
          What is your choice?<span id="input"></span>\n
        </div>\n`;
      var validationFunc=function(input){
        return  +input>0 && +input<9;
      }
      Game.waitForInput(null,validationFunc,function(input){
        if(input==1)
          Game.scenes.Journey();
        else if (input==2)
          Game.scenes.CheckSupply();
        else if(input==3)
          Game.scenes.ShowMap(Game.scenes.TrailMenu);
        else if(input==4)
          Game.scenes.ChangePace();
		    else if(input == 5)
		      Game.scenes.ChangeRations();
	    	else if(input == 6)
	    	  Game.scenes.StopToRest();
	      else if(input == 7)
	    	  Game.trading();
        else
          Game.scenes.TrailMenu();
      });
    },
    CheckSupply: function(){
      Game.gameDiv.innerHTML =
      `<div id="check_supplies" class="centered_content white_black">\n
        <p>Your Supplies</p>\n
        <ul>\n
          <li>oxen<span>`+ Game.gameCaravan.oxen +`</span></li>\n
          <li>sets of clothing<span>`+ Game.gameCaravan.clothing +`</span></li>\n
          <li>bait<span>`+ Game.gameCaravan.bait +`</span></li>\n
          <li>wagon wheels<span>`+ Game.gameCaravan.wheels +`</span></li>\n
          <li>wagon axles<span>`+ Game.gameCaravan.axles +`</span></li>\n
          <li>wagon tongues<span>`+ Game.gameCaravan.tongues +`</span></li>\n
          <li>pounds of food<span`+ Game.gameCaravan.food +`></span></li>\n
          <li>money left<span>$`+ Game.gameCaravan.money.toFixed(2) +`</span></li>\n
        </ul>\n
        <p class="prompt">Press ENTER to continue</p>
      </div>`;
      Game.waitForInput(null, null, Game.scenes.TrailMenu);
    },
    ShowMap: function(returnScene){
      Map.display(Game.miles);
      Game.waitForInput(null,null,returnScene);
    },
	
	// Change the pace that the caravan is travelling at
	ChangePace: function() {
	  Game.gameDiv.innerHTML = 
	  `<div id="check_supplies" class="centered_content white_black">\n
	    <p>Change Pace\n
		(currently "` + Game.gameCaravan.pace + `")</p>
		<p>The pace at which you travel can change. Your choices are:</p>
		<ol>\n
		  <li>A steady pace</li>
		  <li>A strenuous pace</li>
		  <li>A grueling pace</li>
		  <li>Find out what these different paces mean</li>
		</ol>
		<p>What is your choice? <span id="input"></span></p>\n
      </div>`;
	  
	  var validationFunc=function(input){
        return Number.isInteger(+input) && +input>0 && +input<5;
      }
	
      Game.waitForInput(null,validationFunc,function(choice){
	
	    if (choice == 1) {
	  
	      Game.gameCaravan.pace = PACE.STEADY;
		  Game.scenes.TrailMenu();
	    }
	    else if (choice == 2) {
		
		  Game.gameCaravan.pace = PACE.STRENUOUS;
		  Game.scenes.TrailMenu();
	    }
	    else if (choice == 3) {
		
		  Game.gameCaravan.pace = PACE.GRUELING;
		  Game.scenes.TrailMenu();
	    }
		else if (choice == 4) {
		  Game.scenes.PaceInfo();
		}
	  });
	},
	
	// Display the information about caravan pace options
	PaceInfo: function() {
	  Game.gameDiv.innerHTML = 
	  `<div id="pace_info" class="centered_content white_black">\n
	    <p>Steady - You travel about 8 hours a day, taking frequent rests. You take care not to get too tired.</p>
		<br>
		<p>Strenuous - You travel about 12 hours a day, starting just after sunrise and stopping shortly before sunset.` +
		`You stop to rest only when necessary. You finish each day feeling very tired.</p>
		<br>
		<p>Grueling - You travel about 16 hours a day, starting before sunrise and continuing until dark.` + 
		`You almost never stop to rest. You do not get enough sleep at night. You finish each day feeling absolutely` + `
		exhausted, and your health suffers.
		<p class=\"prompt\">Press SPACE to continue</p>\n
      </div>`;	
	  
	  Game.waitForInput(null, null, Game.scenes.ChangePace);;
	  return;
	},

	// Change the amount of rations
	ChangeRations: function() {
		
	  Game.gameDiv.innerHTML = 
	  `<div id="check_supplies" class="centered_content white_black">\n
	    <p>Change Food Rations\n
		(currently "` + Game.gameCaravan.rations + `")</p>
		<p>The amount of food the people in your party eat each day can change. Your choices are:</p>
		<ol>\n
		  <li>Filling - meals are large and generous.</li>
		  <li>Meager - meals are small, but adwquate.</li>
		  <li>Bare bones - meals are very small; everyone stays hungry.</li>
		</ol>
		<p>What is your choice? <span id="input"></span></p>\n
      </div>`;
	  
	  var validationFunc=function(input){
        return Number.isInteger(+input) && +input>0 && +input<4;
      }
	  
	  Game.waitForInput(null,validationFunc,function(choice){
	
	    if (choice == 1) {
	  
	      Game.gameCaravan.rations = RATIONS.FILLING;
		  Game.scenes.TrailMenu();
	    }
	    else if (choice == 2) {
		
		  Game.gameCaravan.rations = RATIONS.MEAGER;
		  Game.scenes.TrailMenu();
	    }
	    else if (choice == 3) {
		
		  Game.gameCaravan.rations = RATIONS.BAREBONES;
		  Game.scenes.TrailMenu();
	    }
	  });
	},
	
	// Ask the player how many days to rest
	StopToRest: function() {
	
	  document.getElementById("input").remove();
	  Game.gameDiv.innerHTML += `<p id="AlertBox" class="white_black">How many days would you like to rest? <span id="input"></span></p>\n`;
	  
	  var validationFunc=function(input){
      return Number.isInteger(+input) && +input>0 && +input<20;
    }
	  
	  Game.waitForInput(null,validationFunc,function(choice){
      var i = 1;
      function restADay () {
        setTimeout(function () {
          Game.date.setDate(Game.date.getDate()+1);
          document.getElementById("date").innerHTML = MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear()
          document.getElementById("conditions_weather").innerHTML = Game.weather = getWeather(Game.date.getMonth());
          document.getElementById("conditions_health").innerHTML = Game.gameCaravan.health.string;
          Game.gameCaravan.updateFood();

          var family = Game.gameCaravan.family;

          for (var j = 0; j < family.length; j++) {
            family[j].heal(10);
          }

          i++;
          if (i < choice) { restADay(); }
        }, 1000)
      }
      restADay();
      Game.scenes.TrailMenu();
    })
  },

  Landmark: function(landmark){
    Game.gameDiv.innerHTML=`
      <div id="landmark" class="centered_content white_black">
        You are now at `+landmark.name+`
      </div>`;
    Game.waitForInput(null,null,function(){Game.scenes.LandmarkMenu(landmark)});
   },

   LandmarkMenu: function(landmark){
     document.getElementById("game").innerHTML=`
       <div id="landmark_menu" class="centered_content white_black">\n
        <div>
          `+landmark.name+`
        </div>
         <div id="date" >`+ MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() +`</div>\n
         <div id="conditions" class="white_black centered_content">\n
           Weather: `+ Game.weather +`<br>\n
           Health: `+ Game.gameCaravan.health.string +`<br>\n
           Pace: `+ Game.gameCaravan.pace.string +`<br>\n
           Rations: `+ Game.gameCaravan.rations.string +`<br>\n
         </div>\n
         <div class="centered_content white_black">\n
           You May:
           <ol id="options">\n
             <li>Continue on trail</li>\n
             <li>Check supplies</li>\n
             <li>Look at map</li>\n
             <li>Change pace</li>\n
             <li>Change food rations</li>\n
             <li>Stop to rest</li>\n
             <li>Attempt to trade</li>\n
             <li>Talk to People</li>\n
             <li id="buy_supply">Buy Supplies</li>\n
           </ol>\n
         </div>\n
         <p class="centered_content white_black">What is your choice?<span id="input"></span></p>\n
       </div>\n`;
       if(!landmark.store){
         document.getElementById("buy_supply").style.display="none";
       }
       var validationFunc=function(input){
         if(!Number.isInteger(+input)||+input<0){console.log(input);
           return false;
         }
         if(landmark.store){
           return +input<=9 ;
         }else{
           return +input <9 ;
         }
       }
       Game.waitForInput(null,validationFunc,function(input){
         if(input==1)
           Game.scenes.Journey(true);
         else if (input==2)
           Game.scenes.CheckSupply();
         else if(input==3)
           Game.scenes.ShowMap(function(){Game.scenes.LandmarkMenu(landmark)});
         else if(input==8)
           Game.scenes.LandmarkTalk(landmark);
        else if(input==9)
          Game.scenes.BuySupply(landmark);
         else{
            Game.scenes.LandmarkMenu(landmark);
         }
       });//waitForInput
   },
     
    LandmarkTalk: function(landmark){
      var talk=landmark.talks[landmark.talkIndex];
      landmark.talkIndex=landmark.talkIndex==2?0:landmark.talkIndex+1;
      Game.gameDiv.innerHTML="";
      var message=talk.speaker+' tells you:</br></br>"'+talk.speech+'"';
      Game.dialogBox(message,function(){Game.scenes.LandmarkMenu(landmark)});
    },
      
    animateRiver: function(method, success) {
      // setup
      Game.gameDiv.innerHTML = `<div id="river_crossing" class="centered_content">\n<div class="ratio-wrapper ratio5-4">\n<canvas id="river_animation" class="ratio-content"></canvas>\n</div>\n</div>`;
      var canvas = document.getElementById("river_animation");
      var ctx = canvas.getContext("2d");
      canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight;

      var grd; var bank1 = -40; var bank2 = 75;
      var width = canvas.clientWidth; var height = canvas.clientHeight; var hypo = 0.866 * height + 0.5 * width;
      const BLUE = "#42B2FF"; const TAN = "#F6B68E";

      // drawing  the river at different stages in crossing
      var drawRiver = function(pct1, pct2) {
        grd = ctx.createLinearGradient(0,0, hypo / 2, hypo * 0.866);
        grd.addColorStop(0, TAN);
        grd.addColorStop(pct1 < 0? pct1 = 0 : pct1/=100, TAN); grd.addColorStop(pct1, BLUE);
        grd.addColorStop(pct2 > 100 ? pct2 = 1 : pct2/=100, BLUE); grd.addColorStop(pct2, TAN);
        grd.addColorStop(1, TAN);
        ctx.fillStyle = grd;
        ctx.fillRect(0,0,width, height);
      };

      // set and draw graphic for method of travel
      var imageObj = new Image();
      if (method == "ford") {
        imageObj.src = './img/wagon_ford.png';
      } else if (method == "caulk") {
        imageObj.src = './img/wagon_caulk.png';
      } else if (method == "ferry") {
        imageObj.src = './img/wagon_ferry.png';
      }

      //  draw the wagon going across the river
      imageObj.onload = function() {
        drawRiver(bank1, bank2);
        ctx.drawImage(imageObj, width / 4, canvas.clientHeight / 4, width * 0.5, width * 0.3377 );
        setTimeout(function() { // wait a second before moving
          var progress = setInterval(function() { // go across the river until mostly across
            if (bank1 == 25) {
                clearInterval(progress);
            } else {
                drawRiver(bank1, bank2);
                ctx.drawImage(imageObj, width / 4, canvas.clientHeight / 4, width * 0.5, width * 0.3377);
                bank1++, bank2++;
            }
          }, 60);
        }, 1000);
      }
    }
  },

  alertBox : function(message, returnScene) {

	if (message == null) {
		message = "Oh my god everybody is dead! Even the oxen and the children are dead! This was a terrible idea! "+
		"I think I just broke my leg and caught Ebola!";
	}

  var alert = document.createElement("p"); alert.appendChild(document.createTextNode(message));
  alert.setAttribute("id", "AlertBox"); alert.setAttribute("class", "white_black");
	Game.gameDiv.appendChild(alert);
    
	Game.waitForInput(null,null,function() {Game.removeAlertBox(); returnScene() || null;});
  },

  removeAlertBox : function() {

    document.getElementById("AlertBox").remove();
  },

  dialogBox : function(dialog, returnScene) {
    Game.gameDiv.innerHTML += `<p id="DialogBox" class="white_black">` + dialog + `</p>\n`;
	Game.waitForInput(null,null,function() {Game.removeDialogBox(); returnScene() || null;});
  },

  removeDialogBox : function() {
    document.getElementById("DialogBox").remove();
  },

  fishingGame:function(){
    if (Game.gameCaravan.bait == 0) {

	  Game.alertBox("You have no bait to fish with", Game.scenes.journey);
	  return;
	}

    var fish = ["sturgeon","salmon","steelhead","trout","catfish","bass","sunfish","barracuda","flounder"];
    var weights = [50,10,27,27,40,12,1,20,26];

    var chanceToCatch = Math.floor((Math.random()*10)+1);
	var fishNum = Math.floor((Math.random()*9));

	if (chanceToCatch < 6) {
	  Game.gameCaravan.bait--;
	  Game.gameCaravan.food += weights[fishNum];
	  Game.alertBox("You caught a " + fish[fishNum] + " weighing " + weights[fishNum] + " pounds", Game.scenes.Journey);
	  return;
	}

	else if (chanceToCatch < 8) {
	  Game.gameCaravan.bait--;
	  Game.alertBox("The fish took your bait and escaped", Game.scenes.Journey);
	  return;
	}

	else {
	  Game.alertBox("No luck, the fish aren't biting around here", Game.scenes.Journey);
	  return;
    }
  },
trading:function(){
    var itemNames=["tongues","wheels","axles","clothing","oxen","food","bait"];
    var items=[tongues,wheels,axles,clothing,oxen,food,bait];
    var upItems=[TONGUES,WHEELS,AXLES,CLOTHING,OXEN,FOOD,BAIT];
    var randomIndex1= Math.floor(Math.random() * items.length);
    var randomIndex2= Math.floor(Math.random() * items.length);
    while(randomIndex1==randomIndex2){
      randomIndex2=Math.floor(Math.random() * items.length);
    }
    var amtwanted=Math.floor(Math.random() * MAXIMUM.upitems[randomIndex1])+1;
    var amttrade=Math.floor(Math.random() * MAXIMUM.upitems[randomIndex2])+1;
    if(amtwanted>Game.gameCaravan.items[randomIndex1]){
      Game.gameDiv.innerHTML="You meet a trader who wants"+
      amtwanted+" "+itemNames[randomIndex1]+
      ". You don't have this.";
    }else{
      Game.gameDiv.innerHTML="You meet a trader who wants"+
      amtwanted+" "+Game.gameCaravan.items[randomIndex1]+
      ". He will trade you"+amttrade+" "+itemNames[randomIndex2]+".";
      var item1=items[randomIndex1];
      var item2=items[randomIndex2];
      Game.gameCaravan.trade(item1,amtwanted,item2,amttrade);
    }
  }
};

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
