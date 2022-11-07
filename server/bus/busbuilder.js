const { StopTimesModel } = require("../database/models/stoptimes");
const { calcCrow, getLatLngCenter } = require("../util/mapping");
const { BusData } = require("./busdata");

class BusBuilder {
    constructor(db, translinkRealtime, googleRealtime) {
        this.db = db;
        this.translinkRealtime = translinkRealtime;
        this.googleRealtime = googleRealtime;
        this.test = new StopTimesModel(this.db);
    }

    tryUpdate = async() => {
        await this.translinkRealtime.tryUpdate();
    }

    // Build buses should cache the arleady built buses, instead of caching them in translinkrealtime TODO:
    buildBuses = async () => {
        const builtBuses = [];
        console.log(this.translinkRealtime.getBuses());
        const timeStart = new Date().getTime();
        for (const bus of this.translinkRealtime.getBuses()) {
            const delay = this.caclulateDelay(bus, await this.test.run(bus["TripId"], bus["TripId"]));
            builtBuses.push(new BusData(bus, delay).json());
        }

        console.log(new Date().getTime() - timeStart);

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

    caclulateDelay = (bus, trip) => {
        //if (bus["VehicleNo"] != 9458) return null;

        const getCenterPoints = (trip) => {
            trip = trip.sort((a, b) => a.sequence - b.sequence);

            let arr = []
            for (let i = 0; i < trip.length; i++) {
                if (trip[i+1] == undefined) { continue; } 
                arr.push({
                    distance: calcCrow(trip[i].lat, trip[i].lon, trip[i+1].lat, trip[i+1].lon),
                    center: getLatLngCenter([trip[i], trip[i+1]]),
                    nextStop: trip[i+1],
                    lastStop: trip[i],
                });

            }

            return arr
        }

        let closestDist = 9999999999.9;
        let closestSeq;

        for (let seq of getCenterPoints(trip)) {
            let dist = calcCrow(bus["Latitude"], bus["Longitude"], seq.center[0], seq.center[1]);
            if (dist < closestDist) {
                closestDist = dist;
                closestSeq = seq;
            }
        }

        const now = new Date();
        const date = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
        let start = 0, end = 0;

        try {
            start = new Date(`${date} ${closestSeq.lastStop.departureTime}`).getTime() / 1000;
            end = new Date(`${date} ${closestSeq.nextStop.departureTime}`).getTime() / 1000;

        } catch (err) {
            console.log("?????? ", err);
        }

        let curtime = new Date().getTime() / 1000;
        let ShouldBe = (curtime - start) / (end - start)
        let Delay = curtime - (ShouldBe + start);
        return Math.round(((Delay / 60) * -1) * 10) / 10;
    }
}

module.exports = { BusBuilder };