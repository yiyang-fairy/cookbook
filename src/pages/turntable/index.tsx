import { NavBar, FloatingBubble, Popup, Tabs, Toast } from 'antd-mobile';
import { history } from 'umi';
import { useState } from 'react';
import styles from './index.less';
import Flex from '@/components/Flex';
import LuckyTurntable from '@/components/LuckyTurntable';
import 'animate.css/animate.min.css';
import settingIcon from '@/assets/setting.gif';
import { recipes, typeMap } from "@/data/recipes";
import { Recipe } from '@/types/recipe';

const defaultItems = [
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
  const [isLeaving, setIsLeaving] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

  const handleBack = () => {
    history.back();
  };

  const onEnd = (prize: any) => {
    setSelectedItem(prize.fonts[0].text);
    setShowPopup(true);
    setIsLeaving(false);

    setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);
    }, 2000);
  };

  const onStart = () => {
    // if (selectedRecipes.length === 0) {
    //   Toast.show({
    //     content: '请先选择菜品',
    //     duration: 2000
    //   });
    //   return;
    // }
  }

  const handleRecipeClick = (recipeId: string) => {
    const recipe = recipes.find(recipe => recipe.id === recipeId);
    // 如果已选择菜品中没有该菜品，则添加
    if (!selectedRecipes.some(r => r.id === recipeId) && recipe) {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
  };

  const reandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  const dealSelectedRecipes = () => {
    // 转化为 items 的格式
    const items = selectedRecipes.map(recipe => ({
      background: reandomColor(),
      fonts: [{ text: recipe.name, fontColor: 'red' }]
    }));
    return selectedRecipes.length > 0 ? items : defaultItems;
  }

  return (
    <div className={styles.container}>
      <NavBar onBack={handleBack}>今天吃什么？</NavBar>

      <div className={styles.content}>
        <Flex style={{ margin: "50px 0" }}>
          <LuckyTurntable prizes={dealSelectedRecipes()} onStart={onStart} onEnd={onEnd} />
        </Flex>

        {showPopup && (
          <div className={`${styles.popup} animate__animated ${isLeaving ? 'animate__backOutDown' : 'animate__fadeInDownBig'
            }`}>
            <div className={styles.popupContent}>
              <span>🎉 抽中了：</span>
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
      </div>

      <FloatingBubble
        style={{
          '--initial-position-bottom': '42px',
          '--initial-position-left': '42px',
          '--edge-distance': '24px',
          '--background': '#ff6b6b',
          'height': '0'
        }}
        offset={{ x: -10, y: -250 }}
        onClick={() => {
          setVisible(true)
        }}
      >
        <img src={settingIcon} alt="设置" className={styles.settingIcon} />
      </FloatingBubble>

      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(false)
        }}
        onClose={() => {
          setVisible(false)
        }}
        bodyStyle={{ height: '40vh' }}
      >
        <Flex direction='column' style={{ height: '100%' }}>
          <Flex>
            <Tabs defaultActiveKey='1' style={{ width: '100%' }}>
              {Object.entries(typeMap).map(([key, title]) => (
                <Tabs.Tab key={key} title={title} >
                  <Flex>
                    {recipes.filter(recipe => recipe.type === key).map(recipe => (
                      <Flex className={styles.recipeItem} key={recipe.id} onClick={() => handleRecipeClick(recipe.id)}>
                        <img className={styles.recipeImage} src={`https://picsum.photos/200/200?random=${recipe.id}`} alt={recipe.name} />
                        <div className={styles.recipeName}>{recipe.name}</div>
                      </Flex>
                    ))}
                  </Flex>
                </Tabs.Tab>
              ))}
            </Tabs>

          </Flex>
          <Flex>
            <Flex>
              已选择: 
            </Flex>
            <Flex wrap='wrap' style={{ flex: 1 }}> 
              {selectedRecipes.map(recipe => (
                <Flex className={styles.recipeItem} key={recipe.id}>
                  <img className={styles.recipeImage} src={`https://picsum.photos/200/200?random=${recipe.id}`} alt={recipe.name} />
                  <div className={styles.recipeName}>{recipe.name}</div>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Popup>
    </div>
  );
}

