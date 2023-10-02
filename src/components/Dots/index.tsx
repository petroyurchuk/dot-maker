import React from "react";
import styles from "./Dots.module.scss";
type Props = {};
interface DotsTypes {
  x: number;
  y: number;
}
const Dots: React.FC = (props: Props) => {
  const [dots, setDots] = React.useState<DotsTypes[]>([]);

  const draw = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setDots((prev) => [...prev, { x: clientX, y: clientY }]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.button_wrapper}>
        <button className={styles.btn}>Undo</button>
        <button className={styles.btn}>Redo</button>
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
