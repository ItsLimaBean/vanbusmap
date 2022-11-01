<script>
    
    import L from "leaflet";
    import { beforeUpdate, getContext, onMount, onDestroy } from "svelte";

    export let busDetails;

    const leafletContext = getContext("leaflet");
    const markersCanvas = leafletContext.getMarkersCanvas();

    let marker;
    
    const buildPopupDetails = () => {
        return `
            <strong>${busDetails.direction} - ${busDetails.route} ${busDetails.destination}</strong>
            <br/>
            ${busDetails.vehicleId} - ${busDetails.model}
            <br/>
            Deviation: N/A
            </br>
            <small>Updated at: ${busDetails.updatedAt}</small>
        `;
    }

    onMount(() => {
        var icon = L.icon({
            iconUrl: "/api/busicon/ff0000.svg",
            iconSize: [20, 32],
            iconAnchor: [10, 9],
        });

        marker = L.marker([busDetails.latitude, busDetails.longitude], {icon: icon}).bindPopup(buildPopupDetails());
        markersCanvas.addMarker(marker);
    });

    beforeUpdate(() => {
        if (marker) {
            marker.bindPopup(buildPopupDetails());
            marker.setLatLng([busDetails.latitude, busDetails.longitude]);
        }
    })

    onDestroy(() => {
        if (marker) {
            markersCanvas.removeMarker(marker);
        }
    });
</script>