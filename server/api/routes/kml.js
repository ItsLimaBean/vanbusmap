const { FileDownloader } = require("../../gtfs/filedownloader");
const { KMLDownloader } = require("../../realtime/kml");

const KMLRoute = (app) => {
    const downloader = new KMLDownloader(new FileDownloader());
    
    app.get("/api/kml/:kmlId", async (req, res) => {
        const kmlId = req.params["kmlId"];
        if (kmlId.endsWith(".kml")) {
            const kmlData = await downloader.getKML(kmlId.replace(".kml", ""))
            if (kmlData) {
                res.set("Content-Type", "application/xml");
                res.send(kmlData);
            }
        } else {
            res.status(404);
        }
    });
}

module.exports = { KMLRoute }