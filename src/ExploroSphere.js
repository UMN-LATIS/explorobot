export default class ExploroSphere {
	constructor(config) {
		var sphere = new THREE.Mesh(
  			new THREE.SphereGeometry(100, 20, 20),
  			new THREE.MeshBasicMaterial({
    			map: THREE.ImageUtils.loadTexture('images/R0010148.JPG')
  			})
  		);
  		sphere.scale.x = -1;
  		sphere.material.opacity = 1;
  		sphere.material.transparent = true;
		return sphere;
	}

}
