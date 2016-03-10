
var ExploroScene = require('./ExploroScene.js');


export default class ExploroSphere extends ExploroScene {
	constructor(config) {
		super(config);
		var sphere = new THREE.Mesh(
			new THREE.SphereGeometry(100, 20, 20),
			new THREE.MeshBasicMaterial({
				map: THREE.ImageUtils.loadTexture('images/' + config)
			})
		);
		sphere.scale.x = -1;
		sphere.material.opacity = 1;
		sphere.material.transparent = true;
		sphere.rotateY(window.degree2radian(10));
		var geometry = new THREE.PlaneGeometry(0.8, 0.8, 0.8);
		var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
		var cube = new THREE.Mesh(geometry, material);

		cube.position.set(0,-0.8,-3)
		// cube.position.x = 0;
		// cube.position.y = 0;
		cube.rotateX(window.degree2radian(100));
		cube.rotateY(window.degree2radian(0));
		cube.rotateZ(window.degree2radian(0));

		super.addObject(cube);
		super.addObject(sphere);
		return this;
	}

}
