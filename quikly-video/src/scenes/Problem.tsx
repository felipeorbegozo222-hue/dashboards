import { AbsoluteFill } from "remotion";
import { Backdrop, Eyebrow, useReveal } from "../ui";
import { C, sans, serif } from "../theme";

const lines = ["Leads sin responder.", "Procesos manuales.", "Equipos saturados."];

export const Problem: React.FC = () => {
  const tail = useReveal(110, 30);
  return (
    <AbsoluteFill style={{ padding: "100px 160px", justifyContent: "center" }}>
      <Backdrop glowX="20%" glowY="40%" />
      <Eyebrow>El problema</Eyebrow>
      <div style={{ marginTop: 50 }}>
        {lines.map((l, i) => (
          <Line key={l} text={l} start={20 + i * 25} />
        ))}
      </div>
      <div
        style={{
          fontFamily: sans,
          fontSize: 48,
          color: C.gold,
          marginTop: 60,
          opacity: tail,
          translate: `0px ${(1 - tail) * 20}px`,
        }}
      >
        Tu negocio crece. Tu operación no debería frenarlo.
      </div>
    </AbsoluteFill>
  );
};

const Line: React.FC<{ text: string; start: number }> = ({ text, start }) => {
  const p = useReveal(start, 28);
  return (
    <div
      style={{
        fontFamily: serif,
        fontWeight: 500,
        fontSize: 120,
        lineHeight: 1.15,
        color: C.text,
        opacity: p * 0.95,
        translate: `${(1 - p) * -60}px 0px`,
      }}
    >
      {text}
    </div>
  );
};
