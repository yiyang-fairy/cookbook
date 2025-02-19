import { Recipe, RecipeType, TakeoutShop } from '@/types/recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    name: '红烧肉',
    type: RecipeType.MEAT,
    ingredients: ['五花肉', '生抽', '老抽', '料酒', '八角', '葱', '姜', '蒜'],
    cookingTime: 60,
    steps: [
      '五花肉切块，冷水下锅焯水去腥',
      '锅中放油，爆香葱姜蒜',
      '放入五花肉翻炒上色',
      '加入调料，倒入适量热水',
      '大火烧开后转小火炖煮40分钟',
      '收汁即可出锅'
    ],
    selectedCount: 12,
    updateTime: '2024-03-20'
  },
  {
    id: '2',
    name: '酸辣白菜',
    type: RecipeType.VEGETABLE,
    ingredients: ['白菜', '干辣椒', '蒜', '醋'],
    cookingTime: 15,
    steps: [
      '白菜洗净切段',
      '锅中放油，爆香干辣椒和蒜',
      '加入白菜翻炒',
      '加入适量盐和醋调味',
      '大火快炒至断生即可'
    ],
    selectedCount: 8,
    updateTime: '2024-03-19'
  },
  // ... 可以继续添加更多菜品
];

export const takeoutShops: TakeoutShop[] = [
  {
    id: '1',
    name: '老王饺子馆',
    address: '幸福路123号',
  },
  // ... 可以继续添加更多店铺
]; 