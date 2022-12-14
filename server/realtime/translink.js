const { Realtime } = require("./realtime");

class TranslinkRealtime extends Realtime {
    constructor() {
        super(10);

        if (!process.env.TRANSLINK_API) {
            throw Error("TRANSLINK_API key not set!");
        }

        this.translinkUrl = `https://api.translink.ca/rttiapi/v1/buses?apikey=${process.env.TRANSLINK_API}`;
    }

    fetchData = async () => {
        const realtimeBuffer = await this.downloader.download(this.translinkUrl, { "content-type": "application/JSON" });

        const realtimeJson = realtimeBuffer.toString("utf8");
        const realtimeData = JSON.parse(realtimeJson);
        if (realtimeData["Code"] !== undefined) {
            throw new Error(`Code: ${realtimeData["Code"]} | ${realtimeData["Message"]}`);
        }

        this.buses = realtimeData;
    }
}

module.exports = { TranslinkRealtime };