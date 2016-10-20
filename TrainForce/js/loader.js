"use strict"

function loadImagesWithCallback(sources, callback) {
	var imageObjects = [];
	var numImages = sources.length;
	var numLoadedImages = 0;
	
	for (var i = 0; i < numImages; i++) {
	  imageObjects[i] = new Image();
	  imageObjects[i].onload = function() {
	  	numLoadedImages++;
	  	console.log("loaded image at '" + this.src + "'")
		if(numLoadedImages >= numImages) {
		  callback(imageObjects); // send the images back
		}
	  };
	  
	  imageObjects[i].src = sources[i];
	}
 }
  
 /* window.onload = function(){
	console.log("window.onload called");
	
	// Preload Images and Sound
	app.queue = new createjs.LoadQueue(false);
	app.queue.installPlugin(createjs.Sound);
	app.queue.on("complete", function(e){
		console.log("images loaded called");
		app.blastem.init(app.ship);
	});

	app.queue.loadManifest([
     {id: "shipImage", src:"images/Hunter1.png"},
     {id: "enemyImage", src:"images/Drone1.png"},
     {id: "explosionImage", src:"images/explosion.png"},
     {id: "explosionImage2", src:"images/explosion2.png"},
     {id: "explosionImage3", src:"images/explosion3.png"},
     {id:"bullet", src:"sounds/laser4.mp3"},
	 {id:"explosion", src:"sounds/fireball4.mp3"},
	 {id:"soundtrack", src:"sounds/soundtrack.mp3"}
	]);

	// event listeners
	window.addEventListener("keydown",function(e){
		//console.log("keydown=" + e.keyCode);
		app.keydown[e.keyCode] = true;		
	});
		
	window.addEventListener("keyup",function(e){
		//console.log("keyup=" + e.keyCode);
		app.keydown[e.keyCode] = false;
		if(e.keyCode == 83) app.blastem.toggleSoundtrack(); // s
	});
}*/