const Network = require("synaptic").Network;
const Rx = require("rxjs");

const config = require("./trainerConfig");

module.exports = class Trainer {
	network = null;
	learningRate = null;
	isTraining = false;

	constructor(
		storedData = null,
		learningRate = config.DEFUALT_LEARNING_RATES,
	) {
		this.learningRate = learningRate;
		this.init(storedData);
	}

	init(storedData) {
		if(storedData) {
			this.network = Network.fromJSON(storedData);
			return;
		}

		const inputLayer = new Layer(config.inputLayers);
		const hiddenLayer = new Layer(config.hiddenLayers);
		const outputLayer = new Layer(config.outputLayers);

		this.network = new Network({
			input: inputLayer,
			hidden: [hiddenLayer],
			output: outputLayer
		});
	}

	startTraining(dataset) {
		if(!this.network) {
			return Rx.Observable.throw("No network initiated");
		}

		this.isTraining = true;

		return new Rx.Observable.create((observer) => {
			for (let i = config.inputLayers - 1; i <= dataset.length - 1; i++) {
				if (!this.isTraining) {
					break;
				}

				setTimeout(() => {
					// Run it through a slice of the dataset
					this.network.activate(
						dataset.slice(i - (config.inputLayer - 1), (i + 1))
							.map((dataPoint) => dataPoint.percentageGain)
					);

					this.network.propagate(this.learningRate, [dataset[i].expectedResult]);

					if (i % 10000 === 0) {
						observer.next(this.network.toJSON());
					}
				});
			}
			observer.next(this.network.toJSON());
			observer.complete();
		});
	}

	stopTraining() {
		this.isTraining = false;
	}
}
