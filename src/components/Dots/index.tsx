import React from "react";
import styles from "./Dots.module.scss";
type Props = {};
interface DotTypes {
  x: number;
  y: number;
}
const Dots: React.FC = (props: Props) => {
  const [dots, setDots] = React.useState<DotTypes[]>([]);
  const [cache, setCache] = React.useState<DotTypes[]>([]);
  const draw = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setDots((prev) => [...prev, { x: clientX, y: clientY }]);
  };
  const undo = () => {
    if (!dots.length) return;
    const newDots = [...dots];
    const lastDot = newDots.pop() as DotTypes;
    Promise.all([setCache((prev) => [...prev, lastDot]), setDots(newDots)]);
  };
  const redo = () => {
    if (!cache.length) return;
    const newCache = [...cache];
    const lastCacheItem = newCache.pop() as DotTypes;
    Promise.all([
      setDots((prev) => [...prev, lastCacheItem]),
      setCache(newCache),
    ]);
  };
  return (
    <div className={styles.container}>
      <div className={styles.button_wrapper}>
        <button onClick={undo} className={styles.btn}>
          Undo
        </button>
        <button onClick={redo} className={styles.btn}>
          Redo
        </button>
      </div>
      <div className={styles.click_area} onClick={draw}>
        {dots.map(({ x, y }, i) => (
          <div
            className={styles.dot}
            key={`dot-${i}`}
            style={{
              top: y,
              left: x,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default Dots;
