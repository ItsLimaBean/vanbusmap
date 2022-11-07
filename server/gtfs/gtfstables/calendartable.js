const { GTFSTable } = require("./gtfstable");

class GTFSCalendarTable extends GTFSTable {
    constructor(db, nodeStream, finishCallback, requestId) {
        super(db, nodeStream, finishCallback, requestId, "calendar");
        this.currentSheet = false;
        this.startDate = null;
        this.endDate = null;
    } 

    decodeFinish = async () => {
        console.log("Finished decoding Calendar.");

        const service_id = this.getColumn("service_id");
        const start_date = this.getColumn("start_date");
        const end_date = this.getColumn("end_date");

        let insertStartDate, insertEndDate;

        for (let row of this.rows) {
            if (row[service_id] === "1") {
                console.log("Found Service Row.");

                this.startDate = this.parseDate(row[start_date]);
                this.endDate = this.parseDate(row[end_date]);

                const today = new Date();
                this.currentSheet = today <= this.endDate && today >= this.startDate;

                insertStartDate = parseInt(row[start_date]);
                insertEndDate = parseInt(row[end_date]);

                break;
            }
        }

        console.log(`Found sheet ranging from ${this.startDate} to ${this.endDate}`);
        console.log(`Is current Sheet? ${this.currentSheet}`);

        if (this.currentSheet) {
            this.db.prepare("INSERT INTO sheets (start_date, end_date) VALUES(?, ?);")
                .run(insertStartDate, insertEndDate);
        }
    }

    parseDate = (dateStr) => {
        // Probably a way better way to this. :)
        const year = dateStr.slice(0, 4);
        const month = dateStr.slice(4,6);
        const day = dateStr.slice(6,8);
        return new Date(`${year}-${month}-${day}`);
    }
}

module.exports = { GTFSCalendarTable };