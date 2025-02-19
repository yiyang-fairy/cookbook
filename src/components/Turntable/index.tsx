import { useState, useRef } from 'react';
import styles from './index.less';

interface TurntableProps {
  items: Array<{ id: number | string; name: string }>;
  onSelect?: (item: string) => void;
  size?: number;
  borderWidth?: number;
}

export default function Turntable({ 
  items, 
  onSelect,
  size = 360,
  borderWidth = 4
}: TurntableProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [rotateCount, setRotateCount] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedItem(null);

    const randomIndex = Math.floor(Math.random() * items.length);
    const degrees = 1080 + (randomIndex * (360 / items.length)) + (rotateCount * 360);

    if (wheelRef.current) {
      wheelRef.current.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      setIsSpinning(false);
      const selected = items[randomIndex].name;
      setSelectedItem(selected);
      setRotateCount(prev => prev + 3);
      onSelect?.(selected);
    }, 3000);
  };

  return (
    <div 
      className={styles.wheelContainer}
      style={{ 
        width: size, 
        height: size 
      }}
    >
      <div 
        ref={wheelRef} 
        className={`${styles.wheel} ${isSpinning ? styles.spinning : ''}`}
        style={{
          background: generateConicGradient(items.length),
          borderWidth,
        }}
      >
        {items.map((item, index) => {
          const angle = (360 / items.length) * index;
          const textAngle = angle + (360 / items.length / 2);
          return (
            <div
              key={item.id}
              className={styles.item}
            >
              <div 
                className={styles.itemContent}
                style={{
                  transform: `
                    rotate(${textAngle}deg)
                    translateY(${-size * 0.3}px)
                  `,
                }}
              >
                {item.name.split('').map((char, i) => (
                  <span key={i}>{char}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div 
        className={styles.pointer}
        style={{
          width: size * 0.2,
          height: size * 0.2,
          borderWidth: borderWidth * 0.75,
        }}
        onClick={handleSpin}
      >
        开始
      </div>
    </div>
  );
}

function generateConicGradient(count: number) {
  const sectionAngle = 360 / count;
  const sections = Array.from({ length: count }, (_, index) => {
    const startAngle = index * sectionAngle;
    const endAngle = (index + 1) * sectionAngle;
    const color = index % 2 === 0 ? '#fff' : '#f8f9fa';
    return `${color} ${startAngle}deg ${endAngle}deg`;
  });
  
  return `conic-gradient(${sections.join(',')})`;
} 