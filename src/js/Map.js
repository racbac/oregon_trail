var Map={
  /*
  * branchOption1 0 = Green River Crossing, 1= Fort Bridger
  * branchOption2 0 = Fort Walla Walla, 1=The Dalles
  */
  display: function(miles,branchOption1,branchOption2){

    var svgContent="";
    /*for(var landmark in Map.landmarks){
      var x=Map.landmarks[landmark].coordinate.x;
      var y=Map.landmarks[landmark].coordinate.y;
      svgContent+='<circle cx="'+x+'" cy="'+y+'" r="5" fill="red" />';
    }*/
    var milesTraveled=0;
    var landmarktraveled="Independence";
    while(miles>milesTraveled){
      var routes=Map.landmarks[landmarktraveled].routes;
      if(!routes)
        break;
      var routeNames=Object.keys(routes);
      var nextlandmark;
      if(routeNames.length>1){
        if(landmarktraveled=="South Pass/Trail Splits")
          nextlandmark= branchOption1?"Fort Bridger":"Green River Crossing";
        else if(landmarktraveled=="Blue Mountains/trail splits")
          nextlandmark= branchOption2?"The Dalles/trail splits":"Fort Walla Walla";
      }
      else{
        nextlandmark=routeNames[0];
      }

      var x1=Map.landmarks[landmarktraveled].coordinate.x;
      var y1=Map.landmarks[landmarktraveled].coordinate.y;
      var x2;
      var y2;
      var milesToNext=routes[nextlandmark];
      if(miles>milesTraveled+milesToNext){
        x2=Map.landmarks[nextlandmark].coordinate.x;
        y2=Map.landmarks[nextlandmark].coordinate.y;
      }
      else{
        var percentage=(miles-milesTraveled)/milesToNext;
        var coordNextX = Map.landmarks[nextlandmark].coordinate.x;
        var coordNextY=Map.landmarks[nextlandmark].coordinate.y;
        var x2=x1+(coordNextX-x1)*percentage;
        var y2=y1+(coordNextY-y1)*percentage;
      }
      svgContent+='<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" style="stroke:rgb(255,0,0);stroke-width:2" />';
      landmarktraveled=nextlandmark;
      milesTraveled+=milesToNext;
    }

    document.getElementById("game").innerHTML=
      '<svg id="map" width="643" height="402">'+svgContent+'</svg>';
  },
  landmarks:{
  	"Independence":{coordinate:{x:580, y:295}, routes:{"Kansas River Crossing":102}},
  	"Kansas River Crossing":{coordinate:{x:553, y:288}, routes:{"Big Blue River Crossing":185-102}},
  	"Big Blue River Crossing":{coordinate:{x:535, y:275},routes:{"Fort Kearney": 304-185}},
  	"Fort Kearney": {coordinate:{x:503, y:266}, routes:{"Chimney Rock":554-304}},
  	"Chimney Rock": {coordinate:{x:460, y:260}, routes:{"Fort Laramie": 640-554}},
  	"Fort Laramie": {coordinate:{x:415, y:245}, routes:{"Independence Rock": 830-640}},
  	"Independence Rock": {coordinate:{x:373, y:223}, routes:{"South Pass/Trail Splits":932-830}},
  	"South Pass/Trail Splits": {coordinate:{x:339, y:234}, routes:{"Green River Crossing":989-932, "Fort Bridger":1057-932}},
  	"Fort Bridger": {coordinate:{x:306, y:272}, routes:{"Soda Springs":1219-1057}},
  	"Green River Crossing": {coordinate:{x:310, y:244},routes:{"Soda Springs":1133-989}},

  	"Soda Springs": {coordinate:{x:293, y:232},routes:{"Fort Hall":1190-1133}},

  	"Fort Hall": {coordinate:{x:257, y:215},routes:{"Snake River Crossing":1372-1190}},

  	"Snake River Crossing": {coordinate:{x:213, y:200},routes:{"Fort Boise":1486-1372}},

  	"Fort Boise": {coordinate:{x:197, y:171},routes:{"Blue Mountains/trail splits":1646-1486}},

  	"Blue Mountains/trail splits": {coordinate:{x:169, y:145}, routes:{"Fort Walla Walla": 55,"The Dalles/trail splits": 1771-1646}},

    "Fort Walla Walla": {coordinate:{x:162, y:115},routes:{"The Dalles/trail splits":120}},

  	"The Dalles/trail splits": {coordinate:{x:141, y:127}, routes:{"Willamette Valley":100}},

    "Willamette Valley": {coordinate:{x:110, y:115}}


  }

};
