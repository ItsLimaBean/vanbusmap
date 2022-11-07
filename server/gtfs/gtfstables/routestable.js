const { GTFSTable } = require("./gtfstable");

class GTFSRoutesTable extends GTFSTable {
    constructor(db, nodeStream, finishCallback, requestId) {
        super(db, nodeStream, finishCallback, requestId, "routes");

        this.routeNames = {}
    }



    decodeFinish = async () => {

        const route_short_name = this.getColumn("route_short_name");
        const route_long_name = this.getColumn("route_long_name");
        const route_id = this.getColumn("route_id");
        const route_type = this.getColumn("route_type");

        const stmt = this.db.prepare("INSERT INTO routes (route_id, number, name, type) VALUES (@routeId, @number, @name, @type)");

        const insert = this.db.transaction((rows) => {
            for (const row of rows) stmt.run({
                routeId: row[route_id],
                number: row[route_short_name],
                name: row[route_long_name],
                type: row[route_type]
            });
        });


        insert(this.rows);
    }
}

module.exports = { GTFSRoutesTable };