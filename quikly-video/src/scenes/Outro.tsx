import { AbsoluteFill } from "remotion";
import { Backdrop, useReveal } from "../ui";
import { C, sans, serif } from "../theme";

export const Outro: React.FC = () => {
  const a = useReveal(8, 30);
  const b = useReveal(40, 30);
  const c = useReveal(70, 30);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <Backdrop />
      <div style={{ fontFamily: serif, fontWeight: 500, fontSize: 130, color: C.text, opacity: a, translate: `0px ${(1 - a) * 30}px`, lineHeight: 1.1 }}>
        Automatiza hoy.
        <br />
        <span style={{ color: C.gold }}>Escala mañana.</span>
      </div>
      <div style={{ position: "relative", fontFamily: sans, fontSize: 40, letterSpacing: 6, textTransform: "uppercase", color: C.muted, marginTop: 60, opacity: b }}>
        Agenda una llamada
      </div>
      <div style={{ fontFamily: serif, fontWeight: 600, fontSize: 84, color: C.gold, marginTop: 20, opacity: c, translate: `0px ${(1 - c) * 20}px` }}>
        quikly.ai
      </div>
    </AbsoluteFill>
  );
};
