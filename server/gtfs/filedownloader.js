const https = require("https");
class FileDownloader {
    
    // Downloads the specified url and returns a Buffer
    download = (url, headers = {}) => {
        return new Promise((resolve, reject) => {
            https.get(url, { headers: headers }, (res) => {
                const rawChunk = [];

                res.on("data", (chunk) => rawChunk.push(chunk));

                res.on("end", () => resolve(Buffer.concat(rawChunk)));

                res.on("error", (err) => reject(err));
            });
        });
    }
}

module.exports = { FileDownloader };