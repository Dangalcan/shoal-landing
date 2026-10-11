// ───────────────── SCENE 5: TERMINAL ─────────────────
function TerminalScene({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        const t = localTime;
        const inE = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));
        const outT = clamp((t - (duration - 0.4)) / 0.4, 0, 1);
        const overall = 1 - outT;

        // Three commands typed in sequence
        // cmd1: "kubectl get pods" at t=0.5..1.6, output 1.7..2.4
        // cmd2: "kubectl get nodes" at 2.6..3.6, output 3.7..4.2
        // cmd3: "kubectl apply -f deployment.yaml" 4.4..5.6, output 5.7..6.0
        const c1 = "kubectl get pods -A";
        const c2 = "kubectl get nodes";
        const c3 = "kubectl apply -f deployment.yaml";

        const typed = (text, s, e) => {
          if (t < s) return "";
          if (t > e) return text;
          const f = (t - s) / (e - s);
          return text.slice(0, Math.floor(f * text.length));
        };
        const t1 = typed(c1, 0.5, 1.5);
        const t2 = typed(c2, 2.6, 3.5);
        const t3 = typed(c3, 4.6, 5.7);

        const showOut1 = t >= 1.6;
        const showOut2 = t >= 3.6;
        const showOut3 = t >= 5.8;
        const showSparkle = t >= 6.2;

        const showCaret = (s, e) => t >= s && t <= e;

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
              transform: `scale(${0.96 + inE * 0.04})`,
              opacity: inE,
              position: "relative",
            }}>
              <AppShell activeRoute="/terminal" context="k3d-staging">
                <div className="page" style={{padding: 32, height: "100%"}}>
                  <div className="page-header" style={{marginBottom: 18}}>
                    <h2 className="page-title">Terminal</h2>
                    <p className="page-subtitle">Integrated shell with full kubectl access.</p>
                  </div>

                  <div className="terminal-window" style={{height: "calc(100% - 100px)"}}>
                    <div className="terminal-bar">
                      <span className="terminal-bar-title mono">k3d-staging · bash</span>
                    </div>
                    <div className="terminal-body" style={{whiteSpace: "pre-wrap"}}>
                      <div>
                        <span className="terminal-prompt">~/shoal ❯ </span>
                        <span className="terminal-cmd">{t1}</span>
                        {showCaret(0.5, 1.6) && <span className="caret-block"/>}
                      </div>

                      {showOut1 && (
                        <div style={{marginTop: 6}}>
                          <span className="terminal-out-dim">NAMESPACE     NAME                                 READY   STATUS    RESTARTS   AGE</span>{"\n"}
                          <span className="terminal-out">default       api-gateway-7b9f4c8d-x2p4q           1/1     </span><span className="terminal-success">Running</span><span className="terminal-out">   0          12m</span>{"\n"}
                          <span className="terminal-out">default       web-frontend-5fc7d8b9-jzn8m          1/1     </span><span className="terminal-success">Running</span><span className="terminal-out">   0          12m</span>{"\n"}
                          <span className="terminal-out">default       redis-cache-0                        1/1     </span><span className="terminal-success">Running</span><span className="terminal-out">   0          11m</span>{"\n"}
                          <span className="terminal-out">kube-system   coredns-787d4945fb-9mx4t             1/1     </span><span className="terminal-success">Running</span><span className="terminal-out">   0          15m</span>{"\n"}
                          <span className="terminal-out">kube-system   etcd-control-plane                   1/1     </span><span className="terminal-success">Running</span><span className="terminal-out">   0          15m</span>
                        </div>
                      )}

                      {t >= 2.5 && (
                        <div style={{marginTop: 10}}>
                          <span className="terminal-prompt">~/shoal ❯ </span>
                          <span className="terminal-cmd">{t2}</span>
                          {showCaret(2.6, 3.6) && <span className="caret-block"/>}
                        </div>
                      )}

                      {showOut2 && (
                        <div style={{marginTop: 6}}>
                          <span className="terminal-out-dim">NAME           STATUS   ROLES           AGE   VERSION</span>{"\n"}
                          <span className="terminal-out">control-plane  </span><span className="terminal-success">Ready</span><span className="terminal-out">    control-plane   15m   v1.31.4</span>{"\n"}
                          <span className="terminal-out">worker-1       </span><span className="terminal-success">Ready</span><span className="terminal-out">    {"<none>"}          14m   v1.31.4</span>{"\n"}
                          <span className="terminal-out">worker-2       </span><span className="terminal-success">Ready</span><span className="terminal-out">    {"<none>"}          14m   v1.31.4</span>
                        </div>
                      )}

                      {t >= 4.4 && (
                        <div style={{marginTop: 10}}>
                          <span className="terminal-prompt">~/shoal ❯ </span>
                          <span className="terminal-cmd">{t3}</span>
                          {showCaret(4.6, 5.7) && <span className="caret-block"/>}
                        </div>
                      )}

                      {showOut3 && (
                        <div style={{marginTop: 6}}>
                          <span className="terminal-success">deployment.apps/api-gateway configured</span>{"\n"}
                          <span className="terminal-success">service/api-gateway unchanged</span>{"\n"}
                          <span className="terminal-success">configmap/api-config created</span>
                        </div>
                      )}

                      {t >= 6.0 && (
                        <div style={{marginTop: 10}}>
                          <span className="terminal-prompt">~/shoal ❯ </span>
                          <span className="caret-block"/>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </AppShell>

              {/* Caption */}
              {showSparkle && (() => {
                const e = Easing.easeOutBack(clamp((t - 6.2) / 0.4, 0, 1));
                return (
                  <div style={{
                    position: "absolute",
                    left: "50%", bottom: 60,
                    transform: `translate(-50%, ${(1-e) * 16}px)`,
                    padding: "14px 22px",
                    background: "rgba(15,23,42,0.92)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 12,
                    color: "white",
                    fontSize: 18,
                    fontWeight: 600,
                    opacity: e,
                    boxShadow: "0 20px 40px -10px rgb(0 0 0 / 0.4)",
                  }}>
                    A terminal right where you need it.
                  </div>
                );
              })()}
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ───────────────── SCENE 6: PLUGINS ─────────────────
// Where the cursor clicks "Enable" on the second card (pixels inside the
// 1680x940 app window).
const ENABLE_BTN = { x: 1556, y: 318 };

function PluginsScene({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        const t = localTime;
        const inE = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));
        const outT = clamp((t - (duration - 0.4)) / 0.4, 0, 1);
        const overall = 1 - outT;

        // The two example plugins bundled with the beta (no marketplace yet).
        const plugins = [
          { name: "Namespace Watcher", desc: "Monitors Kubernetes namespaces and provides quick stats.", color: "linear-gradient(135deg,#14b8a6,#0f766e)", icon: "Eye", perms: "kubernetes, ui, storage" },
          { name: "Resource Monitor",  desc: "Monitors Pod resources within namespaces. Depends on Namespace Watcher.", color: "linear-gradient(135deg,#3b82f6,#1d4ed8)", icon: "Box", perms: "kubernetes, ui, storage, notifications" },
        ];

        // Enable click on the second card at 3.0
        const enableClicked = t >= 3.0 && t < 3.4;
        const enabled = t >= 3.4;

        // Cursor: hover second card -> Enable button -> done
        const cursorPath = [
          { x: 1300, y: 200, at: 0 },
          { x: 1150, y: 420, at: 0.30 }, // hover second card
          { x: 1150, y: 420, at: 0.45 },
          { x: ENABLE_BTN.x, y: ENABLE_BTN.y, at: 0.55 }, // enable btn
          { x: ENABLE_BTN.x, y: ENABLE_BTN.y, at: 0.70 },
          { x: ENABLE_BTN.x, y: ENABLE_BTN.y, at: 1.0 },
        ];
        const clickT = 3.0 / duration;

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
              transform: `scale(${0.96 + inE * 0.04})`,
              opacity: inE,
              position: "relative",
            }}>
              <AppShell activeRoute="/plugins" context="k3d-staging">
                <div className="page">
                  <div className="page-header" style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
                    <div>
                      <h2 className="page-title">Plugins</h2>
                      <p className="page-subtitle">Manage your installed plugins.</p>
                    </div>
                    <div style={{display: "flex", gap: 10}}>
                      <button className="btn btn-secondary"><Icon.Plus s={16}/> Load Unpacked Plugin</button>
                    </div>
                  </div>

                  <div className="marketplace-grid" style={{gridTemplateColumns: "repeat(2, 1fr)"}}>
                    {plugins.map((p, i) => {
                      const cardT = clamp((t - 0.3 - i * 0.12) / 0.5, 0, 1);
                      const cardE = Easing.easeOutCubic(cardT);
                      const Ico = Icon[p.icon];
                      const isTarget = i === 1;
                      const on = !isTarget || enabled;
                      return (
                        <div key={p.name} className="plugin-card" style={{
                          opacity: cardE,
                          transform: `translateY(${(1-cardE) * 28}px)`,
                          ...(isTarget && t >= 2.5 && t < 3.8 ? {
                            boxShadow: "0 0 0 3px rgb(45 212 191 / 0.35), var(--shadow-md)",
                            transition: "box-shadow 200ms ease",
                          } : {}),
                        }}>
                          <div className="plugin-card-head">
                            <div className="plugin-card-icon" style={{background: p.color}}>
                              <Ico s={22} c="white"/>
                            </div>
                            <div style={{flex: 1, minWidth: 0}}>
                              <div className="plugin-card-name">{p.name}</div>
                              <div className="plugin-card-author">v1.1.0 · Shoal Team · MIT · signed</div>
                            </div>
                            <span className="badge" style={on
                              ? {background: "#ccfbf1", color: "#0f766e"}
                              : {background: "var(--bg-tertiary)", color: "var(--text-secondary)"}}>
                              {on ? "ENABLED" : "DISABLED"}
                            </span>
                          </div>
                          <div className="plugin-card-desc">{p.desc}</div>
                          <div className="plugin-card-foot">
                            <span style={{color: "var(--text-muted)", fontSize: 13}}>{p.perms}</span>
                            {on ? (
                              <button className="btn btn-secondary" style={{fontSize: 13, padding: "6px 14px"}}>
                                Disable
                              </button>
                            ) : (
                              <button className="btn btn-primary" style={{
                                fontSize: 13, padding: "6px 14px",
                                transform: enableClicked ? "scale(0.96)" : "scale(1)",
                                transition: "transform 100ms ease",
                              }}>
                                <Icon.Check s={14}/> Enable
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AppShell>

              <AnimatedCursor path={cursorPath} t={t / duration} click={clickT}/>

              {/* Caption */}
              <Sprite start={4.2} end={Infinity}>
                {() => {
                  const e = Easing.easeOutBack(clamp((t - 4.2) / 0.4, 0, 1));
                  return (
                    <div style={{
                      position: "absolute",
                      left: "50%", bottom: 60,
                      transform: `translate(-50%, ${(1-e) * 16}px)`,
                      padding: "14px 22px",
                      background: "rgba(15,23,42,0.92)",
                      backdropFilter: "blur(8px)",
                      borderRadius: 12,
                      color: "white",
                      fontSize: 18,
                      fontWeight: 600,
                      opacity: e,
                      boxShadow: "0 20px 40px -10px rgb(0 0 0 / 0.4)",
                    }}>
                      Extend it with sandboxed plugins.
                    </div>
                  );
                }}
              </Sprite>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ───────────────── SCENE 7: OUTRO ─────────────────
function OutroScene({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        const t = localTime;

        // Logo entry
        const logoIn = clamp(t / 0.6, 0, 1);
        const logoE = Easing.easeOutBack(logoIn);

        // Title
        const titleE = Easing.easeOutCubic(clamp((t - 0.5) / 0.5, 0, 1));

        // Feature list stagger
        const features = [
          "Local clusters with kind and k3d",
          "Resources, terminal and manifests in one place",
          "Sandboxed plugins, signed examples included",
          "Free and open source beta for Windows and Linux",
        ];

        // Final CTA
        const ctaE = Easing.easeOutBack(clamp((t - 2.2) / 0.5, 0, 1));

        // Outro fade
        const outFade = clamp((t - (duration - 0.4)) / 0.4, 0, 1);
        const overall = 1 - outFade;

        return (
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 30%, #1e3a8a 0%, #0f172a 60%, #020617 100%)",
            opacity: overall,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 60,
          }}>
            {/* Floating dots */}
            {Array.from({length: 24}).map((_, i) => {
              const phase = i * 0.4;
              return (
                <div key={i} style={{
                  position: "absolute",
                  left: 100 + (i * 167) % 1720,
                  top: 80 + (i * 251) % 920,
                  width: 3 + (i % 3),
                  height: 3 + (i % 3),
                  borderRadius: "50%",
                  background: "rgb(45 212 191)",
                  opacity: 0.15 + 0.15 * Math.sin(t * 1.5 + phase),
                  boxShadow: "0 0 10px rgb(45 212 191 / 0.5)",
                }}/>
              );
            })}

            <div style={{
              transform: `scale(${logoE})`,
              opacity: logoE,
              marginBottom: 40,
            }}>
              <img src="assets/icon.png" alt="Shoal" style={{
                width: 130, height: 130,
                borderRadius: 28,
                boxShadow: "0 30px 80px -20px rgb(45 212 191 / 0.45), inset 0 0 0 1px rgb(255 255 255 / 0.1)",
                display: "block",
              }}/>
            </div>

            <div style={{
              opacity: titleE,
              transform: `translateY(${(1-titleE) * 20}px)`,
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: "white",
              textAlign: "center",
              marginBottom: 14,
            }}>
              Shoal
            </div>

            <div style={{
              opacity: titleE * 0.85,
              transform: `translateY(${(1-titleE) * 16}px)`,
              fontSize: 22,
              fontWeight: 500,
              color: "rgb(148 197 253)",
              textAlign: "center",
              marginBottom: 44,
            }}>
              Your Kubernetes clusters, one desktop app.
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: 48,
            }}>
              {features.map((f, i) => {
                const fT = clamp((t - 1.0 - i * 0.15) / 0.4, 0, 1);
                const fE = Easing.easeOutCubic(fT);
                return (
                  <div key={f} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    opacity: fE,
                    transform: `translateX(${(1-fE) * -20}px)`,
                    fontSize: 20,
                    fontWeight: 500,
                    color: "rgb(226 232 240)",
                  }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: "rgb(13 148 136)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon.Check s={16} c="white"/>
                    </span>
                    {f}
                  </div>
                );
              })}
            </div>

            <div style={{
              opacity: ctaE,
              transform: `scale(${ctaE})`,
              padding: "16px 36px",
              borderRadius: 14,
              background: "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
              color: "white",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              boxShadow: "0 20px 40px -10px rgb(20 184 166 / 0.5)",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}>
              <Icon.Download s={20}/> Get the beta at shoal.dangalcan.com
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

Object.assign(window, { TerminalScene, PluginsScene, OutroScene });
