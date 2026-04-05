"use client";

import { Camera, Plane, Search, Share2, BellRing, UserCircle2, Package2 } from "lucide-react";
import { useMemo, useState } from "react";

import { InstallPrompt } from "@/components/install-prompt";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { Timeline, TimelineItem } from "@/components/timeline";

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
    {
      id: "1",
      title: "Departed",
      location: "Singapore (SIN)",
      datetime: "15 Oct 2023, 10:00 SGT",
      status: "done"
    },
    {
      id: "2",
      title: "Arrived at Transit",
      location: "Singapore (SIN)",
      datetime: "15 Oct 2023, 08:00 SGT",
      status: "done"
    },
    {
      id: "3",
      title: "Departed",
      location: "Jakarta (CGK)",
      datetime: "15 Oct 2023, 05:00 WIB",
      status: "active"
    },
    {
      id: "4",
      title: "Booking Confirmed",
      location: "Jakarta (CGK)",
      datetime: "14 Oct 2023, 16:00 WIB",
      status: "upcoming"
    }
  ]
};

export default function HomePage() {
  const [awbInput, setAwbInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

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

    setIsLoading(true);
    setTrackingData(null);

    window.setTimeout(() => {
      setTrackingData({ awb, ...DUMMY_DATA });
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <header className="bg-gradient-to-r from-blue-900 to-slate-800 px-4 pb-8 pt-7 text-white shadow-lg sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-2.5 backdrop-blur">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold">GLS Aero Tracking</p>
              <p className="text-xs text-blue-100">{headerDate}</p>
            </div>
          </div>
          <UserCircle2 className="h-8 w-8 text-blue-100" />
        </div>
      </header>

      <section className="relative -mt-5 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-5">
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
        </div>
      </section>

      <InstallPrompt />
    </main>
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
