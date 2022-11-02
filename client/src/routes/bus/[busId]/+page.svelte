<script>
    import { browser } from "$app/environment";
    import { onMount } from "svelte";
    // import LeafletMap from "../../LeafletMap.svelte";

    export let data;

    let bus = data.bus;

    let map;
    let markersCanvas;

    let LeafletMapComp;
    let BusMarkerComp;

    onMount(async () => {
        if (browser) {
            window.L = (await import("leaflet")).default;
            (await import("leaflet-markers-canvas"));
            (await import("leaflet-plugins/layer/vector/KML"));

            LeafletMapComp = (await import("../../LeafletMap.svelte")).default;
            BusMarkerComp = (await import("../../BusMarker.svelte")).default;

            new L.KML(`/api/kml/${bus.route}-${bus.pattern}.kml`, { async: true}).addTo(map);

        }
    });
</script>

<div style="height: 400px; width: 900px;">
    <svelte:component this={BusMarkerComp} canvas={markersCanvas} busDetails={bus}></svelte:component>
    <svelte:component this={LeafletMapComp} bind:map={map} bind:markersCanvas={markersCanvas} view={[bus.latitude, bus.longitude]} zoom={16} moveable={false}></svelte:component>
</div>

<style>

</style>