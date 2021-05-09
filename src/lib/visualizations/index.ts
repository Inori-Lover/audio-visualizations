export const visualizations = (
  canvasEle: HTMLCanvasElement,
  audioEle: HTMLAudioElement,
) => {
  canvasEle.width = window.innerWidth;
  canvasEle.height = window.innerHeight;

  console.log(canvasEle, audioEle);
};
