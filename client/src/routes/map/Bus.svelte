<script type="ts">
    import { beforeUpdate, getContext, onDestroy, onMount } from "svelte";
    import type { BusData } from "./BusData";
    import type { LeafletContext } from "./MapContext";
    import "leaflet";
    
    export let busDetails: BusData;

    const leafletContext: LeafletContext = getContext("leaflet");
    const map: L.Map = leafletContext.getMap();
    const markersCanvas: L.MarkersCanvas = leafletContext.getMarkersCanvas();
    
    let marker: L.Marker<any>;
    
    

    onMount(async () => {
        var icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      iconSize: [20, 32],
      iconAnchor: [10, 9],
    });

        marker = L.marker([busDetails.latitude, busDetails.longitude], {icon: icon});
        markersCanvas.addMarker(marker);
    });

    beforeUpdate(() => {
        console.log("updated!");
        if (marker) {
            marker.setLatLng([busDetails.latitude, busDetails.longitude]);
        }
    })

    onDestroy(() => {
        // if (map) {
        //     map.removeLayer(marker);
        // }
    });
</script>