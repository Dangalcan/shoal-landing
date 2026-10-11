// Shared icons (inline SVG so we don't depend on lucide network)
const Icon = {
  Server: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/>
      <line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  Dashboard: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9"/>
      <rect x="14" y="3" width="7" height="5"/>
      <rect x="14" y="12" width="7" height="9"/>
      <rect x="3" y="16" width="7" height="5"/>
    </svg>
  ),
  Box: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Package: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  FileCode: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <polyline points="10 13 8 15 10 17"/>
      <polyline points="14 17 16 15 14 13"/>
    </svg>
  ),
  Terminal: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/>
      <line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  ),
  Settings: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Plus: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Refresh: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  ),
  Eye: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Check: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  CheckCircle: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  Star: ({s=14, c="#f59e0b", filled=true}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? c : "none"} stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  Download: ({s=14, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  ChevronDown: ({s=14, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Sparkles: ({s=18, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.9 5.7L19.5 10l-5.6 1.4L12 17l-1.9-5.6L4.5 10l5.6-1.3z"/>
      <path d="M19 17l.7 2.1L22 20l-2.3.9L19 23l-.7-2.1L16 20l2.3-.9z"/>
    </svg>
  ),
  Trash: ({s=14, c="currentColor"}) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    </svg>
  ),
  Cursor: () => (
    <svg viewBox="0 0 22 28" width="22" height="28" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 2 L3 22 L8.5 17 L11.8 24.5 L15 23 L11.7 15.5 L19 14.5 Z"
            fill="white" stroke="#0f172a" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  )
};

// Sidebar shell shared across scenes
function AppShell({ activeRoute = "/", children, context = "kind-shoal", titleSubtext = "" }) {
  const links = [
    { route: "/", icon: "Dashboard", label: "Dashboard" },
    { route: "/clusters", icon: "Server", label: "Clusters" },
    { route: "/manifests", icon: "FileCode", label: "Manifests" },
    { route: "/migration", icon: "Box", label: "Migrate" },
    { route: "/terminal", icon: "Terminal", label: "Terminal" },
    { route: "/port-forwards", icon: "Refresh", label: "Port Forwards" },
    { route: "/plugins", icon: "Package", label: "Plugins" },
    { route: "/settings", icon: "Settings", label: "Settings" },
  ];
  return (
    <div className="app-window">
      <div className="app-titlebar">
        <div className="app-titlebar-title">Shoal {titleSubtext && `· ${titleSubtext}`}</div>
        <div className="app-controls">
          <span className="min"/><span className="max"/><span className="close"/>
        </div>
      </div>
      <div className="app-body">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-title">
              <img src="assets/icon.png" alt="" style={{width: 24, height: 24, borderRadius: 6}}/>
              <span>Shoal</span>
            </h1>
            <div className="sidebar-context">
              <span className="sidebar-context-label">Context</span>
              <span className="sidebar-context-value">{context}</span>
              <Icon.ChevronDown s={12} c="#94a3b8"/>
            </div>
          </div>
          <nav className="sidebar-nav">
            {links.map(l => {
              const Ico = Icon[l.icon];
              const isActive = l.route === activeRoute;
              return (
                <div key={l.route} className={"sidebar-link " + (isActive ? "active" : "")}>
                  <Ico s={18}/>
                  <span>{l.label}</span>
                </div>
              );
            })}
          </nav>
          <div className="sidebar-footer">v0.9.0</div>
        </aside>
        <main className="main">
          {children}
        </main>
      </div>
    </div>
  );
}

// Animated cursor that moves between [x1,y1] -> [x2,y2] over progress
function AnimatedCursor({ path, t, click = null }) {
  // path: [{x,y,at}] where at is 0..1
  let x = path[0].x, y = path[0].y;
  for (let i=0; i<path.length-1; i++) {
    const a = path[i], b = path[i+1];
    if (t >= a.at && t <= b.at) {
      const local = (t - a.at) / Math.max(0.0001, b.at - a.at);
      const eased = Easing.easeInOutCubic(local);
      x = a.x + (b.x - a.x) * eased;
      y = a.y + (b.y - a.y) * eased;
      break;
    } else if (t > b.at) {
      x = b.x; y = b.y;
    }
  }
  // click pulse
  let pulse = 0;
  if (click != null) {
    const d = Math.abs(t - click);
    if (d < 0.3) pulse = (1 - d / 0.3);
  }
  return (
    <>
      <div className="cursor" style={{ left: x, top: y }}>
        <Icon.Cursor/>
      </div>
      {pulse > 0 && (
        <div style={{
          position: "absolute",
          left: x - 10, top: y + 4,
          width: 24, height: 24,
          borderRadius: "50%",
          border: "2px solid rgb(37 99 235)",
          opacity: pulse * 0.7,
          transform: `scale(${1 + (1-pulse) * 1.6})`,
          pointerEvents: "none",
          zIndex: 199,
        }}/>
      )}
    </>
  );
}

Object.assign(window, { Icon, AppShell, AnimatedCursor });
