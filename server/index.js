const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const { TranslinkRealtime } = require("./realtime/translink");
const { BusBuilder } = require("./bus/busbuilder");
config();

const realtimeTranslink = new TranslinkRealtime();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.listen(PORT, async () => {
    console.log(`Van Bus Map running on port ${PORT}`);
    const { GTFSLoader}  = require("./gtfs/gtfsloader");

    let loader = new GTFSLoader();
    await loader.updateGTFS();

    

});

app.get("/buses", async (req, res) => {
    const builder = new BusBuilder(realtimeTranslink, null);

    res.send(await builder.buildBuses());
})