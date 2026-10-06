import { AbsoluteFill, useVideoConfig } from "remotion";
import { Backdrop, Eyebrow, useReveal } from "../ui";
import { C, sans, serif } from "../theme";

const items = [
  {
    n: "01",
    t: "Agentes LLM",
    d: "Asistentes que atienden, califican y cierran 24/7.",
  },
  {
    n: "02",
    t: "Automatización",
    d: "Flujos en n8n que conectan todo tu stack.",
  },
  {
    n: "03",
    t: "WhatsApp & Telegram",
    d: "Atención y ventas conversacionales integradas.",
  },
  {
    n: "04",
    t: "Datos & Dashboards",
    d: "Supabase y React: tu operación, en tiempo real.",
  },
];

export const Services: React.FC = () => {
  const { width, height } = useVideoConfig();
  const v = height > width;
  return (
    <AbsoluteFill style={{ padding: v ? "140px 80px" : "100px 120px" }}>
      <Backdrop glowX="80%" glowY="20%" />
      <Eyebrow>Qué construimos</Eyebrow>
      <div
        style={{
          position: "relative",
          marginTop: 40,
          fontFamily: serif,
          fontWeight: 500,
          fontSize: v ? 96 : 104,
          color: C.text,
          lineHeight: 1.1,
        }}
      >
        Sistemas que no se caen.
      </div>
      <div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: v ? "1fr" : "1fr 1fr",
          gap: v ? 28 : 32,
          marginTop: v ? 60 : 70,
        }}
      >
        {items.map((it, i) => (
          <Card key={it.n} {...it} start={30 + i * 18} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Card: React.FC<{ n: string; t: string; d: string; start: number }> = ({
  n,
  t,
  d,
  start,
}) => {
  const p = useReveal(start, 26);
  return (
    <div
      style={{
        background: C.panel,
        border: `1px solid ${C.line}`,
        borderRadius: 20,
        padding: "36px 44px",
        opacity: p,
        translate: `0px ${(1 - p) * 40}px`,
      }}
    >
      <div
        style={{
          fontFamily: sans,
          fontSize: 28,
          color: C.gold,
          letterSpacing: 4,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: serif,
          fontWeight: 600,
          fontSize: 60,
          color: C.text,
          margin: "10px 0",
        }}
      >
        {t}
      </div>
      <div
        style={{
          fontFamily: sans,
          fontSize: 32,
          color: C.muted,
          lineHeight: 1.35,
        }}
      >
        {d}
      </div>
    </div>
  );
};
