"use client";

import { Download, Smartphone, X } from "lucide-react";
import { useEffect, useState } from "react";

type InstallPromptProps = {
  requestToken: number;
};

export function InstallPrompt({ requestToken }: InstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      const installEvent = event as BeforeInstallPromptEvent;
      installEvent.preventDefault();
      setDeferredPrompt(installEvent);
      setShowPopup(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (requestToken > 0) {
      setShowPopup(true);
    }
  }, [requestToken]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/45 px-4 pb-20 sm:items-center sm:pb-0">
      <div className="w-full max-w-sm rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="inline-flex rounded-2xl bg-sky-50 p-2 text-sky-600">
            <Smartphone className="h-5 w-5" />
          </div>
          <button
            onClick={() => setShowPopup(false)}
            className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close install popup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-base font-semibold text-slate-900">Install GLS Aero PWA</p>
        <p className="mt-1 text-sm text-slate-500">
          Add this app to your phone home screen for faster AWB tracking like a native app.
        </p>

        <div className="mt-4 space-y-2">
          <button
            onClick={handleInstall}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600"
          >
            <Download className="h-4 w-4" />
            Install App
          </button>
          {!deferredPrompt && (
            <p className="text-xs text-slate-400">If install prompt does not appear, use browser menu → "Add to Home Screen".</p>
          )}
        </div>
      </div>
    </div>
  );
}
