var Game = {
    gameCaravan: new Caravan(),
    date: new Date(),
    scenes: {
        startScreen: function() {
            document.getElementById("game").innerHTML =
                '<div id="startscreen">' +
                '<h1>The Oregon Trail</h1>' +
                '<div>' +
                '<p>You may:</p>' +
                '<ol>' +
                '<li>Travel the trail</li>' +
                '<li>Learn about the trail</li>' +
                '<li>See the Oregon Top Ten</li>' +
                '</ol>' +
                '<p>What is your choice? <span id="input"></span></p>' +
                '</div>' +
                '</div>';
            var validationFunc = function(input) {
                return input.length < 2 && Number.isInteger(Number(input)) && Number(input) > 0 && Number(input) < 4;
            }
            Game.waitForInput(null, validationFunc, function(input) {
                if (input == 1) {
                    Game.scenes.chooseOccupation();
                } else if (input == 2) {
                    document.getElementById("game").innerHTML = "<div>I will do this later. Enter to continue.</div>"
                    Game.waitForInput(null, null, Game.scenes.startScreen);
                } else if (input == 3) {
                    document.getElementById("game").innerHTML = "<div> I will do this later. Enter to continue.</div>"
                    Game.waitForInput(null, null, Game.scenes.startScreen);
                } else if (input == 4) {
                    document.getElementById("game").innerHTML = "<div>I will do this later. Enter to continue.</div>"
                    Game.waitForInput(null, null, Game.scenes.startScreen);
                } else {
                    Game.scenes.startScreen();
                }
            });
        },
        chooseOccupation: function() {
            document.getElementById("game").innerHTML =
                `<div id="choose_occupation">
          <div>
          <p>Many kinds of people made the trip to Oregon.</p>
          <p>You may:</p>
          <ol>
            <li>Be a banker</li>
            <li>Be a carpenter</li>
            <li>Be a farmer</li>
            <li>Find out the difference between the choices</li>
          </ol>
          <p>What is your choice? <span id="input"></span></p>
          </div>
        </div>`;
            var validationFunc = function(input) {
                return Number.isInteger(+input) && +input > 0 && +input < 5;
            }
            Game.waitForInput(null, validationFunc, function(choice) {
                if (choice == 1) {
                    //Caravan.occupation="banker"; Game.gameCaravan.money = 1600
                    Game.gameCaravan.occupation = OCCUPATION.BANKER;
                } else if (choice == 2) {
                    //Caravan.occupation="carpenter"; Game.gameCaravan.money = 400;
                    Game.gameCaravan.occupation = OCCUPATION.CARPENTER;
                } else if (choice == 3) {
                    //Caravan.occupation="farmer"; Game.gameCaravan.money = 400;
                    Game.gameCaravan.occupation = OCCUPATION.FARMER;
                } else if (choice == 4) {
                    document.getElementById("game").innerHTML =
                        `<div id="choose_occupation">
              <p>insert helpful hint about choosing occupations here</p>
            </div>`;
                    Game.waitForInput(null, null, Game.scenes.chooseOccupation);
                    return;
                } else {
                    Game.scenes.chooseOccupation();
                    return;
                }
                Game.scenes.enterNames();
            });
        },
        enterNames: function() {

            document.getElementById("game").innerHTML =
                `<div id="enterNames">
          <p>
            What is the first name of the wagon leader?
            <span id="input"></span>
          </p>
        </div>`;

            Game.waitForInput(null, null, function(leadername) {

                // Add the leader to the caravan
                var leader = new Person(leadername);
                Game.gameCaravan.addPerson(leader);

                document.getElementById("enterNames").innerHTML =
                    ` <div>
              <p>What are the first names of the four other members in your party?</p>
              <ol>` +
                    '<li>' + leadername + '</li>' +
                    `<li id="mem1"><span id="input"></span></li>
                <li id="mem2"></li>
                <li id="mem3"></li>
                <li id="mem4"></li>
            </div>`;
                var nameFunc = function(name) {
                    var inputEle = document.getElementById("input");
                    var index = +inputEle.parentNode.id[3];

                    // Add a new peron to the caravan for each input name
                    var newPerson = new Person(name);
                    Game.gameCaravan.addPerson(newPerson);

                    if (index == 4) {
                        Game.scenes.chooseDepartureMonth();
                        return;
                    };
                    index++;
                    document.getElementById('mem' + index).appendChild(document.getElementById('input'));
                    document.getElementById('mem' + (index - 1)).innerHTML = inputEle.innerHTML;
                    inputEle.innerHTML = "_";

                    Game.waitForInput(null, null, nameFunc);
                }
                Game.waitForInput(null, null, nameFunc);
            });
        },
        chooseDepartureMonth: function() {
            document.getElementById("game").innerHTML =
                `<div id="chooseMonth"><div>
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
            var validationFunc = function(input) {
                return Number.isInteger(+input) && +input > 0 && +input < 7;
            }
            Game.waitForInput(null, validationFunc, function(choice) {
                if (choice == 1) {
                    //set departure month to March
                    Game.date = new Date("3-01-1848");
                } else if (choice == 2) {
                    //set departure month to April
                    Game.date = new Date("4-01-1848");
                } else if (choice == 3) {
                    //set departure moth to May
                    Game.date = new Date("5-01-1848");
                } else if (choice == 4) {
                    //set departure month to June
                    Game.date = new Date("6-01-1848");
                } else if (choice == 5) {
                    //set departure month to July
                    Game.date = new Date("7-01-1848");
                } else if (choice == 6) {
                    Game.scenes.adviceDepartureMonth();
                    return;
                } else {
                    Game.scenes.chooseDepartureMonth();
                }
                Game.scenes.MattStore();
            });
        },
        adviceDepartureMonth: function() {
            document.getElementById("game").innerHTML = "<div>advice for departure month will be placed here...later. Enter to continue.</div>";
            Game.waitForInput(null, null, Game.scenes.chooseDepartureMonth);
        },
        MattStore: function() {

            document.getElementById("game").innerHTML = "<p>Before leaving Independence you should buy equipment and supplies. You have $" + Game.gameCaravan.occupation.cash + " in cash, but you don't have to spend it all now.</p>\n";
            Game.waitForInput([13 /*enter*/ , 32 /*space*/ ], null, function() {
                document.getElementById("game").innerHTML = "<p>Hello, I'm Matt. So you're going to Oregon! I can fix you up with what you need:</p>\n<ul>\n<li>a team of oxen to pull your wagon</li>\n<li>clothing for both summer and winter</li>\n<li>plenty of food for the trip</li>\n<li>ammunition for your rifles</li>\n<li>spare parts for your wagon</li>\n</ul>\n";
                Game.waitForInput([13 /*enter*/ , 32 /*space*/ ], null, function() {
                    var price = {
                        oxen: 40 / 2, //yoke = 2oxen
                        food: 0.2,
                        clothing: 10,
                        baits: 2 / 20, //box = 20 baits
                        wheels: 10,
                        axles: 10,
                        tongues: 10
                    };
                    var cart = {
                        oxen: 0,
                        food: 0,
                        clothing: 0,
                        baits: 0,
                        wheels: 0,
                        axles: 0,
                        tongues: 0
                    };
                    var storeFront = function() {
                        document.getElementById("game").innerHTML =
                            `<div id="mattstore">
                              <div>
                                <p>Matt's General Store<br>
                                Independence, Missouri<br>` +
                                MONTH[Game.date.getMonth()] + " " + Game.date.getDate() + ", " + Game.date.getFullYear() + `</p>
                              </div>
                              <ol>
                                <li>Oxen<span id="oxen_bill" style="float: right">$0.00</span></li>
                                <li>Food<span id="food_bill" style="float: right">$0.00</span></li>
                                <li>Clothing<span id="clothing_bill" style="float: right">$0.00</span></li>
                                <li>Bait<span id="bait_bill" style="float: right">$0.00</span></li>
                                <li>Spare Parts<span id="spare_bill" style="float: right">$0.00</span></li>
                              </ol>
                              <p>Total Bill: <span id="total_bill" style="float: right">$0.00</span></p>
                              <p>Amount you have:<span id="money" style="float: right">$0.00</span></p>
                              <p>Which item would you like to buy?<span id="input"></span></p>
                              <p>Press SPACE to leave store</p>
                            </div>`;
                        var validationFunc = function(input) {
                            return +input && +input > 0 && +input < 6;
                        }
                        Game.waitForInput([13 /*enter*/ , 32 /*space*/ ], validationFunc, function(choice) {

                            document.getElementById("game").innerHTML =
                                `<div id="mattstore">
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
                            document.getElementById("bill").innerHTML = "0.00";
                            var mattAdvice = "";
                            var mattFunc = null;
                            var validationFunc = null;
                            if (choice == 1) {
                                mattAdvice =
                                    `There are 2 oxen in a yoke; I recommend at least 3 yokes. I charge $40 a yoke.
                                      How many yoke do you want?`;
                                validationFunc = function(input) {
                                    return input.length < 2 && Number.isInteger(+input);
                                }
                                mattFunc = function() {
                                    //add yokes to bill
                                    storeFront();
                                }
                            } else if (choice == 2) {
                                mattAdvice = "How many pounds of food do you want?";
                                validationFunc = function(input) {
                                    return input.length < 5 && Number.isInteger(+input);
                                }
                                mattFunc = function() {
                                    //add food to bill
                                    storeFront();
                                }
                            } else if (choice == 3) {
                                mattAdvice = "How many sets of clothes do you want?";
                                validationFunc = function(input) {
                                    return input.length < 3 && Number.isInteger(+input);
                                }
                                mattFunc = function() {
                                    //add clothes to bill
                                    storeFront();
                                }
                            } else if (choice == 4) {
                                mattAdvice = "How many boxes do you want?";
                                validationFunc = function(input) {
                                    return input.length < 3 && Number.isInteger(+input);
                                }
                                mattFunc = function() {
                                    //add boxes to bill
                                    storeFront();
                                }
                            } else if (choice == 5) {
                                mattAdvice = "How many wagon wheels?"
                                validationFunc = function(input) {
                                    return input.length < 2 && Number.isInteger(+input);
                                }
                                mattFunc = function() {
                                    //add wagon wheels to bill

                                    mattAdvice = "How many wagon axles?";
                                    document.getElementById("matt_advice").innerHTML = mattAdvice + '<span id="input"></span>';
                                    Game.waitForInput(null, validationFunc, function() {
                                        //add wagon axles to bill

                                        mattAdvice = "How many wagon tongues?";
                                        document.getElementById("matt_advice").innerHTML = mattAdvice + '<span id="input"></span>';
                                        Game.waitForInput(null, validationFunc, function() {
                                            //add wagon tongues to bill
                                            storeFront();
                                            return;
                                        });
                                    });
                                }
                            } else {
                                Game.scenes.Journey();
                                return;
                            }
                            document.getElementById("matt_advice").innerHTML = mattAdvice + '<span id="input"></span>';
                            Game.waitForInput(null, validationFunc, mattFunc);
                        });
                    };
                    Game.waitForInput([13 /*enter*/ , 32 /*space*/ ], null, storeFront);

                });
            });
        },
        BuySupply: function() {

        },
        Journey: function() {
            document.getElementById("game").innerHTML =
                `<div id="journey">
          <div>animation goes here</div>
          <p>press ENTER to size up the situation</p>
          <ul>
            <li>Date:</li>
            <li>Weather:</li>
            <li>Health:</li>
            <li>Food:</li>
            <li>Next Landmark:</li>
            <li>Miles Traveled:</li>
          </ul>
        </div>`;
        },
        Fishing: function() {

        },
        LandMark: function(landmarkname) {

        }
    },
    gameDiv: document.getElementById("game"),
    start: function() {
        Game.scenes.startScreen();
    },
    waitForInput: function(enterKeys, validationFunc, callback = function() {}) {
        enterKeys = enterKeys || [13];
        validationFunc = validationFunc || function() {
            return true
        };
        var input = "";

        element = document.getElementById("input") || {};
        element.innerHTML = "_";
        document.onkeypress = function(event) {
            var x = event.charCode || event.keyCode; // Get the Unicode value
            if (x == 13) { //ignore enter
                return;
            }
            var y = String.fromCharCode(x);

            if (validationFunc(input + y)) {
                input = input + y;
                element.innerHTML = input + "_";
            }
        }
        document.onkeydown = function(event) {
            var x = event.charCode || event.keyCode; // Get the Unicode value
            if (x == 8) //backspace pressed
            {
                input = input.slice(0, -1);
                element.innerHTML = input;
            } else if (x == 13 || enterKeys.includes(x)) //enter key pressed
            {
                document.onkeydown = null;
                document.onkeypress = null;
                element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length - 1);
                callback(input);
            } else if (x == 8) //backspace pressed
            {
                input = input.slice(0, -1);
                element.innerHTML = input + "_";

            }
        };
    }
};

const MONTH = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
