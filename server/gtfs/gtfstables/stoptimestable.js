const { GTFSTable } = require("./gtfstable");

class GTFSStopTimesTable extends GTFSTable {
    constructor(nodeStream, finishCallback, requestId) {
        super(nodeStream, finishCallback, requestId, "stop_times");

        this.tripSeqInfo = {};
    }

    finishCallback = async () => {
        console.log("Finished decoding StopTimes.");

        const trip_id = this.getColumn("trip_id");
        const stop_seq = this.getColumn("stop_sequence");
        const stop_id = this.getColumn("stop_id");
        const arrival_time = this.getColumn("arrival_time");
        const departure_time = this.getColumn("departure_time");

        for (const row of this.rows) {
            const tripId = row[trip_id];
            if (!this.tripSeqInfo[tripId]) {
                this.tripSeqInfo[tripId] = {};
            }
            
            this.tripSeqInfo[tripId][row[stop_seq]] = {
                stopId: row[stop_id],
                arrival: parseInt(row[arrival_time].replaceAll(":", "")),
                departure: parseInt(row[departure_time].replaceAll(":", "")),
            }
        }
    }
}

module.exports = { GTFSStopTimesTable };