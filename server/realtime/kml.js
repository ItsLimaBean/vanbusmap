const JSZip = require("jszip");

class KMLDownloader {
    constructor(downloader) {
        this.TRIP_URL = `https://nb.translink.ca/geodata/trip/{KML_ID}.kmz`;
        this.GLOBAL_URL = `https://nb.translink.ca/geodata/{KML_ID}.kmz`;
        this.downloader = downloader;
    }

    getKML = async (kml, isTrip=true) => {
        const url = (isTrip ? this.TRIP_URL : this.GLOBAL_URL).replace("{KML_ID}", kml); 
        try {
            const kmzBuffer = await this.downloader.download(url, { "content-type": "application/vnd.google-earth.kmz" });
            
            return await this.parseKMZ(kmzBuffer);
        } catch(err) {
            if (isTrip) {
                return await this.getKML(kml, false);
            }
            console.log(err);
        }
        console.log("WE SHOULD NEVER GET HERE!");
    }

    parseKMZ = async (kmzBuffer) => {
        const zip = new JSZip();

        const zipData = await zip.loadAsync(kmzBuffer);
        const doc = zipData.files["doc.kml"];
        if (!doc) {
            throw new Error("doc.kml missing from zipped kmz!");
        }

        return await doc.async("string");
    }

}

module.exports = { KMLDownloader };