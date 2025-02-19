import { useParams } from 'umi';
import { recipes } from '@/data/recipes';
import styles from './detail.less';

export default function Detail() {
  const { id } = useParams();
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return <div>菜品不存在</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{recipe.name}</h1>
      {/* 详情页的具体内容后续再完善 */}
    </div>
  );
} 