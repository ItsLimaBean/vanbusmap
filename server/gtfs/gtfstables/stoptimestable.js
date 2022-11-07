const { GTFSTable } = require("./gtfstable");

class GTFSStopTimesTable extends GTFSTable {
    constructor(db, nodeStream, finishCallback, requestId) {
        super(db, nodeStream, finishCallback, requestId, "stop_times");

        this.tripSeqInfo = {};
    }

    decodeFinish = async () => {

        const trip_id = this.getColumn("trip_id");
        const stop_seq = this.getColumn("stop_sequence");
        const stop_id = this.getColumn("stop_id");
        const arrival_time = this.getColumn("arrival_time");
        const departure_time = this.getColumn("departure_time");

        const stmt = this.db.prepare("INSERT INTO stop_times (trip_id, stop_id, sequence, arrival_time, departure_time) VALUES (@tripId, @stopId, @sequence, @arrival, @departure)");
    
        const insert = this.db.transaction((rows) => {
            for (const row of rows) stmt.run({
                tripId: row[trip_id],
                stopId: row[stop_id],
                sequence: row[stop_seq],
                arrival: row[arrival_time],
                departure: row[departure_time]
            })
        });

        insert(this.rows);
    }
}

module.exports = { GTFSStopTimesTable };