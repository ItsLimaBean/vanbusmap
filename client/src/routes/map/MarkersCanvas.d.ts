declare module L {
    export class MarkersCanvas extends Layer {
        addMarker(a: Marker): void;
        redraw(): void;
    }
}