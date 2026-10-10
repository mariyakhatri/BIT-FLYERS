import { useState } from 'react';
import { Plane, LayoutDashboard, Radio, Eye, Map as MapIcon, History, Settings, AlertTriangle, MapPin, Download, Send, Plus, Minus, X, Search, Camera, Pause, Play, Check, Shield, User } from 'lucide-react';
import { NAV, KPIS, RECENT, LOG, DETS, STREAM } from './data';
import './App.css';

const ICONS = { overview: LayoutDashboard, live: Radio, ai: Eye, map: MapIcon, history: History, settings: Settings };
const BADGE = { QUEUED: 'b-a', BROADCAST: 'b-i', EXECUTED: 'b-g', CONFIRMED: 'b-g' };

function Thumb({ src, tone = '', label, h = 90 }) {
  const [bad, setBad] = useState(!src);
  return (
    <div className={`thumb ${tone}`} style={{ height: h }}>
      {!bad && <img src={src} alt={label || 'Detection imagery'} onError={() => setBad(true)} />}
      {label && <span className="tag">{label}</span>}
    </div>
  );
}

function MapView({ big, zoom = 1, route, layer }) {
  const hue = layer === 'Satellite' ? '#0d2417' : layer === 'Topo / Elevation' ? '#1f1a0c' : '#08111d';
  return (
    <div className={`map ${big ? 'big' : ''}`} style={{ height: big ? undefined : 250, background: hue }}>
      <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" style={{ transform: `scale(${zoom})` }} role="img" aria-label="Simulated tactical grid map">
        {[...Array(12)].map((_, i) => <line key={'v' + i} x1={i * 55} y1="0" x2={i * 55} y2="340" stroke="#1b2740" />)}
        {[...Array(7)].map((_, i) => <line key={'h' + i} x1="0" y1={i * 55} x2="600" y2={i * 55} stroke="#1b2740" />)}
        <polygon points="330,40 560,90 520,300 300,240" fill="#3ee8b01c" stroke="#3ee8b0" strokeDasharray="4" />
        <path d="M30 280 C150 120 250 300 380 160" fill="none" stroke="#3ee8b0" strokeWidth="1.5" strokeDasharray="5" />
        {route && <path d="M60 300 L200 220 L330 190 L430 130" fill="none" stroke="#22c55e" strokeWidth="3" />}
        <circle cx="430" cy="130" r="9" fill="#f5b73b" /><circle cx="300" cy="170" r="6" fill="#ef4444" /><circle cx="200" cy="220" r="6" fill="#38bdf8" />
        <text x="440" y="124" fill="#f5b73b" fontSize="10">SURVIVOR #02</text>
        <text x="310" y="166" fill="#ff8a8a" fontSize="10">ROAD BLOCKED</text>
      </svg>
    </div>
  );
}

function Header({ demo, rth, setRth }) {
  return (
    <header className="hdr">
      <div className="logo"><Plane size={18} color="var(--mint)" /><div>VAYU VEER <span className="badge b-g">AI-SAR</span><small>BIT FLYERS TACTICAL</small></div></div>
      <span className="badge b-g">RTK LOCKED · 18 SATS</span>
      <span className="badge b-r"><AlertTriangle size={10} /> ALERT LEVEL 2: FLASH FLOOD</span>
      <span className="mut"><MapPin size={10} /> Sector 4 Flood Operations</span>
      <span className="sp" />
      <span className="mut">LAT: 14ms</span>
      <button className="btn-r" onClick={() => { setRth(!rth); demo(rth ? 'Return-to-home cancelled (simulated).' : 'Emergency RTH engaged (simulated, no real drone).'); }} aria-pressed={rth}>
        {rth ? 'RTH ACTIVE' : 'EMERGENCY RTH'}
      </button>
      <span className="badge b-g" aria-label="Operator"><User size={11} /></span>
    </header>
  );
}

function Sidebar({ page, setPage }) {
  return (
    <nav className="side" aria-label="Main navigation">
      <div className="cap">Mission Systems</div>
      {NAV.map((n) => {
        const I = ICONS[n.icon];
        return (
          <button key={n.id} className={`nav ${page === n.id ? 'on' : ''}`} onClick={() => setPage(n.id)} aria-current={page === n.id ? 'page' : undefined}>
            <I size={14} /> {n.label}
            {n.badge && <span className="badge b-a">{n.badge}</span>}
            {n.dot && <span className="dot" />}
          </button>
        );
      })}
      <div className="foot">
        <div><div className="row sp"><span className="up">UAV-01 Link</span><span className="mut">5.8 GHz</span></div><div className="row sp"><span className="up">Battery Level</span><b>78%</b></div><div className="bar"><i style={{ width: '78%' }} /></div></div>
        <div className="row"><span className="badge b-g"><User size={11} /></span><div>Oper. Sharma<br /><span className="mut">Team BIT FLYERS</span></div><Shield size={12} className="mut" style={{ marginLeft: 'auto' }} /></div>
      </div>
    </nav>
  );
}

function Overview({ demo }) {
  const [layer, setLayer] = useState('FLIR Thermal');
  const [sent, setSent] = useState(false);
  const [recent, setRecent] = useState(RECENT);
  const [done, setDone] = useState({});
  return (
    <>
      <div className="row sp">
        <div><h1>Mission Overview <span className="badge b-g">Active Search Patrol</span> <span className="badge b-a">Sim-Data Mode</span></h1>
          <div className="mut">Autonomous search &amp; rescue telemetry for UAV-01 in Sector 4 Flash Flood Zone. Real-time GIS &amp; edge computer vision stream (simulated).</div></div>
        <div className="row">
          <button onClick={() => demo('Mission log export is a demo; no file was created.')}><Download size={12} /> Export Log</button>
          <button className="btn-g" disabled={sent} onClick={() => { setSent(true); demo('Ground unit dispatch queued (simulated).'); }}><Send size={12} /> {sent ? 'Dispatch Queued (Demo)' : 'Dispatch Ground Unit (NDRF)'}</button>
        </div>
      </div>
      <div className="g4">{KPIS.map(([a, b, c]) => <div className="card kpi" key={a}><span className="up">{a}</span><b>{b}</b><span className="mut">{c}</span></div>)}</div>
      <div className="g2">
        <div className="card">
          <div className="ct">Tactical Aerial Grid // GIS-2D <span className="badge b-g">UAV-01 Locked</span></div>
          <div className="tabs">{['FLIR Thermal', 'Satellite', 'Topo / Elevation'].map((t) => <button key={t} className={layer === t ? 'on' : ''} onClick={() => setLayer(t)}>{t}</button>)}</div>
          <MapView layer={layer} />
          <div className="mut" style={{ marginTop: 6 }}>Grid resolution: 0.25m GSD · {layer} (simulated visualization)</div>
        </div>
        <div className="card">
          <div className="ct">Recent AI Detections <span className="badge b-g">TensorRT Accel</span></div>
          {recent.map((r) => (
            <div className="item" key={r.id}>
              <Thumb tone={r.tone} src={r.hazard ? '/images/powerline.jpg' : '/images/survivor04.jpg'} label={r.conf} h={80} />
              <div><div className="row sp"><b style={{ color: r.hazard ? 'var(--amb)' : 'var(--mint)' }}>{r.title}</b><span className="mut">{r.time}</span></div>
                <div className="mut">{r.text}</div>
                <div className="row" style={{ marginTop: 6 }}>
                  <button className={r.hazard ? '' : 'btn-g'} disabled={done[r.id]} onClick={() => { setDone({ ...done, [r.id]: 1 }); demo(`${r.action}: simulated action recorded.`); }}>{done[r.id] ? 'Done (Demo)' : r.action}</button>
                  <button aria-label={`Dismiss ${r.title}`} onClick={() => setRecent(recent.filter((x) => x.id !== r.id))}><X size={11} /></button>
                </div></div>
            </div>
          ))}
          {!recent.length && <div className="mut">No recent detections.</div>}
        </div>
      </div>
      <div className="g2">
        <div className="card"><div className="ct">Tactical Flight Telemetry Log <span className="badge">Auto-Record</span></div>
          <table><thead><tr><th>Timestamp</th><th>Event</th><th>Source Sensor</th><th>Coordinates</th><th>Status</th></tr></thead>
            <tbody>{LOG.map((r) => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><span className={`badge ${BADGE[r[4]]}`}>{r[4]}</span></td></tr>)}</tbody></table></div>
        <div className="card"><div className="ct">Drone Avionics &amp; Edge Compute <span className="badge">UAV-01 Hardware</span></div>
          <div className="kv">{[['Ground Speed', '18.5 km/h'], ['Altitude (AGL)', '42.0 m'], ['GPS Constellation', '18 Sats'], ['RF Link RSSI', '-62 dBm']].map(([a, b]) => <div key={a}><span className="up">{a}</span><b>{b}</b></div>)}</div></div>
      </div>
    </>
  );
}

function RescueMap({ demo }) {
  const [zoom, setZoom] = useState(1);
  const [route, setRoute] = useState(false);
  return (
    <div className="g2" style={{ gridTemplateColumns: '1fr 300px' }}>
      <div>
        <div className="row sp" style={{ marginBottom: 8 }}><b>Rescue Geospatial Operations <span className="badge">SEC-04 Basin</span></b><span className="mut">Delhi Urban Flood Plain · simulated overlay</span></div>
        <div style={{ position: 'relative' }}>
          <div className="mc">
            <button aria-label="Zoom in" onClick={() => setZoom(Math.min(2, zoom + 0.25))}><Plus size={12} /></button>
            <button aria-label="Zoom out" onClick={() => setZoom(Math.max(1, zoom - 0.25))}><Minus size={12} /></button>
          </div>
          <MapView big zoom={zoom} route={route} />
        </div>
      </div>
      <div className="card">
        <div className="up" style={{ color: 'var(--red)' }}>Target Locked &amp; Prioritized</div>
        <h1 style={{ margin: '4px 0' }}>Survivor Cluster #02 <span className="badge b-g">Confirmed</span></h1>
        <div className="mut">Grid: SEC-04-87 · 2 adults detected</div>
        <div className="up" style={{ margin: '10px 0 4px' }}>Nearest Responder Asset</div>
        <div className="kv"><div><span className="up">Distance</span><b>650 m</b></div><div><span className="up">Est. Ingress ETA</span><b style={{ color: 'var(--mint)' }}>8 mins</b></div></div>
        <div className="card" style={{ marginTop: 8 }}><div className="ct">Hydrology &amp; Clearance</div><span className="mut">East Canal corridor is safe for shallow-draft boat ingress. Water clearance depth: 2.4m safe margin.</span></div>
        <div className="card warn" style={{ marginTop: 8 }}><div className="ct" style={{ color: 'var(--red)' }}>Impassable Route Warning</div><span className="mut">West arterial road fully submerged and blocked by 11kV high-voltage power line debris.</span></div>
        <div className="row" style={{ marginTop: 10 }}>
          <button className="btn-g" style={{ width: '100%' }} onClick={() => { setRoute(!route); demo(route ? 'Route hidden.' : 'Safe ingress route drawn (simulated).'); }}>{route ? 'Hide Safe Ingress Route' : 'Generate Safe Ingress Route'}</button>
          <button onClick={() => demo('Relay to NDRF is a demo; nothing was sent.')}>Relay to NDRF</button>
          <button onClick={() => demo('Air drop flag recorded locally (demo).')}>Flag Air Drop</button>
        </div>
      </div>
    </div>
  );
}

function AIDetection({ demo }) {
  const [q, setQ] = useState('');
  const [f, setF] = useState('All');
  const [list, setList] = useState(DETS);
  const [sel, setSel] = useState(DETS[0]);
  const [done, setDone] = useState({});
  const shown = list.filter((d) => (f === 'All' || (f === 'Survivors' ? d.kind === 'survivor' : d.kind === 'hazard')) && d.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="row sp"><h1>AI Detections &amp; Rescue Intelligence <span className="badge b-g">Edge-CV v3.4</span></h1><span className="badge b-a">Demo data · not a live detector</span></div>
      <div className="card amb"><b style={{ color: 'var(--amb)' }}>Protocol Advisory:</b> Confidence scores represent mathematical certainty, not confirmed medical or physical status. Always cross-verify with thermal feed before dispatch.</div>
      <div className="row">
        <div className="tabs" style={{ margin: 0 }}>{['All', 'Survivors', 'Hazards'].map((t) => <button key={t} className={f === t ? 'on' : ''} onClick={() => setF(t)}>{t === 'All' ? `All Detections (${list.length})` : t}</button>)}</div>
        <span className="row"><Search size={12} /><input className="inp" aria-label="Search detections" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} /></span>
        <button onClick={() => demo('All detections marked reviewed (local demo state).')}>Mark Low-Risk Reviewed</button>
      </div>
      <div className="dgrid">
        <div style={{ gridColumn: '1/3', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignContent: 'start' }}>
          {shown.map((d) => (
            <div className="card dc" key={d.id} style={sel?.id === d.id ? { borderColor: 'var(--mint)' } : null}>
              <Thumb tone={d.tone} src={`/images/det-${d.id}.jpg`} label={`${d.status} · ${d.conf}%`} h={130} />
              <div className="in">
                <div className="row sp"><b>{d.title}</b><button aria-label={`Dismiss ${d.title}`} onClick={() => setList(list.filter((x) => x.id !== d.id))}><X size={10} /></button></div>
                <div className="mut">{d.loc}</div>
                <div className="g3" style={{ margin: '6px 0' }}>{d.stats.map(([a, b]) => <div key={a}><span className="up">{a}</span><br /><b>{b}</b></div>)}</div>
                <div className="row"><button className="btn-g" disabled={done[d.id]} onClick={() => { setDone({ ...done, [d.id]: 1 }); demo(`${d.act}: simulated.`); }}>{done[d.id] ? 'Recorded (Demo)' : d.act}</button><button onClick={() => setSel(d)}>Inspect</button></div>
              </div>
            </div>
          ))}
          {!shown.length && <div className="card mut">No detections match your filters.</div>}
          <div className="mut" style={{ gridColumn: '1/3' }}>Showing {shown.length} of {list.length} sample detections</div>
        </div>
        <div className="card">
          <div className="ct">{sel ? `DET-0${sel.id} Inspection` : 'Inspection'} <span className="badge b-g">Live Inspector</span></div>
          {sel ? <><Thumb tone={sel.tone} src={`/images/det-${sel.id}.jpg`} h={110} />
            <div className="kv" style={{ margin: '8px 0' }}>{[['IoU Overlap', '0.88'], ['Edge Latency', '42 ms'], ['Engine', 'TensorRT 8.6'], ['Model Weights', 'FP16-Quant']].map(([a, b]) => <div key={a}><span className="up">{a}</span><b>{b}</b></div>)}</div>
            <div className="up">Verification Audit Log</div>
            <div className="mut">14:26:12 Auto-detected by UAV-01 · 14:26:24 Thermal match cross-check · Awaiting human sign-off</div>
            <button className="btn-g" style={{ width: '100%', marginTop: 8 }} onClick={() => demo('Ground boat dispatch simulated.')}>Dispatch Ground Boat to Survivor</button></>
            : <span className="mut">Select a detection and press Inspect.</span>}
        </div>
      </div>
    </>
  );
}

function LiveMission({ demo }) {
  const [feed, setFeed] = useState('Dual Stream (RGB + FLIR)');
  const [hold, setHold] = useState(false);
  const [alerts, setAlerts] = useState(STREAM);
  return (
    <>
      <div className="row sp">
        <h1>UAV-01 Live Stream <span className="badge b-a">Simulated feed</span></h1>
        <div className="row">{['Dual Stream (RGB + FLIR)', 'RGB (1080P 60FPS)', 'FLIR Lwir'].map((t) => <button key={t} className={feed === t ? 'btn-g' : ''} onClick={() => setFeed(t)}>{t}</button>)}
          <button onClick={() => { setHold(!hold); demo(hold ? 'Hover released (simulated).' : 'Hold / Hover engaged (simulated).'); }} aria-pressed={hold}><Pause size={11} /> {hold ? 'Resume' : 'Hold / Hover'}</button></div>
      </div>
      <div className="g2" style={{ gridTemplateColumns: '1.8fr 1fr' }}>
        <div>
          <Thumb tone={feed.includes('FLIR') && !feed.includes('Dual') ? 't' : 'a'} src="/images/feed.jpg" label={`${feed} · ALT AGL 42.4 m · G-SPEED 14.8 m/s`} h={300} />
          <div className="row" style={{ marginTop: 8 }}>
            <button onClick={() => demo('Snapshot is a demo; no image was saved.')}><Camera size={11} /> Snapshot</button>
            <button onClick={() => demo('Recording toggle is a demo.')}><Play size={11} /> Rec [00:14:28]</button>
            <button className="btn-g" onClick={() => demo('Mark & dispatch simulated.')}>Mark &amp; Dispatch</button>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10 }}>
          <div className="card"><div className="ct">GIS FOV Radar Footprint <span className="badge b-g">Live Sync</span></div><div className="map" style={{ height: 110 }}><svg viewBox="0 0 200 110"><polygon points="100,95 60,10 140,10" fill="#3ee8b030" stroke="#3ee8b0" /><circle cx="100" cy="95" r="5" fill="#3ee8b0" /></svg></div></div>
          <div className="card"><div className="ct">Avionics Telemetry <span className="badge">Bus ID: CAN-01</span></div><div className="kv">{[['Battery 22.4V', '78%'], ['Barometer', '1013 hPa'], ['RTK Fix', '14 Sats Locked'], ['Pitch / Roll', '-3.5° / +1.2°']].map(([a, b]) => <div key={a}><span className="up">{a}</span><b>{b}</b></div>)}</div></div>
        </div>
      </div>
      <div className="card"><div className="ct">AI Detection Stream <span className="badge">{alerts.length} Targets</span></div>
        {alerts.map((a) => <div className="row sp" key={a.id} style={{ padding: '6px 0', borderTop: '1px solid var(--bd)' }}>
          <div><b>{a.title}</b> <span className="badge">Conf {a.conf}</span><div className="mut">{a.loc} · {a.note} · {a.age}</div></div>
          <div className="row"><button className="btn-g" onClick={() => demo(`${a.title}: verify & notify simulated.`)}><Check size={11} /> Verify &amp; Notify</button><button aria-label={`Dismiss ${a.title}`} onClick={() => setAlerts(alerts.filter((x) => x.id !== a.id))}><X size={11} /></button></div></div>)}
        {!alerts.length && <div className="mut">No active targets in the stream.</div>}</div>
    </>
  );
}

function Placeholder({ title }) {
  return <div className="card"><h1>{title}</h1><p className="mut">This section is not part of the four supplied screens. Placeholder page using the same design system.</p></div>;
}

export default function App() {
  const [page, setPage] = useState('overview');
  const [toast, setToast] = useState('');
  const [rth, setRth] = useState(false);
  const demo = (m) => { setToast(m); setTimeout(() => setToast(''), 2600); };
  const pages = {
    overview: <Overview demo={demo} />, map: <RescueMap demo={demo} />, ai: <AIDetection demo={demo} />, live: <LiveMission demo={demo} />,
    history: <Placeholder title="Mission History" />, settings: <Placeholder title="Settings" />,
  };
  return (
    <div className="app">
      <Header demo={demo} rth={rth} setRth={setRth} />
      <Sidebar page={page} setPage={setPage} />
      <main className="main">{pages[page]}</main>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}