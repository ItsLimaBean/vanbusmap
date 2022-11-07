<script>
    import { onMount } from "svelte";
    import L from "leaflet";
    import "leaflet-markers-canvas";
    import "leaflet-plugins/layer/vector/KML"
    import BusMarker from "../BusMarker.svelte"
    import LeafletMap from "../LeafletMap.svelte";


    let map;
    let markersCanvas;
    let kml;
    const kmlCache = {};

    let buses = [];
    let busUpdateTime = -1;

    $: if (markersCanvas && buses) {
        // We use a timeout to make sure that all buses have updated their positions
        // before redrawing the canvas.
        setTimeout(() => {
            markersCanvas.redraw();
        }, 1)
    }

    $: if (map) {
        console.log("map changgged!");
    }

    $: if (markersCanvas) {
        console.log("canvas chganged!");
    }

    const updateBuses = async () => {
        const busData = await (await fetch(`/api/buses?time=${busUpdateTime}`)).json();
        busUpdateTime = busData.timestamp;
        if (busData.buses) {
            buses = busData.buses;
        }
        console.log("updatedbuses!");
    }

    onMount(() => {
        map.on("popupopen", (event) => {
            const route = event.popup.route;
            if (route) {
                kml?.remove();
                if (kmlCache[route] !== undefined) {
                    kml = kmlCache[route].addTo(map);
                } else {
                    kml = kmlCache[route] = new L.KML(`/api/kml/${route}.kml`, { async: true}).addTo(map);
                }
            }
        });

        map.on("popupclose", (event) => {
            kml?.remove();
        });
        
        updateBuses();
    });
</script>

<main>
    <button on:click={updateBuses}>UPDATE</button>
    <button on:click={() => buses = []}>REMOVE</button>

    {#each buses as bus (bus.vehicleId)}
        <BusMarker canvas={markersCanvas} busDetails={bus}></BusMarker>
    {/each}
    <div style="height: 100vh;">
        <LeafletMap bind:map={map} bind:markersCanvas={markersCanvas} view={[49.2490416, -122.9850604]} zoom={12}></LeafletMap>
    </div>

</main>

<style>

    :global(body) {
        margin: 0;
    }
</style>