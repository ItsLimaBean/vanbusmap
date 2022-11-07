const Database = require("better-sqlite3");


const connect = (file) => {
    // return new Database(file, { verbose: console.log });
    return new Database(file);
}

const create = (db) => {
    const sql = `
    --
    -- File generated with SQLiteStudio v3.3.3 on Thu Nov 3 13:31:48 2022
    --
    -- Text encoding used: UTF-8
    --
    PRAGMA foreign_keys = off;
    BEGIN TRANSACTION;

    --DROP TABLE routes;
    --DROP TABLE sheets;
    --DROP TABLE stop_times;
    --DROP TABLE stops;
    --DROP TABLE trips;

    -- Table: routes
    CREATE TABLE IF NOT EXISTS routes (route_id INT PRIMARY KEY UNIQUE, number STRING (4), name STRING (64), type INT);

    -- Table: sheets
    CREATE TABLE IF NOT EXISTS sheets (sheet_id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT, start_date INT, end_date INT);

    -- Table: stop_times
    CREATE TABLE IF NOT EXISTS stop_times (trip_id INT REFERENCES trips (trip_id), stop_id INT REFERENCES stops (stop_id), sequence INT, arrival_time STRING (10), departure_time STRING (10), PRIMARY KEY (trip_id, stop_id, sequence));

    -- Table: stops
    CREATE TABLE IF NOT EXISTS stops (stop_id INT PRIMARY KEY UNIQUE, display INT, name STRING (128), lat DOUBLE, lon DOUBLE);

    -- Table: trips
    CREATE TABLE IF NOT EXISTS trips (trip_id INT PRIMARY KEY UNIQUE, route_id INT REFERENCES routes (route_id), sign STRING (64), block_id STRING (16));

    COMMIT TRANSACTION;
    PRAGMA foreign_keys = on;
    `;
    db.exec(sql);
}

module.exports = { connect, create };