"use client";

import {
  BellRing,
  Camera,
  Home,
  Package2,
  Plane,
  Search,
  Share2,
  ShieldCheck,
  Smartphone,
  UserCircle2
} from "lucide-react";
import { useMemo, useState } from "react";

import { InstallPrompt } from "@/components/install-prompt";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { Timeline, TimelineItem } from "@/components/timeline";

type Screen = "welcome" | "login" | "tracking";

type TrackingData = {
  awb: string;
  statusLabel: string;
  route: {
    origin: string;
    destination: string;
  };
  details: {
    pieces: string;
    weight: string;
    commodity: string;
    airline: string;
  };
  timeline: TimelineItem[];
};

const RECENT_AWBS = ["123-45678901", "GLS88293001", "618-22446688"];

const DUMMY_DATA: Omit<TrackingData, "awb"> = {
  statusLabel: "IN TRANSIT - SINGAPORE SIN",
  route: {
    origin: "CGK - Jakarta",
    destination: "LHR - London"
  },
  details: {
    pieces: "5 pieces",
    weight: "1,200 kg",
    commodity: "Engine Spare Parts",
    airline: "Garuda Indonesia (GA)"
  },
  timeline: [
    { id: "1", title: "Departed", location: "Singapore (SIN)", datetime: "15 Oct 2023, 10:00 SGT", status: "done" },
    { id: "2", title: "Arrived at Transit", location: "Singapore (SIN)", datetime: "15 Oct 2023, 08:00 SGT", status: "done" },
    { id: "3", title: "Departed", location: "Jakarta (CGK)", datetime: "15 Oct 2023, 05:00 WIB", status: "active" },
    { id: "4", title: "Booking Confirmed", location: "Jakarta (CGK)", datetime: "14 Oct 2023, 16:00 WIB", status: "upcoming" }
  ]
};

export default function HomePage() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [installRequestToken, setInstallRequestToken] = useState(0);
  const [awbInput, setAwbInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const headerDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short"
      }).format(new Date()),
    []
  );

  const handleTrack = (presetAwb?: string) => {
    const awb = (presetAwb ?? awbInput).trim();
    if (!awb) return;

    setScreen("tracking");
    setIsLoading(true);
    setTrackingData(null);

    window.setTimeout(() => {
      setTrackingData({ awb, ...DUMMY_DATA });
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-28">
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-slate-800 px-4 pb-8 pt-7 text-white shadow-lg sm:px-6">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute -top-6 left-6 h-12 w-28 rounded-full bg-white/60 blur-md" />
          <div className="absolute top-7 right-10 h-10 w-24 rounded-full bg-white/50 blur-md" />
          <div className="absolute bottom-4 left-1/2 h-9 w-20 -translate-x-1/2 rounded-full bg-white/40 blur-md" />
        </div>

        <div className="relative mx-auto flex w-full max-w-3xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-2.5 backdrop-blur">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold">GLS Aero Tracking</p>
              <p className="text-xs text-blue-100">{headerDate}</p>
            </div>
          </div>

          <button
            onClick={() => setInstallRequestToken((prev) => prev + 1)}
            className="rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-xs font-semibold transition hover:bg-white/20"
          >
            Install App
          </button>
        </div>
      </header>

      <section className="relative -mt-5 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-5">
          {screen === "welcome" && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Welcome</p>
                <h1 className="mt-1 text-2xl font-bold text-slate-900">Welcome to GLS Aero Cargo Suite</h1>
                <p className="mt-2 text-sm text-slate-500">
                  Choose a feature card below to continue. Optimized for mobile workflow and enterprise operations.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <FeatureCard
                  icon={<Search className="h-5 w-5 text-sky-500" />}
                  title="AWB Tracking"
                  description="Track active shipments with timeline visualization and status updates."
                  onClick={() => setScreen("tracking")}
                />
                <FeatureCard
                  icon={<UserCircle2 className="h-5 w-5 text-indigo-500" />}
                  title="Login Dashboard"
                  description="Sign in to access operations dashboard and shipment alerts."
                  onClick={() => setScreen("login")}
                />
                <FeatureCard
                  icon={<BellRing className="h-5 w-5 text-amber-500" />}
                  title="Notifications"
                  description="Enable smart push notifications for delivery milestones."
                  onClick={() => setInstallRequestToken((prev) => prev + 1)}
                />
                <FeatureCard
                  icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />}
                  title="Security Center"
                  description="Enterprise-grade access and audit trail simulation."
                  onClick={() => setScreen("login")}
                />
              </div>
            </div>
          )}

          {screen === "login" && (
            <div className="animate-in fade-in duration-500 rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur-md">
              <p className="text-xl font-bold text-slate-900">Login to Cargo Operations</p>
              <p className="mt-1 text-sm text-slate-500">Use dummy credentials to continue to tracking workspace.</p>

              <div className="mt-5 space-y-3">
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-100 focus:border-sky-400 focus:ring-4"
                />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-100 focus:border-sky-400 focus:ring-4"
                />
                <button
                  onClick={() => setScreen(email.trim() && password.trim() ? "tracking" : "login")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/25"
                >
                  Continue to Tracking
                </button>
              </div>
            </div>
          )}

          {screen === "tracking" && (
            <>
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-slate-100 p-8">
                <p className="text-2xl font-bold text-slate-900">Track Your Air Cargo Shipment</p>
                <p className="mt-1 text-sm text-slate-500">Enter AWB number to get enterprise-grade status visibility.</p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <input
                      value={awbInput}
                      onChange={(event) => setAwbInput(event.target.value)}
                      placeholder="Enter AWB Number (example: 123-45678901)"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-24 font-mono text-sm outline-none ring-sky-100 transition focus:border-sky-400 focus:ring-4"
                    />
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:border-sky-200 hover:text-sky-500"
                      aria-label="Barcode scan placeholder"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleTrack()}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-900/25"
                  >
                    <Search className="h-4 w-4" />
                    Track Now
                  </button>
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Recent Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {RECENT_AWBS.map((awb) => (
                      <button
                        key={awb}
                        onClick={() => {
                          setAwbInput(awb);
                          handleTrack(awb);
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-xs text-slate-600 transition hover:border-sky-200 hover:text-sky-600"
                      >
                        {awb}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {isLoading && <SkeletonLoader />}

              {!isLoading && trackingData && (
                <div className="animate-in fade-in duration-500 space-y-4">
                  <article className="rounded-3xl bg-gradient-to-r from-blue-900 to-slate-800 p-6 text-white shadow-xl">
                    <p className="text-xs uppercase tracking-[0.2em] text-sky-200">AWB Number</p>
                    <p className="mt-1 font-mono text-2xl font-bold">{trackingData.awb}</p>
                    <span className="mt-3 inline-flex rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-900">
                      {trackingData.statusLabel}
                    </span>

                    <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm">
                      <div>
                        <p className="font-semibold">{trackingData.route.origin}</p>
                        <p className="text-xs text-blue-100">Origin</p>
                      </div>
                      <Plane className="mx-auto h-4 w-4 text-sky-300" />
                      <div className="text-right">
                        <p className="font-semibold">{trackingData.route.destination}</p>
                        <p className="text-xs text-blue-100">Destination</p>
                      </div>
                    </div>
                  </article>

                  <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <Package2 className="h-4 w-4 text-sky-500" />
                      Cargo Details
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <DetailItem label="Pieces" value={trackingData.details.pieces} />
                      <DetailItem label="Total Weight" value={trackingData.details.weight} />
                      <DetailItem label="Commodity" value={trackingData.details.commodity} />
                      <DetailItem label="Airline" value={trackingData.details.airline} />
                    </div>
                  </article>

                  <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                    <p className="mb-4 text-sm font-semibold text-slate-900">Shipment Timeline</p>
                    <Timeline items={trackingData.timeline} />
                  </article>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-sky-200 hover:text-sky-600">
                      <Share2 className="h-4 w-4" />
                      Share Status
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-300/40">
                      <BellRing className="h-4 w-4" />
                      Enable Alerts
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <BottomNav current={screen} onChange={setScreen} onInstall={() => setInstallRequestToken((prev) => prev + 1)} />
      <InstallPrompt requestToken={installRequestToken} />
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="mb-2 inline-flex rounded-xl bg-slate-50 p-2">{icon}</div>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </button>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function BottomNav({
  current,
  onChange,
  onInstall
}: {
  current: Screen;
  onChange: (screen: Screen) => void;
  onInstall: () => void;
}) {
  const navItems = [
    { id: "welcome" as const, label: "Home", icon: Home },
    { id: "tracking" as const, label: "Tracking", icon: Search },
    { id: "login" as const, label: "Account", icon: UserCircle2 }
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+10px)] pt-3 shadow-[0_-12px_35px_rgba(15,23,42,0.12)] backdrop-blur-md">
      <div className="mx-auto grid w-full max-w-md grid-cols-4 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = current === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex flex-col items-center gap-1 rounded-xl py-1.5 text-xs font-medium transition ${
                active ? "bg-sky-50 text-sky-600" : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}

        <button
          onClick={onInstall}
          className="flex flex-col items-center gap-1 rounded-xl py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50"
        >
          <Smartphone className="h-4 w-4" />
          Install
        </button>
      </div>
    </nav>
  );
}
