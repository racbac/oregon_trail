function Caravan() {
	
	this.family = [];
	this.pace = 0;
	this.rations = 0;
	this.money = 0.00;
	this.boxes_ammo = 0;
	this.tongues = 1;
	this.wheels = 4;
	this.axles = 1;
	this.oxen = 0;
}

// Return the average health
Caravan.prototype.getHealth : function() {
	
	var familySize = this.family.length;
	var totalHealth = 0;
	
	for (var i = 0; i < familySize; i++) {
		totalHealth += this.family[i].health;
	}
	
	return totalHealth / familySize;
}

// Remove a person from the caravan (because they died)
Caravan.prototype.removePerson : function(person) {
	
	var familySize = this.family.length;
	
	for (var i = 0; i < familySize; i++) {
		if (this.family[i].name == person.name) {
			this.family.splice(i,1);
		}
	}
}
