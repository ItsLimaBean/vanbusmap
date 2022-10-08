const CsvReadableStream = require("csv-reader");
const AutoDetectDecoderStream = require("autodetect-decoder-stream")

class GTFSTable {
    constructor(nodeStream, finishCallback, requestId, classId) {
        this.nodeStream = nodeStream;

        this.classId = classId;
        this.headers = [];
        this.rows = [];
        this.finishCallback = finishCallback;
        this.requestId = requestId;
    }

    decode = async () => {
        let firstRowDecoded = false;
        this.nodeStream.pipe(new AutoDetectDecoderStream({ defaultEncoding: "1255" }))
            .pipe(new CsvReadableStream({ parseNumbers: false, parseBooleans: true, trim: true }))
            .on("data", async (row) => {
                if (!firstRowDecoded) {
                    firstRowDecoded = true;
                    await this.decodeHeader(row);
                } else {
                    await this.decodeRow(row);
                }
            })
            .on("end", async () => {
                // Run our decode finish first since we need to ensure
                // data has been parsed fully.
                await this.decodeFinish();


                this.finishCallback(this, this.classId);
            });
    }

    decodeRow = async (columns) => {
        this.rows.push(columns);
    }

    decodeHeader = async (columns) => {
        this.headers = columns;
    }

    decodeFinish = async () => { }

    // Gets the index of provided column name
    getColumn = (name) => {
        for (let i = 0; i < this.headers.length; i++) {
            if (this.headers[i] === name) {
                return i;
            }
        }

        throw Error(`${name} is not a valid Column.`);
    }
}

module.exports = { GTFSTable };