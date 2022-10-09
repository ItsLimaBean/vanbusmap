import './App.css';
import { MapContainer } from "react-leaflet/MapContainer"
import { TileLayer } from 'react-leaflet/TileLayer'
import { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';


function App() {
    const [buses, setBuses] = useState([]);

    async function updateBuses() {
        const data = await fetch("http://localhost:3001/buses");
        setBuses(await data.json());
    }

    useEffect(() => {
        updateBuses();
    }, []);

    return (
        <div className="App">
            <button onClick={() => updateBuses()}>REFRESH_BUSES</button>
            <MapContainer center={[49.2490416, -122.9850604]} zoom={13} scrollWheelZoom={true}
            style={ { width: "100vw", height: "100vh" } }   
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                { buses.map((bus) => {
                    return (
                        <Marker key={bus.translink.vehicleId} position={[ bus.translink.latitude, bus.translink.longitude ]}>
                            <Popup>Vehicle id: { bus.translink.vehicleId }</Popup>
                        </Marker>
                    )
                }) }
            </MapContainer>
        </div>
    );
}

export default App;
