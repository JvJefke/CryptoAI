const trainerController = require("../controllers/trainer");

const baseUrl = "/trainer";

module.exports = (app) => {
	app.route(baseUrl + "/start").get(trainerController.startTraining);
	app.route(baseUrl + "/stop").get(trainerController.stopTraining);
}
