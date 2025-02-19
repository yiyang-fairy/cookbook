import { NavBar } from 'antd-mobile';
import { history } from 'umi';
import { useState } from 'react';
import Turntable from '@/components/Turntable';
import styles from './index.less';
import Flex from '@/components/Flex';

const items = [
  { id: 1, name: '红烧肉' },
  { id: 2, name: '酸辣白菜' },
  { id: 3, name: '宫保鸡丁' },
  { id: 4, name: '水煮鱼' },
  { id: 5, name: '麻婆豆腐' },
  { id: 6, name: '鱼香肉丝' },
  { id: 7, name: '炒土豆丝' },
  { id: 8, name: '番茄炒蛋' },  
];

export default function TurntablePage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleBack = () => {
    history.back();
  };

  return (
    <div className={styles.container}>
      <NavBar onBack={handleBack}>今天吃什么？</NavBar>
      
      <div className={styles.content}>
        <Flex style={{margin: "20px 0"}}>
          <Turntable 
          items={items} 
          onSelect={setSelectedItem}
          size={300}
          borderWidth={6}
        />
        </Flex>

        {selectedItem && (
          <div className={styles.result}>
            <span>今天吃：</span>
            <span className={styles.selectedItem}>{selectedItem}</span>
          </div>
        )}
      </div>
    </div>
  );
}

