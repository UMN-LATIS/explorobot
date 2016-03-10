var THREE = require('three');
var webvrpoly = require('webvr-polyfill');
var TWEEN = require('TWEEN');

require('webvr-boilerplate');

var ExploroSphere = require("./ExploroSphere.js");



export default class Explorobot {
	constructor(config) {
		this._sceneDefinition = null;
		this._initialScene = null;

		this.setupVR($("body").get(0)); // this is pointless ATM because webvrmanager forces full window
		this.registerControls();

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
		var object = this.loadPosition('R0010149.JPG');
		this.currentTarget = object;

		this.currentTarget.addToScene(this._scene);

	}

	loadPosition(sphereId) {
		var target = new ExploroSphere(sphereId);
		return target;
	}

	switchScenes(targetScene) {

		var newSphere = this.loadPosition('R0010152.JPG');
		var oldSphere = this.currentTarget;

		newSphere.setOpacity(0, false);
		newSphere.addToScene(this._scene);

		oldSphere.setOpacity(0, true, function() { oldSphere.removeFromScene(this._scene)}.bind(this));
		newSphere.setOpacity(1);

		this.currentTarget = newSphere;
	}

	setupVR(targetElement) {

		var width  = window.width,
		height = window.height;
		this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera(75, width / height, 0.3, 1000);
		this._reticle = vreticle.Reticle(this._camera);

		this._camera.position.x = 0.1;

		this._renderer = new THREE.WebGLRenderer({antialias: true});
		this._renderer.setPixelRatio(window.devicePixelRatio);

		this._renderer.setSize(width, height, true);

		// Apply VR stereo rendering to renderer.
		var effect = new THREE.VREffect(this._renderer);
		effect.setSize(width, height);

		// Create a VR manager helper to enter and exit VR mode.
		var params = {
			hideButton: false, // Default: false.
			isUndistorted: false // Default: false.
		};
		var manager = new WebVRManager(this._renderer, effect, params);

		var controls = new THREE.VRControls(this._camera);
		targetElement.appendChild(this._renderer.domElement);

		var animate = (timestamp) => {
			controls.update();
			manager.render(this._scene, this._camera, timestamp);
			this._reticle.reticle_loop();
			requestAnimationFrame(animate);
			TWEEN.update();
		};
		animate();

	}

	registerControls() {
		var onMouseWheel = (event) => {
			event.preventDefault();

			if (event.wheelDeltaY) { // WebKit
				this._camera.fov -= event.wheelDeltaY * 0.05;
			} else if (event.wheelDelta) {  // Opera / IE9
				this._camera.fov -= event.wheelDelta * 0.05;
			} else if (event.detail) { // Firefox
				this._camera.fov += event.detail * 1.0;
			}
			this._camera.fov = Math.max(40, Math.min(100, this._camera.fov));
			this._camera.updateProjectionMatrix();
		}
		document.addEventListener('mousewheel', onMouseWheel, false);
		document.addEventListener('DOMMouseScroll', onMouseWheel, false);

		document.addEventListener('click', this.switchScenes.bind(this), false);

	}

}
