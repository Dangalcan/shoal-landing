// ───────────────── SCENE 3: CREATE CLUSTER ─────────────────
// Mocks typing a cluster name + provider selection + click create -> toast
function CreateClusterScene({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        const t = localTime;
        const inE = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));
        const outT = clamp((t - (duration - 0.4)) / 0.4, 0, 1);
        const overall = 1 - outT;

        // Typing animation
        const fullName = "staging";
        const typeStart = 0.6, typeEnd = 2.0;
        const typeT = clamp((t - typeStart) / (typeEnd - typeStart), 0, 1);
        const charsTyped = Math.floor(typeT * fullName.length);
        const typedText = fullName.slice(0, charsTyped);

        // Input focus glow
        const focused = t >= 0.4 && t < typeEnd + 0.3;

        // Provider switch click at 2.5
        const selectedProvider = t < 2.5 ? "kind" : "k3d";

        // Create button click at 3.4
        const createClicked = t >= 3.3;
        const buttonScale = (t >= 3.3 && t < 3.5) ? 0.96 : 1;

        // Toast appears at 3.5
        const toastIn = clamp((t - 3.4) / 0.4, 0, 1);
        const toastE = Easing.easeOutBack(toastIn);
        const toastSuccess = t >= 4.6;

        // Cursor path
        const cursorPath = [
          { x: 1100, y: 280, at: 0 },        // start near input
          { x: 760,  y: 380, at: 0.10 },     // enter input area
          { x: 760,  y: 380, at: 0.40 },     // hold while typing
          { x: 1020, y: 510, at: 0.55 },     // move to k3d
          { x: 1020, y: 510, at: 0.62 },     // click hold
          { x: 1180, y: 690, at: 0.78 },     // to create button
          { x: 1180, y: 690, at: 0.88 },     // click hold
          { x: 1180, y: 690, at: 1.0 },
        ];
        const clickT = (3.4 - 0) / duration;

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
              <AppShell activeRoute="/clusters" context="kind-shoal">
                <div className="page" style={{maxWidth: 720}}>
                  <div className="page-header">
                    <h2 className="page-title">Create Cluster</h2>
                    <p className="page-subtitle">Configure your new Kubernetes cluster.</p>
                  </div>

                  <form style={{display: "flex", flexDirection: "column", gap: 22}}>
                    <div>
                      <label className="form-label">Cluster Name</label>
                      <div className={"form-input " + (focused ? "focused" : "")} style={{
                        display: "flex", alignItems: "center", minHeight: 44,
                      }}>
                        <span style={{
                          color: typedText ? "var(--text-primary)" : "var(--text-muted)",
                          fontSize: 14,
                        }}>
                          {typedText || "my-cluster"}
                        </span>
                        {focused && <span className="caret" style={{color: "var(--color-primary)"}}/>}
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Provider</label>
                      <div className="provider-grid">
                        {["kind", "k3d"].map(p => (
                          <button key={p} type="button" className={"provider-btn " + (p === selectedProvider ? "selected" : "")}>
                            <Icon.Server s={22}/>
                            <span>{p}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div style={{display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 12}}>
                      <button type="button" className="btn btn-secondary">Cancel</button>
                      <button type="submit" className={"btn btn-primary " + (createClicked ? "hover" : "")} style={{
                        transform: `scale(${buttonScale})`,
                        transition: "transform 100ms ease",
                        minWidth: 160,
                        justifyContent: "center",
                      }}>
                        {t < 3.5 ? "Create Cluster" : (
                          <span style={{display:"inline-flex", alignItems:"center", gap: 8}}>
                            <span style={{
                              width: 14, height: 14, borderRadius: "50%",
                              border: "2px solid rgb(255 255 255 / 0.3)",
                              borderTopColor: "white",
                              display: "inline-block",
                              animation: "spin 0.8s linear infinite",
                            }}/>
                            {t < 4.6 ? "Creating..." : "Created!"}
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </AppShell>

              {/* Toast */}
              {toastIn > 0 && (
                <div className={"toast " + (toastSuccess ? "toast-success" : "toast-loading")} style={{
                  opacity: toastE,
                  transform: `translateY(${(1-toastE) * -16}px)`,
                  top: 70, right: 70,
                }}>
                  {toastSuccess ? (
                    <>
                      <Icon.CheckCircle s={18} c="rgb(22 163 74)"/>
                      <span>Cluster "staging" created successfully!</span>
                    </>
                  ) : (
                    <>
                      <span style={{
                        width: 16, height: 16, borderRadius: "50%",
                        border: "2px solid rgb(37 99 235 / 0.3)",
                        borderTopColor: "rgb(37 99 235)",
                        display: "inline-block",
                        animation: "spin 0.8s linear infinite",
                      }}/>
                      <span>Creating cluster "staging"...</span>
                    </>
                  )}
                </div>
              )}

              <AnimatedCursor path={cursorPath} t={t / duration} click={clickT}/>

              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

              {/* Caption */}
              <Sprite start={4.7} end={Infinity}>
                {() => {
                  const e = Easing.easeOutBack(clamp((t - 4.7) / 0.4, 0, 1));
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
                      whiteSpace: "nowrap",
                    }}>
                      Create local clusters with kind or k3d.
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

// ────────────────── SCENE 4: CLUSTERS LIST ──────────────────
function ClustersScene({ start, end }) {
  return (
    <Sprite start={start} end={end}>
      {({ localTime, duration }) => {
        const t = localTime;
        const inE = Easing.easeOutCubic(clamp(t / 0.4, 0, 1));
        const outT = clamp((t - (duration - 0.4)) / 0.4, 0, 1);
        const overall = 1 - outT;

        // List of clusters; "k3d-staging" is the new one (highlighted briefly)
        const clusters = [
          { name: "kind-shoal",        provider: "kind", active: t < 2.5 },
          { name: "kind-dev",          provider: "kind", active: false },
          { name: "kind-ci",           provider: "kind", active: false },
          { name: "k3d-staging",       provider: "k3d", active: false, isNew: true },
        ];
        // Switch to production at 2.6
        if (t >= 2.6) {
          clusters.forEach(c => c.active = c.name === "k3d-staging");
        }

        // Pulse highlight on new cluster card
        const newPulse = t < 1.8 ? 0 : Math.max(0, 1 - (t - 1.8) / 0.8);

        // Cursor: hover new cluster -> click checkmark
        const cursorPath = [
          { x: 1300, y: 200, at: 0 },
          { x: 1100, y: 580, at: 0.30 },   // hover production card
          { x: 1100, y: 580, at: 0.45 },
          { x: 1410, y: 580, at: 0.55 },   // checkmark icon
          { x: 1410, y: 580, at: 0.65 },
          { x: 1410, y: 580, at: 1.0 },
        ];
        const clickT = 2.6 / duration;

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
              <AppShell activeRoute="/clusters" context={t < 2.6 ? "kind-shoal" : "k3d-staging"}>
                <div className="page">
                  <div className="page-header" style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start"}}>
                    <div>
                      <h2 className="page-title">Clusters</h2>
                      <p className="page-subtitle">Manage your local Kubernetes environments.</p>
                    </div>
                    <div style={{display: "flex", gap: 10}}>
                      <button className="btn btn-secondary btn-icon"><Icon.Refresh s={18}/></button>
                      <button className="btn btn-primary"><Icon.Plus s={18}/> Create Cluster</button>
                    </div>
                  </div>

                  <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16}}>
                    {clusters.map((c, i) => {
                      const cardT = clamp((t - i * 0.1) / 0.5, 0, 1);
                      const cardE = Easing.easeOutCubic(cardT);
                      const isNewSlide = c.isNew && t < 1.4;
                      const slideY = isNewSlide ? (1 - clamp((t - 0.4) / 0.6, 0, 1)) * -40 : 0;
                      const newGlow = c.isNew ? newPulse : 0;
                      return (
                        <div key={c.name} className={"cluster-card " + (c.active ? "active" : "")} style={{
                          opacity: cardE,
                          transform: `translateY(${(1-cardE) * 20 + slideY}px)`,
                          boxShadow: newGlow > 0
                            ? `0 0 0 ${3 + newGlow * 4}px rgb(37 99 235 / ${0.15 + newGlow * 0.2}), var(--shadow-md)`
                            : undefined,
                          transition: "box-shadow 200ms ease",
                        }}>
                          <div className="cluster-card-icon">
                            <Icon.Server s={24}/>
                          </div>
                          <div className="cluster-card-info">
                            <div className="cluster-card-name">
                              {c.name}
                              {c.active && (
                                <span className="badge badge-success">
                                  <span className="badge-dot"/> Active
                                </span>
                              )}
                              {c.isNew && t < 2.0 && !c.active && (
                                <span className="badge" style={{background: "#fef3c7", color: "#92400e"}}>NEW</span>
                              )}
                            </div>
                            <div className="cluster-card-meta">
                              <span>Provider: {c.provider}</span>
                            </div>
                          </div>
                          <div style={{display: "flex", gap: 6}}>
                            {!c.active && (
                              <button className="btn btn-ghost btn-icon" title="Set as active">
                                <Icon.CheckCircle s={20}/>
                              </button>
                            )}
                            <button className="btn btn-ghost btn-icon"><Icon.Eye s={20}/></button>
                            <button className="btn btn-ghost btn-icon"><Icon.Trash s={18}/></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AppShell>

              <AnimatedCursor path={cursorPath} t={t / duration} click={clickT}/>

              {/* Caption */}
              <Sprite start={3.0} end={Infinity}>
                {() => {
                  const e = Easing.easeOutBack(clamp((t - 3.0) / 0.4, 0, 1));
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
                      Switch contexts with one click.
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

Object.assign(window, { CreateClusterScene, ClustersScene });
