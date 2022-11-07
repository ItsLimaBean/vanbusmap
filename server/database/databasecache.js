class DatabaseCache {
    constructor(db, time) { // time is seconds.
        this.db = db;
        this.cache = {};
        this.cacheTimes = {};
        this.time = time * 1000;
    }

    run = async (cacheUID, ...args) => {
        const now = new Date().getTime();

        if (!this.cacheTimes[cacheUID]) {
            this.cacheTimes[cacheUID] = 0;
        }

        if ((now - this.cacheTimes[cacheUID]) > this.time) {
            this.cacheTimes[cacheUID] = now;
            this.cache[cacheUID] = await this.onRun(...args);
        }

        return this.cache[cacheUID];
    }

    onRun = async (...args) => {

    }
}

module.exports = { DatabaseCache };