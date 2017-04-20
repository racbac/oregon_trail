var landmarkNames=["Independence",
"the Kansas River Crossing",
"the Big Blue River Crossing",
"Fort Kearney",
"Chimney Rock",
"Fort Laramie",
"Independence Rock",
"South Pass",
"Fort Bridger",
"the Green River Crossing",
"Soda Springs",
"Fort Hall",
"the Snake River Crossing",
"Fort Boise",
"Grande Ronde in the Blue Mountains",
"Blue Mountains",
"Fort Walla Walla",
"The Dalles",
"the Willamette Valley",
"Oregon City"]
function Landmark(){
	this.name="Independence";
	this.distance=0;
	this.branch=0;
	this.image=0;
}
Landmark.prototype.changeLandmark = function(new_landmark) {
	this.name=new_landmark;
}
Landmark.prototype.changeDistance= function(){
	this.distance+=Caravan.pace;
}