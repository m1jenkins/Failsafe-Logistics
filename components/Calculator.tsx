import React, { useState, useEffect, useRef } from 'react';
import { SectionHeading } from './SectionHeading';
import { MapPin, Calculator as CalcIcon, Navigation, Clock, Plane, Truck, Globe, Weight, Snowflake, Zap, Moon } from 'lucide-react';
import L from 'leaflet';

// Extended interface to include map coordinates
interface DestinationWithCoords {
  name: string;
  miles: number;
  coords: [number, number]; // Lat, Lng
}

interface AirDestinationWithCoords {
  name: string;
  type: string;
  courierFee: number;
  flightEst: number;
  time: string;
  coords: [number, number];
}

const AUSTIN_COORDS: [number, number] = [30.2672, -97.7431];

const destinations: DestinationWithCoords[] = [
  { name: 'Houston', miles: 165, coords: [29.7604, -95.3698] },
  { name: 'Dallas/Fort Worth', miles: 195, coords: [32.7767, -96.7970] },
  { name: 'San Antonio', miles: 80, coords: [29.4241, -98.4936] },
  { name: 'El Paso', miles: 575, coords: [31.7619, -106.4850] },
  { name: 'Custom Route', miles: 100, coords: [31.5493, -97.1467] }, // Approx Waco as placeholder for custom
];

const airDestinations: AirDestinationWithCoords[] = [
  { name: 'New York (JFK)', type: 'Domestic', courierFee: 1500, flightEst: 600, time: '8-10h', coords: [40.6413, -73.7781] },
  { name: 'Los Angeles (LAX)', type: 'Domestic', courierFee: 1500, flightEst: 500, time: '6-8h', coords: [33.9416, -118.4085] },
  { name: 'Chicago (ORD)', type: 'Domestic', courierFee: 1500, flightEst: 450, time: '5-7h', coords: [41.9742, -87.9073] },
  { name: 'London (LHR)', type: 'International', courierFee: 4080, flightEst: 2160, time: '20-24h', coords: [51.4700, -0.4543] },
  { name: 'Frankfurt (FRA)', type: 'International', courierFee: 4080, flightEst: 2520, time: '21-25h', coords: [50.0379, 8.5622] },
  { name: 'Tokyo (HND)', type: 'International', courierFee: 5040, flightEst: 3360, time: '24-30h', coords: [35.5494, 139.7798] },
  { name: 'Dubai (DXB)', type: 'International', courierFee: 4560, flightEst: 2880, time: '22-26h', coords: [25.2532, 55.3657] },
];

export const Calculator: React.FC = () => {
  const [mode, setMode] = useState<'ground' | 'air'>('ground');

  // Ground State
  const [selectedDest, setSelectedDest] = useState<DestinationWithCoords>(destinations[0]);
  const [customMiles, setCustomMiles] = useState<number>(100);

  // Ground Options
  const [isHeavy, setIsHeavy] = useState(false);
  const [isRefrigerated, setIsRefrigerated] = useState(false);
  const [isHazmat, setIsHazmat] = useState(false);
  const [isAfterHours, setIsAfterHours] = useState(false);

  const [groundCost, setGroundCost] = useState<number>(0);
  const [groundEta, setGroundEta] = useState<string>('');

  // Air State
  const [selectedAirDest, setSelectedAirDest] = useState(airDestinations[0]);
  const [airCost, setAirCost] = useState<number>(0);

  // Map Logic
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const routePolyline = useRef<L.Polyline | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Constants
  const BASE_FEE = 175;
  const RATE_PER_MILE = 2.45;
  const ROUND_TRIP_MULTIPLIER = 2;

  // Ground Calculation
  useEffect(() => {
    const miles = selectedDest.name === 'Custom Route' ? customMiles : selectedDest.miles;
    let cost = (miles * ROUND_TRIP_MULTIPLIER * RATE_PER_MILE) + BASE_FEE;

    // Add-on Surcharges
    if (isHeavy) cost += 75; // Heavy Load Liftgate/Handling
    if (isRefrigerated) cost += 150; // Temp Control Vehicle
    if (isHazmat) cost += 95; // Dangerous Goods Handling

    // Multipliers
    if (isAfterHours) cost *= 1.25; // 25% After Hours / Weekend Surcharge

    setGroundCost(cost);

    const hours = Math.floor(miles / 65);
    const minutes = Math.round(((miles / 65) - hours) * 60);
    setGroundEta(`${hours}h ${minutes}m`);
  }, [selectedDest, customMiles, isHeavy, isRefrigerated, isHazmat, isAfterHours]);

  // Air Calculation
  useEffect(() => {
    setAirCost(selectedAirDest.courierFee + selectedAirDest.flightEst);
  }, [selectedAirDest]);

  // Initialize Leaflet Map (ONLY FOR AIR MODE)
  useEffect(() => {
    if (mode === 'air' && mapContainer.current && !mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
        doubleClickZoom: false
      }).setView(AUSTIN_COORDS, 3);

      // Light Tiles for Air
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mapInstance.current);
    }

    // Cleanup when mode changes away from air
    if (mode !== 'air' && mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
      markersRef.current = [];
      routePolyline.current = null;
    }

    // Standard Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markersRef.current = [];
        routePolyline.current = null;
      }
    };
  }, [mode]);

  // Update Leaflet Markers and Route (ONLY FOR AIR MODE)
  useEffect(() => {
    if (mode !== 'air' || !mapInstance.current) return;

    const map = mapInstance.current;

    // Clear existing layers
    if (routePolyline.current) routePolyline.current.remove();
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const targetCoords = selectedAirDest.coords;

    // Create Custom Icons (Light Map Friendly)
    const originIcon = L.divIcon({
      className: 'bg-transparent',
      html: '<div class="marker-pin marker-origin"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });

    const destIcon = L.divIcon({
      className: 'bg-transparent',
      html: `<div class="marker-pin marker-destination-air"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });

    // Add Markers
    const originMarker = L.marker(AUSTIN_COORDS, { icon: originIcon }).addTo(map);
    const destMarker = L.marker(targetCoords, { icon: destIcon }).addTo(map);
    markersRef.current.push(originMarker, destMarker);

    // Draw Animated Route
    routePolyline.current = L.polyline([AUSTIN_COORDS, targetCoords], {
      className: 'route-path-air',
      weight: 3,
      opacity: 0.8,
      smoothFactor: 1
    }).addTo(map);

    // Fit Bounds
    const bounds = L.latLngBounds([AUSTIN_COORDS, targetCoords]);
    map.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: 4,
      animate: true,
      duration: 1
    });

  }, [mode, selectedAirDest]);


  const handleDestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dest = destinations.find(d => d.name === e.target.value);
    if (dest) setSelectedDest(dest);
  };

  const handleAirDestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dest = airDestinations.find(d => d.name === e.target.value);
    if (dest) setSelectedAirDest(dest);
  };

  const currentMiles = selectedDest.name === 'Custom Route' ? customMiles : selectedDest.miles;

  // Google Map Source (Ground Mode)
  const isCustom = selectedDest.name === 'Custom Route';
  const destQuery = `${selectedDest.name}, TX`;
  const googleMapSrc = isCustom
    ? `https://maps.google.com/maps?q=Texas&t=m&z=6&output=embed&iwloc=near`
    : `https://maps.google.com/maps?q=from:Austin,+TX+to:${encodeURIComponent(destQuery)}&t=m&output=embed`;

  return (
    <section className="py-8 lg:py-10 bg-slate-950 relative overflow-hidden" id="estimator">
      {/* Background grid */}
      <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
        <CalcIcon size={250} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* Left Column: Calculator Controls */}
          <div>
            <SectionHeading
              title="Rate Estimator"
              subtitle="Select your service level to estimate logistics costs."
            />

            <div className="bg-slate-900 border border-slate-800 shadow-2xl rounded-xl overflow-hidden">

              {/* Tabs */}
              <div className="grid grid-cols-2 border-b border-slate-800">
                <button
                  onClick={() => setMode('ground')}
                  className={`py-3 flex items-center justify-center space-x-2 font-bold uppercase tracking-wider text-sm transition-all ${mode === 'ground' ? 'bg-slate-800 text-white border-b-2 border-red-600' : 'bg-slate-900 text-slate-500 hover:text-slate-300'}`}
                >
                  <Truck className="h-4 w-4" />
                  <span>Expedited Ground</span>
                </button>
                <button
                  onClick={() => setMode('air')}
                  className={`py-3 flex items-center justify-center space-x-2 font-bold uppercase tracking-wider text-sm transition-all ${mode === 'air' ? 'bg-slate-800 text-white border-b-2 border-blue-500' : 'bg-slate-900 text-slate-500 hover:text-slate-300'}`}
                >
                  <Plane className="h-4 w-4" />
                  <span>Air Hand Carry</span>
                </button>
              </div>

              <div className="p-4 lg:p-5 space-y-3">

                {mode === 'ground' ? (
                  <>
                    {/* GROUND INPUTS */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Destination (From Austin HQ)</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 h-5 w-5" />
                        <select
                          value={selectedDest.name}
                          onChange={handleDestChange}
                          className="w-full bg-slate-950 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-lg focus:ring-1 focus:ring-red-600 focus:outline-none appearance-none font-bold uppercase tracking-wide cursor-pointer hover:border-slate-600 transition-colors"
                        >
                          {destinations.map(d => (
                            <option key={d.name} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Slider for Custom */}
                    <div className={`transition-all duration-300 overflow-hidden ${selectedDest.name === 'Custom Route' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pt-2 pb-3 px-1">
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">Distance (One Way Miles): <span className="text-white">{customMiles} mi</span></label>
                        <input
                          type="range"
                          min="10"
                          max="800"
                          value={customMiles}
                          onChange={(e) => setCustomMiles(Number(e.target.value))}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">Shipment Specifics</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setIsHeavy(!isHeavy)}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200 ${isHeavy ? 'bg-red-900/20 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                        >
                          <Weight className={`mb-1 h-4 w-4 ${isHeavy ? 'text-red-500' : 'text-slate-600'}`} />
                          <span className="text-[9px] uppercase font-bold tracking-wider">Heavy (100lb+)</span>
                        </button>

                        <button
                          onClick={() => setIsRefrigerated(!isRefrigerated)}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200 ${isRefrigerated ? 'bg-blue-900/20 border-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                        >
                          <Snowflake className={`mb-1 h-4 w-4 ${isRefrigerated ? 'text-blue-500' : 'text-slate-600'}`} />
                          <span className="text-[9px] uppercase font-bold tracking-wider">Refrigerated</span>
                        </button>

                        <button
                          onClick={() => setIsHazmat(!isHazmat)}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200 ${isHazmat ? 'bg-yellow-900/20 border-yellow-500 text-white shadow-[0_0_10px_rgba(234,179,8,0.2)]' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                        >
                          <Zap className={`mb-1 h-4 w-4 ${isHazmat ? 'text-yellow-500' : 'text-slate-600'}`} />
                          <span className="text-[9px] uppercase font-bold tracking-wider">Hazmat / DG</span>
                        </button>

                        <button
                          onClick={() => setIsAfterHours(!isAfterHours)}
                          className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all duration-200 ${isAfterHours ? 'bg-purple-900/20 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.2)]' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                        >
                          <Moon className={`mb-1 h-4 w-4 ${isAfterHours ? 'text-purple-500' : 'text-slate-600'}`} />
                          <span className="text-[9px] uppercase font-bold tracking-wider">After Hours</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* AIR INPUTS */}
                    <div>
                      <label className="block text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">Destination Airport / Hub</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 h-5 w-5" />
                        <select
                          value={selectedAirDest.name}
                          onChange={handleAirDestChange}
                          className="w-full bg-slate-950 border border-slate-700 text-white pl-12 pr-4 py-4 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none appearance-none font-bold uppercase tracking-wide cursor-pointer hover:border-slate-600 transition-colors"
                        >
                          {airDestinations.map(d => (
                            <option key={d.name} value={d.name}>{d.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-slate-950/50 border border-slate-800 rounded-lg">
                      <div className={`h-2 w-2 rounded-full ${selectedAirDest.type === 'Domestic' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                      <span className="text-slate-300 font-medium text-sm uppercase">{selectedAirDest.type} Operation</span>
                    </div>
                  </>
                )}

                <div className="h-px bg-slate-800 my-4"></div>

                {/* Logic Display */}
                {mode === 'ground' ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                      <span>Base Fee:</span>
                      <span>${BASE_FEE}.00</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                      <span>Mileage ({currentMiles} mi × 2):</span>
                      <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentMiles * 2 * RATE_PER_MILE)}</span>
                    </div>
                    {(isHeavy || isRefrigerated || isHazmat || isAfterHours) && (
                      <div className="flex justify-between items-center text-sm font-medium text-red-400 pt-2 border-t border-slate-800/50 mt-1">
                        <span>Surcharges & Fees:</span>
                        <span>+ {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(groundCost - ((currentMiles * ROUND_TRIP_MULTIPLIER * RATE_PER_MILE) + BASE_FEE))}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                      <span>Courier Day Rate (Est):</span>
                      <span>${selectedAirDest.courierFee}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                      <span>Airfare & Admin (Est):</span>
                      <span>${selectedAirDest.flightEst}</span>
                    </div>
                  </div>
                )}

                {/* Total Cost */}
                <div className={`bg-black/40 p-4 border-l-4 ${mode === 'ground' ? 'border-red-600' : 'border-blue-500'} flex flex-col items-start justify-center rounded-r-xl transition-colors duration-300`}>
                  <span className={`${mode === 'ground' ? 'text-red-500' : 'text-blue-500'} font-bold uppercase tracking-widest text-xs mb-1`}>Estimated Total</span>
                  <div className="text-4xl font-bold text-white tracking-tighter">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(mode === 'ground' ? groundCost : airCost)}
                  </div>
                  {mode === 'air' && <span className="text-xs text-slate-500 mt-2 font-medium uppercase">*Includes carry-on logistics & last mile</span>}
                </div>

                <p className="text-xs text-slate-600 italic">
                  *Quote is an estimate for planning purposes. Flight prices fluctuate hourly. Final fixed price provided upon booking.
                </p>

              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Preview */}
          <div className="flex flex-col h-full min-h-[180px] lg:min-h-[240px] lg:mt-0 mt-4">
            <div className="flex items-center space-x-2 mb-4">
              {mode === 'ground' ? <Navigation className="text-red-500 h-5 w-5" /> : <Plane className="text-blue-500 h-5 w-5" />}
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Route Preview</h3>
            </div>

            <div className="flex-grow bg-slate-900 border border-slate-800 rounded-xl overflow-hidden relative group">
              {/* Conditionally Render Map Source */}
              {mode === 'ground' ? (
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  title="Route Map"
                  src={googleMapSrc}
                  className="w-full h-full opacity-100"
                ></iframe>
              ) : (
                <div ref={mapContainer} className="w-full h-full min-h-[180px] lg:min-h-[240px] z-0 bg-slate-100"></div>
              )}

              {/* Overlay Data Card */}
              <div className="absolute bottom-0 left-0 w-full bg-slate-950/90 border-t border-slate-800 p-4 backdrop-blur-md z-[1000]">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-800 p-2 rounded-full">
                      {mode === 'ground' ? <Navigation className="text-white h-5 w-5" /> : <Globe className="text-white h-5 w-5" />}
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{mode === 'ground' ? 'Total Distance' : 'Zone'}</div>
                      <div className="text-lg md:text-xl font-mono text-white font-bold">
                        {mode === 'ground' ? (
                          <>
                            {currentMiles} <span className="text-sm text-slate-500 font-normal">mi</span>
                          </>
                        ) : (
                          selectedAirDest.type
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-800 p-2 rounded-full">
                      <Clock className={`${mode === 'ground' ? 'text-red-500' : 'text-blue-500'} h-5 w-5`} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Est. Transit Time</div>
                      <div className="text-lg md:text-xl font-mono text-white font-bold">
                        {mode === 'ground' ? groundEta : selectedAirDest.time}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Visualization Line (Decorative) */}
                <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500 uppercase">
                  <span>Austin, TX</span>
                  <div className="h-px bg-slate-700 flex-grow mx-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-950 px-2 text-slate-600">
                      {mode === 'ground' ? 'DIRECT DRIVE' : 'NEXT FLIGHT'}
                    </div>
                  </div>
                  <span>
                    {mode === 'ground'
                      ? (selectedDest.name === 'Custom Route' ? 'Destination' : selectedDest.name)
                      : selectedAirDest.name
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};