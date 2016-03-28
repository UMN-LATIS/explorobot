
var ExploroScene = require('./ExploroScene.js');


export default class ExploroSphere extends ExploroScene {
	constructor(config) {
		super(config);
		this.loading = false;
		var targetItem = config.image;
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(100, 100, 20),
			new THREE.MeshBasicMaterial({
				map: new THREE.TextureLoader().load('images/' + targetItem)
			})
		);
		sphere.scale.x = -1;
		sphere.material.opacity = 1;
		sphere.material.transparent = true;

		if(config.hasOwnProperty('initialRotation')) {
			sphere.rotateX(window.degree2radian(config.initialRotation.x));
			sphere.rotateY(window.degree2radian(config.initialRotation.y));
			sphere.rotateZ(window.degree2radian(config.initialRotation.z));
		}

		if(config.hasOwnProperty('exits')) {
			config.exits.forEach(function(value) {
				this.addObject(this.buildExit(value, 'arrow.png', -100));
			}, this);

		}

		this.addObject(sphere);
		return this;
	}

}
