"use client";

import { useEffect, useMemo, useState } from "react";

type Stage = "login" | "hub" | "loading" | "result";

const recentAwbs = ["123-45678901", "GLS88293001", "618-22446688"];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [stage, setStage] = useState<Stage>("login");
  const [awb, setAwb] = useState("");
  const [trackedAwb, setTrackedAwb] = useState("GLS88293001");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState<{ title: string; text: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const timeline = useMemo(
    () => [
      { status: "done", title: "Departed", place: "Singapore (SIN)", time: "15 Oct 2023, 10:00 SGT" },
      { status: "done", title: "Arrived at Transit", place: "Singapore (SIN)", time: "15 Oct 2023, 08:00 SGT" },
      { status: "active", title: "Departed", place: "Jakarta (CGK)", time: "15 Oct 2023, 05:00 WIB" },
      { status: "idle", title: "Booking Confirmed", place: "Jakarta (CGK)", time: "14 Oct 2023, 16:00 WIB" }
    ],
    []
  );

  const doLogin = () => {
    if (!email.trim() || !password.trim()) {
      setModal({ title: "Missing details", text: "Please enter demo email and password to continue." });
      return;
    }
    setStage("hub");
  };

  const trackAwb = (value?: string) => {
    const target = (value ?? awb).trim();
    if (!target) {
      setModal({ title: "AWB required", text: "Please input an AWB number first." });
      return;
    }

    setTrackedAwb(target);
    setStage("loading");

    window.setTimeout(() => {
      setStage("result");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  };

  return (
    <>
      {showSplash && (
        <div className="splash">
          <div className="splash-card">
            <div className="plane">✈</div>
            <h1>GLS Aero</h1>
            <p>PREMIUM CARGO TRACKING</p>
          </div>
        </div>
      )}

      <main className="outer-shell">
        <div className="airline-bg" />
        <section className="mobile-shell">
          {stage === "login" && (
            <div className="page-block fade-in">
              <div className="hero-card">
                <div className="brand-row">
                  <div className="brand-box">✈</div>
                  <div>
                    <h2>GLS Aero</h2>
                    <span>Executive Cargo Operations</span>
                  </div>
                  <button className="ghost-btn" onClick={() => setModal({ title: "Install App", text: "PWA install simulation: add GLS Aero to your home screen for standalone mode." })}>
                    Install App
                  </button>
                </div>

                <h3>Sign in to Premium AWB Tracking</h3>
                <p>Experience enterprise-grade shipment visibility with a luxury airline app aesthetic.</p>

                <label>Email address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ops@glsaero.com" type="email" />
                <label>Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type="password"
                  onKeyDown={(e) => e.key === "Enter" && doLogin()}
                />
                <button className="primary-btn" onClick={doLogin}>
                  Enter Dashboard
                </button>
              </div>

              <div className="info-card">
                <p className="card-title">Why teams choose GLS Aero</p>
                <ul>
                  <li>Global AWB lifecycle visibility in one view.</li>
                  <li>Smart timeline for faster operations decisions.</li>
                  <li>Push-ready status alerts for critical shipments.</li>
                </ul>
              </div>
            </div>
          )}

          {stage !== "login" && (
            <div className="app-body fade-in">
              <header className="topbar">
                <div className="brand-mini">
                  <div>✈</div>
                  <span>GLS Aero</span>
                </div>
                <button className="avatar">👤</button>
              </header>

              {stage === "hub" && (
                <section className="page-block">
                  <h1>Track Your Air Cargo Shipment</h1>
                  <p className="subtitle">Enter your AWB to get premium shipment insights.</p>

                  <div className="card">
                    <label>AWB Number</label>
                    <div className="input-wrap">
                      <input
                        className="mono"
                        value={awb}
                        onChange={(e) => setAwb(e.target.value)}
                        placeholder="Enter AWB Number (example: 123-45678901)"
                        onKeyDown={(e) => e.key === "Enter" && trackAwb()}
                      />
                      <button className="scan-btn" aria-label="Scan barcode simulation">
                        📷
                      </button>
                    </div>
                    <button className="primary-btn" onClick={() => trackAwb()}>
                      Track Now
                    </button>
                  </div>

                  <div className="recent-wrap">
                    <p>Recent Searches</p>
                    {recentAwbs.map((item) => (
                      <button key={item} className="recent-item mono" onClick={() => trackAwb(item)}>
                        {item}
                      </button>
                    ))}
                  </div>
                </section>
              )}

              {stage === "loading" && (
                <section className="loading">
                  <div className="spinner" />
                  <p>Preparing premium tracking result...</p>
                </section>
              )}

              {stage === "result" && (
                <section className="page-block result">
                  <article className="result-hero">
                    <p className="overline">AWB Number</p>
                    <h2 className="mono">{trackedAwb}</h2>
                    <span className="badge transit">IN TRANSIT - SINGAPORE SIN</span>

                    <div className="route">
                      <div>
                        <strong>CGK - Jakarta</strong>
                        <small>Origin</small>
                      </div>
                      <span>✈</span>
                      <div>
                        <strong>LHR - London</strong>
                        <small>Destination</small>
                      </div>
                    </div>
                  </article>

                  <article className="card">
                    <p className="card-title">Cargo Details</p>
                    <div className="grid-2">
                      <div><small>Pieces</small><strong>5 pieces</strong></div>
                      <div><small>Total Weight</small><strong>1,200 kg</strong></div>
                      <div><small>Commodity</small><strong>Engine Spare Parts</strong></div>
                      <div><small>Airline</small><strong>Garuda Indonesia (GA)</strong></div>
                    </div>
                  </article>

                  <article className="card">
                    <p className="card-title">Shipment Timeline</p>
                    <div className="timeline">
                      {timeline.map((item, idx) => (
                        <div key={`${item.title}-${idx}`} className="t-item">
                          <div className={`dot ${item.status}`} />
                          <div>
                            <strong>{item.title} - {item.place}</strong>
                            <small>{item.time}</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>

                  <div className="actions">
                    <button className="secondary-btn" onClick={() => setModal({ title: "Share Status", text: "Native share simulation opened. AWB status is ready to share." })}>
                      Share Status
                    </button>
                    <button className="accent-btn" onClick={() => setModal({ title: "Notifications Enabled", text: "Push notification simulation activated for this AWB." })}>
                      Enable Alerts
                    </button>
                  </div>
                </section>
              )}
            </div>
          )}
        </section>
      </main>

      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{modal.title}</h3>
            <p>{modal.text}</p>
            <button className="primary-btn" onClick={() => setModal(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
