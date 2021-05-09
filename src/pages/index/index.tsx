import { FC, memo, useRef, useEffect, useCallback } from 'react';

import { visualizations } from '@/lib/visualizations';
import expAudioSrc from '@/assests/my_dearest.m4a';

const main: FC = memo(function main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const { current: canvasEle } = canvasRef;
    const { current: audioEle } = audioRef;
    if (!canvasEle || !audioEle) {
      return;
    }

    visualizations(canvasEle, audioEle);
  }, []);

  const playHandle = useCallback(() => {
    const { current: audioEle } = audioRef;
    if (!audioEle) {
      return;
    }
    if (audioEle.paused) {
      audioEle.play();
    } else {
      audioEle.pause();
    }
  }, []);

  return (
    <>
      <canvas ref={canvasRef} onClick={playHandle} />
      <audio
        style={{ display: 'none' }}
        src={expAudioSrc}
        loop
        ref={audioRef}
      />
    </>
  );
});

export default main;
