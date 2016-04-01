var TWEEN = require('tween.js');

export default class ExploroScene {
	constructor(config) {
		this.objectArray = [];
		createjs.Sound.stop("sound");
		if(config.hasOwnProperty("audio")) {
			var audio = config.audio;
 			createjs.Sound.on("fileload", function(event) {
 				var instance = createjs.Sound.play("sound");  // play using id.  Could also use full sourcepath or event.src.
     			// instance.volume = 0.5;
     		}, this);
 			createjs.Sound.registerSound("audio/" + audio, "sound");
 		}

	}

	addObject(object) {
		this.objectArray.push(object);
	}

	get objects() {
		return this.objectArray;
	}

	setOpacity(opacity=1, tween=true, completionCallback=function() {}) {
		this.objectArray.forEach(function(value) {
			// if(tween) {
			// 	new TWEEN.Tween( value.material ).to( { opacity: opacity }, 1000 ).onComplete(completionCallback).start();
			// }
			// else {
				if(typeof value.material !== 'undefined' && typeof value.material.opacity !== 'undefined') {
					value.material.opacity = opacity;	
				}
				

			// }

		});
		completionCallback();
	}

	addToScene(scene) {
		this.objects.forEach(function(value) {
			console.log(value);
			scene.add(value);
		});
	}

	removeFromScene(scene) {
		this.objects.forEach(function(value) {
			scene.remove(value);
			if(typeof value.material !== 'undefined') {
				value.material.map.dispose();	
				value.material.dispose();
			}
 			
 			if(typeof value.geometry !== 'undefined') {
 				value.geometry.dispose();	
 			}
    		
    		
    		value=null;
		});
	}

	destroy() {
		this.objectArray = [];
	}

	animate() {

	}

	buildExit(exit, texture, rotation) {
		var loadedTexture = new THREE.TextureLoader().load(texture);
		var geometry = new THREE.PlaneGeometry(1.6, 1.6);
		var material = new THREE.MeshBasicMaterial({map: loadedTexture});
		material.transparent = true;
		material.opacity = 1;
		material.alphaTest = 0.8;
		material.side = THREE.DoubleSide;
		var cube = new THREE.Mesh(geometry, material);
		cube.receiveShadow = false;
		cube.name="exit";
		cube.targetScene = exit.target;
		cube.rotateY(window.degree2radian(exit.position.orbit));
		cube.rotateX(window.degree2radian(rotation));
		cube.position.x = Math.sin(window.degree2radian(exit.position.orbit)) * -3;
		cube.position.z = Math.cos(window.degree2radian(exit.position.orbit)) * -3;
		cube.position.y = exit.position.height;
		return cube;
	}

}


