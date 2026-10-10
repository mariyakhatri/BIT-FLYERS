export const NAV = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'live', label: 'Live Mission', icon: 'live', dot: true },
  { id: 'ai', label: 'AI Detection', icon: 'ai', badge: 'ACTIVE' },
  { id: 'map', label: 'Rescue Map', icon: 'map' },
  { id: 'history', label: 'Mission History', icon: 'history' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];
export const KPIS = [
  ['Survivors Identified', '4', '4 confirmed · +2 last 15 min'],
  ['Active Hazards', '3', '1 flood surge, 2 critical debris'],
  ['Area Surveyed', '1.42 km²', 'Sector 4 sweep · 71% complete'],
  ['Power Cell Level', '78%', '22.4V LiPo · ~24 min flight remaining'],
];
export const RECENT = [
  { id: 'r1', title: 'Survivor #04', time: '14:28:10', text: 'Rooftop shelter, 2 persons signaling. Water depth encroaching platform.', conf: '94.2%', action: 'Queue Rescue Boat', tone: 't' },
  { id: 'r2', title: 'Power Line Down', time: '14:18:44', text: '11kV active electrical line collapsed into secondary evacuation tributary.', conf: '84.5%', action: 'Broadcast Hazard to Crews', tone: 'd', hazard: true },
];
export const LOG = [
  ['14:28:10', 'Survivor Found (#04 Cluster)', 'YOLOv8-SAR Thermal', '28.6142° N, 77.2194° E', 'QUEUED'],
  ['14:25:30', 'Flood Crest Warning (+1.8m surge)', 'Hydrologic Sonar/RGB', '28.6128° N, 77.2201° E', 'BROADCAST'],
  ['14:20:00', 'Grid Sweep Initiated (Sector 4-B)', 'Mission Computer #1', '28.6139° N, 77.2090° E', 'EXECUTED'],
  ['14:14:12', 'Survivor Found (#03 Single Rooftop)', 'FLIR Thermal AI', '28.6151° N, 77.2078° E', 'CONFIRMED'],
];
export const DETS = [
  { id: 4, title: 'Potential Survivor #04', kind: 'survivor', status: 'UNVERIFIED', conf: 94.2, loc: 'Sector 4-B · Rooftop Ridge', tone: 'a', stats: [['Thermal Sig', '36.8°C NORM'], ['Surround Water', '1.8m RISE'], ['Urgency', 'CRITICAL']], act: 'Confirm & Notify Rescue' },
  { id: 5, title: 'Flash Flood Torrent', kind: 'hazard', status: 'CONFIRMED HAZARD', conf: 91.0, loc: 'Bithoor Link Bridge · Sector 3 Passage', tone: 'd', stats: [['Flow Velocity', '4.8 m/s'], ['Surface Depth', '2.1m'], ['Transit Status', 'SEVERED']], act: 'Broadcast Road Blockage' },
  { id: 3, title: 'Potential Survivor #03', kind: 'survivor', status: 'DISPATCHED', conf: 89.0, loc: 'Grid 12A · Warehouse Attic Cavity', tone: 't', stats: [['Thermal Sig', '37.1°C NORM'], ['Surround Water', '0.9m'], ['Urgency', 'HIGH']], act: 'Team Bravo-4 in transit' },
  { id: 7, title: 'Power Line Down', kind: 'hazard', status: 'FLAGGED', conf: 84.5, loc: 'Sector 4 Substation Feed Line', tone: 'd', stats: [['Grid Status', '11kV ACTIVE'], ['Electrocution Risk', 'HIGH'], ['Source', 'InfraScan Edge']], act: 'Request Grid De-energize' },
];
export const STREAM = [
  { id: 3, title: 'Survivor #03', conf: '94.2%', loc: 'Flooded Rooftop B-14', note: 'Urgent rescue needed', age: '12s ago', tone: 'g' },
  { id: 8, title: 'Flash Flood Surge', conf: '91.0%', loc: 'Bridge Checkpoint North', note: 'Current velocity 2.4 m/s', age: '38s ago', tone: 'r' },
  { id: 9, title: 'Vehicle Submerged', conf: '78.0%', loc: 'Sector 4 Arterial Junction', note: 'Occupancy unknown', age: '1m 12s ago', tone: 'a' },
];