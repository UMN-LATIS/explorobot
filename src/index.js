export default class Explorobot {
  constructor(config) {
    this._name = 'explorobot';
    console.log(config);
  }
  get name() {
    return this._name;
  }
}
