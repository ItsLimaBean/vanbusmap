const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const { TranslinkRealtime } = require("./realtime/translink");
const { BusBuilder } = require("./bus/busbuilder");
const { BusIcon } = require("./api/routes/busicon");
const { KMLRoute } = require("./api/routes/kml");
const expressWinston = require('express-winston');
const winston = require("winston");
config();

const realtimeTranslink = new TranslinkRealtime();
const PORT = process.env.PORT || 3001;
const app = express();
const busBuilder = new BusBuilder(realtimeTranslink, null);

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.json()
    )
}));
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.json()
    )
}));


app.use(cors());

app.listen(PORT, async () => {
    console.log(`Van Bus Map running on port ${PORT}`);
    const { GTFSLoader}  = require("./gtfs/gtfsloader");

    let loader = new GTFSLoader();
    try {
        await loader.updateGTFS();
    } catch (err) {
        console.log("!!!Unable to laod GTFS Data!!!");
        console.error(err);
    }
});

app.get("/api/buses", async (req, res) => {
    await busBuilder.tryUpdate();

    if (parseFloat(req.query?.time) !== realtimeTranslink.lastFetch) {
        res.send({buses: await busBuilder.buildBuses(), timestamp: realtimeTranslink.lastFetch});
    } else {
        res.send({timestamp: realtimeTranslink.lastFetch});
    }
});

app.get("/api/bus/:busId", async (req, res) => {
    await busBuilder.tryUpdate();
    res.send({ bus: await busBuilder.buildBus(req.params["busId"]) });
});

BusIcon(app);
KMLRoute(app);