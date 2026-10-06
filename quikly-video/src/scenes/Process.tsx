import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Backdrop, Eyebrow, ease, useReveal } from "../ui";
import { C, sans, serif } from "../theme";

const steps = [
  { t: "Diagnóstico", d: "Mapeamos tu operación y cuellos de botella." },
  { t: "Arquitectura", d: "Diseñamos el sistema, seguro y escalable." },
  { t: "Despliegue", d: "Integramos agentes y automatizaciones." },
  { t: "Escala", d: "Medimos, iteramos y crecemos contigo." },
];

export const Process: React.FC = () => {
  const frame = useCurrentFrame();
  const bar = interpolate(frame, [20, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <AbsoluteFill style={{ padding: "100px 120px", justifyContent: "center" }}>
      <Backdrop glowX="50%" glowY="80%" />
      <Eyebrow>Cómo trabajamos</Eyebrow>
      <div style={{ position: "relative", fontFamily: serif, fontWeight: 500, fontSize: 104, color: C.text, margin: "40px 0 100px" }}>
        De la idea a producción.
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", top: 14, left: 0, right: 0, height: 2, background: C.line }} />
        <div style={{ position: "absolute", top: 14, left: 0, width: `${bar * 100}%`, height: 2, background: C.gold }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
          {steps.map((s, i) => (
            <Step key={s.t} {...s} i={i} start={25 + i * 30} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Step: React.FC<{ t: string; d: string; i: number; start: number }> = ({ t, d, i, start }) => {
  const p = useReveal(start, 24);
  return (
    <div style={{ opacity: p, translate: `0px ${(1 - p) * 30}px` }}>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
          background: C.gold,
          boxShadow: `0 0 0 8px ${C.goldSoft}`,
          marginBottom: 36,
        }}
      />
      <div style={{ fontFamily: sans, fontSize: 28, color: C.gold, letterSpacing: 4 }}>{`0${i + 1}`}</div>
      <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 56, color: C.text, margin: "8px 0 12px" }}>{t}</div>
      <div style={{ fontFamily: sans, fontSize: 30, color: C.muted, lineHeight: 1.4 }}>{d}</div>
    </div>
  );
};
