import Stats from 'stats.js';

const ID = `${Date.now()}${Math.random()}`;
let stats: Stats;

const ensureStats = (): Stats => {
  if (stats && document.getElementById(ID)) {
    return stats;
  }

  stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  stats.dom.id = ID;
  document.body.appendChild(stats.dom);

  return stats;
};

export const fps = {
  begin() {
    ensureStats().begin();
  },
  end() {
    ensureStats().end();
  },
};
