var landmarks=
{
Independence:{name:"Independence", river:false},
KansasRiverCrossing:{name:"Kansas River Crossing", river:true},
BigBlueRiverCrossing:{name:"Big Blue River Crossing", river:true},
FortKearney:{name:"Fort Kearney", river:false},
ChimneyRock:{name:"Chimney Rock", river:false},
FortLaramie:{name:"Fort Laramie", river:false},
IndependenceRock:{name:"Independence Rock", river:false},
SouthPass:{name:"South Pass", river:false},
FortBridger:{name: "Fort Bridger", river:false},
GreenRiverCrossing:{name: "Green River Crossing", river:true},
SodaSprings:{name: "Soda Springs", river:false},
FortHall:{name: "Fort Hall", river:false},
SnakeRiverCrossing:{name: "Snake River Crossing", river:true},
FortBoise:{name:"Fort Boise", river:false},
//GrandeRonde in the Blue Mountains:{},
BlueMountains:{name: "Blue Mountains", river:false},
FortWallaWalla:{name: "Fort Walla Walla", river:false},
TheDalles:{name:"The Dalles", river:false},
WillametteValley:{name: "Willamette Valley", river:false}
//Oregon City:{}
};
function Landmark(name,image,river){
	this.name=Independence;
	this.image=0;
	this.river = river;
}
Landmark.prototype.changeLandmark = function(new_landmark) {
	this.name=new_landmark;
}
Landmark.prototype.changeDistance= function(){
	this.distance+=Caravan.pace;
}
