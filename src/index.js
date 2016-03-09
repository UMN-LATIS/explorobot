export default class Explorobot {
	constructor(config) {
		this._name = 'Explorobot';
		this._sceneDefinition = null;
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
	get name() {
		return this._name;
	}

	get startScene() {

	}
}
