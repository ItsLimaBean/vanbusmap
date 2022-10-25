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
            this.lastFetch = currentTime;
            
            try {
                await this.fetchData();
                updated = true;
            } catch (err) {
                console.log("Realtime fetchData error!");
                console.error(err);
            }
        }

        return updated;
    }

    fetchData = async () => {}

    getBuses = () => {
        return this.buses;
    }
}

module.exports = { Realtime };