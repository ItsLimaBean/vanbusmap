const { GTFSTable } = require("./gtfstable");

class GTFSRoutesTable extends GTFSTable {
    constructor(nodeStream, finishCallback, requestId) {
        super(nodeStream, finishCallback, requestId, "routes");

        this.routeNames = {}
    }

    decodeFinish = async () => {
        console.log("Finished decoding routes!~");

        const route_short_name = this.getColumn("route_short_name");
        const route_long_name = this.getColumn("route_long_name");

        for (const row of this.rows) {
            this.routeNames[row[route_short_name]] = row[route_long_name];
        }
    }
}

module.exports = { GTFSRoutesTable };