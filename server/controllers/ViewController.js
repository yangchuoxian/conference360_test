module.exports = {
	renderIndex: function(req, res) {
		var path = require('path');
		res.sendFile(path.resolve(__dirname, '../../frontend/index.html'));
	}
};