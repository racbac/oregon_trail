var supplyList = ["Wheel", "Tongue", "Axle", "Bait", "Clothing"];

function randomEvent(caravan) {
	
	// There are 12 events, so generate a random number between 1 and 12
	var eventNum = Math.floor((Math.random() * 18) + 1);
	
	switch(eventNum) {
		case 1:
			return wrongTrail();
		case 2:
			return wagonWheelBreak(caravan);
		case 3:
			return wagonTongueBreak(caravan);
		case 4:
			return wagonAxleBreak(caravan);
		case 5:
			return foundSupplies(caravan);
		case 6:
			return foundWildBerries(caravan);
		case 7:
			return badWater(caravan);
		case 8:
			return foodSpoiled(caravan);
		case 9:
			return oxenWanderedOff(caravan);
		case 10:
			return oxenSick(caravan);
		case 11:
			return suppliesStolen(caravan);
		case 12:
			return wagonFire(caravan);
		case 13:
			return snakeBite(caravan);
		case 14:
			return caughtDisease(caravan);
	}
}

function wrongTrail() {
	
	//Delay the caravan for 3 days
	return "Took the wrong trail, lose 3 days";
}

function wagonWheelBreak(caravan) {
	
	caravan.wheels -= 1;
	return "A wagon wheel broke";
}

function wagonTongueBreak(caravan) {
	
	caravan.tongues -= 1;
	return "Your wagon tongue broke";
}

function wagonAxleBreak(caravan) {
	
	  caravan.axles -= 1;
	  return "Your wagon axle broke";
}

function foundSupplies(caravan) {
	
	// Randomly determine which kind of supplies were found
	var supplyFound = Math.floor((Math.random() * 5) + 1);
	
	switch(supplyFound) {
		
		case 1:
			caravan.wheels += 1;
			return "Found a wagon wheel";
		
		case 2:
			caravan.tongues += 1;
			return "Found a wagon tongue";
			
		case 3:
			caravan.axles += 1;
			return "Found a wagon axle";
			
		case 4:
			caravan.bait += 5;
			return "Found 5 pieces of fishing bait";
			
		case 5:
			caravan.clothes += 3;
			return "Found 3 sets of clothing";
			
	}
}

function foundWildBerries(caravan) {
	
	caravan.food += 20;
	return "Found wild berries";
}

function badWater(caravan) {
	
	var family = caravan.family;
	var familySize = caravan.family.length;
	
	for (var i = 0; i < familySize; i++) {
		
		family[i].health -= 5;
	}
	
	return "Drank bad water";
}
			
function foodSpoiled(caravan) {
	
	caravan.food -= 20;
	return "Lost 20 pounds of food due to spoilage";
}	

function oxenWanderedOff(caravan) {
	
	caravan.oxen -= 1;
	return "One of your oxen wandered off and was lost";
}

function oxenSick(caravan) {
	
	//TODO - Make an oxen get sick
	return "One of your oxen has gotten sick";
}

function suppliesStolen(caravan) {
	
	// Randomly determine which kind of supplies were stolen
	var supplyStolen = Math.floor((Math.random() * 5) + 1);
	
	switch(supplyStolen) {
		
		case 1:
			caravan.wheels -= 1;
			return "A thief has stolen a wagon wheel";
		
		case 2:
			caravan.tongues -= 1;
			return "A thief has stolen a wagon tongue";
			
		case 3:
			caravan.axles -= 1;
			return "A thief has stolen a wagon axle";
			
		case 4:
			caravan.bait -= 5;
			return "A thief has stolen 5 pieces of fishing bait";
			
		case 5:
			caravan.clothes -= 3;
			return "A thief has stolen 3 sets of clothing";
	}
}

// Randomly destroys a portion of up to 3 supply types		
function wagonFire(caravan) {
	
	var messageString = "A fire has destroyed";

	var supplyArray = [];
	
	for (var i = 0; i < 3; i++) {
		supplyArray.push(Math.floor((Math.random() * 5) + 1));
	}
	
	// Use a set to eliminate duplicates
	var supplySet = new Set(supplyArray);
	
	for (var j = 0; l < supplySet.length; j++) {
		
		switch(supplySet[j]) {
		
		case 1:
			caravan.wheels -= 1;
			messageString += " 1 wagon wheel";
			break;
		
		case 2:
			caravan.tongues -= 1;
			messageString += " 1 wagon tongue";
			break;
			
		case 3:
			caravan.axles -= 1;
			messageString += " 1 wagon axle";
			break;
			
		case 4:
			caravan.bait -= 5;
			messageString +=  " 5 pieces of fishing bait";
			break;
			
		case 5:
			caravan.clothes -= 3;
			messageString += " 3 sets of clothing";
			break;
		}
		
		// Add commas / "and" to the message depending on remaining length
		if (j != supplySet.length - 1) {
			messageString += ",";
		}
		
		if (j == supplySet.length - 2) {
			messageString += "and";
		}
	
	return messageString;
	}
}

function snakeBite(caravan) {
	
	var family = caravan.family;
	var familySize = caravan.family.length;
	
	// Pick a random bite victim
	var victimIndex = Math.floor(Math.random() * familySize);	
	var victim = family[victimIndex];
	
	// Reduce their health by 10
	victim.sicken(10);
	
	return victim.name + " has been bitten by a snake";
}

function getDisease(caravan) {
	
	// Chance of a disease occuring depends on pace and rations of the caravan
	var diseaseChance = 0;
	
	switch (caravan.pace) {
		case "PACE.STEADY":
			diseaseChance += 10;
			break;
			
		case "PACE.STRENUOUS":
			diseaseChance += 25;
			break;
			
		case "PACE.GRUELING":
			diseaseChance += 45;
			break;
	}
	
	switch (caravan.rations) {
		case "RATIONS.FILLING":
			diseaseChance += 10;
			break;
			
		case "RATIONS.MEAGER":
			diseaseChance += 25;
			break;
			
		case "RATIONS.BAREBONES":
			diseaseChance += 45;
			break;
	}
		
	// Randomly generate a number between 1 and 100
	var caughtDisease = Math.floor((Math.random() * 100) + 1);
	
	// If the random number is less than or equal to the disease chance, someone just got sick
	if (caughtDisease <= diseaseChance) {
		
		var family = caravan.family;
		var familySize = caravan.family.length;
	
		// Pick a random bite victim
		var victimIndex = Math.floor(Math.random() * familySize);	
		var victim = family[victimIndex];

		// Reduce their health by 40
		victim.sicken(40);
		
		var diseaseNames = ["cholera", "dysentary", "typhoid fever"];
		var chosenDisease = diseaseNames[Math.floor(Math.random() * 3)];
		
		return victim.name + " is sick with " + chosenDisease;
	}
}

function randomName() {
	var names = ["Shawn","Grace","Alan","Ada","River","Zoe","Kaylee","Jayne","Simon"];
	return names[randrange(0, names.length - 1)];
}

function randrange(min, max) {
    // add current time as fake random seed
    return Math.floor((Math.random() + new Date().getTime() % 1) * (max - min + 1) + min);
}