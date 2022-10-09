const { Realtime } = require("./realtime");

class TranslinkRealtime extends Realtime {
    constructor() {
        super(120);

        if (!process.env.TRANSLINK_API) {
            throw Error("TRANSLINK_API key not set!");
        }

        this.translinkUrl = `https://api.translink.ca/rttiapi/v1/buses?apikey=${process.env.TRANSLINK_API}`;
    }

    fetchData = async () => {
        const realtimeBuffer = await this.downloader.download(this.translinkUrl, { "content-type": "application/JSON" });

        const realtimeJson = realtimeBuffer.toString("utf8");

        this.buses = JSON.parse(realtimeJson);
    }
}

module.exports = { TranslinkRealtime };