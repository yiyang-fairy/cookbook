import { SideBar, Swiper, Image, FloatingBubble } from 'antd-mobile';
import { recipes } from '@/data/recipes';
import { RecipeType } from '@/types/recipe';
import { SetOutline } from 'antd-mobile-icons';
import styles from './index.less';
import { useState } from 'react';
import { history } from 'umi';
import turntableIcon from '@/assets/turntable.gif';
import Flex from '@/components/Flex';

const typeMap = {
  [RecipeType.MEAT]: '纯肉类',
  [RecipeType.VEGETABLE]: '纯素菜',
  [RecipeType.MIXED]: '荤素搭配',
  [RecipeType.DIET]: '减脂类',
};

// 轮播图数据
const bannerItems = [
  {
    id: 1,
    image: 'https://picsum.photos/800/400?random=1',
    title: '美食推荐',
  },
  {
    id: 2,
    image: 'https://picsum.photos/800/400?random=2',
    title: '今日特色',
  },
  {
    id: 3,
    image: 'https://picsum.photos/800/400?random=3',
    title: '热门菜品',
  },
];

export default function Home() {
  const [activeKey, setActiveKey] = useState<RecipeType>(RecipeType.MEAT);

  const handleRecipeClick = (recipeId: string) => {
    history.push(`/detail/${recipeId}`);
  };

  const handleSideBarChange = (key: string) => {
    setActiveKey(key as RecipeType);
  };

  const handleTurntableClick = () => {
    history.push('/turntable');
  };

  return (
    <div className={styles.pageContainer}>
      {/* 轮播图部分 */}
      <div className={styles.bannerContainer}>
        <Swiper autoplay loop>
          {bannerItems.map(item => (
            <Swiper.Item key={item.id}>
              <div className={styles.bannerContent}>
                <Image src={item.image} fit='cover' />
                <div className={styles.bannerTitle}>{item.title}</div>
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      </div>

      {/* 分类和菜品列表 */}
      <div className={styles.container}>
        <SideBar activeKey={activeKey} onChange={handleSideBarChange} style={{'--background-color': '#fdf4f5'}}>
          {Object.entries(typeMap).map(([key, title]) => (
            <SideBar.Item key={key} title={title} />
          ))}
        </SideBar>
        
        <div className={styles.content}>
          {recipes
            .filter(recipe => recipe.type === activeKey)
            .map(recipe => (
              <div 
                key={recipe.id} 
                className={styles.recipeCard}
                onClick={() => handleRecipeClick(recipe.id)}
              >
                <div className={styles.recipeCardContent}>
                  <Image 
                    src={`https://picsum.photos/200/200?random=${recipe.id}`}
                    className={styles.recipeImage}
                    fit='cover'
                  />
                  
                  <div className={styles.recipeInfo}>
                    <div className={styles.recipeName}>{recipe.name}</div>
                    <div className={styles.recipeDetails}>
                      <span>烹饪时间: {recipe.cookingTime}分钟</span>
                      <span>食材: {recipe.ingredients.slice(0, 3).join(', ')}...</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* 转盘入口按钮 */}
      <FloatingBubble
        style={{
          '--initial-position-bottom': '42px',
          '--initial-position-left': '42px',
          '--edge-distance': '24px',
          '--background': '#ff6b6b',
          'height': '0'
        }}
        axis='xy'
        magnetic='x'
        onClick={handleTurntableClick}
      >
        <Flex>
          <img src={turntableIcon} alt="转盘" className={styles.turntableIcon} />
          <Flex className={styles.turntableText}>转</Flex>
        </Flex>
      </FloatingBubble>
    </div>
  );
}
