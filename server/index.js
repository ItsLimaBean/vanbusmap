const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const { TranslinkRealtime } = require("./realtime/translink");
const { BusBuilder } = require("./bus/busbuilder");
const { BusIcon } = require("./api/routes/busicon");
const expressWinston = require('express-winston');
const winston = require("winston");
config();

const realtimeTranslink = new TranslinkRealtime();
const PORT = process.env.PORT || 3001;
const app = express();

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

app.get("/buses", async (req, res) => {
    const builder = new BusBuilder(realtimeTranslink, null);

    res.send(await builder.buildBuses());
});

BusIcon(app);