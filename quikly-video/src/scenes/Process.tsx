import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
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
  const { width, height } = useVideoConfig();
  const v = height > width;
  const bar = interpolate(frame, [20, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return (
    <AbsoluteFill
      style={{
        padding: v ? "140px 80px" : "100px 120px",
        justifyContent: "center",
      }}
    >
      <Backdrop glowX="50%" glowY="80%" />
      <Eyebrow>Cómo trabajamos</Eyebrow>
      <div
        style={{
          position: "relative",
          fontFamily: serif,
          fontWeight: 500,
          fontSize: v ? 96 : 104,
          color: C.text,
          margin: v ? "40px 0 80px" : "40px 0 100px",
          lineHeight: 1.1,
        }}
      >
        De la idea a producción.
      </div>
      <div style={{ position: "relative" }}>
        {v ? (
          <>
            <div
              style={{
                position: "absolute",
                left: 14,
                top: 14,
                bottom: 14,
                width: 2,
                background: C.line,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 14,
                top: 14,
                height: `calc(${bar * 100}% - 28px)`,
                width: 2,
                background: C.gold,
              }}
            />
          </>
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 0,
                right: 0,
                height: 2,
                background: C.line,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 0,
                width: `${bar * 100}%`,
                height: 2,
                background: C.gold,
              }}
            />
          </>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: v ? "1fr" : "repeat(4, 1fr)",
            gap: v ? 56 : 40,
          }}
        >
          {steps.map((s, i) => (
            <Step key={s.t} {...s} i={i} start={25 + i * 30} vertical={v} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Step: React.FC<{
  t: string;
  d: string;
  i: number;
  start: number;
  vertical: boolean;
}> = ({ t, d, i, start, vertical }) => {
  const p = useReveal(start, 24);
  const dot = (
    <div
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        background: C.gold,
        boxShadow: `0 0 0 8px ${C.goldSoft}`,
        flexShrink: 0,
      }}
    />
  );
  const body = (
    <div>
      <div
        style={{
          fontFamily: sans,
          fontSize: 28,
          color: C.gold,
          letterSpacing: 4,
        }}
      >{`0${i + 1}`}</div>
      <div
        style={{
          fontFamily: serif,
          fontWeight: 600,
          fontSize: vertical ? 64 : 56,
          color: C.text,
          margin: "8px 0 12px",
        }}
      >
        {t}
      </div>
      <div
        style={{
          fontFamily: sans,
          fontSize: vertical ? 34 : 30,
          color: C.muted,
          lineHeight: 1.4,
        }}
      >
        {d}
      </div>
    </div>
  );
  return (
    <div
      style={{
        opacity: p,
        translate: vertical ? `${(1 - p) * 30}px 0px` : `0px ${(1 - p) * 30}px`,
        display: vertical ? "flex" : "block",
        gap: 44,
      }}
    >
      {vertical ? (
        <>
          {dot}
          {body}
        </>
      ) : (
        <>
          <div style={{ marginBottom: 36 }}>{dot}</div>
          {body}
        </>
      )}
    </div>
  );
};
