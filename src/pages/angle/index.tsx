import { FC, memo, useRef, useEffect, useCallback } from 'react';

import { angle } from '@/lib/visualizations/angle';

import styles from './index.css';

const main: FC = memo(function main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { current: canvasEle } = canvasRef;
    if (!canvasEle) {
      return;
    }
    angle();
  }, []);

  return (
    <div className={styles.wrap}>
      <canvas ref={canvasRef} />
    </div>
  );
});

export default main;
