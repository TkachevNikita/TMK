import { ICategory } from '../interfaces/category.interface';

export class Category {
  public readonly id: string;
  public readonly type: string;
  public readonly idParentId: string;

  constructor(category: ICategory) {
    this.id = category.id;
    this.type = category.type;
    this.idParentId = category.idParentType;
  }
}
