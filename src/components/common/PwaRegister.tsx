"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone, CheckCircle, Info, Sparkles } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaRegister() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isReadyForNativePrompt, setIsReadyForNativePrompt] = useState(false);

  useEffect(() => {
    // 1. Detect iOS device and standalone mode
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIosDevice);

      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone ===
          true;

      if (isStandalone) {
        setIsInstalled(true);
      }
    }

    // 2. Register Service Worker immediately with explicit scope
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const registerSW = () => {
        navigator.serviceWorker
          .register("/sw.js", { scope: "/" })
          .then((reg) => {
            console.log("PWA Service Worker registered:", reg.scope);
          })
          .catch((err) => {
            console.error("PWA Service Worker registration failed:", err);
          });
      };

      if (document.readyState === "complete") {
        registerSW();
      } else {
        window.addEventListener("load", registerSW, { once: true });
      }
    }

    // 3. Capture Chrome/Edge native install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsReadyForNativePrompt(true);
      
      const isDismissed = sessionStorage.getItem("pwa_install_dismissed");
      if (!isDismissed) {
        setShowInstallBanner(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
      console.log("DailyDesk PWA installed successfully!");
    });

    // Auto-show banner after 1.5s if not installed & not dismissed
    const timer = setTimeout(() => {
      const isDismissed = sessionStorage.getItem("pwa_install_dismissed");
      if (!isDismissed && !isInstalled) {
        setShowInstallBanner(true);
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setIsInstalled(true);
        }
      } catch (err) {
        console.error("Install prompt error:", err);
      }
      setDeferredPrompt(null);
      setShowInstallBanner(false);
    } else {
      // If native browser prompt is delayed by Chrome, show modal guide
      setShowGuideModal(true);
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem("pwa_install_dismissed", "true");
  };

  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Floating PWA Banner */}
      {showInstallBanner && (
        <div className="fixed bottom-4 right-4 z-50 animate-bounce-in max-w-sm w-[calc(100%-2rem)]">
          <div className="bg-card/95 backdrop-blur-xl border border-[#F39C12]/50 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3 text-foreground transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#F39C12] to-amber-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Smartphone className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-black tracking-tight flex items-center gap-1">
                  <span>Install DailyDesk App</span>
                  {isReadyForNativePrompt && (
                    <Sparkles className="h-3 w-3 text-[#F39C12] animate-spin-slow" />
                  )}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                  {isReadyForNativePrompt
                    ? "Click to install directly on your device!"
                    : "Install app for offline typing practice."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleInstallClick}
                className="flex items-center gap-1 bg-[#F39C12] hover:bg-amber-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-md transition-all scale-100 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Install</span>
              </button>
              <button
                onClick={handleDismiss}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                aria-label="Close install prompt"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Installation Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1.5 rounded-full hover:bg-secondary transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-[#F39C12]/15 border border-[#F39C12]/40 flex items-center justify-center text-[#F39C12]">
                <Smartphone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-foreground">
                  Install DailyDesk App
                </h3>
                <p className="text-xs text-muted-foreground">
                  How to install on your browser
                </p>
              </div>
            </div>

            {isIOS ? (
              <div className="space-y-3 text-xs text-muted-foreground bg-secondary/50 p-4 rounded-2xl border border-border">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#F39C12]">1.</span>
                  <span>Tap the <strong>Share</strong> icon in Safari toolbar.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#F39C12]">2.</span>
                  <span>Select <strong>Add to Home Screen</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-[#F39C12]">3.</span>
                  <span>Tap <strong>Add</strong> in the top right corner.</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-muted-foreground bg-secondary/50 p-4 rounded-2xl border border-border">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-[#F39C12] shrink-0 mt-0.5" />
                  <span>
                    In <strong>Google Chrome / Edge</strong>, open the top right menu <strong>(⋮)</strong> or <strong>(⋯)</strong>.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    Click <strong>Cast, save and share ➔ Install DailyDesk...</strong> or <strong>Install DailyDesk</strong>.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Or look at the right end of the Address Bar for the 🖥️ <strong>Install Icon</strong>.
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-5 w-full bg-[#F39C12] hover:bg-amber-600 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
