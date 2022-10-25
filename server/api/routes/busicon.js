
function BusIcon(app) {
    app.get("/api/busicon/:color", (req, res) => {
        let color = req.params["color"];
        if (color.endsWith(".svg")) {
            let svg = `
            <svg id="svgContent" version="1.1" width="48" height="48" style="width: 48px; height: 48px; margin:auto; user-select: none; cursor: default;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"><g id="svgPath"><path d="M 16 21.500 L 16 26 24 26 L 32 26 32 21.500 L 32 17 24 17 L 16 17 16 21.500 M 15.110 32.367 C 14.246 33.409, 14.346 34.042, 15.530 35.025 C 17.441 36.611, 19.574 34.939, 18.664 32.567 C 17.923 30.637, 16.608 30.563, 15.110 32.367 M 29.336 32.567 C 28.426 34.939, 30.559 36.611, 32.470 35.025 C 33.654 34.042, 33.754 33.409, 32.890 32.367 C 31.392 30.563, 30.077 30.637, 29.336 32.567" stroke="none" fill="#222222" fill-rule="evenodd"></path><path d="M 12 25.500 C 12 33.833, 12.383 39, 13 39 C 13.550 39, 14 40.125, 14 41.500 C 14 43.611, 14.467 44, 17 44 C 19.533 44, 20 43.611, 20 41.500 C 20 39.250, 20.400 39, 24 39 C 27.600 39, 28 39.250, 28 41.500 C 28 43.611, 28.467 44, 31 44 C 33.533 44, 34 43.611, 34 41.500 C 34 40.125, 34.450 39, 35 39 C 35.617 39, 36 33.833, 36 25.500 L 36 12 24 12 L 12 12 12 25.500 M 16 21.500 L 16 26 24 26 L 32 26 32 21.500 L 32 17 24 17 L 16 17 16 21.500 M 15.110 32.367 C 14.246 33.409, 14.346 34.042, 15.530 35.025 C 17.441 36.611, 19.574 34.939, 18.664 32.567 C 17.923 30.637, 16.608 30.563, 15.110 32.367 M 29.336 32.567 C 28.426 34.939, 30.559 36.611, 32.470 35.025 C 33.654 34.042, 33.754 33.409, 32.890 32.367 C 31.392 30.563, 30.077 30.637, 29.336 32.567" stroke="none" fill="#${color.replace(".svg", "")}" fill-rule="evenodd"></path></g></svg>
            `;
            res.setHeader("Content-Type", "image/svg+xml");
            res.status(200).send(svg);
        } else {
            res.status(404);
        }
    });
}

module.exports = { BusIcon };