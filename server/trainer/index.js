const Trainer = require("./Trainer");
const path = require("path");
const fs = require("fs");
const glob = require("glob");

module.exports.start = () => {

};

module.exports.stop = () => {

};

module.exports.startTrainer = () => {
	const input = JSON.parse(fs.readFileSync(path.join(process.cwd(), "server/trainer/mockData.json")));

	_instance.startTraining(input)
		.subscribe((networkState) => fs.writeFile(
			path.join(process.cwd(), "server/trainer/results/", `${new Date().toISOString()}_network-state.json`),
			JSON.stringify(networkState)
		));
};

module.exports.stopTrainer = () => {
	_instance.stopTraining();
};

const getAvailableNetworkState = () => new Promise((resolve, reject) => {
	// Get all files in the result file
	glob(path.join(process.cwd(), "server/trainer/results/*.json"), (err, files) => {
		if (err || !files.length) {
			return reject(err || "Not found");
		}

		// Get last created file (sorted by filename)
		const lastFilePath = files.sort((a, b) => a.toString() < b.toString() ? 1 : -1)[0];

		// read the file and resolve
		fs.readFile(lastFilePath, (err, file) => {
			if (err) {
				return reject(err);
			}

			return resolve(JSON.parse(file));
		});
	});
});

const init = () => getAvailableNetworkState().then(() => _instance = new Trainer());
