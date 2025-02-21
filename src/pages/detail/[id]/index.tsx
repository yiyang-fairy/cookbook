import { useParams, history } from 'umi';
import { recipes } from '@/data/recipes';
import { NavBar, Image, Tag, Button, Space, Toast } from 'antd-mobile';
import { 
  ClockCircleFill,
  StarFill,
  StarOutline,
  LinkOutline,
  EditSOutline,
  DeleteOutline 
} from 'antd-mobile-icons';
import styles from './index.less';
import { useState } from 'react';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find(r => r.id === id);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!recipe) {
    return <div>菜品不存在</div>;
  }

  const handleBack = () => {
    history.back();
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    Toast.show({
      content: isFavorite ? '已取消收藏' : '已收藏',
      position: 'bottom',
    });
  };

  const handleShare = () => {
    Toast.show({
      content: '分享功能开发中',
      position: 'bottom',
    });
  };

  const handleEdit = () => {
    Toast.show({
      content: '编辑功能开发中',
      position: 'bottom',
    });
  };

  const handleDelete = () => {
    Toast.show({
      content: '删除功能开发中',
      position: 'bottom',
    });
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.navBarWrapper}>
        <NavBar 
          onBack={handleBack}
          right={
            <Space style={{ fontSize: 24 }}>
              <EditSOutline onClick={handleEdit} />
              <DeleteOutline onClick={handleDelete} />
            </Space>
          }
          style={{ backgroundColor: '#ff6b6b', color: '#fff' }}
        >
          {recipe.name}
        </NavBar>
      </div>
      
      <div className={styles.scrollContainer}>
        <div className={styles.content}>
          {/* 主图 */}
          <div className={styles.imageSection}>
            <Image
              src={`https://picsum.photos/800/400?random=${recipe.id}`}
              fit='cover'
              className={styles.mainImage}
            />
          </div>

          {/* 基本信息 */}
          <div className={styles.infoSection}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{recipe.name}</h1>
              <Space className={styles.actions}>
                <Button onClick={handleFavorite}>
                  {isFavorite ? <StarFill /> : <StarOutline />}
                </Button>
                <Button onClick={handleShare}>
                  <LinkOutline />
                </Button>
              </Space>
            </div>
            <div className={styles.stats}>
              <Tag color='primary'>
                <Space align='center'>
                  <ClockCircleFill />
                  {recipe.cookingTime}分钟
                </Space>
              </Tag>
              <Tag color='success'>已被选择: {recipe.selectedCount || 0}次</Tag>
              {recipe.updateTime && (
                <Tag color='default'>更新时间: {recipe.updateTime}</Tag>
              )}
            </div>
          </div>

          {/* 食材清单 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>食材清单</h2>
            <div className={styles.ingredients}>
              {recipe.ingredients.map((ingredient, index) => (
                <Tag key={index} className={styles.ingredient} color='primary' fill='outline'>
                  {ingredient}
                </Tag>
              ))}
            </div>
          </div>

          {/* 烹饪步骤 */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>烹饪步骤</h2>
            <div className={styles.steps}>
              {recipe.steps?.map((step, index) => (
                <div key={index} className={styles.step}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <div className={styles.stepContent}>{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 教学视频 */}
          {recipe.video && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>教学视频</h2>
              <div className={styles.video}>
                <video
                  src={recipe.video}
                  controls
                  className={styles.videoPlayer}
                  poster={`https://picsum.photos/800/400?random=${recipe.id}_video`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 