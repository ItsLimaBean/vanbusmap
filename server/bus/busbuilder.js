const { BusData } = require("./busdata");

class BusBuilder {
    constructor(translinkRealtime, googleRealtime) {
        this.translinkRealtime = translinkRealtime;
        this.googleRealtime = googleRealtime;   
    }

    tryUpdate = async() => {
        await this.translinkRealtime.tryUpdate();
    }

    buildBuses = async () => {
        const builtBuses = [];
        for (const bus of this.translinkRealtime.getBuses()) {
            builtBuses.push(new BusData(bus).json());
        }

        return builtBuses;
    }
}

module.exports = { BusBuilder };