const { GTFSTable } = require("./gtfstable");

class GTFSTripsTable extends GTFSTable {
    constructor(db, nodeStream, finishCallback, requestId) {
        super(db, nodeStream, finishCallback, requestId, "trips");

        this.tripSeqInfo = {};
    }

    decodeFinish = async () => {
        const trip_id = this.getColumn("trip_id");
        const route_id = this.getColumn("route_id");
        const trip_headsign = this.getColumn("trip_headsign");
        const block_id = this.getColumn("block_id");

        const stmt = this.db.prepare("INSERT INTO trips (trip_id, route_id, sign, block_id) VALUES (@tripId, @routeId, @sign, @blockId)");
    
        const insert = this.db.transaction((rows) => {
            for (const row of rows) stmt.run({
                tripId: row[trip_id],
                routeId: row[route_id],
                sign: row[trip_headsign],
                blockId: row[block_id],
            })
        });

        insert(this.rows);
    }
}

module.exports = { GTFSTripsTable };