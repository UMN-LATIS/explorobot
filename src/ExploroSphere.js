
var ExploroScene = require('./ExploroScene.js');


export default class ExploroSphere extends ExploroScene {
	constructor(config) {
		var sphere = new THREE.Mesh(
  			new THREE.SphereGeometry(100, 20, 20),
  			new THREE.MeshBasicMaterial({
    			map: THREE.ImageUtils.loadTexture('images/' + config)
  			})
  		);
  		sphere.scale.x = -1;
  		sphere.material.opacity = 1;
  		sphere.material.transparent = true;
  		super(config);
  		super.addObject(sphere);
		return this;
	}

}
