<script>
    import { onMount, onDestroy, setContext } from "svelte";
    import L from "leaflet";
    import "leaflet-markers-canvas";
    import BusMarker from "./BusMarker.svelte"


    let map;
    let mapElement;
    let markersCanvas;

    let buses = [];
    let busUpdateTime = -1;

    $: if (markersCanvas && buses) {
        // We use a timeout to make sure that all buses have updated their positions
        // before redrawing the canvas.
        setTimeout(() => {
            markersCanvas.redraw();
        }, 1)
        
        
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
        map = L.map(mapElement);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            map.setView([49.2490416, -122.9850604], 14)

            markersCanvas = new L.MarkersCanvas();
            markersCanvas.addTo(map);
            
        
            updateBuses();
    });

    onDestroy(() => {
        if (map) {
            map.remove();
        }
    });

    setContext("leaflet", {
        getMap: () => {
            return map;
        },
        getMarkersCanvas: () => {
            return markersCanvas;
        }
    });
</script>

<main>
    <button on:click={updateBuses}>UPDATE</button>
    <div bind:this={mapElement}></div>
    {#each buses as bus, index (bus.vehicleId)}
        <BusMarker busDetails={bus}></BusMarker>
    {/each}
</main>

<style>
    @import "leaflet/dist/leaflet.css";
    main div {
        height: 100vh;
    }

    :global(body) {
        margin: 0;
    }
</style>