import React, { useState, useEffect, useRef } from 'react';
import { SectionHeading } from './SectionHeading';
import { MapPin, Calculator as CalcIcon, Navigation, Clock, Plane, Truck, Globe, Weight, Snowflake, Zap, Moon } from 'lucide-react';
import L from 'leaflet';

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
  { name: 'Custom Route', miles: 100, coords: [31.5493, -97.1467] }, 
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

interface CalculatorProps {
  onBook?: (details: { pickupAddress?: string; deliveryAddress?: string; itemDescription?: string }) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ onBook }) => {
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
  const BASE_FEE = 95;
  const RATE_PER_MILE = 1.50;
  const ROUND_TRIP_MULTIPLIER = 2;

  // Ground Calculation
  useEffect(() => {
    const miles = selectedDest.name === 'Custom Route' ? customMiles : selectedDest.miles;
    let cost = (miles * ROUND_TRIP_MULTIPLIER * RATE_PER_MILE) + BASE_FEE;

    // Add-on Surcharges
    if (isHeavy) cost += 75; 
    if (isRefrigerated) cost += 150; 

    // Multipliers
    if (isHazmat) cost *= 1.35; 
    if (isAfterHours) cost *= 1.04; 

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

    if (mode !== 'air' && mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
      markersRef.current = [];
      routePolyline.current = null;
    }

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

    const originMarker = L.marker(AUSTIN_COORDS, { icon: originIcon }).addTo(map);
    const destMarker = L.marker(targetCoords, { icon: destIcon }).addTo(map);
    markersRef.current.push(originMarker, destMarker);

    routePolyline.current = L.polyline([AUSTIN_COORDS, targetCoords], {
      className: 'route-path-air',
      weight: 3,
      opacity: 0.8,
      smoothFactor: 1
    }).addTo(map);

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

  const getZoomForDistance = (miles: number) => {
    if (miles <= 100) return 9;
    if (miles <= 200) return 8;
    if (miles <= 400) return 7;
    return 6;
  };

  const isCustom = selectedDest.name === 'Custom Route';
  const destQuery = `${selectedDest.name}, TX`;
  const routeZoom = getZoomForDistance(isCustom ? customMiles : selectedDest.miles);
  const googleMapSrc = isCustom
    ? `https://maps.google.com/maps?q=Texas&t=m&z=6&output=embed&iwloc=near`
    : `https://maps.google.com/maps?saddr=Austin,+TX&daddr=${encodeURIComponent(destQuery)}&z=${routeZoom}&output=embed`;

  return (
    <section className="py-20 bg-obsidian border-b border-white/5 relative overflow-hidden" id="estimator">
      {/* Background grid ornament */}
      <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
        <CalcIcon size={250} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left Column: Calculator Controls */}
          <div>
            <SectionHeading
              title="Rate Estimator"
              subtitle="Select your service level to estimate logistics costs."
            />

            <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl relative">
              {/* Card top border highlight */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Mode Tabs (Pill Control Style) */}
              <div className="grid grid-cols-2 p-1.5 bg-white/[0.01] border-b border-white/5">
                <button
                  onClick={() => setMode('ground')}
                  className={`py-3 flex items-center justify-center space-x-2 font-bold uppercase tracking-wider text-xs md:text-sm transition-all duration-300 rounded-2xl cursor-pointer ${
                    mode === 'ground' 
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-950/20' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Truck className="h-4 w-4" />
                  <span>Expedited Ground</span>
                </button>
                <button
                  onClick={() => setMode('air')}
                  className={`py-3 flex items-center justify-center space-x-2 font-bold uppercase tracking-wider text-xs md:text-sm transition-all duration-300 rounded-2xl cursor-pointer ${
                    mode === 'air' 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-950/20' 
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Plane className="h-4 w-4" />
                  <span>Air Hand Carry</span>
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-6">

                {mode === 'ground' ? (
                  <>
                    {/* GROUND INPUTS */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 font-display">Destination (From Austin HQ)</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-red-600 h-5 w-5 z-10" />
                        <select
                          value={selectedDest.name}
                          onChange={handleDestChange}
                          className="w-full glass-input text-white pl-12 pr-10 py-4 rounded-xl focus:outline-none appearance-none font-bold uppercase tracking-wide cursor-pointer text-sm font-accent"
                        >
                          {destinations.map(d => (
                            <option key={d.name} value={d.name} className="bg-slate-950 text-white">{d.name}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>

                    {/* Slider for Custom */}
                    <div className={`transition-all duration-300 overflow-hidden ${selectedDest.name === 'Custom Route' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="pt-2 pb-3">
                        <label className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 font-display">
                          <span>Distance (One Way Miles)</span>
                          <span className="text-red-500 font-mono font-bold text-sm">{customMiles} mi</span>
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="800"
                          value={customMiles}
                          onChange={(e) => setCustomMiles(Number(e.target.value))}
                          className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 font-display">Shipment Specifics</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setIsHeavy(!isHeavy)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                            isHeavy 
                              ? 'bg-red-950/20 border-red-500/50 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]' 
                              : 'bg-white/[0.01] border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
                          }`}
                        >
                          <Weight className={`mb-1.5 h-4.5 w-4.5 ${isHeavy ? 'text-red-500' : 'text-slate-500'}`} />
                          <span className="text-[10px] uppercase font-bold tracking-wider font-display">Heavy (100lb+)</span>
                        </button>

                        <button
                          onClick={() => setIsRefrigerated(!isRefrigerated)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                            isRefrigerated 
                              ? 'bg-blue-950/20 border-blue-500/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                              : 'bg-white/[0.01] border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
                          }`}
                        >
                          <Snowflake className={`mb-1.5 h-4.5 w-4.5 ${isRefrigerated ? 'text-blue-500' : 'text-slate-500'}`} />
                          <span className="text-[10px] uppercase font-bold tracking-wider font-display">Refrigerated</span>
                        </button>

                        <button
                          onClick={() => setIsHazmat(!isHazmat)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                            isHazmat 
                              ? 'bg-yellow-950/20 border-yellow-500/50 text-white shadow-[0_0_15px_rgba(234,179,8,0.15)]' 
                              : 'bg-white/[0.01] border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
                          }`}
                        >
                          <Zap className={`mb-1.5 h-4.5 w-4.5 ${isHazmat ? 'text-yellow-500' : 'text-slate-500'}`} />
                          <span className="text-[10px] uppercase font-bold tracking-wider font-display">Hazmat / DG</span>
                        </button>

                        <button
                          onClick={() => setIsAfterHours(!isAfterHours)}
                          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                            isAfterHours 
                              ? 'bg-purple-950/20 border-purple-500/50 text-white shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                              : 'bg-white/[0.01] border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
                          }`}
                        >
                          <Moon className={`mb-1.5 h-4.5 w-4.5 ${isAfterHours ? 'text-purple-500' : 'text-slate-500'}`} />
                          <span className="text-[10px] uppercase font-bold tracking-wider font-display">After Hours</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* AIR INPUTS */}
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 font-display">Destination Airport / Hub</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 h-5 w-5 z-10" />
                        <select
                          value={selectedAirDest.name}
                          onChange={handleAirDestChange}
                          className="w-full glass-input text-white pl-12 pr-10 py-4 rounded-xl focus:outline-none appearance-none font-bold uppercase tracking-wide cursor-pointer text-sm font-accent"
                        >
                          {airDestinations.map(d => (
                            <option key={d.name} value={d.name} className="bg-slate-950 text-white">{d.name}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                      <div className={`h-2.5 w-2.5 rounded-full ${selectedAirDest.type === 'Domestic' ? 'bg-blue-500' : 'bg-orange-500'} animate-pulse`}></div>
                      <span className="text-slate-300 font-bold text-xs uppercase font-display tracking-wider">{selectedAirDest.type} Hand Carry Dispatch</span>
                    </div>
                  </>
                )}

                <div className="h-[1px] bg-white/5 my-4"></div>

                {/* Pricing Details Breakdown */}
                {mode === 'ground' ? (
                  <div className="flex flex-col space-y-2 font-display text-xs md:text-sm">
                    <div className="flex justify-between items-center font-medium text-slate-500">
                      <span>Base Dispatch Fee:</span>
                      <span className="text-white">${BASE_FEE}.00</span>
                    </div>
                    <div className="flex justify-between items-center font-medium text-slate-500">
                      <span>Mileage ({currentMiles} mi × 2):</span>
                      <span className="text-white">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(currentMiles * 2 * RATE_PER_MILE)}</span>
                    </div>
                    {(isHeavy || isRefrigerated || isHazmat || isAfterHours) && (
                      <div className="flex justify-between items-center font-medium text-red-400/80 pt-2 border-t border-white/5 mt-1">
                        <span>Surcharges & Fees:</span>
                        <span className="font-bold">+ {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(groundCost - ((currentMiles * ROUND_TRIP_MULTIPLIER * RATE_PER_MILE) + BASE_FEE))}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2 font-display text-xs md:text-sm">
                    <div className="flex justify-between items-center font-medium text-slate-500">
                      <span>Courier Day Rate (Est):</span>
                      <span className="text-white">${selectedAirDest.courierFee}</span>
                    </div>
                    <div className="flex justify-between items-center font-medium text-slate-500">
                      <span>Airfare & Admin Booking (Est):</span>
                      <span className="text-white">${selectedAirDest.flightEst}</span>
                    </div>
                  </div>
                )}

                {/* Total Cost Glow Box */}
                <div className="bg-white/[0.01] border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] p-6 flex flex-col items-start justify-center rounded-2xl relative overflow-hidden">
                  <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-15 transition-all duration-500 pointer-events-none ${mode === 'ground' ? 'bg-red-600' : 'bg-blue-600'}`} />
                  
                  <span className={`${mode === 'ground' ? 'text-red-400' : 'text-blue-400'} font-bold uppercase tracking-widest text-[9px] mb-1 font-display`}>Estimated Total</span>
                  <div className="text-4xl md:text-5xl font-black text-white tracking-tighter font-display z-10">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(mode === 'ground' ? groundCost : airCost)}
                  </div>
                  {mode === 'air' && <span className="text-[9px] text-slate-500 mt-2 font-medium uppercase font-display z-10">*Includes carry-on logistics & last mile delivery</span>}
                </div>

                {onBook && (
                  <button
                    type="button"
                    onClick={() => {
                      const pickup = "Austin HQ";
                      let delivery = "";
                      let desc = "";
                      if (mode === 'ground') {
                        delivery = selectedDest.name === 'Custom Route' ? '' : `${selectedDest.name}, TX`;
                        desc = [
                          'Ground Dispatch',
                          isHeavy ? 'Heavy Cargo (100lb+)' : '',
                          isRefrigerated ? 'Refrigerated Cargo' : '',
                          isHazmat ? 'Hazmat/Dangerous Goods' : '',
                          isAfterHours ? 'After-Hours Delivery' : ''
                        ].filter(Boolean).join(', ');
                      } else {
                        delivery = `${selectedAirDest.name} Airport`;
                        desc = `Air Hand Carry Courier Service (${selectedAirDest.type})`;
                      }
                      onBook({ pickupAddress: pickup, deliveryAddress: delivery, itemDescription: desc });
                    }}
                    className={`w-full py-4 px-4 rounded-full font-bold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center space-x-2 border cursor-pointer ${
                      mode === 'ground'
                        ? 'bg-red-600 border-red-500/20 hover:bg-red-700 text-white shadow-lg shadow-red-950/20'
                        : 'bg-blue-600 border-blue-500/20 hover:bg-blue-700 text-white shadow-lg shadow-blue-950/20'
                    }`}
                  >
                    <span>Book This Delivery</span>
                  </button>
                )}

                <p className="text-[10px] text-slate-500 italic leading-relaxed text-center">
                  *Quote is an estimate for planning purposes. Flight prices fluctuate hourly. Final fixed price provided upon booking.
                </p>

              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Preview */}
          <div className="hidden lg:flex flex-col h-full min-h-[300px] lg:min-h-[400px]">
            <div className="flex items-center space-x-2 mb-4">
              {mode === 'ground' ? <Navigation className="text-red-500 h-4 w-4" /> : <Plane className="text-blue-500 h-4 w-4" />}
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">Route Preview</h3>
            </div>

            <div className="flex-grow glass-panel rounded-3xl overflow-hidden relative group">
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
                  className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  loading="lazy"
                ></iframe>
              ) : (
                <div ref={mapContainer} className="w-full h-full z-0 bg-slate-100"></div>
              )}

              {/* Overlay Data Card */}
              <div className="absolute bottom-0 left-0 w-full bg-slate-950/70 border-t border-white/5 p-6 backdrop-blur-md z-[1000]">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/5 border border-white/8 p-3 rounded-2xl text-slate-300">
                      {mode === 'ground' ? <Navigation className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-display">{mode === 'ground' ? 'Total Distance' : 'Zone'}</div>
                      <div className="text-lg md:text-xl font-bold font-display text-white">
                        {mode === 'ground' ? (
                          <>
                            {currentMiles} <span className="text-xs text-slate-500 font-normal font-sans">mi</span>
                          </>
                        ) : (
                          selectedAirDest.type
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white/5 border border-white/8 p-3 rounded-2xl text-slate-300">
                      <Clock className={`${mode === 'ground' ? 'text-red-500' : 'text-blue-500'} h-5 w-5`} />
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold font-display">Est. Transit Time</div>
                      <div className="text-lg md:text-xl font-bold font-display text-white">
                        {mode === 'ground' ? groundEta : selectedAirDest.time}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Fading Line Indicator */}
                <div className="mt-6 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase font-display tracking-widest">
                  <span>Austin, TX</span>
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-600 to-transparent flex-grow mx-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-slate-900 px-3 text-[9px] text-slate-400 font-bold border border-white/5 rounded-full py-0.5 backdrop-blur-md">
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