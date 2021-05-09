import { FC, memo, useRef, useEffect } from 'react';

import { visualizations } from '@/lib/visualizations';

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

  return (
    <>
      <canvas ref={canvasRef} />
      <audio style={{ display: 'none' }} ref={audioRef} />
    </>
  );
});

export default main;
