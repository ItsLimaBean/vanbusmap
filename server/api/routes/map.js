function MapRoute(app) {
    app.get("/", (req, res) => {
        res.render("Map.ejs");
    })
}

module.exports = { MapRoute };