const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.listen(PORT, async () => {
    console.log(`Van Bus Map running on port ${PORT}`);
    const { GTFSLoader}  = require("./gtfs/gtfsloader");

    let loader = new GTFSLoader();
    loader.updateGTFS();
});