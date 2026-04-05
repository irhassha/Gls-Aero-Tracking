"use client";

import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      const installEvent = event as BeforeInstallPromptEvent;
      installEvent.preventDefault();
      setDeferredPrompt(installEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShowBanner(false);
    setDeferredPrompt(null);
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-5 transition-all duration-500 ${
        showBanner ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      }`}
    >
      <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200/70 bg-white/95 p-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Install GLS Aero App</p>
            <p className="mt-1 text-xs text-slate-500">Get instant AWB updates directly from your home screen.</p>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close install prompt"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={handleInstall}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600"
        >
          <Download className="h-4 w-4" />
          Install App
        </button>
      </div>
    </div>
  );
}
