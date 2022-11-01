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

    buildBus = async (busId) => {
        const buses = this.translinkRealtime.getBuses();
        for (const bus of buses) {
            if (bus["VehicleNo"] == busId) {
                return new BusData(bus).json();
            }
        }
        return null;
    }
}

module.exports = { BusBuilder };