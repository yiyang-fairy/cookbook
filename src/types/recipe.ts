// 菜品类型枚举
export enum RecipeType {
  MEAT = 'meat', // 纯肉类
  VEGETABLE = 'vegetable', // 纯素菜
  MIXED = 'mixed', // 荤素搭配
  DIET = 'diet', // 减脂类
  TAKEOUT = 'takeout', // 外出类
}

// 菜品接口
export interface Recipe {
  id: string;
  name: string;
  type: RecipeType;
  ingredients: string[]; // 食材
  cookingTime: number; // 烹饪时间(分钟)
  images?: string[]; // 图片
  video?: string; // 视频链接
  steps: string[]; // 烹饪步骤
  selectedCount: number; // 被选择次数
  updateTime?: string; // 最后更新时间
}

// 外卖店铺接口
export interface TakeoutShop {
  id: string;
  name: string;
  address: string;
  rating: number;
  deliveryTime: string;
  minPrice: number;
  deliveryFee: number;
} 