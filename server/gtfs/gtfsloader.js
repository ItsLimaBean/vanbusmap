const {FileDownloader } = require("./filedownloader");
const JSZip = require("jszip");
const { GTFSCalendarTable } = require("./gtfstables/calendartable");
const { GTFSStopTimesTable } = require("./gtfstables/stoptimestable");
const { GTFSStopsTable } = require("./gtfstables/stopstable");
const { GTFSRoutesTable } = require("./gtfstables/routestable");
const { GTFSTripsTable } = require("./gtfstables/tripstable");


class GTFSLoader {
    constructor(db) {
        this.gtfsUrl = "https://tlebtsprd01startti.blob.core.windows.net/gtfs/google_transit.zip";
        this.gtfsUrlPrevious = "https://gtfs-static.translink.ca/gtfs/History/{DATE_PARAM}/google_transit.zip"
        this.fileDownloader = new FileDownloader();
        this.gtfsTables = {
            "stops.txt": GTFSStopsTable,
            "routes.txt": GTFSRoutesTable,
            "trips.txt": GTFSTripsTable,
            "stop_times.txt": GTFSStopTimesTable,

        };
        
        // Used to ensure we are using the most up to date gtfs request.
        // There's a better method, aka awaiting for the calendar checks before parsing other
        // gtfs data, but im lazy /shrug
        this.requestId = 0;
        this.db = db;
    }

    getGTFSUrl = (useLastWeek) => {
        if (!useLastWeek) {
            return this.gtfsUrl;
        } else {
            const today = new Date();
            const lastFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()-2);

            return this.gtfsUrlPrevious.replace("{DATE_PARAM}", lastFriday.toISOString().split("T")[0]);
        }
    }

    getGTFS = async (useLastWeek) => {
        console.log("Downloading Static GTFS Data...");
        const url = this.getGTFSUrl(useLastWeek);

        console.log(`Target URL: ${url}`);
        const gtfsBuffer = await this.fileDownloader.download(url);
        console.log("Downloaded Static GTFS Data!");

        return gtfsBuffer;
    }

    decodeGTFS = async (gtfsBuffer) => {
        const zip = new JSZip();

        const zipData = await zip.loadAsync(gtfsBuffer);

        const calendar = new GTFSCalendarTable(this.db, zipData.files["calendar.txt"].nodeStream(), this.onGTFSInstanceParsed, this.requestId)
        await calendar.decode();
        if (!calendar.currentSheet) {
            console.log("Detected early sheet...");
            return await this.updateGTFS(true);
        }

        await Promise.all(Object.keys(this.gtfsTables).map((file) => {
            const zipFile = zipData.files[file];
            if (zipFile) {
                console.log(`Decoding zip file ${file}...`);
                const table = this.gtfsTables[file];
                const tableInstance = new table(this.db, zipFile.nodeStream(), this.onGTFSInstanceParsed, this.requestId);
                return tableInstance.decode();
            }
        }));
    }

    updateGTFS = async (useLastWeek = false) => {
        this.requestId++;
        const gtfsBuffer = await this.getGTFS(useLastWeek);

        await this.decodeGTFS(gtfsBuffer);
    }

    onGTFSInstanceParsed = async (instance, classId) => {
        throw new Error("Deprecated event.");
        if (instance.requestId !== this.requestId) {
            console.log("Old GTFS data parsed... - WARNING", classId);
            return;
        }

        switch (classId) {
            case "calendar":
                if (!instance.currentSheet) {
                    console.log("Detected early sheet...");
                    this.updateGTFS(true);
                }    
            break;
        }
    }

    shouldUpdate = async () => {
        const date = new Date(new Date().toLocaleString("en-US", {
            timeZone: "America/Vancouver",
        }));
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = `0${month}`;
        }
        const dateN = parseInt(`${year}${month}${day}`);
        
        const stmt = this.db.prepare("SELECT sheet_id FROM sheets WHERE start_date < ? AND end_date > ?;");
        const result = stmt.get(dateN, dateN);
        return result === undefined;
    }
}

module.exports = { GTFSLoader }