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
  	"Independence":{miles: 0, coordinate:{x:580, y:295}, routes:{"Kansas River Crossing":102}},
  	"Kansas River Crossing":{miles: 102, coordinate:{x:553, y:288}, routes:{"Big Blue River Crossing":185-102}},
  	"Big Blue River Crossing":{miles: 185, coordinate:{x:535, y:275},routes:{"Fort Kearney": 304-185}},
  	"Fort Kearney": {miles:304,coordinate:{x:503, y:266}, routes:{"Chimney Rock":554-304}},
  	"Chimney Rock": {miles:554,coordinate:{x:460, y:260}, routes:{"Fort Laramie": 640-554}},
  	"Fort Laramie": {miles:640,coordinate:{x:415, y:245}, routes:{"Independence Rock": 830-640}},
  	"Independence Rock": {miles:830,coordinate:{x:373, y:223}, routes:{"South Pass/Trail Splits":932-830}},
  	"South Pass/Trail Splits": {miles: 932,coordinate:{x:339, y:234}, routes:{"Green River Crossing":989-932, "Fort Bridger":}},
  	"Fort Bridger": {miles: 989,coordinate:{x:306, y:272}},
  	"Green River Crossing": {miles: 989, coordinate:{x:310, y:244},routes:{"Soda Springs":1133-989}},
  		//Green River Shortcut: 1,057??
  		//Trail to Bridger: 1,151??
  	"Soda Springs": {miles: 1133, coordinate:{x:293, y:232},routes:{"Fort Hall":1190-1133}},
  			//Green River Shortcut: 1,133
  			//Trail to Bridger: 1,295??
  	"Fort Hall": {miles: 1190, coordinate:{x:257, y:215},routes:{"Snake River Crossing":1372-1190}},
  		//Green River Shortcut: 1,190
  		//Trail to Bridger: 1,395??
  	"Snake River Crossing": {miles: 1372, coordinate:{x:213, y:200},routes:{"Fort Boise":1486-1372}},
  		//Green River Shortcut: 1,372
  		//Trail to Bridger: 1,534??
  	"Fort Boise": {miles: 1486, coordinate:{x:197, y:171},routes:{"Blue Mountains/trail splits":1646-1486}),
   			//Green River Shortcut: 1,486 Miles Traveled
   			//Trail to Bridger: 1,648??
  	"Blue Mountains/trail splits": {miles: 1646, coordinate:{x:169, y:145}, routes:{"The Dalles/trail splits": 1771-1646}},
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
