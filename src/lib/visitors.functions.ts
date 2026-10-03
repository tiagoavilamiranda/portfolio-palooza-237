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
    await supabaseAdmin.from("site_visits").insert({
      path: data.path,
      referrer: data.referrer || null,
      source: data.source || null,
      device: data.device || null,
      city: decode(getRequestHeader("cf-ipcity")),
      region: decode(getRequestHeader("cf-region")),
      country: decode(getRequestHeader("cf-ipcountry")),
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
