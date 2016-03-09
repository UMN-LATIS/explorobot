var ExploroSphere = require("./ExploroSphere.js");



export default class Explorobot {
	constructor(config) {
		this._sceneDefinition = null;
		this._initialScene = null;
		var sphere = new ExploroSphere();

		this.setupVR($("body"));

		if(typeof config !== 'undefined') {
			if (config.source && typeof config.source === 'string') {
				$.getJSON(config.source, {}, function(json, textStatus) {
					this._sceneDefinition = json;
					this.startScene();
				});
			}
			else if (config.source && typeof config.source === 'object') {
				this.startScene();
			}

		}
	}

	startScene() {
		console.log('start');
		this.loadSphere(1);
	}

	loadSphere(sphereId) {
		var newSphere = new ExploroSphere({"config":"Details"});
		return newSphere;
	}

	setupVR(targetElement) {

		var width  = targetElement.width,
		height = targetElement.height;
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera(75, width / height, 0.3, 1000);
		var reticle = vreticle.Reticle(camera);

		camera.position.x = 0.1;

		var renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setPixelRatio(window.devicePixelRatio);


		// Apply VR stereo rendering to renderer.
		var effect = new THREE.VREffect(renderer);
		effect.setSize(width, height);

		// Create a VR manager helper to enter and exit VR mode.
		var params = {
			hideButton: false, // Default: false.
			isUndistorted: false // Default: false.
		};
		var manager = new WebVRManager(renderer, effect, params);

		var controls = new THREE.VRControls(camera);
		targetElement.appendChild(renderer.domElement);

		function animate(timestamp) {
			controls.update();
			manager.render(scene, camera, timestamp);
			reticle.reticle_loop();
			requestAnimationFrame(animate);
		}
		animate();
		function onMouseWheel(event) {
			event.preventDefault();

			if (event.wheelDeltaY) { // WebKit
				camera.fov -= event.wheelDeltaY * 0.05;
			} else if (event.wheelDelta) {  // Opera / IE9
				camera.fov -= event.wheelDelta * 0.05;
			} else if (event.detail) { // Firefox
				camera.fov += event.detail * 1.0;
			}
			camera.fov = Math.max(40, Math.min(100, camera.fov));
			camera.updateProjectionMatrix();
		}
		document.addEventListener('mousewheel', onMouseWheel, false);
		document.addEventListener('DOMMouseScroll', onMouseWheel, false);
	}

}
