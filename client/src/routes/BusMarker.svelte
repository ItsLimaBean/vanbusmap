<script>
    
    import L from "leaflet";
    import "leaflet-markers-canvas"
    import { beforeUpdate, onMount, onDestroy } from "svelte";

    export let busDetails;
    export let canvas;

    let marker;
    let popup;
    
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

    // This is only when the canvas changes state, so LeafletMap is reloaded,
    // and should never happen in production.
    const _debugReaddMarker = () => {
        if (marker !== undefined) {
            canvas.addMarker(marker);
        }
    }
    $: if (canvas) _debugReaddMarker();

    const updateMarker = () => {
        popup?.setContent(buildPopupDetails());
        if (popup) {
            popup.route = `${busDetails.route}-${busDetails.pattern}`;
        }
        
        marker?.setLatLng([busDetails.latitude, busDetails.longitude]);
    }

    onMount(() => {
        const icon = L.icon({
            iconUrl: "/api/busicon/ff0000.svg",
            iconSize: [20, 32],
            iconAnchor: [10, 9],
        });

        popup = L.popup();
        marker = L.marker([busDetails.latitude, busDetails.longitude], {icon: icon}).bindPopup(popup);

        updateMarker();

        canvas.addMarker(marker);
    });

    beforeUpdate(() => {
        updateMarker();
    });

    onDestroy(() => {
        if (marker) {
            canvas.removeMarker(marker);
        }
    });
</script>