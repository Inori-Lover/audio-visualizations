const syncFullPageCanvas = (canvasEle: HTMLCanvasElement) => {
  canvasEle.width = window.innerWidth;
  canvasEle.height = window.innerHeight;
};

const render = (freqData: Uint8Array) => {
  console.log('freqData', freqData);
};

export const visualizations = (
  canvasEle: HTMLCanvasElement,
  audioEle: HTMLAudioElement,
) => {
  syncFullPageCanvas(canvasEle);

  const ctx = new AudioContext();
  const analyser = ctx.createAnalyser();
  const audioSource = ctx.createMediaElementSource(audioEle);
  // pipe to analyser
  audioSource.connect(analyser);
  // pipe to destination（输出端）
  analyser.connect(ctx.destination);

  const freqData = new Uint8Array(analyser.frequencyBinCount);

  /** 下一帧 */
  const nextFrame = { current: 0 };
  /** 缓冲停止 */
  const nextSmoothTask = { current: 0 };

  const renderer = () => {
    // 将频率数据填入数组
    analyser.getByteFrequencyData(freqData);

    render(freqData);

    if (audioEle.paused && !nextSmoothTask.current) {
      nextSmoothTask.current = (setTimeout(() => {
        cancelAnimationFrame(nextFrame.current);
        nextFrame.current = 0;
        nextSmoothTask.current = 0;
      }, 600) as unknown) as number; // 600属于经验值，跟AnalyserNode.smoothingTimeConstant值相关
    }

    nextFrame.current = requestAnimationFrame(renderer);
  };

  audioEle.addEventListener('play', renderer);
};
