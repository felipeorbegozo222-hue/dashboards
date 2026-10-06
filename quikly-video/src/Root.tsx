import { Composition } from "remotion";
import { QuiklyPromo } from "./QuiklyPromo";
import { Intro } from "./scenes/Intro";
import { Outro } from "./scenes/Outro";
import { Problem } from "./scenes/Problem";
import { Process } from "./scenes/Process";
import { Services } from "./scenes/Services";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="QuiklyPromo" component={QuiklyPromo} durationInFrames={780} fps={30} width={1920} height={1080} />
      <Composition id="Intro" component={Intro} durationInFrames={130} fps={30} width={1920} height={1080} />
      <Composition id="Problema" component={Problem} durationInFrames={170} fps={30} width={1920} height={1080} />
      <Composition id="Servicios" component={Services} durationInFrames={200} fps={30} width={1920} height={1080} />
      <Composition id="Proceso" component={Process} durationInFrames={190} fps={30} width={1920} height={1080} />
      <Composition id="Cierre" component={Outro} durationInFrames={170} fps={30} width={1920} height={1080} />
    </>
  );
};
