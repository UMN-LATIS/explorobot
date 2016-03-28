
var ExploroScene = require('./ExploroScene.js');


export default class ExploroPlane extends ExploroScene {
	constructor(config) {
		super(config);

		var targetItem = config.image;
		var texture = new THREE.TextureLoader().load('images/' + targetItem);
		var geometry = new THREE.PlaneGeometry(config.width, config.height);
		var material = new THREE.MeshBasicMaterial({map: texture});
		material.transparent = true;
		material.opacity = 1;
		// material.alphaTest = 0.8;
		material.side = THREE.DoubleSide;

		var cube = new THREE.Mesh(geometry, material);
		cube.receiveShadow = false;
		cube.name="plane";

		cube.rotateY(window.degree2radian(0));
		// cube.rotateX(window.degree2radian(-100));
		cube.position.x = Math.sin(window.degree2radian(0)) * -3;
		cube.position.z = Math.cos(window.degree2radian(0)) * -3;

		// cube.position.y = exit.position.height;

		// var sphere = new THREE.Mesh(
		// 	new THREE.SphereGeometry(100, 100, 20),
		// 	new THREE.MeshBasicMaterial({
		// 		map: new THREE.TextureLoader().load('images/' + targetItem)
		// 	})
		// );
		// sphere.scale.x = -1;
		// sphere.material.opacity = 1;
		// sphere.material.transparent = true;

		// if(config.hasOwnProperty('initialRotation')) {
		// 	sphere.rotateX(window.degree2radian(config.initialRotation.x));
		// 	sphere.rotateY(window.degree2radian(config.initialRotation.y));
		// 	sphere.rotateZ(window.degree2radian(config.initialRotation.z));
		// }

		if(config.hasOwnProperty('exits')) {
			config.exits.forEach(function(value) {
				this.addObject(this.buildExit(value, 'magnify.png', 0));
			}, this);

		}

		this.addObject(cube);
		return this;
	}

}
