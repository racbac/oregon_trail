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
			
function wagonFire(caravan) {
	
	// TODO - Destroy random supplies and make the message describe what was destroyed
	return "A fire has destroyed some of your supplies";
}

function randomName() {
	var names = ["Shawn","Grace","Alan","Ada","Mal","Wyatt","River","Chris","Richard","Zoe"];
	return names[randrange(0, names.length - 1)];
}

function randrange(min, max) {
    // add current time as fake random seed
    return Math.floor((Math.random() + new Date().getTime() % 1) * (max - min + 1) + min);
}