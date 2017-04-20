var Map={
  display: function(miles){

    var svgContent="";
    /*for(var landmark in Map.landmarks){
      var x=Map.landmarks[landmark].coordinate.x;
      var y=Map.landmarks[landmark].coordinate.y;
      svgContent+='<circle cx="'+x+'" cy="'+y+'" r="5" fill="red" />';
    }*/

    var landmarktraveled=Map.landmarks["Independence"];
    while(miles>landmarktraveled.miles){
      var nextlandmark=Map.landmarks[landmarktraveled.next];
      var x1=landmarktraveled.coordinate.x;
      var y1=landmarktraveled.coordinate.y;
      var x2;
      var y2;
      if(miles>nextlandmark.miles){
        x2=nextlandmark.coordinate.x;
        y2=nextlandmark.coordinate.y;
      }
      else{
        var percentage=(miles-landmarktraveled.miles)/(nextlandmark.miles-landmarktraveled.miles);

        var x2=landmarktraveled.coordinate.x+(nextlandmark.coordinate.x-landmarktraveled.coordinate.x)*percentage;
        var y2=landmarktraveled.coordinate.y+(nextlandmark.coordinate.y-landmarktraveled.coordinate.y)*percentage;
      }
      svgContent+='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" style="stroke:rgb(255,0,0);stroke-width:2" />';
      landmarktraveled=nextlandmark;
    }

    document.getElementById("game").innerHTML=
      '<svg id="map" width="643" height="402">'+svgContent+'</svg>';
  },
  landmarks:{
  	"Independence":{miles: 0, coordinate:{x:580, y:295}, next:"Kansas River Crossing", routes:{{"Kansas River Crossing":102}}},
  	"Kansas River Crossing":{miles: 102, coordinate:{x:553, y:288}, next:"Big Blue River Crossing"},
  	"Big Blue River Crossing":{miles: 185, coordinate:{x:535, y:275}, next:"Fort Kearney"},
  	"Fort Kearney": {miles:304,coordinate:{x:503, y:266},next:"Chimney Rock"},
  	"Chimney Rock": {miles:554,coordinate:{x:460, y:260},next:"Fort Laramie"},
  	"Fort Laramie": {miles:640,coordinate:{x:415, y:245},next:"Independence Rock"},
  	"Independence Rock": {miles:830,coordinate:{x:373, y:223},next:"South Pass/Trail Splits"},
  	"South Pass/Trail Splits": {miles: 932,coordinate:{x:339, y:234},next:"Green River Crossing"},
  	"Fort Bridger": {miles: 989,coordinate:{x:306, y:272}},
  	"Green River Crossing": {miles: 989, coordinate:{x:310, y:244},next:"Soda Springs"},
  		//Green River Shortcut: 1,057??
  		//Trail to Bridger: 1,151??
  	"Soda Springs": {miles: 1133, coordinate:{x:293, y:232},next:"Fort Hall"},
  			//Green River Shortcut: 1,133
  			//Trail to Bridger: 1,295??
  	"Fort Hall": {miles: 1190, coordinate:{x:257, y:215},next:"Snake River Crossing"},
  		//Green River Shortcut: 1,190
  		//Trail to Bridger: 1,395??
  	"Snake River Crossing": {miles: 1372, coordinate:{x:213, y:200},next:"Fort Boise"},
  		//Green River Shortcut: 1,372
  		//Trail to Bridger: 1,534??
  	"Fort Boise": {miles: 1486, coordinate:{x:197, y:171},next:"Blue Mountains/trail splits"},
   			//Green River Shortcut: 1,486 Miles Traveled
   			//Trail to Bridger: 1,648??
  	"Blue Mountains/trail splits": {miles: 1646, coordinate:{x:169, y:145},next:"The Dalles/trail splits"},
  		//Green River Shortcut: 1,646 Miles Traveled.
  		//Trail to Bridger: 1,808??
  	"The Dalles/trail splits": {miles: 1771, coordinate:{x:141, y:127}},
  			//Green River Shortcut/Shortcut to the Dalles: 1,771 Miles Traveled
  			//Green River Shortcut/Trail to Walla Walla: 1,889 Miles Traveled??
  			//Trail to Bridger/Shortcut to the Dalles: 1,808 Miles Traveled?
  			//Trail to Bridger/Trail to Walla Walla: 1,983 Miles Traveled??
  	"Fort Walla Walla": {coordinate:{x:162, y:115}},
  		//Green River Shortcut: 1,769 Miles Traveled.??
  		//Trail to Bridger: 1,863 Miles Traveled.??
    "Oregon City": {coordinate:{x:110, y:115}}


  }

};
