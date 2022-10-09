const { GTFSTable } = require("./gtfstable");

class GTFSStopsTable extends GTFSTable {
    constructor(nodeStream, finishCallback, requestId) {
        super(nodeStream, finishCallback, requestId, "stops");
        this.stopLocations = {};
    }

    decodeFinish = async () => {
        console.log("Decoded stops!");

        const stop_id = this.getColumn("stop_id");
        const stop_lat = this.getColumn("stop_lat");
        const stop_lon = this.getColumn("stop_lon");

        for (const row of this.rows) {
            this.stopLocations[row[stop_id]] = { latitude: row[stop_lat], longitude: row[stop_lon] };
        }
    }
}

module.exports = { GTFSStopsTable };