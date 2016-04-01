
var ExploroScene = require('./ExploroScene.js');


export default class ExploroPlane extends ExploroScene {
	constructor(config) {
		super(config);

		var targetItem = config.image;
		if(typeof window["texture"][targetItem] !== 'undefined') {
			texture = window["texture"][targetItem];
		}
		else {
			texture = new THREE.TextureLoader().load('images/' + targetItem);	
			
		}
		var geometry = new THREE.PlaneGeometry(config.width, config.height);
		var material = new THREE.MeshBasicMaterial({map: texture});
		material.transparent = true;
		material.opacity = 1;
		material.side = THREE.DoubleSide;

		var cube = new THREE.Mesh(geometry, material);
		cube.receiveShadow = false;
		cube.name="plane";

		cube.rotateY(window.degree2radian(0));
		cube.position.x = Math.sin(window.degree2radian(0)) * -3;
		cube.position.z = Math.cos(window.degree2radian(0)) * -3.03;

		if(config.hasOwnProperty('exits')) {
			config.exits.forEach(function(value) {
				this.addObject(this.buildExit(value, 'magnify.png', 0));
			}, this);

		}

		this.addObject(cube);
		return this;
	}

}
