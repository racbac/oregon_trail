/**Landmarks.js
* create a landmarks object that stores all the information of each landmark,
*some of the landmark informations are set in Map.js, LandmarkTalks.js, and LandmarkStores.js
*/
var landmarks=
{
Independence:{name:"Independence", river:false, img:"img/landmarks/independence.png"},
KansasRiverCrossing:{name:"Kansas River Crossing", river:true ,img:"img/landmarks/kansasriver.png", icon: "river.png"},
BigBlueRiverCrossing:{name:"Big Blue River Crossing", river:true ,img:"img/landmarks/bigblueriver.png", icon: "river.png"},
FortKearney:{name:"Fort Kearney", river:false ,img:"img/landmarks/fortkearney.png", icon: "fort.png"},
ChimneyRock:{name:"Chimney Rock", river:false ,img:"img/landmarks/chimneyrock.png"},
FortLaramie:{name:"Fort Laramie", river:false ,img:"img/landmarks/fortlaramie.png", icon: "fort.png"},
IndependenceRock:{name:"Independence Rock", river:false ,img:"img/landmarks/independencerock.png"},
SouthPass:{name:"South Pass", river:false ,img:"img/landmarks/southpass.png"},
FortBridger:{name: "Fort Bridger", river:false ,img:"img/landmarks/fortbridger.png", icon: "fort.png"},
GreenRiverCrossing:{name: "Green River Crossing", river:true ,img:"img/landmarks/greenriver.png", icon: "river.png"},
SodaSprings:{name: "Soda Springs", river:false ,img:"img/landmarks/sodasprings.png"},
FortHall:{name: "Fort Hall", river:false ,img:"img/landmarks/forthall.png", icon: "fort.png"},
SnakeRiverCrossing:{name: "Snake River Crossing", river:true ,img:"img/landmarks/snakeriver.png", icon: "river.png"},
FortBoise:{name:"Fort Boise", river:false ,img:"img/landmarks/fortboise.png", icon: "fort.png"},
//GrandeRonde in the Blue Mountains:{},
BlueMountains:{name: "Blue Mountains", river:false ,img:"img/landmarks/bluemountains.png"},
FortWallaWalla:{name: "Fort Walla Walla", river:false ,img:"img/landmarks/fortwallawalla.png", icon: "fort.png"},
TheDalles:{name:"The Dalles", river:false ,img:"img/landmarks/thedalles.png"},
WillametteValley:{name: "Willamette Valley", river:false ,img:"img/landmarks/willamettevalley.png"}
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
