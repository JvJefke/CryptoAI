const Network = require("synaptic").Network;
const Rx = require("rxjs");

module.exports = class Trainer {
	network = null;
	learningRate = 0.1;
	isTraining = false;

	constructor(
		storedData = null,
		learningRate = 0.1
	) {
		this.learningRate = learningRate;
		this.init(storedData);
	}

	init(storedData) {
		if(storedData) {
			this.network = Network.fromJSON(storedData);
			return;
		}

		const inputLayer = new Layer(204);
		const hiddenLayer = new Layer(103);
		const outpuLayer = new Layer(1);

		this.network = new Network({
			input: inputLayer,
			hidden: [hiddenLayer],
			output: outpuLayer
		});
	}

	startTraining(dataset) {
		if(!this.network) {
			return Rx.Observable.throw("No network initiated");
		}

		this.isTraining = true;

		return new Rx.Observable.create((observer) => {
			for (let i = 203; i <= dataset.length; i++) {
				if (!this.isTraining) {
					break;
				}

				setTimeout(() => {
					// Run it through a slice of the dataset
					this.network.activate(
						dataset.slice(i - 203, (i -1))
							.map((dataPoint) => dataPoint.percentageGain)
					);

					this.network.propagate(this.learningRate, [dataPoint.expectedResult]);

					if (i % 10000 === 0) {
						observer.next(this.network.toJSON());
					}
				});
			}
		});
	}

	stopTraining() {
		this.isTraining = false;
	}
}
