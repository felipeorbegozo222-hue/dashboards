import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Backdrop, ease, useReveal } from "../ui";
import { C, sans, serif } from "../theme";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const v = height > width;
  const logo = useReveal(10, 40);
  const tag = useReveal(50, 30);
  const line = interpolate(frame, [30, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Backdrop />
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontFamily: serif,
            fontWeight: 600,
            fontSize: v ? 190 : 220,
            letterSpacing: -4,
            color: C.text,
            opacity: logo,
            scale: interpolate(logo, [0, 1], [0.94, 1]),
            filter: `blur(${(1 - logo) * 16}px)`,
          }}
        >
          Quikly<span style={{ color: C.gold }}>.AI</span>
        </div>
        <div
          style={{
            height: 2,
            width: (v ? 420 : 560) * line,
            background: C.gold,
            margin: "20px auto 40px",
          }}
        />
        <div
          style={{
            fontFamily: sans,
            fontSize: v ? 32 : 44,
            letterSpacing: v ? 6 : 10,
            textTransform: "uppercase",
            color: C.muted,
            opacity: tag,
            translate: `0px ${(1 - tag) * 16}px`,
          }}
        >
          IA · Automatización · Escala
        </div>
      </div>
    </AbsoluteFill>
  );
};
