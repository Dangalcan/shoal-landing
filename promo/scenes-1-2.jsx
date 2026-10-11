// ───────────────────────── SCENE 1: INTRO ─────────────────────────
function IntroScene({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        const t = localTime;
        // Background gradient pan
        const bgShift = Math.sin(t * 0.5) * 20;

        // Logo cube reveal
        const logoIn = clamp(t / 0.8, 0, 1);
        const logoEase = Easing.easeOutBack(logoIn);

        // Title
        const titleIn = clamp((t - 0.7) / 0.7, 0, 1);
        const titleEase = Easing.easeOutCubic(titleIn);
        const subIn = clamp((t - 1.2) / 0.6, 0, 1);
        const subEase = Easing.easeOutCubic(subIn);

        // Outro fade
        const outFade = clamp((t - (duration - 0.5)) / 0.5, 0, 1);
        const overall = 1 - outFade;

        // Floating dots
        const dots = [];
        for (let i=0; i<14; i++) {
          const phase = i * 0.6;
          dots.push({
            x: 200 + (i * 137) % 1520,
            y: 100 + (i * 211) % 880,
            o: 0.15 + 0.15 * Math.sin(t * 1.2 + phase),
            s: 3 + (i % 3),
          });
        }

        return (
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at ${50 + bgShift}% 40%, #1e3a8a 0%, #0f172a 60%, #020617 100%)`,
            overflow: "hidden",
            opacity: overall,
          }}>
            {dots.map((d, i) => (
              <div key={i} style={{
                position: "absolute", left: d.x, top: d.y,
                width: d.s, height: d.s, borderRadius: "50%",
                background: "rgb(96 165 250)",
                opacity: d.o,
                boxShadow: "0 0 12px rgb(96 165 250 / 0.6)",
              }}/>
            ))}

            <div style={{
              position: "absolute",
              left: "50%", top: "42%",
              transform: `translate(-50%, -50%) scale(${logoEase})`,
              opacity: logoEase,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <img src="assets/icon.png" alt="Shoal" style={{
                width: 160, height: 160,
                borderRadius: 32,
                boxShadow: "0 30px 80px -20px rgb(45 212 191 / 0.45), inset 0 0 0 1px rgb(255 255 255 / 0.1)",
                display: "block",
              }}/>
            </div>

            <div style={{
              position: "absolute",
              left: "50%", top: "62%",
              transform: `translate(-50%, ${(1-titleEase) * 30}px)`,
              opacity: titleEase,
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: "white",
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}>
              Shoal
            </div>

            <div style={{
              position: "absolute",
              left: "50%", top: "76%",
              transform: `translate(-50%, ${(1-subEase) * 16}px)`,
              opacity: subEase * 0.85,
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "rgb(148 197 253)",
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}>
              Kubernetes management, made effortless.
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ───────────────────── SCENE 2: DASHBOARD ─────────────────────
function DashboardScene({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        const t = localTime;
        // App window slide-up entry
        const inT = clamp(t / 0.6, 0, 1);
        const inE = Easing.easeOutCubic(inT);
        const outT = clamp((t - (duration - 0.4)) / 0.4, 0, 1);
        const overall = (1 - outT);

        // Stat cards stagger in
        const stats = [
          { label: "Docker Status",  value: "Running",    icon: "Box",     color: "blue",   status: "running" },
          { label: "Podman Status",  value: "Running",    icon: "Box",     color: "purple", status: "running" },
          { label: "Active Context", value: "kind-shoal",   icon: "Server",  color: "blue" },
          { label: "Total Clusters", value: "3",          icon: "Box",     color: "green" },
        ];

        // Refresh icon spin near end
        const refreshSpin = t > 2.4 ? (t - 2.4) * 720 : 0;

        return (
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, #1e3a8a 0%, #0a0f1e 50%)",
            opacity: overall,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 60,
          }}>
            <div style={{
              width: 1680, height: 940,
              transform: `translateY(${(1-inE) * 60}px) scale(${0.96 + inE * 0.04})`,
              opacity: inE,
            }}>
              <AppShell activeRoute="/" context="kind-shoal">
                <div className="page">
                  <div className="page-header">
                    <h2 className="page-title">Dashboard</h2>
                    <p className="page-subtitle">Overview of your container infrastructure.</p>
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 18,
                    marginBottom: 24,
                  }}>
                    {stats.map((s, i) => {
                      const inSt = clamp((t - 0.6 - i * 0.12) / 0.5, 0, 1);
                      const e = Easing.easeOutCubic(inSt);
                      const Ico = Icon[s.icon];
                      return (
                        <div key={i} className="stat-card" style={{
                          opacity: e,
                          transform: `translateY(${(1-e) * 24}px)`,
                        }}>
                          <div>
                            <p className="stat-card-label">{s.label}</p>
                            {s.status ? (
                              <div className="badge badge-success" style={{fontSize: 14, padding: "5px 12px"}}>
                                <span className="badge-dot"/> {s.value}
                              </div>
                            ) : (
                              <div className="stat-card-value">{s.value}</div>
                            )}
                          </div>
                          <div className={"stat-card-icon stat-icon-" + s.color}>
                            <Ico s={24}/>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1.4fr",
                    gap: 18,
                  }}>
                    <Sprite start={1.4} end={Infinity}>
                      {() => {
                        const e = Easing.easeOutCubic(clamp((t - 1.4) / 0.5, 0, 1));
                        return (
                          <div className="card" style={{ opacity: e, transform: `translateY(${(1-e) * 24}px)` }}>
                            <div className="card-header"><h3 className="card-title">Quick Actions</h3></div>
                            <div style={{display: "flex", flexDirection: "column", gap: 12}}>
                              <button className="btn btn-primary" style={{width: "100%", justifyContent: "center", padding: "12px 16px"}}>
                                <Icon.Plus s={18}/> Create New Cluster
                              </button>
                              <div style={{textAlign: "center", color: "var(--text-muted)", fontSize: 12, padding: "4px 0"}}>or</div>
                              <button className="btn btn-secondary" style={{width: "100%", justifyContent: "center", padding: "12px 16px"}}>
                                Manage Existing Clusters
                              </button>
                            </div>
                          </div>
                        );
                      }}
                    </Sprite>

                    <Sprite start={1.6} end={Infinity}>
                      {() => {
                        const e = Easing.easeOutCubic(clamp((t - 1.6) / 0.5, 0, 1));
                        const items = ["kind-shoal", "kind-dev", "kind-ci"];
                        return (
                          <div className="card" style={{ opacity: e, transform: `translateY(${(1-e) * 24}px)` }}>
                            <div className="card-header">
                              <h3 className="card-title">Your Clusters</h3>
                              <button className="btn btn-ghost btn-icon">
                                <span style={{display: "inline-flex", transform: `rotate(${refreshSpin}deg)`, transition: "transform 50ms linear"}}>
                                  <Icon.Refresh s={16}/>
                                </span>
                              </button>
                            </div>
                            <div style={{display: "flex", flexDirection: "column", gap: 8}}>
                              {items.map((c, i) => (
                                <div key={c} style={{
                                  display: "flex", alignItems: "center", justifyContent: "space-between",
                                  padding: "10px 12px",
                                  borderRadius: 8,
                                  background: c === "kind-shoal" ? "var(--color-primary-50)" : "transparent",
                                  border: "1px solid " + (c === "kind-shoal" ? "var(--color-primary-100)" : "var(--border-color)"),
                                }}>
                                  <div style={{display: "flex", alignItems: "center", gap: 10}}>
                                    <Icon.Server s={16} c={c === "kind-shoal" ? "#2563eb" : "#64748b"}/>
                                    <span style={{
                                      fontSize: 14, fontWeight: 500,
                                      color: c === "kind-shoal" ? "#1d4ed8" : "var(--text-primary)"
                                    }}>{c}</span>
                                  </div>
                                  <div style={{display: "flex", alignItems: "center", gap: 8}}>
                                    <Icon.Eye s={14} c="#94a3b8"/>
                                    {c === "kind-shoal"
                                      ? <span className="badge badge-active">Active</span>
                                      : <span className="badge" style={{background: "var(--bg-tertiary)", color: "var(--text-secondary)"}}>Available</span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }}
                    </Sprite>
                  </div>

                  {/* Caption that pops in */}
                  <Sprite start={2.4} end={Infinity}>
                    {() => {
                      const e = Easing.easeOutBack(clamp((t - 2.4) / 0.5, 0, 1));
                      return (
                        <div style={{
                          position: "absolute",
                          right: 60, bottom: 60,
                          padding: "14px 22px",
                          background: "rgba(15,23,42,0.92)",
                          backdropFilter: "blur(8px)",
                          borderRadius: 12,
                          color: "white",
                          fontSize: 16,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                          opacity: e,
                          transform: `translateY(${(1-e) * 16}px) scale(${0.9 + e * 0.1})`,
                          boxShadow: "0 20px 40px -10px rgb(0 0 0 / 0.4)",
                        }}>
                          Every cluster, at a glance.
                        </div>
                      );
                    }}
                  </Sprite>
                </div>
              </AppShell>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { IntroScene, DashboardScene });
