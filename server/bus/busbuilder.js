const { BusData } = require("./busdata");

class BusBuilder {
    constructor(translinkRealtime, googleRealtime) {
        this.translinkRealtime = translinkRealtime;
        this.googleRealtime = googleRealtime;   
    }

    buildBuses = async () => {
        await this.translinkRealtime.tryUpdate();
        await this.translinkRealtime.fetchData();

        const builtBuses = [];
        for (const bus of this.translinkRealtime.getBuses()) {
            builtBuses.push(new BusData(bus).json());
        }

        return builtBuses;
    }
}

module.exports = { BusBuilder };