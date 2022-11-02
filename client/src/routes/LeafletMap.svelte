<!-- ALWAYS DEFINE LEAFLETMAP LAST!!!!!! -->

<script>
    import { onMount, onDestroy } from "svelte";

    export let map;
    export let markersCanvas;
    export let view;
    export let zoom;
    export let moveable = true;
    let mapElement;

    onMount(() => {
        let opts = {};
        if (!moveable) {
            opts = {
                zoomControl: false,
                boxZoom: false,
                doubleClickZoom: false,
                dragging: false,
                keyboard: false,
                scrollWheelZoom: false,
                touchZoom: false, 
                tapHold: false
            }
        }
        map = L.map(mapElement, opts);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
            }).addTo(map);

        map.setView(view, zoom);
        
        markersCanvas = new L.MarkersCanvas();
        markersCanvas.addTo(map);
    });

    onDestroy(() => {
        if (map) {
            map.remove();
        }

    });
</script>

<div bind:this={mapElement} style="background-color: #222222;"></div>
<!-- <div bind:this={mapElement}></div> -->

<style>
    @import "leaflet/dist/leaflet.css";
    div {
        height: 100%;
    }

    /* Make sure we draw the KML layer under the markers. */
    :global(svg.leaflet-zoom-animated) {
        z-index: 99 !important;
    }

    :global(.leaflet-tile.leaflet-tile-loaded) {
	    filter: invert(1) hue-rotate(180deg) grayscale(0.7);
    }

    /* IOS Safari workaround */
    :global(.leaflet-control-container .leaflet-top,
    .leaflet-control-container .leaflet-bottom) {
        transform: translate3d(0px, 0px, 0px);
    }

</style>