import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { C, sans } from "./theme";

export const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const useReveal = (start: number, dur = 24) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  return p;
};

export const Backdrop: React.FC<{ glowX?: string; glowY?: string }> = ({ glowX = "50%", glowY = "50%" }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 300], [-40, 40]);
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 620px at ${glowX} ${glowY}, rgba(201,169,97,0.13), transparent 70%)`,
          translate: `${drift}px 0px`,
        }}
      />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </AbsoluteFill>
  );
};

export const Eyebrow: React.FC<{ children: string; start?: number }> = ({ children, start = 0 }) => {
  const p = useReveal(start);
  return (
    <div
      style={{
        fontFamily: sans,
        fontWeight: 500,
        fontSize: 30,
        letterSpacing: 8,
        textTransform: "uppercase",
        color: C.gold,
        opacity: p,
        translate: `0px ${(1 - p) * 20}px`,
      }}
    >
      {children}
    </div>
  );
};
