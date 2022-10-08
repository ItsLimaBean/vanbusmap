const {FileDownloader } = require("./filedownloader");
const JSZip = require("jszip");
const { GTFSCalendarTable } = require("./gtfstables/calendartable");


class GTFSLoader {
    constructor() {
        this.gtfsUrl = "https://tlebtsprd01startti.blob.core.windows.net/gtfs/google_transit.zip";
        this.gtfsUrlPrevious = "https://gtfs-static.translink.ca/gtfs/History/{DATE_PARAM}/google_transit.zip"
        this.fileDownloader = new FileDownloader();
        this.gtfsTables = { "calendar.txt": GTFSCalendarTable };
        
        // Used to ensure we are using the most up to date gtfs request.
        // There's a better method, aka awaiting for the calendar checks before parsing other
        // gtfs data, but im lazy /shrug
        this.requestId = 0;
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

        for (const file in this.gtfsTables) {
            const zipFile = zipData.files[file];
            if (zipFile) {
                console.log(`Decoding zip file ${file}...`);
                const table = this.gtfsTables[file];
                const tableInstance = new table(zipFile.nodeStream(), this.onGTFSInstanceParsed, this.requestId);
                await tableInstance.decode();
            }
        }
    }

    updateGTFS = async (useLastWeek = false) => {
        this.requestId++;
        const gtfsBuffer = await this.getGTFS(useLastWeek);

        await this.decodeGTFS(gtfsBuffer);
    }

    onGTFSInstanceParsed = async (instance, classId) => {
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
}

module.exports = { GTFSLoader }