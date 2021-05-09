import Stats from 'stats.js';

const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

const syncFullPageCanvas = (canvasEle: HTMLCanvasElement) => {
  canvasEle.width = window.innerWidth;
  canvasEle.height = window.innerHeight;
};

const MAX_FREQ_SIZE = 2 ** 8 - 1;

const render = (
  freqData: Uint8Array,
  canvasEle: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) => {
  syncFullPageCanvas(canvasEle);

  const { width, height } = canvasEle;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  let space = canvasEle.width / freqData.length;
  freqData.forEach((val, idx) => {
    ctx.beginPath();
    // 左上坐标系
    ctx.moveTo(space * idx, height);
    // 最大0.8画布高
    ctx.lineTo(space * idx, height * (1 - (val / MAX_FREQ_SIZE) * 0.8));
    ctx.stroke();
  });
};

export const visualizations = (
  canvasEle: HTMLCanvasElement,
  audioEle: HTMLAudioElement,
) => {
  syncFullPageCanvas(canvasEle);

  const canvasCtx = canvasEle.getContext('2d');
  if (!canvasCtx) {
    return;
  }

  const audioCtx = new AudioContext();
  const analyser = audioCtx.createAnalyser();
  const audioSource = audioCtx.createMediaElementSource(audioEle);
  // analyser.fftSize = 2 ** 10; // 影响频域级数，越大越接近时域曲线，涉及的频率也越多
  // analyser.smoothingTimeConstant = 0.85; // 缓冲系数
  // pipe to analyser
  audioSource.connect(analyser);
  // pipe to destination（输出端）
  analyser.connect(audioCtx.destination);

  const freqData = new Uint8Array(analyser.frequencyBinCount);

  /** 下一帧 */
  const nextFrame = { current: 0 };
  /** 缓冲停止 */
  const nextSmoothTask = { current: 0 };

  const renderer = () => {
    stats.begin();

    audioCtx.resume();

    // 将频率数据填入数组
    analyser.getByteFrequencyData(freqData);

    render(freqData, canvasEle, canvasCtx);

    if (audioEle.paused && !nextSmoothTask.current) {
      nextSmoothTask.current = (setTimeout(() => {
        cancelAnimationFrame(nextFrame.current);
        nextFrame.current = 0;
        nextSmoothTask.current = 0;
      }, 1000) as unknown) as number; // 1000属于经验值，跟AnalyserNode.smoothingTimeConstant值相关
    }

    stats.end();

    nextFrame.current = requestAnimationFrame(renderer);
  };

  audioEle.addEventListener('play', renderer);
};
