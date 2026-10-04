import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

function decode(v?: string) {
  if (!v) return null;
  try {
    return decodeURIComponent(v).slice(0, 80);
  } catch {
    return v.slice(0, 80);
  }
}

export const logVisit = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        path: z.string().max(200),
        referrer: z.string().max(500).optional(),
        source: z.string().max(60).optional(),
        device: z.string().max(20).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let city = decode(getRequestHeader("cf-ipcity"));
    let region = decode(getRequestHeader("cf-region"));
    let country = decode(getRequestHeader("cf-ipcountry"));
    if (!city) {
      const ip =
        getRequestHeader("cf-connecting-ip") ||
        getRequestHeader("x-real-ip") ||
        getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim();
      if (ip) {
        try {
          const ctrl = new AbortController();
          const t = setTimeout(() => ctrl.abort(), 2500);
          const r = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}?lang=pt-BR`, { signal: ctrl.signal });
          clearTimeout(t);
          const g = (await r.json()) as { success?: boolean; city?: string; region?: string; country_code?: string };
          if (g.success) {
            city = decode(g.city) ?? city;
            region = decode(g.region) ?? region;
            country = decode(g.country_code) ?? country;
          }
        } catch {
          /* sem cidade */
        }
      }
    }
    await supabaseAdmin.from("site_visits").insert({
      path: data.path,
      referrer: data.referrer || null,
      source: data.source || null,
      device: data.device || null,
      city,
      region,
      country,
    });
    return { ok: true };
  });

export const sendMessage = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        name: z.string().trim().min(2).max(100),
        company: z.string().trim().max(100).optional(),
        contact: z.string().trim().max(150).optional(),
        message: z.string().trim().min(2).max(1500),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("visitor_messages").insert({
      name: data.name,
      company: data.company || null,
      contact: data.contact || null,
      message: data.message,
    });
    if (error) throw new Error("Não foi possível enviar agora.");
    return { ok: true };
  });
