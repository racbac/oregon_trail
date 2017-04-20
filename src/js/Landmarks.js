function Landmarks(){
	this.name="Independence";
	this.distance=0;
	this.branch=0;
	this.image=0;
}
Landmarks.prototype.changeLandmark = function(new_landmark) {
	this.name=new_landmark;
}
Landmarks.prototype.changeDistance= function(){
	this.distance+=Caravan.pace;
}