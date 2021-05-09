declare module '*.m4a' {
  const url: string;
  export default url;
}
declare module 'stats.js' {
  class Stats {
    public showPanel(mode: 0 | 1 | 2): void;
    public dom: HTMLElement;

    public begin(): void;
    public end(): void;
  }

  export default Stats;
}
