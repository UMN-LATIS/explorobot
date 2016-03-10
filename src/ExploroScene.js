var TWEEN = require('TWEEN');

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
			if(tween) {
				new TWEEN.Tween( value.material ).to( { opacity: opacity }, 1000 ).onComplete(completionCallback).start();
			}
			else {
				value.material.opacity = opacity;
			}

		});

	}

	addToScene(scene) {
		this.objects.forEach(function(value) {
			scene.add(value);
		});
	}

	removeFromScene(scene) {
		this.objects.forEach(function(value) {
			scene.remove(value);
		});
	}
}


