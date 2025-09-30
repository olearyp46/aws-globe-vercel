import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import regions from './aws_regions.json';
import { scaleLinear } from 'd3-scale';

export default function App() {
  const globeEl = useRef();
  const [hover, setHover] = useState(null);

  const color = scaleLinear().domain([0, 50, 100]).range(['#d73027', '#fdae61', '#1a9850']);

  useEffect(() => {
    const globe = globeEl.current;
    if (globe) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.4;
    }
  }, []);

  const markers = regions.map(r => ({
    id: r.code,
    lat: r.lat,
    lng: r.lng,
    size: Math.max(0.5, Math.log10(r.carbon_tonnes_per_year) - 4),
    color: color(r.green_score),
    green_score: r.green_score,
    carbon: r.carbon_tonnes_per_year,
    name: r.name
  }));

  return (
    <div style={{height: '100vh', width: '100vw', margin:0}}>
      <Globe
        ref={globeEl}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        pointsData={markers}
        pointLat={d => d.lat}
        pointLng={d => d.lng}
        pointAltitude={d => 0.01 + d.size * 0.001}
        pointRadius={d => 0.5 + d.size * 0.5}
        pointColor={d => d.color}
        onPointHover={setHover}
        pointLabel={d => `\n${d.name} (${d.id})\nGreen score: ${d.green_score}\nCarbon (t/yr): ${d.carbon.toLocaleString()}`}
      />
      {hover && (
        <div style={{position:'absolute', left:20, top:20, background:'rgba(255,255,255,0.9)', padding:12, borderRadius:8}}>
          <strong>{hover.name} ({hover.id})</strong>
          <div>Green score: {hover.green_score}</div>
          <div>Carbon (t/yr): {hover.carbon.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}
