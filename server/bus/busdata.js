const { getFleetModel } = require("./fleet");

class BusData {
    constructor(translinkData) {
        this.translinkData = {
            vehicleId: translinkData["VehicleNo"],
            route: translinkData["RouteNo"],
            direction: translinkData["Direction"],
            latitude: translinkData["Latitude"],
            longitude: translinkData["Longitude"],
            destination: translinkData["Destination"],
            updatedAt: translinkData["RecordedTime"],
            pattern: translinkData["Pattern"].slice(0, 3),
            model: getFleetModel(translinkData["VehicleNo"])
        }
    }

    json = () => {
        return this.translinkData;
    }
}

module.exports = { BusData };