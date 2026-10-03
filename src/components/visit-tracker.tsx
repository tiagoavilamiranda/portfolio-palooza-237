import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { logVisit } from "@/lib/visitors.functions";

function detectSource(ref: string, params: URLSearchParams) {
  const utm = params.get("utm_source");
  if (utm) return utm;
  if (/linkedin|lnkd\.in/i.test(ref)) return "LinkedIn";
  if (/whatsapp|wa\.me/i.test(ref)) return "WhatsApp";
  if (/google\./i.test(ref)) return "Google";
  if (/instagram/i.test(ref)) return "Instagram";
  if (/facebook/i.test(ref)) return "Facebook";
  return ref ? "Outro site" : "Link direto";
}

export function VisitTracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith("/painel")) return;
    if (window.location.hostname.includes("id-preview") || window.location.hostname === "localhost") return;
    const ref = document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : "";
    const key = "tv_src";
    let source = sessionStorage.getItem(key);
    if (!source) {
      source = detectSource(ref, new URLSearchParams(window.location.search));
      sessionStorage.setItem(key, source);
    }
    logVisit({
      data: {
        path: pathname,
        referrer: ref || undefined,
        source,
        device: window.innerWidth < 768 ? "Celular" : "Computador",
      },
    }).catch(() => {});
  }, [pathname]);
  return null;
}
