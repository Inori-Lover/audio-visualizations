const syncFullPageCanvas = (canvasEle: HTMLCanvasElement) => {
  canvasEle.width = window.innerWidth;
  canvasEle.height = window.innerHeight;
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

  const readFreqData = () => {
    // 将频率数据填入数组
    analyser.getByteFrequencyData(freqData);
    requestAnimationFrame(readFreqData);
  };

  readFreqData();
};
