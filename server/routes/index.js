const path = require("path");
const glob = require("glob");

module.exports = (app) => {
	// Load all routes
	const routes = glob(path.join(__dirname, "./**/*.js"), {
		sync: true,
	});

	// Require each route
	routes.forEach((route) => {
		console.log("route", route);
		// Exclude current file
		if (route !== path.join(__dirname, "./index.js")) {
			require(route)(app);
		}
	});
};
