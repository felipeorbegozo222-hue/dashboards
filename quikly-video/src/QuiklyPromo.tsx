import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { Problem } from "./scenes/Problem";
import { Process } from "./scenes/Process";
import { Services } from "./scenes/Services";

export const QuiklyPromo: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <Audio src={staticFile("music.mp3")} premountFor={fps} />
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Intro"
          durationInFrames={130}
          premountFor={fps}
        >
          <Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence
          name="Problema"
          durationInFrames={170}
          premountFor={fps}
        >
          <Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence
          name="Servicios"
          durationInFrames={200}
          premountFor={fps}
        >
          <Services />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence
          name="Proceso"
          durationInFrames={190}
          premountFor={fps}
        >
          <Process />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 20 })}
        />
        <TransitionSeries.Sequence
          name="Cierre"
          durationInFrames={170}
          premountFor={fps}
        >
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
