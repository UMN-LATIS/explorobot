var TWEEN = require('tween.js');

export default class ExploroScene {
	constructor(config) {
		this.objectArray = new Array();
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
				value.material.opacity = opacity;

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
 			value.material.map.dispose();
    		value.geometry.dispose();
    		value.material.dispose();
    		value=null;
		});
	}

	destroy() {
		this.objectArray = [];
	}

	animate() {

	}

	buildExit(exit, texture, rotation) {
		var texture = new THREE.TextureLoader().load(texture);
		var geometry = new THREE.PlaneGeometry(1.6, 1.6);
		var material = new THREE.MeshBasicMaterial({map: texture});
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


