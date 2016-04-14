
var ExploroScene = require('./ExploroScene.js');


export default class ExploroObject extends ExploroScene {
	constructor(config) {
		super(config);
		this.loading = true;
		var loader = new THREE.OBJMTLLoader();

	// load an obj / mtl resource pair
	loader.load(
		'images/' + config.image + '.obj',
		'images/' + config.image + '.mtl',
		function ( object ) {
			object.position.z = -1;
	  		// center rotation point? Magic numbers..
	  		for(var i=0; i<object.children.length; i++) {
	  			var mesh = object.children[i];
	  			mesh.geometry.translate(0,0,-3.5);
	  		}

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

	if(config.hasOwnProperty('exits')) {
		config.exits.forEach(function(value) {
			this.addObject(this.buildExit(value, 'magnify.png', 0));
		}, this);

	}


	return this;
}

animate() {
	if(this.objectForAnimation) {
		this.objectForAnimation.rotation.y += 0.01;
	}

}

}
