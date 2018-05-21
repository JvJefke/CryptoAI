const trainerHelper = require("../trainer");

module.exports.startTraining = (req, res) => {
	trainerHelper.startTrainer();

	res.status(200).json({ result: "ok" });
};

module.exports.stopTraining = (req, res) => {
	trainerHelper.stopTrainer();

	res.status(200).json({ result: "ok" });
};
