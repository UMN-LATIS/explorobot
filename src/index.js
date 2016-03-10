var $ = require('jquery');

var Explorobot = require("./Explorobot");

window.degree2radian = function(degrees) {
	return degrees*(Math.PI/180);
};



module.exports = Explorobot;