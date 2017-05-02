var landmarks=
{
Independence:{name:"Independence"},
KansasRiverCrossing:{name:"Kansas River Crossing"},
BigBlueRiverCrossing:{name:"Big Blue River Crossing"},
FortKearney:{name:"Fort Kearney"},
ChimneyRock:{name:"Chimney Rock"},
FortLaramie:{name:"Fort Laramie"},
IndependenceRock:{name:"Independence Rock"},
SouthPass:{name:"South Pass"},
FortBridger:{name: "Fort Bridger"},
GreenRiverCrossing:{name: "Green River Crossing"},
SodaSprings:{name: "Soda Springs"},
FortHall:{name: "Fort Hall"},
SnakeRiverCrossing:{name: "Snake River Crossing"},
FortBoise:{name:"Fort Boise"},
//GrandeRonde in the Blue Mountains:{},
BlueMountains:{name: "Blue Mountains"},
FortWallaWalla:{name: "Fort Walla Walla"},
TheDalles:{name:"The Dalles"},
WillametteValley:{name: "Willamette Valley"}
//Oregon City:{}
};
function Landmark(name,image){
	this.name=Independence;
	this.image=0;
}
Landmark.prototype.changeLandmark = function(new_landmark) {
	this.name=new_landmark;
}
Landmark.prototype.changeDistance= function(){
	this.distance+=Caravan.pace;
}
