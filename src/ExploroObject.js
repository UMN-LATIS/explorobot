
var ExploroScene = require('./ExploroScene.js');


export default class ExploroObject extends ExploroScene {
	constructor(config) {
		super(config);
	this.loading = true;
		var loader = new THREE.OBJMTLLoader();

	// load an obj / mtl resource pair
	loader.load(
		'images/' + config.image + '.obj',
	// MTL resource URL
	'images/' + config.image + '.mtl',
	// Function when both resources are loaded
	function ( object ) {
  		object.position.z = -5;
  		this.objectForAnimation = object; // TODO: memory mange this?
		this.addObject( object );
		this.loading = false;
	}.bind(this),
	// Function called when downloads progress
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},
	// Function called when downloads error
	function ( xhr ) {
		console.log( 'An error happened' );
	}
	);
	var light = new THREE.DirectionalLight(0x888888);
	light.position.set(40, -100, 0);
	this.addObject(light);
		// var targetItem = config.image;
		// var texture = new THREE.TextureLoader().load('images/' + targetItem);
		// var geometry = new THREE.PlaneGeometry(config.width, config.height);
		// var material = new THREE.MeshBasicMaterial({map: texture});
		// material.transparent = true;
		// material.opacity = 1;
		// // material.alphaTest = 0.8;
		// material.side = THREE.DoubleSide;

		// var cube = new THREE.Mesh(geometry, material);
		// cube.receiveShadow = false;
		// cube.name="plane";

		// cube.rotateY(window.degree2radian(0));
		// // cube.rotateX(window.degree2radian(-100));
		// cube.position.x = Math.sin(window.degree2radian(0)) * -3;
		// cube.position.z = Math.cos(window.degree2radian(0)) * -3;

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

		// if(config.hasOwnProperty('exits')) {
		// 	config.exits.forEach(function(value) {
		// 		this.addObject(this.buildExit(value, 'magnify.png', 0));
		// 	}, this);

		// }

		// this.addObject(cube);
		return this;
	}

	animate() {
		if(this.objectForAnimation) {
			this.objectForAnimation.rotation.z += 0.01;
		}

	}

}
