const { DatabaseCache } = require("../databasecache");

class StopTimesModel extends DatabaseCache {
    constructor(db) {
        super(db, 1000);
    }

    onRun = async (tripId) => {
        const stmt = this.db.prepare(`
        SELECT A.sequence, A.stop_id AS stopId, A.arrival_time as arrivalTime, A.departure_time as departureTime,
            B.name, b.lat, b.lon
        FROM stop_times A
        JOIN stops B ON
            A.stop_id = B.stop_id
        WHERE A.trip_id = ?
        ORDER BY sequence ASC;
        `);
        return stmt.all(tripId);
    }
}

module.exports = { StopTimesModel };

/*

SELECT A.sequence, sA.top_id AS stopId, A.arrival_time as arrivalTime, A.departure_time as departureTime
        B.name, B.lat, B.lon
    FROM stop_times A
    JOIN stops B ON
        A.stop_id = B.stop_id
    WHERE A.trip_id = ?
    ORDER BY sequence ASC;
*/