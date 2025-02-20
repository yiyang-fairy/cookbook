import { useState, useRef, useEffect, useMemo } from 'react';
import styles from './index.less';

// 将颜色生成函数修改为生成浅色系颜色
const getRandomPastelColor = () => {
  // hue: 随机色相 (0-360)
  // saturation: 较低的饱和度 (30-50%)
  // lightness: 较高的亮度 (80-90%)
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20 + 30); // 30-50%
  const lightness = Math.floor(Math.random() * 10 + 80);  // 80-90%
  return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.5)`;
};

// 生成扇区颜色数组的函数
const generateSectionColors = (count: number) => {
  return Array.from({ length: count }, () => getRandomPastelColor());
};

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
  
  // 使用 useMemo 存储颜色数组，只在 items 变化时更新
  const sectionColors = useMemo(() => generateSectionColors(items.length), [items.length]);

  // 生成圆锥渐变的函数现在使用保存的颜色数组
  const generateConicGradient = () => {
    const sectionAngle = 360 / items.length;
    const sections = sectionColors.map((color, index) => {
      const startAngle = index * sectionAngle;
      const endAngle = (index + 1) * sectionAngle;
      return `${color} ${startAngle}deg ${endAngle}deg`;
    });
    
    return `conic-gradient(${sections.join(',')})`;
  };

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
          background: generateConicGradient(),
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