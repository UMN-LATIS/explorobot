var THREE = require('three');

var webvrpoly = require('webvr-polyfill');
var TWEEN = require('tween.js');

require('webvr-boilerplate');

window["ExploroSphere"] = require("./ExploroSphere.js");
window["ExploroPlane"] = require("./ExploroPlane.js");
window["ExploroObject"] = require("./ExploroObject.js");

export default class Explorobot {
	constructor(config) {
		window["texture"] = {};	
		this._sceneDefinition = null;
		if(typeof config.initialScene !== 'undefined') {
			this._initialScene = config.initialScene;
		}


		this.setupVR($("body").get(0)); // this is pointless ATM because webvrmanager forces full window
		this.registerControls();

		if(typeof config !== 'undefined') {
			if (config.source && typeof config.source === 'string') {
				$.getJSON(config.source, {}, function(json, textStatus) {
					this._sceneDefinition = json;
					this.startScene();
				}.bind(this));
			}
			else if (config.source && typeof config.source === 'object') {
				this._sceneDefinition = config.source;
				this.startScene();
			}

		}

	}

	startScene() {
		var startScene = this._sceneDefinition[this._initialScene];

		var object = this.loadPosition(startScene);
		this.currentTarget = object;


		var finishLoading = function() {
			console.log("fire");
			this.currentTarget.addToScene(this._scene);
			this.updateControls();
		}.bind(this);

		if(this.currentTarget.loading) {
			this.loadingTimer = window.setInterval(function() { if(!this.currentTarget.loading) { finishLoading(); clearInterval(this.loadingTimer)}}.bind(this), 1000);
		}
		else {
			finishLoading();
		}

	}

	loadPosition(sphere) {
		var target = new window[sphere.type](sphere);
		return target;
	}

	preloadPosition(targetScene) {
		var sphere = this._sceneDefinition[targetScene];
		if(sphere.hasOwnProperty("image")) {
			var texture = sphere.image;
			window["texture"][texture] = new THREE.TextureLoader().load('images/' + texture);
		}
	}

	switchScenes(targetScene = null) {

		var startScene = this._sceneDefinition[targetScene];
		console.log(startScene);
		var newSphere = this.loadPosition(startScene);
		var oldSphere = this.currentTarget;

		newSphere.setOpacity(0, false);
		// newSphere.addToScene(this._scene);

		oldSphere.setOpacity(0, true, function() {
			oldSphere.removeFromScene(this._scene)
		}.bind(this));


		oldSphere.objects.forEach(function(value) {
			if(!value.hasOwnProperty('targetScene')) {
				return;
			}

			this._eventsHandler.removeEventListener(value, 'click');
			this._eventsHandler.removeEventListener(value, 'touchstart');
			value = null;
		}, this);

		oldSphere.destroy();
		oldSphere = null;

		newSphere.setOpacity(1, false, function() {
			console.log("hey");
		});

		console.log(newSphere);

		
		this.previousTarget = this.currentTarget;
		this.currentTarget = newSphere;

		var finishLoading = function() {
			console.log("fire");
			this.currentTarget.addToScene(this._scene);
			this.updateControls();
		}.bind(this);

		if(this.currentTarget.loading) {
			this.loadingTimer = window.setInterval(function() { if(!this.currentTarget.loading) { finishLoading(); clearInterval(this.loadingTimer)}}.bind(this), 1000);
		}
		else {
			finishLoading();
		}
	}

	setupVR(targetElement) {

		var width  = window.innerWidth,
		height = window.innerHeight;
		this._scene = new THREE.Scene();

		this._camera = new THREE.PerspectiveCamera(75, width / height, 0.3, 1000);
		this._reticle = vreticle.Reticle(this._camera);
		this._camera.position.x = 0.0;

		this._scene.add( new THREE.PointLight( 0xffffff, 1.2,0,0 ) );

		this._renderer = new THREE.WebGLRenderer({antialias: true});
		this._renderer.setPixelRatio(window.devicePixelRatio);

		// this._renderer.setSize(width, height, true);

		// Apply VR stereo rendering to renderer.
		this._effect = new THREE.VREffect(this._renderer);
		this._effect.setSize(width, height);

		// Create a VR manager helper to enter and exit VR mode.
		var params = {
			hideButton: false, // Default: false.
			isUndistorted: false // Default: false.
		};
		this._manager = new WebVRManager(this._renderer, this._effect, params);

		this._controls = new THREE.VRControls(this._camera);
		targetElement.appendChild(this._renderer.domElement);
		var animate = (timestamp) => {
			this._controls.update();
			this._manager.render(this._scene, this._camera, timestamp);
			this._reticle.reticle_loop();
			if(this.currentTarget) {
				this.currentTarget.animate();
			}

			requestAnimationFrame(animate);
			TWEEN.update();
		};
		animate();
		this._eventsHandler  = new THREEx.DomEvents(this._camera, this._renderer.domElement)

	}

	updateControls() {


		this.currentTarget.objects.forEach(function(value) {
			if(!value.hasOwnProperty('targetScene')) {
				return;
			}
			this._reticle.add_collider(value);
			if(value.hasOwnProperty('targetScene')) {
				this.preloadPosition(value.targetScene);
			}
			var handler = function(e) {
				console.log(e);
				var targetMesh = e.target;
				var targetScene = targetMesh.targetScene;
				this.switchScenes(targetScene);
			}.bind(this);
			this._eventsHandler.addEventListener(value, 'click', handler);
			this._eventsHandler.addEventListener(value, 'touchstart', handler);

		}, this);
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
		document.addEventListener('touchstart', function(e) {
			if(!this._manager.isVRMode()) {
				return;
			}
			if(this._reticle.gazing_object) {
				var targetScene = this._reticle.gazing_object.targetScene;
				this.switchScenes(targetScene);
			}

		}.bind(this), false);

	}

}
