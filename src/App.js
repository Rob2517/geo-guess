import React from 'react';
import StateProvider from './components/StateProvider';
import GeoGame from './components/GeoGame';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div className="App">
      <StateProvider>
        <GeoGame />
      </StateProvider>
    </div>
  );
}

export default App;