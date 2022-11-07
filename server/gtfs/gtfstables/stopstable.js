const { GTFSTable } = require("./gtfstable");

class GTFSStopsTable extends GTFSTable {
    constructor(db, nodeStream, finishCallback, requestId) {
        super(db, nodeStream, finishCallback, requestId, "stops");
    }

    decodeFinish = async () => {

        const stop_id = this.getColumn("stop_id");
        const stop_lat = this.getColumn("stop_lat");
        const stop_lon = this.getColumn("stop_lon");
        const stop_code = this.getColumn("stop_code");
        const stop_name = this.getColumn("stop_name");

        const stmt = this.db.prepare("INSERT INTO stops (stop_id, display, name, lat, lon) VALUES (@stopId, @display, @name, @lat, @lon)")

        const insert = this.db.transaction((rows) => {
            for (const row of rows) stmt.run({
                stopId: row[stop_id],
                display: row[stop_code],
                name: row[stop_name],
                lat: row[stop_lat],
                lon: row[stop_lon]
            });
        });

        insert(this.rows);
    }
}

module.exports = { GTFSStopsTable };