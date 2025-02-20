import { NavBar } from 'antd-mobile';
import { history } from 'umi';
import { useState } from 'react';
import Turntable from '@/components/Turntable';
import styles from './index.less';
import Flex from '@/components/Flex';
import LuckyTurntable from '@/components/LuckyTurntable';
// 引入 animate.css
import 'animate.css/animate.min.css';

const items = [
  { background: '#FFE4E1', fonts: [{ text: '红烧肉', fontColor: 'red' }] },
  { background: '#E0FFFF', fonts: [{ text: '酸辣白菜', fontColor: 'red' }] },
  { background: '#F0FFF0', fonts: [{ text: '宫保鸡丁', fontColor: 'red' }] },
  { background: '#FFF0F5', fonts: [{ text: '水煮鱼', fontColor: 'red' }] },
  { background: '#F0FFFF', fonts: [{ text: '麻婆豆腐', fontColor: 'red' }] },
  { background: '#FFF5EE', fonts: [{ text: '鱼香肉丝', fontColor: 'red' }] },
  { background: '#F5FFFA', fonts: [{ text: '炒土豆丝', fontColor: 'red' }] },
  { background: '#FFE4B5', fonts: [{ text: '番茄炒蛋', fontColor: 'red' }] },
];

export default function TurntablePage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleBack = () => {
    history.back();
  };

  const onEnd = (prize: any) => {
    console.log(prize);
    setSelectedItem(prize.fonts[0].text);
    // 显示弹框
    setShowPopup(true);
    console.log("showPopup");
    
    // 2秒后隐藏弹框
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <NavBar onBack={handleBack}>今天吃什么？</NavBar>
      
      <div className={styles.content}>
        <Flex style={{margin: "50px 0"}}>
          {/* <Turntable 
          items={items} 
          onSelect={setSelectedItem}
          size={300}
          borderWidth={6}
        /> */}
          <LuckyTurntable  prizes={items}  onEnd={onEnd} />
        </Flex>

        {/* 添加弹框 */}
        {showPopup && (
          <div className={`${styles.popup} animate__animated animate__fadeInDownBig`}>
            <div className={styles.popupContent}>
              <span>🎉 恭喜抽中了：</span>
              <span className={styles.selectedFood}>{selectedItem}</span>
            </div>
          </div>
        )}

        {selectedItem && (
          <div className={styles.result}>
            <span>今天吃：</span>
            <span className={styles.selectedItem}>{selectedItem}</span>
          </div>
        )}

        <Flex>
          🎉
        </Flex>
      </div>
    </div>
  );
}

