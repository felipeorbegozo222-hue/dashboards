import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const load = (family: string, file: string, weight: string) =>
  loadFont({
    family,
    url: staticFile(`fonts/${file}`),
    weight,
    format: "woff2",
  });

export const serif = "Cormorant Garamond";
export const sans = "Inter";

load(serif, "cormorant-garamond-latin-500-normal.woff2", "500");
load(serif, "cormorant-garamond-latin-600-normal.woff2", "600");
load(sans, "inter-latin-400-normal.woff2", "400");
load(sans, "inter-latin-500-normal.woff2", "500");
load(sans, "inter-latin-600-normal.woff2", "600");

export const C = {
  bg: "#07070a",
  panel: "#0f0f14",
  line: "rgba(255,255,255,0.09)",
  text: "#f4f1ea",
  muted: "#8d8b86",
  gold: "#c9a961",
  goldSoft: "rgba(201,169,97,0.16)",
};
