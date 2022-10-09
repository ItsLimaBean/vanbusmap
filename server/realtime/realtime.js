const { FileDownloader } = require("../gtfs/filedownloader");

class Realtime {
    // cacheTime - The amount of time before another data request can be triggered in seconds.
    constructor(cacheTime) {
        this.buses = [];
        this.cacheTime = cacheTime;
        this.lastFetch = -1;
        this.downloader = new FileDownloader();
    }

    tryUpdate = async () => {
        
        let updated = false;
        const currentTime = new Date().getTime() / 1000;
        if (currentTime - this.lastFetch >= this.cacheTime) {
            await this.fetchData();
            updated = true;
        }

        return updated;
    }

    fetchData = async () => {}

    getBuses = () => {
        console.log(this.buses)
        return this.buses;
    }
}

module.exports = { Realtime };